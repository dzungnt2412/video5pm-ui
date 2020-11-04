import { Upload } from '@kit'
import Browser from '@core/helpers/browser'

export default {
  components: { Upload },
  data() {
    return {
      files: [],
    }
  },
  filter: {},
  methods: {
    extenionFileUrl(val) {
      const rex = /(?:\.([^.]+))?$/
      const ext = rex.exec(val)[1]
      if (ext === undefined) {
        return ''
      }

      return ext
    },
    isImage(url) {
      const ext = this.extenionFileUrl(url)
      if (['png', 'jpg'].indexOf(ext) !== -1) {
        return true
      }
      return false
    },
    download(url) {
      Browser.download(url)
    },
    handleSuccess(val, raw) {
      if (val && typeof val.urls !== 'undefined') {
        this.files.push({
          url: val.urls[0],
          uid: raw.uid,
          name: raw.name,
        })
      }
    },
    handleErrorFile() {
      // this.$toast.open({ type: 'error', message: `Upload file name ${file.name} is failed` })
    },
    handleDeleteImage(uid) {
      this.files = this.files.filter((item) => item.uid != uid)
    },
  },
}
