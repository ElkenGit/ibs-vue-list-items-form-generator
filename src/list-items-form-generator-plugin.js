import module from './list-items-form-generator-store'

/** initialize the plugin object */
let listItemsFormGeneratorPlugin = {}

/** providers details and configuration */
let availableProviders = [
  {
    name: 'quasar',
    command: '$q',
    fields: {
      mappings: {
        select: {
          key: 'label',
          value: 'value',
        },
        autocomplete: {
          key: 'label',
          value: 'value',
        },
      },
    },
  },
  {
    name: 'bootstrap-vue',
    command: '$bvConfig',
    fields: {
      mappings: {
        select: {
          key: 'label',
          value: 'text',
        },
        autocomplete: {
          key: 'label',
          value: 'text',
        },
      },
    },
  },
]

listItemsFormGeneratorPlugin.install = function install(Vue, store, config) {
  /** merge default options with user supplied options */
  if (!config.provider) {
    config.provider = 'quasar'
  }
  let providerIndex = availableProviders.findIndex(x => x.name === config.provider)
  config = Object.assign({
    warnings: true,
    moduleName: 'list-items-form-generator',
    selectedProvider: availableProviders[providerIndex],
  }, config)

  /** define module name and identifiers as constants to prevent any changes */
  const moduleName = config.moduleName
  /**
   * Make config global
   * Initialize before base component
   */
  window.config = config

  /** Register VUEX module */
  store.registerModule(moduleName, module)

  if(!Vue.prototype[config.selectedProvider.command]) {
    console.error(config.selectedProvider.name, 'Package Not found')
    return
  }

  /** check if the plugin was correctly initialized */
  if (store.state.hasOwnProperty(moduleName) === false) {
    console.error('list-items-form-generator: list-items-form-generator vuex module is not correctly initialized. Please check the module name:', moduleName)
  }

  /** Load base component as last item */
  Vue.component('ListItemsFormGenerator', require('./listItemFormGenerator.vue').default)

}

export default listItemsFormGeneratorPlugin
