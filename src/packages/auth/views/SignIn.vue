<template>
  <div class="page vertical-align ">
    <div class="vertical-align-middle">
      <div class="mb-40">
        <h2 class="header-2">
          Sign in to Lionnix
        </h2>
        <span class="brand-text-little"
          >Best quality. Lowest base cost. The most optimal system.</span
        >
      </div>
      <div>
        <form @submit.prevent="onSignIn">
          <div class="mb-16">
            <label class=" font-weight-bold">Email or username</label>
            <p-input
              placeholder="you@example.com"
              v-model="email"
              @keyup.enter="onSignIn"
              :required="requiredEmail"
            />
          </div>
          <div class="mb-16">
            <div class="label">
              <label class=" font-weight-bold">Password</label>

              <span class="font-size-12 redirect" @click="redirect()">
                Forgot your password?
              </span>
            </div>
            <p-input
              placeholder="Password"
              type="password"
              hiddenPass="on"
              v-model="password"
              :required="requiredPassword"
              @keyup.enter="onSignIn"
            />
          </div>
          <div class="captcha mt-40" v-if="count >= 1">
            <vue-recaptcha
              ref="recapcha"
              @verify="onVerify"
              :sitekey="`${recapchaKey}`"
              :loadRecaptchaScript="true"
            >
            </vue-recaptcha>
            <span class="invalid-error" v-if="check == false">
              Please check the captcha
            </span>
          </div>
          <p-button
            class="mt-40 btn btn-special btn-primary"
            :loading="isLoading"
            @click="onSignIn"
          >
            Sign in
          </p-button>
        </form>
      </div>

      <p class="text-center ">
        New to Lionnix?
        <router-link class=" creatAcount" :to="{ name: 'sign-up' }"
          >Create an Account</router-link
        >
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

import { SHOW_NOTIFICATION_MESSAGE } from '@/packages/shared/store'
import Storage from '@core/helpers/storage'
export default {
  components: { VueRecaptcha },
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      result: { success: false, message: '' },
      form: {
        checkCaptcha: false,
      },
      count: 0,
      status: false,
      requiredPassword: false,
      requiredEmail: false,
      check: true,
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user,
    }),
    recapchaKey() {
      return `${process.env.VUE_APP_RECAPCHA_KEY}`
    },
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    ...mapMutations('shared', [SHOW_NOTIFICATION_MESSAGE]),

    redirect() {
      return this.$router.push('/forgot')
    },

    checkRequired() {
      let result = true
      if (this.password == '') {
        this.requiredPassword = true
        result = false
      } else {
        this.requiredPassword = false
      }

      if (this.email == '') {
        this.requiredEmail = true
        result = false
      } else {
        this.requiredEmail = false
      }

      return result
    },

    pushNoti() {
      this.showNotificationMessage('This is message')
    },

    async onSignIn() {
      if (!this.checkRequired()) {
        return
      }

      const data = {
        password: this.password,
      }

      if (this.email.includes('@')) {
        data.email = this.email.trim()
      } else {
        data.username = this.email.trim()
      }

      if (!data.email && !data.username) {
        this.$toast.open({
          type: 'error',
          message: 'Username/Email required',
        })
        return
      }

      if (!data.password) {
        this.$toast.open({
          type: 'error',
          message: 'Password required',
        })
        return
      }
      if (this.count >= 1 && !this.form.checkCaptcha) {
        this.check = false
        return
      }
      this.isLoading = true
      this.result = await this.signIn(data)
      setTimeout(() => {
        this.isLoading = false
      }, 2000)

      if (this.result.number_incorrect >= 3) {
        this.count += 1
      }

      if (this.result.success) {
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } else {
        if (this.result.userInActive) {
          Storage.set('userEmail', this.currentUser.email)
          console.log(this.currentUser)
          setTimeout(() => {
            this.$router.push('/verify-email')
          }, 2000)
          this.$toast.open({
            type: 'error',
            message: this.result.message,
          })
          return
        }
        if (this.$refs.recapcha) {
          this.$refs.recapcha.reset()
          this.form.checkCaptcha = false
        }

        this.$toast.open({
          type: 'error',
          message: this.result.message,
        })
      }
    },
    onVerify: function(response) {
      if (response) this.form.checkCaptcha = true
      this.check = true
    },
  },
}
</script>
