import http from '@core/services/http'
import Browser from '@core/helpers/browser'
export default {
  methods: {
    async exportFile(result, file_name, bucket_type) {
      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      if (result.queue) {
        this.$toast.open(
          "We're currently exporting file. This should take less than five minutes. An notify will be sent to you once the export is complete."
        )
        return
      }

      try {
        const data = await http.get(
          `/uploads/file-export/download?type=${bucket_type}&url=${result.url}`,
          {
            type: 'blob',
          }
        )
        Browser.downloadBlob(data, `${file_name}`)
      } catch (error) {
        this.$toast.open({ type: 'error', message: 'File error !!!' })
      }
    },
  },
}
