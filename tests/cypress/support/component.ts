import { mount } from "cypress/vue";
import vuetify from "@/plugins/vuetify";

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
  options.global.plugins = options.global.plugins || [vuetify];
  return mount(component, options);
});
