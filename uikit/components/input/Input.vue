<template>
  <div :class="wrapperClasses">
    <template
      v-if="
        type !== 'textarea' && type !== 'password' && type !== 'phonenumber'
      "
    >
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <i
        class="form-control-icon form-control-icon-left"
        v-if="prefixIcon"
        :class="`wb-${prefixIcon}`"
      >
      </i>

      <i
        class="form-control-icon form-control-icon-right"
        v-if="suffixIcon"
        :class="`wb-${suffixIcon}`"
      ></i>

      <i
        class="form-control-icon form-control-icon-right wb-close"
        v-else-if="isShowClear"
        @click="clear"
      >
      </i>

      <input
        @focus="focusUsername = true"
        @blur="focusUsername = false"
        :class="formControlClasses"
        v-bind="$attrs"
        :value="nativeInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @change="handleChange"
        v-on="listeners"
        v-model="input"
        :type="type"
        ref="input"
      />

      <div class="input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

    <template v-if="type == 'phonenumber'">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <input
        style="padding-left: 85px"
        :class="formControlClasses"
        v-bind="$attrs"
        :value="nativeInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @change="handleChange"
        v-on="listeners"
        v-model="input"
        :type="type"
        name="phonenumber"
        ref="input"
      />
      <div class="input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

    <template v-if="type == 'password'">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <i
        v-if="hiddenPass == 'on'"
        class="form-control-icon form-control-icon-right"
        :class="`wb-${typeInputPassword == 'password' ? 'eye' : 'eye-close'}`"
        @click.prevent="togglePasswordVisibelity()"
      ></i>

      <input
        :class="formControlClasses"
        v-bind="$attrs"
        :value="nativeInputValue"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @change="handleChange"
        v-on="listeners"
        v-model="input"
        :type="typeInputPassword"
        name="password"
        ref="input"
      />
      <div class="input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

    <template v-if="type == 'textarea'">
      <textarea
        :class="formControlClasses"
        v-bind="$attrs"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        @change="handleChange"
        ref="textarea"
      >
      </textarea>
    </template>

    <span
      class="invalid-error"
      v-if="
        !validateField.valid &&
          type != 'username' &&
          validate == 'on' &&
          required == false
      "
    >
      {{ validateField.errors[0] }}
    </span>

    <span class="invalid-error" v-if="required == true && type != 'username'">
      This field is required
    </span>

    <span
      class="invalid-error"
      v-if="required == true && type == 'username' && focusUsername == false"
    >
      This field is required
    </span>

    <span
      v-if="
        type == 'username' &&
          focusUsername == true &&
          validate == 'on' &&
          this.input != ''
      "
      class="check-list"
    >
      <div class="hints">
        <p
          v-for="(item, index) in validateUsername"
          :key="index"
          class="checkList"
        >
          <i class="wb-check" :class="{ success: checkValidate(item.message) }">
          </i>
          {{ item.message }}</p
        >
      </div>
    </span>
  </div>
</template>

<style scoped>
.invalid-error {
  width: 100%;
  margin-top: 10px;
  font-size: 12px;
  color: #db1802;
}

.check-list {
  width: 100%;
  font-size: 14px;
  color: #37393e;
  border: 1px solid;
  padding-top: 10px;
  padding-left: 20px;
  border-radius: 0px 0px 4px 4px;
}

.check-list i {
  color: #dfe3e8;
  margin-right: 10px;
}
.select-phone {
  position: absolute;
  font-size: 14px !important;
}

.success {
  color: #0554f2 !important ;
}

.input-invalid {
  border-color: #db1802;
}

.input-invalid.focus,
.input-invalid:focus {
  border-color: #db1802;
}
</style>

