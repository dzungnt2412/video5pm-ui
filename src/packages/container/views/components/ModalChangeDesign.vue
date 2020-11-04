<template>
  <p-modal
    :active="visible"
    :title="design && design.id ? 'Choose image' : 'Choose design'"
    @close="handleClose"
  >
    <template v-if="!isSelected">
      <div class="form-group">
        <label class="form-control-label">
          Search by SKU
        </label>
        <p-input v-model="query" @input="onQueryChange" id="search-design">
        </p-input>
      </div>
      <ul
        class="list-group list-group-dividered list-group-full list-select-design"
      >
        <li
          class="list-group-item"
          v-for="(item, index) in items"
          :key="index"
          @click.prevent="handleSelectItem(item)"
        >
          <div class="media">
            <div class="pr-20">
              <thumbnail
                class="w-50"
                :src="item.design_files[0].url"
                v-if="item.design_files && item.design_files.length"
              />
              <img :src="imagePlaceholder" v-else class="w-50" />
            </div>
            <div class="media-body">
              <div class="float-right">
                <p-button @click.prevent="handleSelectItem(item)">
                  Select
                </p-button>
              </div>
              {{ item.sku }}
            </div>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <p-button
        class="pl-0 mb-10 no-hover"
        flat
        icon="chevron-left"
        @click.prevent="handleCloseDesign"
      >
        Back
      </p-button>

      <ul class="blocks blocks-100 blocks-xxl-4 blocks-lg-3 blocks-md-2">
        <li
          class="pointer"
          v-for="(file, i) in design.design_files"
          :key="i"
          @click="handleSelectDesign(file)"
        >
          <div class="card card-shadow">
            <figure class="card-img-top overlay-hover overlay">
              <thumbnail :src="file.url" />
            </figure>
          </div>
        </li>
      </ul>
    </template>
  </p-modal>
</template>

<script>
import debounce from 'lodash/debounce'
import Thumbnail from '@components/shared/Thumbnail'

export default {
  name: 'ModalChangeDesign',
  components: { Thumbnail },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    designs: {
      type: Array,
      default: () => [],
    },
    fetchDesigns: {
      type: Function,
      default: () => {},
    },
    shopId: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      default: '',
    },
  },
  computed: {
    isSelected() {
      return this.design && this.design.id
    },
    imagePlaceholder() {
      return require('@assets/img/image-placeholder.png')
    },
  },
  data() {
    return {
      isFetching: false,
      query: '',
      items: [],
      currentPage: 1,
      design: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.designs && this.designs.length) {
        this.items = this.designs.slice()
      } else {
        this.handleFetchDesigns()
      }
    },

    handleClose() {
      this.$emit('update:visible', false)
    },

    handleSelectItem(item) {
      this.design = item
    },

    handleSelectDesign(design_file) {
      this.$emit('selected', { url: design_file.url, design: this.design })
    },

    async handleFetchDesigns() {
      const payload = {
        search: this.query,
        page: this.currentPage,
      }

      const response = await this.fetchDesigns(payload)
      if (response.success) {
        this.items.push(...response.items)
      }
    },

    onQueryChange: debounce(function() {
      this.currentPage = 1
      this.items = []
      this.handleFetchDesigns()
    }, 500),

    handleCloseDesign() {
      this.design = {}
    },
  },
  watch: {
    sku: {
      handler: function(val) {
        this.query = val
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style scoped>
.list-select-design .list-group-item {
  cursor: pointer;
}
.list-select-design .list-group-item:hover {
  color: #000;
}
</style>
