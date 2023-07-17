import { mount } from "cypress/vue";
import vuetify from "@/plugins/vuetify";
import { i18n } from "@/plugins/i18n";
import router from "@/router";
import { createPinia } from "pinia";

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1];

/* eslint @typescript-eslint/no-namespace: "off" */
/* eslint @typescript-eslint/no-explicit-any: "off" */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: any, options?: OptionsParam): Chainable<any>;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [
    vuetify,
    i18n,
    createPinia(),
    router,
  ];
  return mount(component, options);
});
