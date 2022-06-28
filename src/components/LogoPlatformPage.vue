<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <br />
        <br />
        <logo-platform id="lplatform1"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform2"></logo-platform>
      </v-col>
      <v-col cols="6">
        <br />
        <br />
        <logo-platform id="lplatform3"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform4"></logo-platform>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import LogoPlatform from "showcase2/src/components/LogoPlatform";
import { setTitle } from "@/utils/common";

export default {
  name: "LogoPlatformPage",

  components: {
    //      LogoPlatform,
    //LogoPlatform: () => import("showcase2/src/components/LogoPlatform"),
  },

  data: () => ({}),

  created() {
    setTitle("Логотип Платформы");
  },
};
</script>
