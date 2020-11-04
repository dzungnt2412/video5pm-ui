<template>
  <p-modal
    :size="'xl'"
    :active.sync="isShow"
    :title="`Sửa order ${order.id}`"
    @close="handleClose"
  >
    <div class="row">
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('first_name') },
            { 'has-danger': errors.has('first_name') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.first_name"
            v-validate="'min:1'"
            name="first_name"
            data-vv-as="first name"
          />
          <label class="floating-label">First name</label>
          <span class="invalid-feedback" v-if="errors.has('first_name')">
            {{ errors.first('first_name') }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('last_name') },
            { 'has-danger': errors.has('last_name') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.last_name"
            v-validate="'min:1'"
            name="last_name"
            data-vv-as="last name"
          />
          <label class="floating-label">Last name</label>
          <span class="invalid-feedback" v-if="errors.has('last_name')">
            {{ errors.first('last_name') }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('full_name') },
            { 'has-danger': errors.has('full_name') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.full_name"
            v-validate="'required|min:2'"
            name="full_name"
            data-vv-as="full name"
          />
          <label class="floating-label">Full name</label>
          <span class="invalid-feedback" v-if="errors.has('full_name')">
            {{ errors.first('full_name') }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('phone') },
            { 'has-danger': errors.has('phone') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.phone"
            v-validate="'min:8'"
            name="phone"
            data-vv-as="Phone"
          />
          <label class="floating-label">Phone</label>
          <span class="invalid-feedback" v-if="errors.has('phone')">
            {{ errors.first('phone') }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('company') },
            { 'has-danger': errors.has('company') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.company"
            v-validate="'min:2'"
            name="company"
            data-vv-as="Company"
          />
          <label class="floating-label">Company</label>
          <span class="invalid-feedback" v-if="errors.has('company')">
            {{ errors.first('company') }}
          </span>
        </div>
      </div>
      <div class="col-4">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('city') },
            { 'has-danger': errors.has('city') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.city"
            v-validate="'required|min:2'"
            name="city"
            data-vv-as="City"
          />
          <label class="floating-label">City</label>
          <span class="invalid-feedback" v-if="errors.has('city')">
            {{ errors.first('city') }}
          </span>
        </div>
      </div>
      <div class="col-6">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('address') },
            { 'has-danger': errors.has('address') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.address"
            v-validate="'required|min:2'"
            name="address"
            data-vv-as="Address"
          />
          <label class="floating-label">Address</label>
          <span class="invalid-feedback" v-if="errors.has('address')">
            {{ errors.first('address') }}
          </span>
        </div>
      </div>
      <div class="col-6">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('address2') },
            { 'has-danger': errors.has('address2') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.address2"
            v-validate="'min:2'"
            name="address2"
            data-vv-as="Address 2"
          />
          <label class="floating-label">Address2</label>
          <span class="invalid-feedback" v-if="errors.has('address2')">
            {{ errors.first('address2') }}
          </span>
        </div>
      </div>
      <div :class="{ 'col-4': hasProvince, 'col-6': !hasProvince }">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('country_code') },
            { 'has-danger': errors.has('country_code') },
          ]"
        >
          <p-select
            v-model="order.country_code"
            v-validate="'required'"
            name="country_code"
            data-vv-as="Country"
          >
            <option
              :value="country.code"
              v-for="(country, i) in countries"
              :key="i"
            >
              {{ country.name }}
            </option>
          </p-select>
          <label class="floating-label">Country</label>
          <span class="invalid-feedback" v-if="errors.has('country_code')">
            {{ errors.first('country_code') }}
          </span>
        </div>
      </div>
      <div class="col-4" v-if="hasProvince">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('state_code') },
            { 'has-danger': errors.has('state_code') },
          ]"
        >
          <p-select
            v-model="order.state_code"
            v-validate="hasProvince ? 'required' : ''"
            name="state_code"
            data-vv-as="State code"
          >
            <option
              :value="province.code"
              v-for="(province, i) in provinces"
              :key="i"
            >
              {{ province.name }}
            </option>
          </p-select>
          <label class="floating-label">State</label>
          <span class="invalid-feedback" v-if="errors.has('state_code')">
            {{ errors.first('state_code') }}
          </span>
        </div>
      </div>
      <div :class="{ 'col-4': hasProvince, 'col-6': !hasProvince }">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('postcode') },
            { 'has-danger': errors.has('postcode') },
          ]"
        >
          <input
            class="form-control"
            v-model="order.postcode"
            v-validate="'required'"
            name="Postcode"
          />
          <label class="floating-label">Zip code</label>
          <span class="invalid-feedback" v-if="errors.has('postcode')">
            {{ errors.first('postcode') }}
          </span>
        </div>
      </div>
      <div class="col-12">
        <div
          class="form-group form-material floating"
          :class="[
            { 'has-success': !errors.has('shipping_code') },
            { 'has-danger': errors.has('shipping_code') },
          ]"
        >
          <p-select
            v-model="order.shipping_code"
            v-validate="'required'"
            name="shipping_method_code"
            data-vv-as="Shipping method"
          >
            <option value="epacket">
              Standard Shipping with Delivery Insurance
            </option>
            <option value="dhl">
              DHL Express Shipping
            </option>
            <option value="shunfeng">
              Shunfeng
            </option>
            <option value="usps">
              USPS
            </option>
            <option value="shunfeng-express">
              Shunfeng Express
            </option>
            <option value="yunexpress">
              Yun express
            </option>
            <option value="lionnix-express">
              Lionnix express
            </option>
          </p-select>
          <label class="floating-label">Shipping Method</label>
          <span
            class="invalid-feedback"
            v-if="errors.has('shipping_method_code')"
          >
            {{ errors.first('shipping_method_code') }}
          </span>
        </div>
      </div>
    </div>
    <template slot="footer">
      <p-button type="default" @click="handleClose">
        <span>Cancel</span>
      </p-button>
      <p-button type="primary" @click="handleSave" :disabled="loading">
        <span>Update</span>
      </p-button>
    </template>
  </p-modal>
</template>

<script>
import mixinCountry from '@/packages/shared/mixins/country'
export default {
  name: 'ModalUpdateOrder',
  mixins: [mixinCountry],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    current: {
      type: Object,
      default: () => {},
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    countryCode() {
      return this.order.country_code
    },
  },
  data() {
    return {
      order: {
        first_name: null,
        last_name: null,
        full_name: null,
        phone: null,
        address: null,
        address2: null,
        country_code: null,
        state_code: null,
        postcode: null,
        shipping_method: null,
        shipping_method_code: null,
        note: null,
      },
      isShow: this.visible,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    async handleSave() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.$emit('save', this.order)
    },
    handleHasProvince(val) {
      if (!val) {
        this.order.state_code = null
      }
    },
  },
  watch: {
    current: {
      handler: function(val) {
        this.order = { ...val }
      },
      deep: true,
      immediate: true,
    },
    visible(value) {
      this.isShow = value
    },
  },
}
</script>
