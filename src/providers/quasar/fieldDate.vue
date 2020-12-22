<template>
  <q-input
      v-model.trim="fieldValue"
      hide-bottom-space
      dense
      outlined
      clearable
      :label="label"
      type="date"
      stack-label
      :class="{ 'required': field.required }"
  />
</template>
<script>
import baseMixin from './baseMixin'
export default {
  mixins: [baseMixin],
}
</script>
