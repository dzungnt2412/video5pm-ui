<template>
  <transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave"
  >
    <div
      v-show="isActive"
      class="p-toast"
      :class="[
        transformType ? `is-${transformType}` : '',
        position ? `is-${position}` : '',
      ]"
      :aria-hidden="!isActive"
      role="alert"
    >
      <div v-html="message"></div>
    </div>
  </transition>
</template>

<script>
import config from '../../config'
import { removeElement } from '../../utils/dom'

export default {
  name: 'PToast',
  props: {
    type: {
      type: String,
      default: 'dark',
    },
    message: String,
    duration: Number,
    queue: {
      type: Boolean,
      default: undefined,
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return (
          [
            'top-right',
            'top',
            'top-left',
            'bottom-right',
            'bottom',
            'bottom-left',
          ].indexOf(value) > -1
        )
      },
    },
    container: String,
  },
  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || config.defaultContainerElement,
      newDuration: this.duration || config.defaultToastDuration,
    }
  },
  computed: {
    correctParent() {
      switch (this.position) {
        case 'top-right':
        case 'top':
        case 'top-left':
          return this.parentTop

        case 'bottom-right':
        case 'bottom':
        case 'bottom-left':
          return this.parentBottom
      }

      return ''
    },
    transition() {
      switch (this.position) {
        case 'top-right':
        case 'top':
        case 'top-left':
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut',
          }
        case 'bottom-right':
        case 'bottom':
        case 'bottom-left':
          return {
            enter: 'fadeInUp',
            leave: 'fadeOut',
          }
      }

      return {}
    },
    transformType() {
      if (this.type === 'error') {
        return 'danger'
      }

      return this.type
    },
  },
  methods: {
    shouldQueue() {
      const queue =
        this.queue !== undefined ? this.queue : config.defaultNoticeQueue

      if (!queue) {
        return false
      }

      return (
        this.parentTop.childElementCount > 0 ||
        this.parentBottom.childElementCount > 0
      )
    },

    close() {
      clearTimeout(this.timer)
      this.isActive = false

      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.$destroy()
        removeElement(this.$el)
      }, 150)
    },

    showNotice() {
      if (this.shouldQueue()) {
        // Call recursively if should queue
        setTimeout(() => this.showNotice(), 250)
        return
      }

      this.correctParent.insertAdjacentElement('afterbegin', this.$el)
      this.isActive = true

      if (!this.indefinite) {
        this.timer = setTimeout(() => this.close(), this.newDuration)
      }
    },

    setupContainer() {
      this.parentTop = document.querySelector('.p-notices.is-top')
      this.parentBottom = document.querySelector('.p-notices.is-bottom')

      if (this.parentTop && this.parentBottom) {
        return
      }

      if (!this.parentTop) {
        this.parentTop = document.createElement('div')
        this.parentTop.className = 'p-notices is-top'
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div')
        this.parentBottom.className = 'p-notices is-bottom'
      }

      const container =
        document.querySelector(this.newContainer) || document.body

      container.appendChild(this.parentTop)
      container.appendChild(this.parentBottom)

      if (this.newContainer) {
        this.parentTop.classList.add('has-custom-container')
        this.parentBottom.classList.add('has-custom-container')
      }
    },
  },
  beforeMount() {
    this.setupContainer()
  },
  mounted() {
    this.showNotice()
  },
}
</script>
