<template>
  <q-select
      ref="salesCountrySelector"
      v-model="fieldValue"
      options-dense
      dense
      use-input
      map-options
      outlined
      hide-bottom-space
      clearable
      :label="label"
      :options="list"
      @filter="search"
      @input="selected"
      :class="{ 'required': field.required }"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label v-html="scope.opt.label"/>
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
  data() {
    return {
      list: []
    }
  },
  methods: {
    search(terms, update) {
      let field = {...this.field}
      field = {...field, ...{input: terms, isAutofill: true}}
      this.$store.dispatch('list-items-form-generator/getFieldDependentDataAction', field).then(() => {
        update(() => {
          let options = this.$store.getters['list-items-form-generator/getAutofillOptions'](this.field.key_path)
          this.list = [...options]
        })
      })
    },
    selected(item) {
      if(item) {
        this.fieldValue = item.value
      } else {
        this.fieldValue = null
      }
    }
  }
}
</script>
