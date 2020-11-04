<template>
  <PageDetailLoading v-if="isFetching"></PageDetailLoading>
  <div class="page" v-else>
    <div class="page-header pb-0">
      <div class="row">
        <div class="col-12">
          <p-button icon="chevron-left" class="btn-pure pl-0">
            <router-link :to="{ name: 'design-list' }">Designs</router-link>
          </p-button>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12  d-flex align-items-center justify-content-between mb-20"
        >
          <h4>
            Update Design
            <span v-if="design && !isChangeSku">
              : {{ design.sku }}
              <a href="#" @click="isChangeSku = !isChangeSku"
                ><p-icon name="edit" iconPack="md"></p-icon
              ></a>
            </span>
            <div style="display: inline-block;">
              <div
                v-if="design && isChangeSku"
                class="input-group input-group-sm"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="design.sku"
                  v-validate="'required|min:3'"
                />
                <div class="input-group-btn">
                  <p-button
                    :type="'primary'"
                    :disabled="isSaving"
                    :loading="isSaving || isLoading"
                    :size="'sm'"
                    @click="handlerChangeSku"
                    >Ok</p-button
                  >
                  <button
                    class="btn btn-sm btn-danger"
                    @click="handlerCancelChangeSku"
                    :loading="isLoading"
                    >Cancel</button
                  >
                </div>
              </div>
            </div>
          </h4>
          <div class="page-header-group-actions__left">
            <p-button
              :type="'primary'"
              class="ml-10"
              v-if="design.status == 1 || isChange"
              @click.prevent="handleCreateZipDesign"
            >
              Lựu lại
            </p-button>
            <p-button
              :type="'danger'"
              class="ml-10"
              @click.prevent="showConfirmDeleteDesign"
            >
              Xóa
            </p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="card">
            <div class="card-block">
              <div class="card-title">
                <h4>
                  Design Files
                </h4>
              </div>
              <div v-if="isFetching" class="text-center mb-50 mt-50">
                <div class="loader vertical-align-middle loader-circle"></div>
              </div>
              <div
                class="gallery row"
                v-else-if="designFiles && designFiles.length"
              >
                <div
                  class="col-6 col-sm-4"
                  v-for="(item, i) in designFiles"
                  :key="i"
                >
                  <div class="gallery-item">
                    <thumbnail :src="item.url" />
                    <template v-if="!item.is_edit">
                      <div class="gallery-item__actions">
                        <a
                          href="#"
                          @click.prevent="handleDownloadFile(item.id)"
                          class="ml-5"
                        >
                          <p-icon name="download" icon-pack="md"></p-icon>
                        </a>
                        <a
                          href="#"
                          @click.prevent="showDeleteConfirmation(item)"
                          class="ml-5"
                        >
                          <p-icon
                            name="close"
                            icon-pack="md"
                            @click.prevent="showDeleteConfirmation(item)"
                          ></p-icon>
                        </a>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="text-center mt-40 mb-40" v-else>
                <svg
                  width="192"
                  height="135"
                  viewBox="0 0 192 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none">
                    <path
                      fill="#E9EBED"
                      d="M138.049 43.407L95.873 33.248v79.494l42.176-11.04z"
                    ></path>
                    <path
                      fill="#DFE0E2"
                      d="M53.696 43.407l42.177-10.159v79.494l-42.177-10.82z"
                    ></path>
                    <path
                      fill="#F5F6F7"
                      d="M95.52 33.6l22.214-18.459 42.174 10.822-22.211 17.794z"
                    ></path>
                    <path
                      fill="#E0E0E0"
                      d="M32.408 26.534l21.64 17.223 42.175-10.156-21.418-18.107z"
                    ></path>
                    <path
                      fill="#EEF0F1"
                      d="M32.058 26.184l22.166 17.573L96.4 33.601 74.453 15.14z"
                    ></path>
                    <path
                      fill="#E9EBED"
                      d="M53.696 43.407v58.516l42.177 10.819.569-58.074z"
                    ></path>
                    <path
                      fill="#DFE0E2"
                      d="M138.049 101.702l-42.176 11.04V54.668l42.176-11.261z"
                    ></path>
                    <path
                      fill="#000"
                      opacity=".06"
                      d="M121.266 82.269v19.212l16.783-4.639v-19.21z"
                    ></path>
                    <path
                      fill="#000"
                      opacity=".04"
                      d="M53.145 73.769l23.627 5.962 18.991-15.458v-9.495L53.587 44.179z"
                    ></path>
                    <path
                      fill="#000"
                      opacity=".04"
                      d="M138.38 73.769l-23.628 5.962-18.989-15.458v-9.495l42.174-10.599z"
                    ></path>
                    <path
                      fill="#F5F6F7"
                      d="M53.696 43.407L32.058 61.293l42.174 10.598 21.64-17.223z"
                    ></path>
                    <path
                      fill="#E0E0E0"
                      d="M138.049 43.407l21.86 17.886-41.956 10.598-22.08-17.223z"
                    ></path>
                    <path
                      fill="#EEF0F1"
                      d="M138.049 43.407l21.86 17.886-41.956 10.598-22.08-17.223z"
                    ></path>
                  </g>
                </svg>
                <p>
                  No design files have been uploaded yet
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <section class="card">
            <div class="card-block">
              <div class="card-title">
                <h4>
                  Upload
                </h4>
              </div>

              <upload
                class="design-uploader"
                :action="createEndpoint(`designs/${$route.params.id}/files`)"
                drag
                multiple
                list-type="picture"
                :headers="uploadHeaders"
                :on-change="handleChangeFile"
                :on-success="handleSuccess"
                :max-file-size="100000000"
                :before-upload="beforeUpload"
              >
                <p-icon
                  name="cloud-upload"
                  icon-pack="md"
                  class="el-icon-upload"
                ></p-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
              </upload>
              <div class="el-upload__tip"
                >jpg/png files with a size less than 100mb</div
              >
              <div class="gallery-list">
                <div
                  class="gallery-list__item"
                  v-for="(item, i) in validFiles"
                  :key="i"
                >
                  <div class="gallery-list__item-top">
                    <div class="gallery-list__item-group">
                      <div class="gallery-list__item-group--thumbnail">
                        <img :src="item.url" alt="Preview" v-if="item.url" />
                        <p-icon v-else name="image" icon-pack="md"></p-icon>
                      </div>
                      <p>{{ item.name }}</p>
                    </div>
                    <div
                      class="gallery-list__item-label"
                      v-if="item.status === 'fail'"
                    >
                      <span>Error</span>
                    </div>
                  </div>

                  <div
                    class="gallery-list__item-bottom"
                    v-if="item.percentage && item.status !== 'fail'"
                  >
                    <p-progress
                      :value="item.percentage"
                      show-value
                      format="percent"
                      type="primary"
                    ></p-progress>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            class="card"
            v-if="userInformation && userInformation.length"
          >
            <div class="card-block">
              <div class="card-title">
                <h4>
                  User information
                </h4>
              </div>
              <p class="card-text">
                <span v-for="(item, i) in userInformation" :key="i">
                  {{ item }}
                  <br />
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>

    <modal-create-design
      :visible.sync="isVisibleCreateDesign"
      :create-design="createDesign"
      v-if="isVisibleCreateDesign"
      @created="handleCreateDesignDesign"
    />
  </div>
