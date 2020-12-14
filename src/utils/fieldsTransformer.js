import _ from 'lodash'

export function transformFields(data = []) {
  let fields = []
  if (Array.isArray(data)) {
    data.forEach((x) => {
      let field = getMapping(x.field_type)
      if (field) {
        let mappings = field.options && field.options.mappings ? field.options.mappings : null
        fields.push({
          key_path: x.key_path,
          name: x.name,
          id_key: x.id_key,
          id: x.id,
          type: field.options.tag,
          options: x.options ? transformOptions(x.options, mappings) : [],
          actions: x['_actions'] || [],
          required: x.required
        })
      }
    })
  }
  return fields
}

export function transformOptions(options, config, pluck = {key: 'name', value: 'id'}) {
  if (typeof config === 'string') {
    config = _.get(window.config,`selectedProvider.fields.mappings.${config}`)
  }
  let keys = {}
  for (let [key, value] of Object.entries(config)) {
    keys[value] = pluck[key]
  }
  return options.map(x => {
    let option = {
      actions: x['_actions'] || []
    }
    for (let [key, value] of Object.entries(keys)) {
      option = {...option, ...{
        [key]: x[value] || null
      }}
    }
    return option
  })
}

function getMapping (key) {
  let map = new Map([
    ['list', {'options': {'tag': 'select', 'mappings': _.get(window.config,`selectedProvider.fields.mappings.select`) || null}}],
    ['text', {'options': {'tag': 'input'}}],
    ['auto-fill', {'options': {'tag': 'autocomplete'}}],
  ])
  return map.get(key) || false
}
