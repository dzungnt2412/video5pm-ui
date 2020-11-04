import { mapActions } from 'vuex'

import { EXPORT_CONTAINER } from '@/packages/container/store/types'

import { ORDER_EXPORT_BUCKET } from '@core/constants/storage'
import mixinExportOrder from '@/packages/container/mixins/export-file'
export default {
  mixins: [mixinExportOrder],
  data() {
    return {
      isOrdersExporting: false,
      isVisibleExportSuccess: false,
    }
  },
  methods: {
    ...mapActions('container', [EXPORT_CONTAINER]),

    async handleExportContainer(id) {
      const result = await this.exportContainer(id)
      this.exportFile(result, `delivery-${id}.csv`, ORDER_EXPORT_BUCKET)
    },
  },
}
