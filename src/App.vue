<template>
  <vApp>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <span>{{ $t("App.menu.language") }}</span>
      <vSelect
        v-model="locale"
        :items="['ru', 'cn', 'en']"
        style="display: inline-flex"
      ></vSelect>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav>
        <div v-for="(link, i) in links" :key="i">
          <v-list-group :key="$t(link.text)">
            <template #activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title>{{ $t(link.text) }}</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :key="$t(sublink.text)"
              :to="sublink.to"
            >
              <v-list-item-title>{{ $t(sublink.text) }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

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
import { ref, watch } from "vue";
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

const links = [
  {
    text: "ddddddd",
    subLinks: [
      {
        text: "App.menu.welcome",
        to: "/",
      },
      {
        text: "App.menu.logocurs",
        to: "/logocurs",
      },
      {
        text: "App.menu.logoplatform",
        to: "/logoplatform",
      },
      {
        text: "App.menu.navigator",
        to: "/navigator",
      },
      {
        text: "App.menu.urlstate",
        to: "/urlstate",
      },
      {
        text: "App.menu.pageout",
        to: "/pageout",
      },
    ],
  },
  {
    text: "fffffffffffff",
    subLinks: [
      {
        text: "App.menu.grid",
        to: "/grid",
      },
      {
        text: "App.menu.gridvuetify",
        to: "/gridvuetify",
      },
      {
        text: "App.menu.gridvuetifyvirtual",
        to: "/gridvuetifyvirtual",
      },
      {
        text: "App.menu.virtuallist",
        to: "/virtuallist",
      },
    ],
  },

  {
    text: "ggggggggggggg",
    subLinks: [
      {
        text: "App.menu.primevuedatatable",
        to: "/primevuedatatable",
      },
      {
        text: "App.menu.primevuelyragrid",
        to: "/primevuelyragrid",
      },

      {
        text: "App.menu.primevuedatatablevirtual",
        to: "/primevuedatatablevirtual",
      },

      {
        text: "App.menu.primevuetreetable",
        to: "/primevuetreetable",
      },

      {
        text: "App.menu.primevuetreegroup",
        to: "/primevuetreegroup",
      },

      {
        text: "App.menu.primevuedatagroup",
        to: "/primevuedatagroup",
      },
    ],
  },
];

const drawer = ref(false);
</script>

<style>
.v-btn {
  text-transform: none !important;
}
</style>