</template>
<script>
/*eslint-disable*/
import { mapActions, mapState } from 'vuex'
import mixinUpload from '@/core/mixins/upload'
import Thumbnail from '@components/shared/Thumbnail'
import mixinCreateDesign from '../mixins/create-design'
import { Upload } from '@kit'
import { MAX_DESIGN_FILE } from '@core/constants'
import {
  CREATE_DESIGN,
  FETCH_DESIGN,
  FETCH_DESIGNS,
  UPDATE_DESIGN,
  DELETE_DESIGN,
  UPDATE_DESIGN_SKU,
  DELETE_DESIGN_FILES,
  DOWNLOAD_DESIGN,
} from '../store'
import ModalCreateDesign from './components/ModalCreateDesign'
import { cloneDeep } from '@core/utils'
import Browser from '@core/helpers/browser'
import designApi from '../api'
import ProductTypeResource from '@/components/shared/resource/ProductType'
import AuthService from '@core/services/auth'

export default {
  name: 'DesignForm',
  mixins: [mixinUpload, mixinCreateDesign],
  components: { Thumbnail, Upload, ModalCreateDesign, ProductTypeResource },
  computed: {
    ...mapState('design', {
      currentDesign: (state) => state.design,
      currentDesignFiles: (state) => state.design.design_files,
    }),
    ...mapState('shared', {
      productBases: (state) => state.productBases,
    }),
    validFiles() {
      return this.files.filter(
        ({ uid }) => this.uploadedIds.indexOf(uid) === -1
      )
    },
    userInformation() {
      if (this.design && this.design.user) {
        return [
          this.design.user.full_name,
          this.design.user.username,
          this.design.user.email,
          this.design.user.phone,
        ].filter(Boolean)
      }
      return []
    },
  },
  data() {
    return {
      design: {
        sku: '',
        files: [],
      },
      productNames: {},
      files: [],
      preview: [],
      isFetching: false,
      isSaving: false,
      isChange: false,
      uploadReady: true,
      uploadedIds: [],
      isChangeSku: false,
      changeProductIds: [],
      designFiles: [],
      isLoading: false,
      showBtnSave: false,
      disableUpload: false,
    }
  },
  mounted() {
    this.handleBeforeLeave()
  },
  methods: {
    ...mapActions('design', [
      FETCH_DESIGN,
      UPDATE_DESIGN,
      DELETE_DESIGN,
      UPDATE_DESIGN_SKU,
      DELETE_DESIGN_FILES,
      DOWNLOAD_DESIGN,
    ]),
    async init() {
      this.isFetching = true
      if (this.$route.params.id) {
        await this.getDesign()
      }
      this.isFetching = false
    },
    async getDesign() {
      const id = parseInt(this.$route.params.id, 10)
      const result = await this.fetchDesign(id)
      this.isChange = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.design = cloneDeep(this.currentDesign)
      this.designFiles = cloneDeep(this.currentDesign.design_files)
      if (this.designFiles.length) {
        this.showBtnSave = true
      }
    },

    async handleSave() {
      this.isSaving = true

      const payload = {
        id: this.design.id,
        body: {
          design_files: this.changeProductIds,
        },
      }

      const result = await this.updateDesign(payload)
      this.isSaving = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.$toast.open({ type: 'success', message: 'Update design successful' })
      this.isChange = false
      this.init()
    },

    handleDiscard() {},

    beforeUpload() {
      if (this.designFiles.length >= MAX_DESIGN_FILE) {
        this.$toast.open({
          type: 'error',
          message: `Design can not upload more than ${MAX_DESIGN_FILE} file`,
        })
        this.disableUpload = true
        return false
      }

      this.isChange = true
      return true
    },
    handleChangeFile(file) {
      if (this.disableUpload) {
        return
      }

      const index = this.files.findIndex(({ uid }) => uid === file.uid)
      if (index === -1) {
        this.files.push(file)
      } else {
        this.$set(this.files, index, file)
      }
    },

    handleSuccess(val, file) {
      if (val && typeof val.design_file !== 'undefined') {
        this.designFiles.push(val.design_file)
      }
      this.showBtnSave = true
    },

    showDeleteConfirmation(item) {
      this.$dialog.confirm({
        title: `Remove design file?`,
        message: `Are you sure you want to remove this design file?`,
        confirmText: 'Remove',
        onConfirm: () => this.handleDelete(item),
        type: 'danger',
      })
    },

    async handleDelete(item) {
      this.isSaving = true

      const payload = {
        id: item.id,
        design_id: item.design_id,
      }
      const result = await this.deleteDesignFile(payload)
      this.isSaving = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.isChange = true
      this.$toast.open({
        type: 'success',
        message: 'Delete design file successful',
      })
      this.designFiles = this.designFiles.filter((x) => x !== item)
      if (this.designFiles.length === 0) {
        this.showBtnSave = false
      }
    },

    handleBeforeLeave() {
      window.onbeforeunload = function() {
        if (this.isChange) {
          return 'If you leave this page, all unsaved changes will be lost. Are you sure you want to leave this page?'
        }

        return null
      }.bind(this)
    },

    async handlerChangeSku() {
      this.isSaving = true
      const payload = {
        id: this.design.id,
        sku: this.design.sku,
      }
      const result = await this.updateDesignSku(payload)
      this.isSaving = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.isChangeSku = false
      this.$toast.open({
        type: 'success',
        message: 'Update design sku successful',
      })
    },

    async handleDownloadFile(id) {
      this.isLoading = true
      const url = `${
        process.env.VUE_APP_BASE_API_ENDPOINT
      }/designs/files/${id}/download?access_token=${AuthService.getAccessToken()}`
      window.open(url, '_self')
      this.isLoading = false
    },

    async handleCreateZipDesign() {
      this.isSaving = true
      const payload = {
        id: this.design.id,
        sku: this.design.sku,
      }
      const result = await this.updateDesignSku(payload)
      this.isSaving = false
      this.isChange = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: 'Update design failed !' })
        return
      }

      this.$toast.open({ type: 'success', message: 'Update design success !' })
      this.isChangeSku = false
      this.init()
    },

    async handlerDeleteDesign() {
      if (this.design.design_files && this.design.design_files.length > 0) {
        this.$toast.open({
          type: 'error',
          message: 'Cant delete design contains the file',
        })
        return
      }

      this.isSaving = true
      const payload = {
        id: this.design.id,
      }

      const result = await this.deleteDesign(payload)
      this.isSaving = false

      if (result.success) {
        this.$toast.open('Delete design successful')
        this.$router.push({ name: 'design-list' })
        return
      }

      this.$toast.open({ type: 'error', message: result.message })
    },

    showConfirmDeleteDesign() {
      this.$dialog.confirm({
        title: `Delete design?`,
        message: `Are you sure you want to delete this design?`,
        confirmText: 'Delete',
        onConfirm: () => this.handlerDeleteDesign(),
        type: 'danger',
      })
    },

    handlerCancelChangeSku() {
      this.isChangeSku = false
      this.design.sku = this.currentDesign.sku
    },
  },
  watch: {
    '$route.params.id': {
      handler: function() {
        this.init()
      },
      immediate: true,
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isChange) {
      if (
        !window.confirm(
          'If you leave this page, all unsaved changes will be lost. Are you sure you want to leave this page?'
        )
      ) {
        return
      }
    }

    next()
  },
}
</script>
<style scoped>
.gallery-item__label {
  top: 10px;
  left: 10px;
  color: #ffff;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  opacity: 1;
}
.mutiple-search {
  z-index: 4;
  position: absolute;
  top: 0;
}
.multiselect.multiselect-custom {
  width: 100%;
}
</style>
<style>
.multiselect__tags {
  border-radius: 0 !important;
}
</style>
