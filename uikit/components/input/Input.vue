<template>
  <div :class="wrapperClasses">
    <template v-if="type !== 'textarea' && type !== 'password'">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

      <i
        class="form-control-icon"
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

    <template v-if="type == 'password'">
      <div class="input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <a
        class="form-control-icon form-control-icon-right"
        @click.prevent="togglePasswordVisibelity()"
      >
        <i class="wb-eye"></i>
      </a>

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
      v-if="!validateField.valid && type != 'username'"
    >
      {{ validateField.errors[0] }}
    </span>

    <span
      v-if="type == 'username' && input != '' && validate == 'on'"
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
  margin-top: 10px;
  font-size: 14px;
  color: #37393e;
  margin-left: 20px;
}

.success {
  color: #0554f2;
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
  },
  data() {
    return {
      typeInputPassword: 'password',
      input: '',
      validatePassword: [
        {
          message: 'Phải có tối thiểu một ký tự viết hoa.',
          regex: /[A-Z]+/,
          result: true,
        },
        {
          message: 'Phải có tối thiểu một chữ số.',
          regex: /[0-9]+/,
          result: true,
        },
        {
          message: 'Phải có tối thiểu sáu ký tự.',
          regex: /.{6,}/,
          result: true,
        },
        {
          message: 'Tối đa năm mươi ký tự.',
          regex: /^[\w]{0,50}$/,
          result: true,
        },
        {
          message: 'Không được có ký tự đặc biệt.',
          regex: /[^\w]/,
          result: false,
        },
      ],
      validateEmail: [
        {
          message: 'Chưa đúng định dạng email.(Ví dụ : abc@gmail.com)',
          regex: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          result: true,
        },
      ],
      validateUsername: [
        {
          message: 'Không được có ký tự đặc biệt.',
          regex: /[^\w]/,
          result: false,
        },
        {
          message: 'Phải có tối thiểu sáu ký tự.',
          regex: /.{6,}/,
          result: true,
        },
        {
          message: 'Tối đa năm mươi ký tự.',
          regex: /^[\w]{0,50}$/,
          result: true,
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
          'form-icons': this.prefixIcon || this.suffixIcon || this.isShowClear,
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
        this.type == 'password' && !this.validateField.valid
          ? 'input-invalid'
          : '',
        this.type == 'email' && !this.validateField.valid
          ? 'input-invalid'
          : '',
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
      if (this.validate == 'off') return { valid: true, errors }
      if (this.type == 'password') {
        for (let condition of this.validatePassword) {
          if (!condition.regex.test(this.input) == condition.result) {
            errors.push(condition.message)
          }
        }
        if (errors.length === 0) {
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
        if (errors.length === 0) {
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
        if (errors.length === 0) {
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
}
</script>
