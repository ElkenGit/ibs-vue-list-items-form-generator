const forEach = require("lodash").forEach;

let provider = window.config ? window.config.provider : 'quasar'

let fieldComponents = {};

let fields = require.context('../providers/', true, /field([\w-_]+)\.vue$/);

forEach(fields.keys(), (key) => {
  if (key.includes(provider)) {
    let split = key.split('/')
    let splitLength = split.length
    if (splitLength > 0) {
      let compName = split[splitLength - 1].replace(/\.vue/, "");
      fieldComponents[compName] = fields(key).default;
    }
  }
})

module.exports = fieldComponents
