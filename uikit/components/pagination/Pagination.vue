<template>
  <nav>
    <ul
      class="p-pagination pagination pagination-gap"
      :class="rootClasses"
      v-if="!simple"
    >
      <li class="page-item">
        <a
          role="button"
          href="#"
          class="page-link"
          :disabled="!hasPrev"
          @click.prevent="prev"
          :aria-label="ariaPreviousLabel"
        >
          <span aria-hidden="true">«</span>
        </a>
      </li>
      <!--First-->
      <li v-if="hasFirst" class="page-item">
        <a
          role="button"
          href="#"
          class="page-link"
          @click.prevent="first"
          :aria-label="getAriaPageLabel(1, false)"
        >
          1
        </a>
      </li>
      <li v-if="hasFirstEllipsis"
        ><span class="p-pagination-ellipsis">&hellip;</span></li
      >

      <!--Pages-->
      <li
        class="page-item"
        :class="{ active: page.isCurrent }"
        v-for="page in pagesInRange"
        :key="page.number"
      >
        <a
          role="button"
          href="#"
          class="page-link"
          @click.prevent="page.click"
          :aria-label="getAriaPageLabel(page.number, page.isCurrent)"
          :aria-current="page.isCurrent"
        >
          {{ page.number }}
        </a>
      </li>

      <!--Last-->
      <li v-if="hasLastEllipsis"
        ><span class="p-pagination-ellipsis">&hellip;</span></li
      >
      <li class="page-item" v-if="hasLast">
        <a
          role="button"
          href="#"
          class="page-link"
          @click.prevent="last"
          :aria-label="getAriaPageLabel(pageCount, false)"
        >
          {{ pageCount }}
        </a>
      </li>
      <li class="page-item">
        <a
          role="button"
          href="#"
          class="page-link"
          :disabled="!hasNext"
          @click.prevent="next"
          :aria-label="ariaNextLabel"
        >
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
    <small class="info" v-if="simple">
      <template v-if="perPage === 1"> {{ firstItem }} / {{ total }} </template>
      <template v-else>
        {{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
      </template>
    </small>
  </nav>
</template>

<script>
export default {
  name: 'PPagination',
  props: {
    total: [Number, String],
    perPage: {
      type: [Number, String],
      default: 20,
    },
    current: {
      type: [Number, String],
      default: 1,
    },
    size: String,
    simple: Boolean,
    rounded: Boolean,
    order: String,
    iconPack: String,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
  },
  computed: {
    rootClasses() {
      return [
        this.order,
        this.size ? `pagination-${this.size}` : '',
        {
          'is-simple': this.simple,
          'is-rounded': this.rounded,
        },
      ]
    },

    /**
     * Total page size (count).
     */
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    },

    /**
     * First item of the page (count).
     */
    firstItem() {
      const firstItem = this.current * this.perPage - this.perPage + 1
      return firstItem >= 0 ? firstItem : 0
    },

    /**
     * Check if previous button is available.
     */
    hasPrev() {
      return this.current > 1
    },

    /**
     * Check if first page button should be visible.
     */
    hasFirst() {
      return this.current >= 3
    },

    /**
     * Check if first ellipsis should be visible.
     */
    hasFirstEllipsis() {
      return this.current >= 5
    },

    /**
     * Check if last page button should be visible.
     */
    hasLast() {
      return this.current <= this.pageCount - 2
    },

    /**
     * Check if last ellipsis should be visible.
     */
    hasLastEllipsis() {
      return this.current < this.pageCount - 3
    },

    /**
     * Check if next button is available.
     */
    hasNext() {
      return this.current < this.pageCount
    },

    /**
     * Get near pages, 1 before and 1 after the current.
     * Also add the click event to the array.
     */
    pagesInRange() {
      if (this.simple) {
        return
      }

      let left = Math.max(1, this.current - 1)
      if (left - 1 === 2) {
        left-- // Do not show the ellipsis if there is only one to hide
      }
      let right = Math.min(this.current + 1, this.pageCount)
      if (this.pageCount - right === 2) {
        right++ // Do not show the ellipsis if there is only one to hide
      }

      const pages = []
      for (let i = left; i <= right; i++) {
        pages.push({
          number: i,
          isCurrent: this.current === i,
          click: (event) => {
            if (this.current === i) {
              return
            }

            this.$emit('change', i)
            this.$emit('update:current', i)

            // Set focus on element to keep tab order
            this.$nextTick(() => event.target.focus())
          },
        })
      }
      return pages
    },
  },
  watch: {
    /**
     * If current page is trying to be greater than page count, set to last.
     */
    pageCount(value) {
      if (this.current > value) {
        this.last()
      }
    },
  },
  methods: {
    /**
     * Previous button click listener.
     */
    prev() {
      if (!this.hasPrev) {
        return
      }

      this.$emit('change', this.current - 1)
      this.$emit('update:current', this.current - 1)
    },

    /**
     * First button click listener.
     */
    first() {
      this.$emit('change', 1)
      this.$emit('update:current', 1)
    },

    /**
     * Last button click listener.
     */
    last() {
      this.$emit('change', this.pageCount)
      this.$emit('update:current', this.pageCount)
    },

    /**
     * Next button click listener.
     */
    next() {
      if (!this.hasNext) {
        return
      }

      this.$emit('change', this.current + 1)
      this.$emit('update:current', this.current + 1)
    },

    /**
     * Get text for aria-label according to page number.
     */
    getAriaPageLabel(pageNumber, isCurrent) {
      if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
        return this.ariaPageLabel + ' ' + pageNumber + '.'
      } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
        return (
          this.ariaCurrentLabel +
          ', ' +
          this.ariaPageLabel +
          ' ' +
          pageNumber +
          '.'
        )
      }
      return null
    },
  },
}
</script>
