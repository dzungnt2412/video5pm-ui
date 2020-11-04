<template>
  <div class="page vertical-align text-center">
    <div class="page-content vertical-align-middle">
      <header>
        <h1 class="animation-slide-top">404</h1>
        <p>Page Not Found!</p>
      </header>
      <p class="error-advise">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
      <router-link to="/" class="btn btn-primary btn-round">
        Go to homepage
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
}
</script>
