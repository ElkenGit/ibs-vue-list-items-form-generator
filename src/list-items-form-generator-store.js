import { transformFields, transformOptions } from './util/fieldsTransformer'
import _ from 'lodash'

const listItemsFormGeneratorVuexModule =  {
  namespaced: true,
  state: {
    fields: [],
    autofillOptions: {}
  },
  getters: {
    getFields: state => {
      return state.fields.filter(x => x.type)
    },
    getAutofillOptions: state => key => {
      return state.autofillOptions[key] || []
    }
  },
  mutations: {
    SET_FIELDS(state, payload) {
      let { fields, isDependentField = false } = payload.data
      fields = transformFields(fields || [])
      if (isDependentField) {
        let fieldExistIndex = state.fields.findIndex(x => x.key_path === fields[0].key_path)
        if(fieldExistIndex) {
          state.fields.splice(fieldExistIndex, 1, fields[0])
        }
      } else {
        state.fields = [...fields]
      }
    },
    SET_AUTOFILL_OPTIONS(state, payload) {
      state.autofillOptions = { [payload.data.key]: payload.data.items }
    },
  },
  actions: {
    getFieldsAction(context, payload = {}) {
      context.commit({
        type: 'SET_FIELDS',
        data: {
          fields: payload
        }
      });
    },
    getFieldDependentDataAction(context, payload = {}) {
      return new Promise(resolve => {
        let methods = window.config && window.config.axios ? window.config.axios.methods : []
        let {actions = [], isAutofill = false, input = '', type} = payload
        if (actions.length > 0) {
          if (Array.isArray(actions)) {
            actions.forEach(x => {
              let method = methods[x.method] || false
              if (method) {
                let apiUrl = x.url
                apiUrl = apiUrl.replaceAll(/{input}/ig, input)
                method(apiUrl).then(response => {
                  const json = response.data.data
                  if (isAutofill) {
                    let { pluck } = x
                    // Swapping key value for front-end
                    if (pluck) {
                      pluck = {
                        key: pluck.value || null,
                        value: pluck.key || null
                      }
                    }
                    context.commit({
                      type: 'SET_AUTOFILL_OPTIONS',
                      data: {
                        key: payload.key_path,
                        items: transformOptions(json, type, pluck)
                      }
                    });
                  } else {
                    context.commit({
                      type: 'SET_FIELDS',
                      data: {
                        isDependentField: true,
                        fields: [json]
                      }
                    });
                  }
                  resolve(response)
                })
              }
            })
          }
        }
      })
     },
  }
};
export default listItemsFormGeneratorVuexModule;
