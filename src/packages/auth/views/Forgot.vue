<template>
  <div class="page vertical-align text-center">
    <div class="forgotForm">
      <div class="contest">
        <h2 class="tittle brand-text font-size-24 font-weight-bold"
          >Forgot your password</h2
        >
        <div class="text">
          <p class="text_tutorial font-size-14"
            >Don't worry! Enter the email address you used when you joined and
            we’ll send you instructions to reset your password.</p
          >
        </div>
        <form class="form-material">
          <label class="floating-label font-weight-bold font-size-14 "
            >Email</label
          >
          <input class="form-control" name="email" />
          <button class="reset font-size-16 text-white">Reset Password</button>
          <p>
            <router-link
              class="backSignin font-size-14 font-weight-600"
              :to="{ name: 'sign-in' }"
            >
              Back to Sign in
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.forgotForm {
  width: 100%;
  height: 321px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  width: 100%;
  height: 44px;
}
.forgotForm {
}
.text p {
  width: 100%;
  height: 100%;
  line-height: 160%;
  margin-bottom: 40px;
}
.floating-label {
  margin-bottom: 4px;
}
.reset {
  margin: 20px 0 20px 0;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #0554f2;
  outline: none;
  border: none;
  box-shadow: 0px 10px 20px -10px rgba(5, 84, 242, 0.4);
  line-height: 120%;
  font-weight: bold;
}
.backSignin {
  margin: 0 !important;
  text-decoration: #0554f2 underline;
  color: #37393e;
  line-height: 160%;
}
</style>