<script>
import FormElementMixin from '../../mixins/FormElement'
export default {
  name: 'PInput',
  inheritAttrs: false,
  mixins: [FormElementMixin],
  props: {
    value: {
      type: [String, Number],
    },
    validate: {
      type: String,
      default: 'off',
    },
    size: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'lg', 'sm'].indexOf(value) > -1
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hiddenPass: {
      type: String,
      default: 'off',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focusUsername: false,
      typeInputPassword: 'password',
      input: '',
      validatePassword: [
        {
          message: 'Not contain special characters.',
          regex: /[^A-Za-z\d@$!%*#?& ]/,
          result: false,
        },
        {
          message: "Your password can't start or end with a blank space",
          regex: /^[ ].*|[ ]$/,
          result: false,
        },
        {
          message: 'Be between 6-50 characters.',
          regex: /^.{6,50}$/,
          result: true,
        },
      ],
      validateEmail: [
        {
          message:
            'Email must be in a valid email format (e.g., you@example.com).',
          regex: /^[a-z0-9A-Z_\\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
          result: true,
        },
      ],
      validateUsername: [
        {
          message: 'Not contain special characters.',
          regex: /[^\w]/,
          result: false,
        },
        {
          message: 'Be between 5-50 characters.',
          regex: /^.{5,50}$/,
          result: true,
        },
      ],
      validatePhonenumber: [
        {
          message: 'Phonenumber is too long (maximum is 20 characters).',
          regex: /^.{1,20}$/,
          result: true,
        },
        {
          message:
            'Phone must be in a valid phone number  (e.g., 123 456-789).',
          regex: /^[-\\s {2}\\./0-9]*$/,
          result: true,
        },
        {
          message: "Your phonenumber can't end with a blank space",
          regex: /.*[ ]$/,
          result: false,
        },
      ],
      validateShopName: [
        {
          message: 'Be between 1-100 characters.',
          regex: /^.{1,100}$/,
          result: true,
        },
        {
          message: 'Shop name must be in a valid shop name format.',
          regex: /<[^>]*>$/,
          result: false,
        },
      ],
    }
  },
  computed: {
    wrapperClasses() {
      return [
        'p-input-group',
        'input-group',
        this.size ? `input-group-${this.size}` : '',
        {
          'form-icons':
            this.prefixIcon ||
            this.suffixIcon ||
            this.isShowClear ||
            this.hiddenPass,
        },
        this.type === 'file' ? 'input-group-file' : '',
      ]
    },
    formControlClasses() {
      return [
        'p-input',
        'form-control',
        {
          rounded: this.rounded,
        },
        this.type == 'password' &&
        !this.validateField.valid &&
        this.validate == 'on'
          ? 'input-invalid'
          : '',
        this.type == 'email' &&
        !this.validateField.valid &&
        this.validate == 'on'
          ? 'input-invalid'
          : '',
        this.type == 'username' &&
        !this.validateField.valid &&
        this.validate == 'on'
          ? 'input-invalid'
          : '',
        this.type == 'shopname' &&
        !this.validateField.valid &&
        this.validate == 'on'
          ? 'input-invalid'
          : '',
        this.type == 'phonenumber' &&
        !this.validateField.valid &&
        this.validate == 'on'
          ? 'input-invalid'
          : '',
        this.required == true ? 'input-invalid' : '',
      ]
    },
    isShowClear() {
      return (
        this.clearable &&
        !this.disabled &&
        !this.readonly &&
        this.nativeInputValue
      )
    },
    nativeInputValue() {
      return this.value === null || typeof this.value === undefined
        ? ''
        : this.value
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        keypress: this.keypress,
      }
    },
    validateField() {
      let errors = []
      if (this.input == '') return { valid: true, errors }
      if (this.type == 'password') {
        for (let condition of this.validatePassword) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length == 0) {
          return { valid: true, errors }
        } else {
          return { valid: false, errors }
        }
      } else if (this.type == 'email') {
        for (let condition of this.validateEmail) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length == 0) {
          return { valid: true, errors }
        } else {
          return { valid: false, errors }
        }
      } else if (this.type == 'username') {
        for (let condition of this.validateUsername) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length == 0) {
          return { valid: true, errors }
        } else {
          return { valid: false, errors }
        }
      } else if (this.type == 'phonenumber') {
        for (let condition of this.validatePhonenumber) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length == 0) {
          return { valid: true, errors }
        } else {
          return { valid: false, errors }
        }
      } else if (this.type == 'shopname') {
        for (let condition of this.validateShopName) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length == 0) {
          return { valid: true, errors }
        } else {
          return { valid: false, errors }
        }
      } else {
        return { valid: true, errors }
      }
    },
  },
  methods: {
    checkValidate(item) {
      return !this.validateField.errors.includes(item)
    },
    onInput(event) {
      if (event.target.value !== this.value) {
        this.$emit('input', event.target.value)
        this.input = event.target.value
      }
    },
    keypress(evt) {
      if (this.type !== 'number') return true
      evt = evt ? evt : window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 45
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    handleChange(e) {
      this.$emit('input', e.target.value)
    },

    togglePasswordVisibelity() {
      this.typeInputPassword =
        this.typeInputPassword == 'password' ? 'text' : 'password'
    },

    clear() {
      this.$emit('input', '')
    },
  },
  watch: {
    input: {
      handler() {
        this.$emit('status', this.validateField.valid)
      },
      deep: true,
    },
  },
}
</script>
