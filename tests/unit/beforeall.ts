import { config } from "@vue/test-utils";

config.global.mocks = {
  $t: (tKey: string) => tKey, // just return translation key
};
