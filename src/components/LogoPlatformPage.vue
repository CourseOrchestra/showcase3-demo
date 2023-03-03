<template>
  <vContainer>
    <vRow justify="center">
      <vCol>
        <br />
        <br />
        <LogoPlatform id="lplatform1"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform2"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform3"></LogoPlatform>
      </vCol>
      <vCol>
        <br />
        <br />
        <LogoPlatform id="lplatform4"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform5"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform6"></LogoPlatform>
      </vCol>
      <vCol>
        <br />
        <br />
        <LogoPlatform id="lplatform7"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform8"></LogoPlatform>
        <br />
        <br />
        <LogoPlatform id="lplatform9"></LogoPlatform>
      </vCol>
    </vRow>
  </vContainer>
</template>

<script setup lang="ts">
import { LogoPlatform } from "showcase3";
import { setTitle } from "@/utils/common";

setTitle("logoplatform");
</script>
