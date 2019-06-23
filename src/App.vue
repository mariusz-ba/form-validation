<template>
  <div class="app">
    <form
      class="app__form"
      @submit.prevent="submitHandler"
    >
      <form-structure
        ref="formStructure"
        :structure="[
          {
            inputType: 'input',
            id: 'email',
            type: 'email',
            name: 'email',
            label: 'E-Mail',
            validations: [
              { name: 'required' },
              { name: 'minLength', attrs: [3] }
            ],
            validationMessages: {
              required: 'E-Mail field is required',
              minLength: 'E-Mail has to be at least {min} characters long'
            }
          },
          {
            inputType: 'input',
            id: 'username',
            type: 'text',
            name: 'username',
            label: 'Username',
            validations: [
              { name: 'required' },
              { name: 'minLength', attrs: [isEnabled ? 10 : 5] }
            ],
            validationMessages: {
              required: 'Username is required',
              minLength: 'This field has to be at least {min} characters long'
            }
          },
          {
            inputType: 'input',
            id: 'password',
            type: 'password',
            name: 'password',
            label: 'Password',
            validations: [
              { name: 'required' }
            ],
            validationMessages: {
              required: 'This field is required'
            }
          },
          {
            inputType: 'input',
            id: 'confirmPassword',
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm password',
            validations: [
              { name: 'sameAs', attrs: ['password']}
            ],
            validationMessages: {
              sameAs: 'Password does not matach'
            }
          },
          {
            inputType: 'checkbox',
            id: 'terms',
            type: 'checkbox',
            name: 'terms',
            label: 'Agree to terms and conditions',
            defaultValue: false,
            validations: [
              { name: 'sameAs', attrs: [() => true] }
            ],
            validationMessages: {
              sameAs: 'You must agree to terms and conditions'
            }
          }
        ]"
      />
      <button>Submit</button>
      <button
        type="button"
        @click="isEnabled = !isEnabled"
      >Change length</button>
    </form>
  </div>
</template>

<script>
import FormStructure from './components/forms/FormStructure';

export default {
  name: 'app',
  components: {
    FormStructure
  },
  data() {
    return {
      isEnabled: false
    }
  },
  methods: {
    submitHandler() {
      if (this.$refs.formStructure.validate()) {
        console.log(this.$refs.formStructure.collectFormData());
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__form {
    width: 500px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 20px;

    button {
      margin-top: 10px;
    }
  }
}
</style>
