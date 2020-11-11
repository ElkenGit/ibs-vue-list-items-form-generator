// import the vuex module for localization
import listItemsFormGeneratorVuexModule from './list-items-form-generator-store';

// import the corresponding plugin for vue
import listItemsFormGeneratorPlugin from './list-items-form-generator-plugin';

// export both modules as one file
export default {
  store: listItemsFormGeneratorVuexModule,
  plugin: listItemsFormGeneratorPlugin
};
