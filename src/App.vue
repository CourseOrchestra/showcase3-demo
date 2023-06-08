<template>
  <vApp>
    <vAppBar app color="primary" dark>
      <vBtn to="/"> {{ $t("App.menu.welcome") }} </vBtn>
      <vBtn to="logocurs"> {{ $t("App.menu.logocurs") }} </vBtn>
      <vBtn to="logoplatform"> {{ $t("App.menu.logoplatform") }} </vBtn>
      <vBtn to="navigator"> {{ $t("App.menu.navigator") }} </vBtn>
      <vBtn to="urlstate"> {{ $t("App.menu.urlstate") }} </vBtn>
      <vBtn to="pageout"> {{ $t("App.menu.pageout") }} </vBtn>

      <vSpacer></vSpacer>

      <span>{{ $t("App.menu.language") }}</span>
      <vSelect
        v-model="locale"
        :items="['ru', 'cn', 'en']"
        style="display: inline-flex"
      ></vSelect>
    </vAppBar>

    <vAppBar app color="primary" dark>
      <vBtn to="grid"> {{ $t("App.menu.grid") }} </vBtn>
      <vBtn to="gridvuetify"> {{ $t("App.menu.gridvuetify") }} </vBtn>
      <vBtn to="gridvuetifyvirtual">
        {{ $t("App.menu.gridvuetifyvirtual") }}
      </vBtn>
      <vBtn to="virtuallist"> {{ $t("App.menu.virtuallist") }} </vBtn>
    </vAppBar>

    <vAppBar app color="primary" dark>
      <vBtn to="primevuedatatable">
        {{ $t("App.menu.primevuedatatable") }}
      </vBtn>
      <vBtn to="primevuelyragrid">
        {{ $t("App.menu.primevuelyragrid") }}
      </vBtn>
      <vBtn to="primevuedatatablevirtual">
        {{ $t("App.menu.primevuedatatablevirtual") }}
      </vBtn>
      <vBtn to="primevuetreetable">
        {{ $t("App.menu.primevuetreetable") }}
      </vBtn>
      <vBtn to="primevuetreegroup">
        {{ $t("App.menu.primevuetreegroup") }}
      </vBtn>
      <vBtn to="primevuedatagroup">
        {{ $t("App.menu.primevuedatagroup") }}
      </vBtn>
    </vAppBar>

    <vMain>
      <routerView />
    </vMain>
  </vApp>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
// tag::import_store[]
import { useInternationalizationStore } from "@/stores/internationalization";
// end::import_store[]
import { watch } from "vue";
import { setTitle } from "@/utils/common";

const { locale } = useI18n();

// tag::create_store[]
const internationalization = useInternationalizationStore();
// end::create_store[]

// tag::save_store[]
watch(locale, (value) => {
  setTitle("");
  internationalization.setLocale(value);
});
// end::save_store[]
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
