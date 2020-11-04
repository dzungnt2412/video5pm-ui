export default {
  computed: {
    countryCode() {},
    country() {
      if (!this.countryCode) {
        return {}
      }

      const country = this.countries.find(
        ({ code }) => code === this.countryCode
      )

      return country || {}
    },
    hasProvince() {
      return (
        this.country && this.country.provinces && this.country.provinces.length
      )
    },
    provinces() {
      return this.hasProvince ? this.country.provinces : []
    },
  },
}
