<template>
  <div class="base-checkbox">
    <div class="base-checkbox__container">
      <input
        class="base-checkbox__input"
        :id="id"
        :name="name"
        :type="type"
        :checked="value"
        v-on="listeners"
      />
      <label
        v-if="label"
        class="base-checkbox__label"
        :for="id"
      >{{ label }}</label>
    </div>
    <p
      v-if="error"
      class="base-checkbox__error"
    >{{ error }}</p>
  </div>
</template>

<script>
import inputMixin from '../../utils/vue/inputMixin';

export default {
  name: 'base-checkbox',
  mixins: [inputMixin],
  computed: {
    listeners() {
      return Object.assign({}, this.$listeners, {
        input: () => {},
        change: (event) => {
          this.$emit('input', event.target.checked);
        }
      });
    }
  }
}
</script>

<style lang="scss">
.base-checkbox {
  &__container {
    display: flex;
    align-items: center;
  }

  &__input {
    width: 10px;
    height: 10px;
  }

  &__label {
    flex: 1;
    margin-left: 10px;
  }

  &__error {
    margin-top: 5px;
    color: crimson;
  }
}
</style>