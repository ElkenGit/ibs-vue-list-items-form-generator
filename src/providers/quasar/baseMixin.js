export default {
  props: {
    label: {
      type: String,
    },
    field: {
      type: Object,
    },
  },
  data() {
    return {
      fieldValue: '',
    }
  },
  watch: {
    fieldValue(to) {
      this.$emit('input', to)
    },
    getOptions: {
      handler() {
        if(this.getOptions.length > 0) {
          this.fieldValue = this.getOptions[0].value || null
        }
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    getOptions() {
      return this.field.options || []
    }
  },
}
