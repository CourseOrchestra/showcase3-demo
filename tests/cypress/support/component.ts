import "./commands";
import { mount } from "cypress/vue";
import vuetify from "@/plugins/vuetify";

/* eslint @typescript-eslint/no-namespace: "off" */
/* eslint @typescript-eslint/no-explicit-any: "off" */

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1];

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
  options.global.stubs = options.global.stubs || {};
  options.global.stubs["transition"] = false;
  options.global.components = options.global.components || {};
  options.global.plugins = options.global.plugins || [vuetify];
  return mount(component, options);
});
