<template>
  <div class="page vertical-align">
    <div class="vertical-align-middle mt-80">
      <div class="header mb-40">
        <h3>
          <b>Sign up to Lionnix</b>
        </h3>
        <p>Best quality. Lowest base cost. The most optimal system.</p>
      </div>

      <div class="body mb-40">
        <p>
          <label class="font-weight-bold">Email</label>
          <p-input placeholder="you@example.com" type="email" />
        </p>
        <p>
          <label class="font-weight-bold">Username</label>
          <p-input placeholder="Username" type="username" />
        </p>
        <p>
          <label class="font-weight-bold">Password</label>
          <p-input
            placeholder="Enter password"
            prefixIcon="search"
            type="password"
          />
        </p>
      </div>

      <div class="captcha mb-20">
        <vue-recaptcha
          sitekey="6Ld8Gt0ZAAAAAEjG7RBzGB-dmL5nQ8plAt1YvHpm"
          :loadRecaptchaScript="true"
        >
        </vue-recaptcha>
      </div>

      <span class="font-size-12"
        >By creating an account, you agree to Lionnix's
        <a href="">Terms of Service</a>.</span
      >
      <button class="btn btn-special btn-primary mt-20 mb-20">
        Sign up
      </button>

      <p class="text-center">
        Already have an account?
        <router-link
          :to="{ name: 'sign-in' }"
          class="font-weight-600"
          style="color: #37393E;"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha },
  data() {
    return {
      user: {
        username: null,
        email: null,
        phone_number: null,
        password: null,
        user_referring_code: null,
      },
      isLoading: false,
      isShowSnackbar: false,
      result: { success: true, message: 'Some thing wrong' },
      timeout: null,
    }
  },
  created() {
    if (typeof this.$route.query['ref_code'] !== 'undefined') {
      this.user.user_referring_code = this.$route.query['ref_code']
    }
  },
  methods: {
    ...mapActions('auth', ['signUp']),

    async onSignUp() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.isLoading = true
      this.isShowSnackbar = false

      this.result = await this.signUp(this.user)

      if (this.result.success) {
        this.$toast.open({
          type: 'success',
          message:
            'Tài khoản của bạn đã được tạo thành công, vui lòng liên hệ bộ phận hỗ trợ để kích hoạt tài khoản',
          duration: 6000,
        })
        this.$router.push({ name: 'sign-in' })
        return
      }
      this.$toast.open({
        type: 'error',
        message:
          this.result.message + ' :</br>' + this.result.errors.join('</br>'),
        duration: 3000000,
      })

      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
  },
}
</script>
