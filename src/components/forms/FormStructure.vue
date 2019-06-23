<template>
  <div class="form-structure">
    <div
      v-for="(input, index) in structure"
      :key="index"
      class="form-structure__row"
    >
      <base-checkbox
        v-if="input.inputType === 'checkbox'"
        :id="input.id"
        :type="input.type"
        :name="input.name"
        :label="input.label"
        v-model="form[input.name]"
        :error="getErrorMessage($v.form[input.name], input.validationMessages || {})"
      />
      <base-input
        v-else
        :id="input.id"
        :type="input.type"
        :name="input.name"
        :label="input.label"
        v-model="form[input.name]"
        :error="getErrorMessage($v.form[input.name], input.validationMessages || {})"
      />
    </div>
  </div>
</template>

<script>
import * as validators from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import errorMessagesMixin from '../../utils/vue/errorMessagesMixin';
import BaseInput from './BaseInput';
import BaseCheckbox from './BaseCheckbox';

export default {
  name: 'form-structure',
  mixins: [
    validationMixin,
    errorMessagesMixin
  ],
  components: {
    BaseInput,
    BaseCheckbox
  },
  props: {
    structure: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      form: this.createFormData()
    }
  },
  validations() {
    const validations = {};

    this.structure.forEach(input => {
      validations[input.name] = {};

      if (input.validations && input.validations.length) {
        input.validations.forEach(validation => {
          validations[input.name][validation.name] = validation.attrs
            ? validators[validation.name](...validation.attrs)
            : validators[validation.name];
        });
      }
    });

    return {
      form: validations
    };
  },
  methods: {
    validate() {
      this.$v.$touch();
      return !this.$v.$error;
    },
    createFormData() {
      const form = {};

      this.structure.forEach(input => {
        form[input.name] = input.hasOwnProperty('defaultValue') ? input.defaultValue : '';
      });

      return form;
    },
    collectFormData() {
      return this.form;
    }
  }
}
</script>

<style lang="scss">
.form-structure {
  &__row {
    &:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
}
</style>