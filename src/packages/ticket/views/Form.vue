<template>
  <div class="ticket-page page">
    <div class="page-header">
      <h4 class="page-title">Tạo mới Ticket</h4>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-block">
              <div
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('category') },
                  { 'has-danger': errors.has('category') },
                ]"
              >
                <label for="">Chọn danh mục:</label>
                <p-select
                  class="floating"
                  v-model="form.category"
                  v-validate="'required'"
                  name="category"
                  data-vv-as="Danh mục"
                >
                  <option value>Chọn danh mục</option>
                  <option
                    v-for="(text, key) in categories"
                    :key="key"
                    :value="text"
                    >{{ text }}</option
                  >
                </p-select>
                <span class="invalid-feedback" v-if="errors.has('category')">{{
                  errors.first('category')
                }}</span>
              </div>
              <div
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('object_id') },
                  { 'has-danger': errors.has('object_id') },
                ]"
              >
                <div class="row">
                  <div class="col-6">
                    <label for="">Chọn shop:</label>
                    <p-select
                      class="floating"
                      v-model="shopId"
                      name="shop"
                      data-vv-as="Shop"
                    >
                      <option value="0">-- Chọn một shop --</option>
                      <option
                        v-for="item in shops"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }} - {{ item.domain }}</option
                      >
                    </p-select>
                  </div>
                  <div class="col-6">
                    <label for="">Chọn mã đơn hàng:</label>
                    <multiselect
                      class="multiselect-custom is-fullwidth"
                      v-model="selected"
                      data-vv-as="Đơn hàng"
                      v-validate="'required'"
                      name="object_id"
                      :options="items"
                      placeholder="Chọn đơn hàng"
                      :loading="isLoading"
                      :limit="limit"
                      :custom-label="customLabel"
                      @search-change="handleSearchOrders"
                      @select="handleSelect"
                      @remove="handleRemove"
                    ></multiselect>
                  </div>
                </div>
                <span class="invalid-feedback" v-if="errors.has('object_id')">{{
                  errors.first('object_id')
                }}</span>
              </div>

              <div
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('subject') },
                  { 'has-danger': errors.has('subject') },
                ]"
              >
                <label for="">Tiêu đề:</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tiêu đề  "
                  v-model="form.subject"
                  v-validate="'required'"
                  name="subject"
                  data-vv-as="Tiêu đề"
                />
                <span class="invalid-feedback" v-if="errors.has('subject')">
                  {{ errors.first('subject') }}
                </span>
              </div>

              <div
                class="form-group floating"
                :class="[
                  { 'has-success': !errors.has('content') },
                  { 'has-danger': errors.has('content') },
                ]"
              >
                <label for="">Nội dung:</label>
                <textarea
                  class="form-control"
                  rows="5"
                  placeholder="Nội dung"
                  v-model="form.content"
                  v-validate="'required'"
                  name="content"
                  data-vv-as="Nội dung"
                ></textarea>
                <span class="invalid-feedback" v-if="errors.has('content')">
                  {{ errors.first('content') }}
                </span>
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
                    <p-icon name="attachment-alt" icon-pack="md"></p-icon>
                    Tải file đính kèm
                  </div>
                </upload>
                <p
                  >File đính kèm chỉ hỗ trợ định dạng PNG, JPEG, CSV, XLSX và
                  không vượt quá 5MB</p
                >
              </div>

              <p-button
                type="primary"
                @click="handlerCreateTicket"
                :disable="isSubmiting"
              >
                <span>Mở ticket</span>
              </p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinRoute from '@core/mixins/route'
import debounce from 'lodash/debounce'
import mixinUpload from '@/core/mixins/upload'
import mixinTicket from '../mixins/ticket'

export default {
  name: 'TicketForm',
  mixins: [mixinRoute, mixinUpload, mixinTicket],
  data() {
    return {
      isChange: false,
      selected: '',
      isSubmiting: false,
      isLoading: false,
      limit: 10,
      shopId: 0,
      result: {},
      form: {
        subject: '',
        content: '',
        category: '',
        object_id: 0,
        urls: [],
      },
    }
  },
  mounted() {
    this.fetchCategories()
    if (!this.orders || !this.orders.length) {
      this.handleSearchOrders()
    }
  },
  computed: {
    ...mapState('container', {
      orders: (state) => state.orders,
    }),
    ...mapState('ticket', {
      categories: (state) => state.categories,
    }),

    ...mapState('shop', {
      shops: (state) => state.shops,
    }),

    items() {
      const items = this.orders.map((item) => {
        return {
          id: item.id,
          text: item.ref_id,
        }
      })
      return items
    },
    isClosed() {
      return this.ticket.status === 'closed'
    },
  },
  methods: {
    ...mapActions('ticket', ['createTicket', 'fetchCategories']),
    ...mapActions('container', ['fetchOrders']),

    handleSearchOrders: debounce(async function(search = '') {
      if (this.shopId < 1) {
        return
      }

      this.isLoading = true
      const result = await this.fetchOrders({
        limit: this.limit,
        search: search,
        shop_id: this.shopId,
      })
      this.isLoading = false

      if (result && result.success) {
        return
      }

      this.$toast.open({ type: 'error', message: result.message })
    }, 500),

    async handlerCreateTicket() {
      this.form.urls = this.files.map((item) => item.url)
      const validate = await this.$validator.validateAll()
      if (!validate) {
        return
      }

      const result = await this.createTicket(this.form)

      if (result.success) {
        this.clearFrom()
        this.$router.push({ name: 'ticket-view', params: { id: result.id } })
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },

    customLabel({ text }) {
      return typeof text !== 'undefined' ? `${text}` : ''
    },

    handleSelect(item) {
      this.form.object_id = item && item.id ? item.id : 0
    },

    handleRemove() {
      this.form.object_id = 0
    },

    clearFrom() {
      this.files = []
      this.form = {
        subject: '',
        content: '',
        category: '',
        object_id: 0,
        urls: null,
      }
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
  },
  watch: {
    shopId: function() {
      this.handleSearchOrders()
    },
  },
}
</script>
