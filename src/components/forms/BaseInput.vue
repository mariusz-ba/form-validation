<template>
  <div class="base-input">
    <label
      v-if="label"
      class="base-input__label"
      :for="id"
    >{{ label }}</label>
    <input
      class="base-input__input"
      :class="{'base-input__input--error': error}"
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      v-on="listeners"
    />
    <p
      v-if="error"
      class="base-input__error"
    >{{ error }}</p>
  </div>
</template>

<script>
import inputMixin from '../../utils/vue/inputMixin';

export default {
  name: 'base-input',
  mixins: [inputMixin],
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          this.$emit('input', event.target.value);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.base-input {
  &__label {
    display: block;
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 0 10px;

    &--error {
      border: 1px solid crimson;
      background: #fdb3b3;
    }
  }

  &__error {
    margin-top: 5px;
    color: crimson;
  }
}
</style>