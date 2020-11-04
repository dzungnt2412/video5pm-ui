<template>
  <div class="page">
    <div class="page-content">
      <div class="row annotated-section d-flex justify-content-between">
        <div class="col-12 col-sm-3">
          <h3 class="annotated-section__title pt-0">Thông tin tài khoản</h3>
        </div>
        <div class="col-12 col-sm-8">
          <div class="panel">
            <div class="panel-body container-fluid">
              <div class="form-group">
                <label for="full-name">
                  Tên khách hàng
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('full_name') },
                    { 'is-invalid': errors.has('full_name') },
                  ]"
                  class="form-control"
                  id="full-name"
                  v-model="profile.full_name"
                  name="full_name"
                />
                <div class="invalid-feedback" v-if="errors.has('full_name')">
                  {{ errors.first('full_name') }}
                </div>
              </div>

              <div class="form-group">
                <label for="phone-number">
                  Số điện thoại
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('phone_number') },
                    { 'is-invalid': errors.has('phone_number') },
                  ]"
                  class="form-control"
                  id="phone-number"
                  v-model="profile.phone_number"
                  name="phone_number"
                />
                <div class="invalid-feedback" v-if="errors.has('phone_number')">
                  {{ errors.first('phone_number') }}
                </div>
              </div>

              <div class="form-group">
                <label for="facebook">
                  Facebook
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('facebook') },
                    { 'is-invalid': errors.has('facebook') },
                  ]"
                  class="form-control"
                  id="facebook"
                  v-model="profile.facebook"
                  name="facebook"
                />
                <span class="invalid-feedback" v-if="errors.has('facebook')">
                  {{ errors.first('facebook') }}
                </span>
              </div>

              <p-button
                @click="handleChangeProfile"
                :loading="isChanging"
                :disabled="isChanging"
              >
                Sửa thông tin
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
import { CHANGE_PASSWORD, CHANGE_PROFILE, FETCH_PROFILE } from '../store'

export default {
  name: 'ChangeProfile',
  computed: {
    ...mapState('user', {
      current: (state) => state.current,
    }),
  },
  data() {
    return {
      profile: {
        full_name: '',
        phone_number: '',
        facebook: '',
      },
      password: {
        current_password: '',
        new_password: '',
        confirm_password: '',
      },
      isChanging: false,
      isProfileFetching: false,
      resultProfileFetch: {},
    }
  },
  mounted() {
    this.handleFetchShop()
  },
  methods: {
    ...mapActions('user', [FETCH_PROFILE, CHANGE_PROFILE, CHANGE_PASSWORD]),

    async handleFetchShop() {
      this.isProfileFetching = true
      this.resultProfileFetch = await this.fetchProfile()

      if (this.resultProfileFetch.success) {
        this.profile = { ...this.current }
      }

      this.isProfileFetching = false
    },

    async handleChangeProfile() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.isChanging = true
      const result = await this.changeProfile(this.profile)

      if (result.success) {
        this.profile = { ...this.current }
        this.$validator.reset()
        this.$toast.open({
          type: 'success',
          message: 'Sửa đổi thông tin thành công',
        })
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }

      this.isChanging = false
    },
  },
}
</script>
