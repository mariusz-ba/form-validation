export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Boolean, Object, Array],
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  }
}