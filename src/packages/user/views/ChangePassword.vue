<template>
  <div class="page">
    <div class="page-content">
      <div class="row annotated-section d-flex justify-content-between my-20">
        <div class="col-12 col-sm-3">
          <h3 class="annotated-section__title">Đổi mật khẩu</h3>
        </div>
        <div class="col-12 col-sm-8">
          <div class="panel">
            <div class="panel-body container-fluid">
              <div class="form-group">
                <label for="current-password">
                  Mật khẩu hiện tại
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('current_password') },
                    { 'is-invalid': errors.has('current_password') },
                  ]"
                  class="form-control"
                  v-model="password.current_password"
                  v-validate="'required|min:6'"
                  data-vv-as="current password"
                  name="current_password"
                  type="password"
                />
                <div
                  class="invalid-feedback"
                  v-if="errors.has('current_password')"
                >
                  {{ errors.first('current_password') }}
                </div>
              </div>

              <div class="form-group">
                <label for="new-password">
                  Mật khẩu mới
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('new_password') },
                    { 'is-invalid': errors.has('new_password') },
                  ]"
                  class="form-control"
                  id="new-password"
                  v-model="password.new_password"
                  v-validate="'required|min:6'"
                  data-vv-as="new password"
                  name="new_password"
                  type="password"
                />
                <div class="invalid-feedback" v-if="errors.has('new_password')">
                  {{ errors.first('new_password') }}
                </div>
              </div>

              <div class="form-group">
                <label for="confirm-password">
                  Xác nhận lại mật khẩu
                </label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('confirm_password') },
                    { 'is-invalid': errors.has('confirm_password') },
                  ]"
                  class="form-control"
                  id="confirm-password"
                  v-model="password.confirm_password"
                  v-validate="'required|min:6'"
                  data-vv-as="confirm password"
                  name="confirm_password"
                  type="password"
                />
                <div
                  class="invalid-feedback"
                  v-if="errors.has('confirm_password')"
                >
                  {{ errors.first('confirm_password') }}
                </div>
              </div>

              <p-button
                @click="handleChangePassword"
                :loading="isChanging"
                :disabled="isChanging"
              >
                Đổi mật khẩu
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
import { CHANGE_PASSWORD } from '../store'

export default {
  name: 'ChangeProfile',
  computed: {
    ...mapState('user', {
      current: (state) => state.current,
    }),
  },
  data() {
    return {
      password: {
        current_password: '',
        new_password: '',
        confirm_password: '',
      },
      isChanging: false,
    }
  },
  methods: {
    ...mapActions('user', [CHANGE_PASSWORD]),

    async handleChangePassword() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.isChanging = true
      const result = await this.changePassword(this.password)

      if (result.success) {
        this.$set(this, 'password', {})
        this.$validator.reset()
        this.$toast.open({
          type: 'success',
          message: 'Đổi mật khẩu thành công',
        })
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }

      this.isChanging = false
    },
  },
}
</script>
