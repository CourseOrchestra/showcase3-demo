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
      <v-btn class="text-none" @click="addMapping"
        >Позднее добавление мэппинга</v-btn
      >

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

    <v-card title="Объект для позднего добавления мэппинга">
      <vRow>
        <vCol>
          <vTextField
            v-model="violationAdd.group"
            outlined
            label="violationAdd.group"
          ></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model="violationAdd.status"
            outlined
            label="violationAdd.status"
          ></vTextField>
        </vCol>
      </vRow>
      <vRow>
        <vCol>
          <vTextField
            v-model="violationAdd.name"
            outlined
            label="violationAdd.name"
          ></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model.number="violationAdd.num"
            outlined
            label="violationAdd.num"
            type="number"
          ></vTextField>
        </vCol>
        <vCol>
          <v-checkbox
            v-model="violationAdd.inspector"
            outlined
            label="violationAdd.inspector"
          ></v-checkbox>
        </vCol>
      </vRow>
    </v-card>

    <v-card title="Примитивы для позднего добавления мэппинга">
      <vRow>
        <vCol>
          <vTextField v-model="strAdd" outlined label="strAdd"></vTextField>
        </vCol>
        <vCol>
          <vTextField
            v-model.number="numAdd"
            outlined
            label="numAdd"
            type="number"
          ></vTextField>
        </vCol>
        <vCol>
          <v-checkbox v-model="logAdd" outlined label="logAdd"></v-checkbox>
        </vCol>
      </vRow>
    </v-card>

    <v-card title="URLMapper">
      <pre>{{ url }}</pre>
    </v-card>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import { addURLMapper, useURLMapper } from "@/library/URLMapper";
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

const url = useURLMapper([
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

function changeViolationName() {
  violation.value.name = "ff";
}
function changeStrName() {
  str.value = "gg";
}

const strAdd = ref();
const numAdd = ref();
const logAdd = ref();

const violationAdd = ref<Violation>({
  group: undefined,
  name: undefined,
  num: undefined,
  inspector: undefined,
  status: undefined,
});

function addMapping() {
  addURLMapper([
    {
      name: "violationAdd",
      obj: violationAdd.value,
      props: ["name", "num", "inspector"],
    },

    {
      name: "strAdd",
      obj: strAdd,
      props: ["value"],
    },

    {
      name: "numAdd",
      obj: numAdd,
      props: ["value"],
    },

    {
      name: "logAdd",
      obj: logAdd,
      props: ["value"],
    },
  ]);
}
</script>
