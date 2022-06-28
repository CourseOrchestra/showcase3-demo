<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <logo-curs id="lcurs1"></logo-curs>
        <logo-curs id="lcurs2"></logo-curs>
      </v-col>
      <v-col cols="6">
        <logo-curs id="lcurs3"></logo-curs>
        <logo-curs id="lcurs4"></logo-curs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import LogoCurs from "showcase2/src/components/LogoCurs";
import { setTitle } from "@/utils/common";

export default {
  name: "LogoCursPage",

  components: {
    //      LogoCurs,
    //LogoCurs: () => import("showcase2/src/components/LogoCurs"),
  },

  data: () => ({}),

  created() {
    setTitle("Логотип КУРСа");
  },
};
</script>
