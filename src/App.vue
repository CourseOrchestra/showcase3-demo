<template>
  <vApp>
    <vAppBar app color="primary" dark>
      <vBtn href="."> {{ $t("App.menu.welcome") }} </vBtn>
      <vBtn href="logocurs"> {{ $t("App.menu.logocurs") }} </vBtn>
      <vBtn href="logoplatform"> {{ $t("App.menu.logoplatform") }} </vBtn>
      <vBtn href="navigator"> {{ $t("App.menu.navigator") }} </vBtn>
      <vBtn href="grid"> {{ $t("App.menu.grid") }} </vBtn>
      <vBtn href="urlstate"> {{ $t("App.menu.urlstate") }} </vBtn>

      <vSpacer></vSpacer>

      <span>{{ $t("App.menu.language") }}</span>
      <vSelect
        v-model="locale"
        :items="['ru', 'cn', 'en']"
        style="display: inline-flex"
      ></vSelect>
    </vAppBar>

    <vMain>
      <routerView />
    </vMain>
  </vApp>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useInternationalizationStore } from "@/stores/internationalization";
import { watch } from "vue";
import { setTitle } from "@/utils/common";

const { locale } = useI18n();

const internationalization = useInternationalizationStore();

watch(locale, (value) => {
  setTitle("");
  internationalization.setLocale(value);
});
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
