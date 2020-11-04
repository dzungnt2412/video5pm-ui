<template>
  <img
    :src="image"
    :data-src="src"
    :class="className"
    v-if="image"
    alt="Thumbnail"
    @error="handleImageError"
    v-bind="$attrs"
  />
</template>

<script>
import api from '@/packages/design/api'
export default {
  name: 'Thumbnail',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  computed: {
    thumbnail() {
      if (this.src) {
        return this.getThumbnailUrl(this.src)
      }

      return this.src
    },
  },
  data() {
    return {
      className: '',
      image: '',
      callAPi: false,
    }
  },
  methods: {
    handleImageError() {
      if (this.image === this.src) {
        return
      }

      const thumbnailDefault = `${process.env.VUE_APP_ASSETS}/thumbnail.png`

      if (this.callAPi) {
        this.image = thumbnailDefault
        return
      }

      this.image = `${process.env.VUE_APP_ASSETS}/image-processing.gif`
      this.className = 'miss-thumbnail'

      if (this.src.startsWith('blob')) {
        return
      }

      api
        .missingThumbnail(this.src)
        .then((response) => {
          this.className = ''
          this.callAPi = true
          if (response && response.success) {
            if (response.url.length) {
              this.image = response.url
            }
            this.image = thumbnailDefault
          }
          this.showNotify()
        })
        .catch(this.showNotify)
    },

    showNotify() {
      console.log('Miss thumbnail')
    },

    getThumbnailUrl(src) {
      return `${process.env.VUE_APP_BASE_IMAGE_URL}/${src}`
    },
  },
  watch: {
    src: {
      handler(val) {
        if (val) {
          this.image = this.thumbnail
        }
      },
      immediate: true,
    },
  },
}
</script>
