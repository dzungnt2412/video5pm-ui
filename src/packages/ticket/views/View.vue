<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <div class="px-10 mb-2 panel ticket-toolbar">
          <a href="#" class="mr-30" @click="toBack()">
            <p-tooltip position="bottom" trigger="hover" label="Quay lại">
              <span class="badge badge-default badge-outline">
                <i class="icon md-arrow-left"></i>
              </span>
            </p-tooltip>
          </a>
          <a
            href="#form-reply-ticket"
            class="ml-30 mr-20"
            v-if="ticket.status != 'closed'"
          >
            <p-tooltip position="bottom" trigger="hover" label="Trả lời">
              <span class="badge badge-default badge-outline">
                <i class="icon md-mail-reply"></i>
              </span>
            </p-tooltip>
          </a>
          <a href="#ticket-bottom" class="mr-10 float-right">
            <p-tooltip
              position="bottom-left"
              trigger="hover"
              label="Cuộn xuống"
            >
              <span class="badge badge-default badge-outline">
                <i class="icon md-long-arrow-down"></i>
              </span>
            </p-tooltip>
          </a>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="card">
          <div class="card-block">
            <div class="card-title">
              <h3 class="m0">
                {{ ticket.subject }}
              </h3>
              <p v-if="ticket.status == 'closed'" class="mt-2 mb-0 text-danger"
                >Ticket đã được đóng, nếu sự cố của bạn chưa được giải quết, bạn
                có thể click <a href="#ticket-bottom">vào đây</a> để mở lại
                ticket.</p
              >
            </div>
            <div class="card-text">
              <div class="row">
                <div class="col-sm-7">
                  <p class="mb-5">
                    <span>Ticket ID: {{ ticket.id }}</span>
                    <time class="ml-35">
                      Tạo ngày:
                      {{ ticket.created_at | datetime('dd/MM/yyyy HH:mm') }} ({{
                        ticket.created_at | timeAgo
                      }}
                      trước)
                    </time>
                  </p>
                  <p class="mb-5" v-if="ticket.object_id">
                    Mã đơn hàng:
                    <router-link
                      class="hightlight"
                      target="_blank"
                      slot="reference"
                      :to="{
                        name: 'order-view',
                        params: { id: ticket.object_id },
                      }"
                    >
                      {{ ticket.ref_id }}
                    </router-link>
                  </p>
                </div>
                <div class="col-sm-5">
                  <p class="mb-5"
                    >Trạng thái:
                    <span v-status:status="ticket.status">
                      {{ ticket.status }}
                    </span>
                  </p>
                  <p class="mb-5" v-if="ticket.category"
                    >Danh mục: {{ ticket.category }}</p
                  >
                </div>
              </div>
              <hr />
              <p class="text-pre-line">{{ ticket.content }}</p>
              <div
                class="gallery ticket-attach-files"
                v-if="attach_files && attach_files.length"
              >
                <hr />
                <div class="row">
                  <div class="col" v-for="(file, i) in attach_files" :key="i">
                    <div
                      v-if="isImage(file.url)"
                      class="gallery-item"
                      @click="zoomImage(file.blob)"
                    >
                      <img class="img-fluid w-full" :src="file.blob" />
                    </div>
                    <div v-else class="gallery-item ticket-file">
                      <a @click="getTicketFile(file, true)" class="btn">
                        <span>{{ extenionFileUrl(file) }}</span>
                        <span class="icon md-download"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card mb-5 ticket-message"
          v-for="(item, index) in messages"
          :key="index"
          :class="{ me: item.user_id == auth.id }"
        >
          <div class="card-block">
            <div class="card-title">
              <h4 class="m0 d-ib">
                {{ item.full_name || 'Undefined' }}
                <span
                  v-if="item.is_staff == 'Y'"
                  class="badge badge-info text-top"
                  >Lionnix Staff</span
                >
              </h4>
              <span class="float-right">
                {{ item.created_at | datetime('dd/MM/yyyy HH:mm') }}
              </span>
            </div>
            <div class="card-text">
              <p class="text-pre-line">{{ item.message }}</p>
              <div
                class="gallery ticket-attach-files"
                v-if="item.attach_files && item.attach_files.length"
              >
                <hr />
                <div class="row">
                  <div
                    class="col"
                    v-for="(file, i) in item.attach_files"
                    :key="i"
                  >
                    <div
                      v-if="isImage(file.url)"
                      class="gallery-item"
                      @click="zoomImage(file.blob)"
                    >
                      <img class="img-fluid w-full" :src="file.blob" />
                    </div>
                    <div v-else class="gallery-item ticket-file">
                      <a @click="getTicketFile(file, true)" class="btn">
                        <span>{{ extenionFileUrl(file) }}</span>
                        <span class="icon md-download"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" id="ticket-bottom">
          <div class="card-block">
            <template v-if="isHideReply">
              <div
                id="form-reply-ticket"
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('message') },
                  { 'has-danger': errors.has('message') },
                ]"
              >
                <textarea
                  class="form-control"
                  rows="5"
                  placeholder="Nội dung"
                  v-model="form.message"
                  v-validate="'required'"
                  name="message"
                  data-vv-as="Nội dung"
                ></textarea>
                <span class="invalid-feedback" v-if="errors.has('message')">{{
                  errors.first('message')
                }}</span>
              </div>

              <div
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('file') },
                  { 'has-danger': errors.has('file') },
                ]"
              >
                <ul
                  class="list-group list-group-full ticket-attach-list"
                  v-if="files && files.length"
                >
                  <li
                    class="list-group-item"
                    v-for="(item, i) in files"
                    :key="i"
                  >
                    <span
                      class="float-right"
                      @click.prevent="showDeleteConfirmation(item.uid)"
                    >
                      <i class="icon md-close"></i>
                    </span>
                    {{ item.name }}
                  </li>
                </ul>
                <upload
                  class="ticket-uploader"
                  :action="uploadFileEndpoint"
                  :accept="'.png,.jpg,.csv,.xlsx,.xls'"
                  drag
                  multiple
                  list-type="picture"
                  :data="{ type: 'tickets' }"
                  :headers="uploadHeaders"
                  :on-error="handleErrorFile"
                  :on-success="handleSuccess"
                  :max-file-size="4000000"
                >
                  <div class="el-upload__text">
                    <p-icon name="image" icon-pack="md"></p-icon>
                    Tải file đính kèm
                  </div>
                </upload>
                <p
                  >File đính kèm chỉ nhận định dạng PNG, JPEG, CSV, Excel và
                  không được vượt quá 5MB</p
                >
              </div>
              <p-button
                type="primary"
                @click="handlerPushMessage"
                :disable="isMessageSending"
              >
                <span>Trả lời</span>
              </p-button>
            </template>
            <template v-else>
              <p class="text-danger" v-if="this.isClosed"
                >Ticket đã được đóng, nếu sự cố của bạn chưa được giải quết, bạn
                có thể bấm button dưới để mở lại ticket.</p
              >
              <p-button
                id="btn-reopen"
                type="primary"
                @click="isHideReply = true"
              >
                <span>Mở lại ticket</span>
              </p-button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <modal-image :visible.sync="isZoomImage" :src="imageZoomImage" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinRoute from '@core/mixins/route'
