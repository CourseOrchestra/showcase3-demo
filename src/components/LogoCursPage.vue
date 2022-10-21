<template>
  <vContainer>
    <vRow justify="center">
      <vCol cols="4">
        <LogoCurs id="lcurs1"></LogoCurs>
        <LogoCurs id="lcurs2"></LogoCurs>
        <LogoCurs id="lcurs3"></LogoCurs>
      </vCol>
      <vCol cols="4">
        <LogoCurs id="lcurs4"></LogoCurs>
        <LogoCurs id="lcurs5"></LogoCurs>
        <LogoCurs id="lcurs6"></LogoCurs>
      </vCol>
      <vCol cols="4">
        <LogoCurs id="lcurs7"></LogoCurs>
        <LogoCurs id="lcurs8"></LogoCurs>
        <LogoCurs id="lcurs9"></LogoCurs>
      </vCol>
    </vRow>
  </vContainer>
</template>

<script setup lang="ts">
import { LogoCurs } from "showcase3";
import { setTitle } from "@/utils/common";

setTitle("Логотип КУРСа");
</script>
