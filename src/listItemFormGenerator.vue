<template>
  <div :class="wrapperClasses">
    <template v-for="field in getFields">
      <component v-model="models[field.id_key]" :field="field" :label="field.name" :class="fieldClasses" :is="`field-${field.type}`"></component>
    </template>
  </div>
</template>
<script>
import fieldComponents from './utils/fieldsLoader'

export default {
  name: 'ListItemFormGenerator',
  components: fieldComponents,
  props: {
    wrapperClasses: {
      type: String,
      default: 'row q-col-gutter-sm'
    },
    fieldClasses: {
      type: String,
      default: 'col-12'
    },
    fields: {
      type: Array,
      default: () => ([])
    },
    value: {}
  },
  data() {
    return {
      models: {}
    }
  },
  watch: {
    fields: {
      handler(to) {
        this.$store.dispatch('list-items-form-generator/getFieldsAction', to)
      },
      deep: true,
      immediate: true
    },
    models: {
      handler(to) {
        this.$emit('input', to)
      },
      deep: true,
    },
    getFields: {
      handler(fields) {
        // Cleanup models remove unused id_key
        for (let [key] of Object.entries(this.models)) {
          let fieldIndex = fields.findIndex(x => x.id_key === key)
          if (fieldIndex === -1) {
            this.$delete(this.models, key)
          }
        }
      },
      deep: true
    }
  },
  computed: {
    getFields() {
      return this.$store.getters['list-items-form-generator/getFields']
    }
  },
}
</script>
