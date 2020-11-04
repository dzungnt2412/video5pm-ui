<template>
  <div class="empty-search-result">
    <img
      class="empty-search-result__image"
      :src="notFoundImage"
      alt="Empty search results"
    />
    <p v-if="title" class="empty-search-result__title">{{ title }}</p>
    <p v-if="subtitle" class="empty-search-result__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'EmptySearchResult',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: 'Thay đổi bộ lọc hoặc cụm từ tìm kiếm',
    },
  },
  computed: {
    notFoundImage() {
      return require('@assets/img/notfound.svg')
    },
  },
}
</script>
