/* eslint @typescript-eslint/no-explicit-any: "off" */
(global as any).CSS = { supports: () => false };

/*
import { beforeAll } from "vitest";
beforeAll(() => {
  global.CSS = {
    supports: (str: string) => false,
    escape: (str: string) => str,
  };
});
*/

import { config } from "@vue/test-utils";

config.global.mocks = {
  $t: (tKey) => tKey, // just return translation key
};
