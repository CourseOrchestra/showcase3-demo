<template>
  <vContainer>
    <v-app-bar color="teal-darken-4">
      <template #image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-btn class="text-none" @click="changeViolationName"
        >changeViolationName</v-btn
      >
      <v-btn class="text-none" @click="changeStrName">changeStrValue</v-btn>
      <!--    tag::template_i18n[] -->
      <v-app-bar-title>{{ $t("UrlStatePage.title") }} </v-app-bar-title>
      <!--    end::template_i18n[] -->
    </v-app-bar>

    <v-card title="Объект">
      <vRow>
        <vCol>
          <vTextField
            v-model="violation.group"
            outlined
            label="violation.group"
          ></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model="violation.status"
            outlined
            label="violation.status"
          ></vTextField>
        </vCol>
      </vRow>
      <vRow>
        <vCol>
          <vTextField
            v-model="violation.name"
            outlined
            label="violation.name"
          ></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model.number="violation.num"
            outlined
            label="violation.num"
            type="number"
          ></vTextField>
        </vCol>
        <vCol>
          <v-checkbox
            v-model="violation.inspector"
            outlined
            label="violation.inspector"
          ></v-checkbox>
        </vCol>
      </vRow>
    </v-card>

    <v-card title="Примитивы">
      <vRow>
        <vCol>
          <vTextField v-model="str" outlined label="str"></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model.number="num"
            outlined
            label="num"
            type="number"
          ></vTextField>
        </vCol>
        <vCol>
          <v-checkbox v-model="log" outlined label="log"></v-checkbox>
        </vCol>
      </vRow>
    </v-card>

    <v-card title="query">
      <pre>{{ query }}</pre>
    </v-card>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import { useQuery } from "@/library";
import { ref } from "vue";

setTitle("urlstate");

const str = ref();
const num = ref();
const log = ref();

type Violation = {
  group: string | undefined;
  name: string | undefined;
  num: number | undefined;
  inspector: boolean | undefined;
  status: string | undefined;
};

const violation = ref<Violation>({
  group: undefined,
  name: undefined,
  num: undefined,
  inspector: undefined,
  status: undefined,
});

//console.log(1, violation.value);

const query = useQuery([
  {
    name: "violation",
    obj: violation.value,
    props: ["name", "num", "inspector"],
  },

  {
    name: "str",
    obj: str,
    props: ["value"],
  },

  {
    name: "num",
    obj: num,
    props: ["value"],
  },

  {
    name: "log",
    obj: log,
    props: ["value"],
  },
]);

//console.log(2, violation.value);

function changeViolationName() {
  violation.value.name = "ff";
}
function changeStrName() {
  str.value = "gg";
}
</script>
