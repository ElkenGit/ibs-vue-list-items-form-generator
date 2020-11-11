<template>
  <q-select
      ref="salesCountrySelector"
      v-model="fieldValue"
      options-dense
      dense
      map-options
      outlined
      hide-bottom-space
      clearable
      :options="getOptions"
      :label="label"
      @input="selected"
  />
</template>
<script>
import baseMixin from './baseMixin'
export default {
  mixins: [baseMixin],
  methods: {
    selected(item) {
      this.fieldValue = item.value
      this.$store.dispatch('list-items-form-generator/getFieldDependentDataAction', item)
    }
  },
}
</script>
