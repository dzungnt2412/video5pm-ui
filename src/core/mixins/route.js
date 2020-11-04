import { cloneDeep, isObjectDiff } from '@core/utils'
import { NOT_STAFF_GET_LIMIT } from '@core/constants'

export default {
  data() {
    return {
      filter: {},
    }
  },
  methods: {
    toBack() {
      return this.$router.go(-1)
    },
    getRouteQuery() {
      const query = {}

      Object.keys(this.filter).forEach((key) => {
        if (typeof this.$route.query[key] !== 'undefined') {
          let value = this.$route.query[key]
          switch (typeof this.filter[key]) {
            case 'number':
              value = Number(value)
              break
            case 'boolean':
              value = !!value
              break
          }

          query[key] = value
        } else {
          query[key] = this.filter[key]
        }
      })

      const max = NOT_STAFF_GET_LIMIT
      query.limit = query.limit <= max ? query.limit : max

      return Object.assign({}, this.$route.query, query)
    },
    handleUpdateRouteQuery(append = {}) {
      let params = cloneDeep(this.$route.query)
      params = Object.assign(params, this.filter, append)

      if (!params.page) {
        params.page = 1
      }

      let query = {}
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
          query[key] = params[key]
        }
      }

      this.$router
        .push({
          query,
          path: this.$route.path,
        })
        .catch(() => {})
    },
  },
  watch: {
    $route: function() {
      const filters = this.getRouteQuery()

      if (isObjectDiff(filters, this.filter)) {
        this.filter = filters
      }
    },
  },
}
