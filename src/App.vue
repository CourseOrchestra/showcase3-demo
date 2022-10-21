<template>
  <vApp>
    <vAppBar app color="primary" dark>
      <vBtn href="."> Welcome </vBtn>
      <vBtn href="logocurs"> Логотип КУРСа </vBtn>
      <vBtn href="logoplatform"> Логотип Платформы </vBtn>
      <vBtn href="navigator"> Навигатор </vBtn>
      <vBtn href="grid"> Грид </vBtn>
      <vBtn href="urlstate"> Состояние в url </vBtn>

      <p>{{ $t("hello") }}</p>
    </vAppBar>

    <vMain>
      <routerView />
    </vMain>
  </vApp>
</template>

<script setup lang="ts"></script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
