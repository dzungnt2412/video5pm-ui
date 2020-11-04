import { mapActions } from 'vuex'
import { CREATE_DESIGN } from '@/packages/design/store'

export default {
  data() {
    return {
      isVisibleCreateDesign: false,
    }
  },
  methods: {
    ...mapActions('design', [CREATE_DESIGN]),

    handleVisibleCreateDesign() {
      this.isVisibleCreateDesign = true
    },

    handleCreateDesignDesign(id) {
      this.isVisibleCreateDesign = false
      this.$router.push({ name: 'design-edit', params: { id: id } })
    },
  },
}
