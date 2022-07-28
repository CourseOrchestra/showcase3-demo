<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <logo-curs id="lcurs1"></logo-curs>
        <logo-curs id="lcurs2"></logo-curs>
        <logo-curs id="lcurs3"></logo-curs>
      </v-col>
      <v-col cols="4">
        <logo-curs id="lcurs4"></logo-curs>
        <logo-curs id="lcurs5"></logo-curs>
        <logo-curs id="lcurs6"></logo-curs>
      </v-col>
      <v-col cols="4">
        <logo-curs id="lcurs7"></logo-curs>
        <logo-curs id="lcurs8"></logo-curs>
        <logo-curs id="lcurs9"></logo-curs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { /*defineAsyncComponent,*/ defineComponent } from "vue";
import { LogoCurs } from "showcase3";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "LogoCursPage",

  components: {
    LogoCurs,
    /*
    LogoCurs: defineAsyncComponent(
      () => import("showcase3/src/components/LogoCurs.vue")
    ),
*/
  },

  data: () => ({}),

  created() {
    setTitle("Логотип КУРСа");
  },
});
</script>