import ModalImage from './components/ModalImage'
import mixinTicket from '../mixins/ticket'
import mixinUpload from '@/core/mixins/upload'
import Browser from '@core/helpers/browser'
import { cloneDeep } from '@core/utils'
export default {
  name: 'TicketView',
  mixins: [mixinRoute, mixinUpload, mixinTicket],
  components: { ModalImage },
  data() {
    return {
      isChange: false,
      isHideReply: true,
      isMessageSending: false,
      isFetching: false,
      imageZoomImage: '',
      isZoomImage: false,
      result: {},
      filter: {
        page: 1,
        limit: 50,
      },
      form: {
        ticket_id: 0,
        message: '',
        urls: [],
      },
      attach_files: [],
    }
  },
  computed: {
    ...mapState('auth', {
      auth: (state) => state.user,
    }),
    ...mapState('ticket', {
      ticket: (state) => state.ticket,
      messages: (state) => state.messages,
      count: (state) => state.count,
    }),
    createrName() {
      if (this.ticket.creater) {
        return this.ticket.creater.ful_name || this.ticket.creater.username
      }

      return 'Undefined'
    },

    ticketID() {
      return parseInt(this.$route.params.id, 10)
    },

    isClosed() {
      return this.ticket.status === 'closed'
    },
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
  },
  methods: {
    ...mapActions('ticket', [
      'fetchTicket',
      'fetchTicketFile',
      'fetchTicketMessages',
      'pushMessage',
      'closeTicket',
      'fetchTicketStatictis',
    ]),
    ...mapMutations(['updateTicketMessage']),
    async init() {
      await Promise.all([
        this.handlerFetchTicket(),
        this.handlerFetchTicketMessages(),
      ])

      if (this.ticket.status === 'closed') {
        this.isHideReply = false
      }
      if (this.ticket.attach_files) {
        this.$set(this, 'attach_files', cloneDeep(this.ticket.attach_files))
      }

      this.getTicketFiles()
    },
    async getTicketFile(url, isFile) {
      let result

      this.isFetching = true
      try {
        const payload = {
          url: url,
          type: 'tickets',
        }
        result = await this.fetchTicketFile(payload)

        if (!result.success) {
          this.$toast.open({ type: 'error', message: `Download failed ! ` })
          return false
        }
      } catch (e) {
        this.$toast.open({ type: 'error', message: `Download failed !` })
      }
      this.isFetching = false

      if (isFile) {
        Browser.downloadBlob(result.blob, url.split('/').pop())
      } else {
        return window.URL.createObjectURL(result.blob)
      }
    },
    getTicketFiles() {
      if (!this.attach_files.length) return false
      this.attach_files.forEach(async (el, i) => {
        if (this.isImage(el)) {
          let result = this.getTicketFile(el, false)
          result.then((response) => {
            this.$set(this.attach_files, i, {
              url: el,
              blob: response,
            })
          })
        }
      })
    },
    async handlerFetchTicket() {
      await this.fetchTicket(this.ticketID)
    },

    async handlerFetchTicketMessages() {
      this.isFetching = true
      await this.fetchTicketMessages(this.ticketID, this.filter)
      this.messages.forEach((el, index) => {
        let files = el.attach_files
        if (!files) {
          return
        }
        files.forEach((file, i) => {
          if (this.isImage(file)) {
            let result = this.getTicketFile(file, false)
            result.then(
              function(response) {
                this.messages[index].attach_files[i] = {
                  url: file,
                  blob: response,
                }
                this.$store.commit(
                  'ticket/updateTicketMessage',
                  cloneDeep(this.messages)
                )
              }.bind(this)
            )
          }
        })
      })
      this.isFetching = false
    },

    async handlerPushMessage() {
      this.form.urls = this.files.map((item) => item.url)
      const validate = await this.$validator.validateAll()
      if (!validate) {
        return
      }

      this.form.ticket_id = this.ticketID

      this.isMessageSending = true
      const result = await this.pushMessage(this.form)

      if (result && result.success) {
        this.handlerFetchTicketMessages()
        if (this.ticket.status === 'closed') {
          this.handlerFetchTicket()
          await this.fetchTicketStatictis()
        }
        this.clearFrom()
        this.$toast.open({
          type: 'success',
          message: 'Gửi tin thành công',
        })
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }
      this.isMessageSending = false
    },

    clearFrom() {
      this.files = []
      this.form = {
        ticket_id: 0,
        message: '',
        urls: [],
      }
    },

    zoomImage(src) {
      this.isZoomImage = true
      this.imageZoomImage = src
    },

    showDeleteConfirmation(item) {
      this.$dialog.confirm({
        title: `Xác nhận xóa file đính kèm?`,
        message: `Bạn có chắc chắn muốn xóa file đính kèm này?`,
        confirmText: 'Xóa',
        onConfirm: () => this.handleDeleteImage(item),
        type: 'danger',
      })
    },

    handlerForword(staff) {
      const idx = this.ticket.staffs.find((item) => item.staff_id == staff.id)
      if (idx) {
        this.$toast.open({
          type: 'warning',
          message: `Ticket đã được chuyển tiếp cho ${staff.full_name ||
            staff.username}`,
        })
        return
      }
      this.$dialog.confirm({
        title: `Chuyển tiếp ticket`,
        message: `Bạn muốn chuyển tiếp ticket cho ${staff.full_name ||
          staff.username}`,
        confirmText: 'Xác nhận',
        onConfirm: () => {
          this.handlerForward('', staff.id)
        },
        type: 'primary',
      })
    },
  },
}
</script>
