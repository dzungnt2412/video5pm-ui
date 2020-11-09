<template>
  <div class="page vertical-align ">
    <div class="vertical-align-middle mt-80">
      <div class="">
        <div class="brand contest">
          <h2 class="brand-text font-size-24 font-weight-bold">
            Sign in to Lionnix
          </h2>
          <span class="brand-text-little font-size-14 font-weight-400 "
            >Best quality. Lowest base cost. The most optimal system.</span
          >
        </div>
        <form @submit.prevent="onSignIn">
          <div class="qinput">
            <label class=" font-weight-bold">Email or username</label>
            <p-input placeholder="you@example.com" v-model="email" />
          </div>
          <div>
            <label class=" font-weight-bold">Password</label>
            <p-input
              placeholder="Password"
              prefixIcon="search"
              type="password"
              v-model="password"
            />
          </div>
          <button class="mt-40 btn btn-special btn-primary">
            Sign in
          </button>
        </form>
        <div class="captcha mb-20">
          <vue-recaptcha
            sitekey="6Ld8Gt0ZAAAAAEjG7RBzGB-dmL5nQ8plAt1YvHpm"
            :loadRecaptchaScript="true"
          >
          </vue-recaptcha>
        </div>
        <p class="text-center font-weight-400 font-size-14">
          New to Lionnix?
          <router-link
            class="font-weight-600 creatAcount"
            :to="{ name: 'sign-up' }"
            >Create an Account</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

import { SHOW_NOTIFICATION_MESSAGE } from '@/packages/shared/store'
export default {
  components: { VueRecaptcha },
  name: 'SignIn',
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      result: { success: false, message: '' },
    }
  },
  computed: {
    ...mapState('shared', {
      notificationMessage: (state) => state.notificationMessage,
    }),
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    ...mapMutations('shared', [SHOW_NOTIFICATION_MESSAGE]),

    pushNoti() {
      this.showNotificationMessage('This is message')
    },

    async onSignIn() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.isLoading = true

      const data = {
        password: this.password,
      }

      if (this.email.includes('@')) {
        data.email = this.email
      } else {
        data.username = this.email
      }

      this.result = await this.signIn(data)
      setTimeout(() => {
        this.isLoading = false
      }, 2000)

      if (this.result.success) {
        if (this.result.permission) {
          return this.$router.push('/')
        }
        return this.$toast.open({
          type: 'error',
          message: 'You are not allowed to do this action !',
        })
      } else {
        this.$toast.open({ type: 'error', message: this.result.message })
      }
    },
  },
}
</script>
