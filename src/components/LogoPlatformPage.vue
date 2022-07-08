<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <br />
        <br />
        <logo-platform id="lplatform1"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform2"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform3"></logo-platform>
      </v-col>
      <v-col cols="4">
        <br />
        <br />
        <logo-platform id="lplatform4"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform5"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform6"></logo-platform>
      </v-col>
      <v-col cols="4">
        <br />
        <br />
        <logo-platform id="lplatform7"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform8"></logo-platform>
        <br />
        <br />
        <logo-platform id="lplatform9"></logo-platform>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { /*defineAsyncComponent,*/ defineComponent } from "vue";
import LogoPlatform from "showcase3/src/components/LogoPlatform.vue";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "LogoPlatformPage",

  components: {
    LogoPlatform,
    /*
    LogoPlatform: defineAsyncComponent(
      () => import("showcase3/src/components/LogoPlatform.vue")
    ),
*/
  },

  data: () => ({}),

  created() {
    setTitle("Логотип Платформы");
  },
});
</script>
