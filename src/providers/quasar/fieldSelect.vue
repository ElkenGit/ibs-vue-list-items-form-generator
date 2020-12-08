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
      :class="{ 'required': field.required }"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt.label" />
          <q-item-label caption>{{ scope.opt.sublabel }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No Result
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import baseMixin from './baseMixin'
export default {
  mixins: [baseMixin],
  methods: {
    selected(item) {
      if(item) {
        this.fieldValue = item.value
        this.$store.dispatch('list-items-form-generator/getFieldDependentDataAction', item)
      } else {
        this.fieldValue = null
      }
    }
  },
}
</script>
