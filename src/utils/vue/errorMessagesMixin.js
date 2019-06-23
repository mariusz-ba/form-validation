export default {
  methods: {
    /**
     * Returns correct error message if validated field is invalid.
     *
     * @param {Object} validationField Field from validation object created by 'vuelidate' i.e. $v.username
     * @param {Object} messages Object that contains key value pairs representing error messages for particular validation type
     * @param {String} defaultError Error that will be displayed if input is valid. By default it's empty but it can be used to provide external errors for example from vuex state.
     * @returns {String} Correct error message based on $messages param order.
     * @example
     * const validationField = this.$v.username;
     * const messages = {
     *   required: 'This field is required',
     *   minLength: 'This field has to be at least {min} charas long.'
     * };
     * const error = getErrorMessage(validationField, messages);
     */
    getErrorMessage(validationField, messages, defaultError = '') {
      const validation = Object.keys(messages).find((validation) => {
        return validationField.$dirty && validationField.hasOwnProperty(validation) && !validationField[validation];
      });

      return validation ? this.populateErrorMessage(messages[validation], validationField.$params[validation]) : defaultError;
    },
    /**
     * Populates message with gieven parameters
     * 
     * @param {String} message Message template
     * @param {Object} params Message parameters
     * @returns {String} Message with populated parameters
     * @example
     * const message = "This field has to be at least {min} chars long.";
     * const params = { min: 4 };
     * const populated = populateErrorMessage(message, params);
     */
    populateErrorMessage(message, params) {
      return Object.entries(params).reduce((message, [param, value]) => {
        return message.replace(`{${param}}`, value);
      }, message);
    }
  }
}