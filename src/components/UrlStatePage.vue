<template>
  <vContainer>
    <v-app-bar color="teal-darken-4">
      <template #image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-btn @click="changeViolationName">change Violation Name</v-btn>
      <v-btn @click="changeStrName">change Str Name</v-btn>
      <!--    tag::template_i18n[] -->
      <v-app-bar-title>{{ $t("UrlStatePage.title") }} </v-app-bar-title>
      <!--    end::template_i18n[] -->
    </v-app-bar>

    <br />
    <br />
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
          v-model="violation.name"
          outlined
          label="violation.name"
        ></vTextField>
      </vCol>
    </vRow>
    <vRow>
      <vCol>
        <vTextField
          v-model="violation.act"
          outlined
          label="violation.act"
        ></vTextField>
      </vCol>
      <vCol>
        <vTextField
          v-model="violation.inspector"
          outlined
          label="violation.inspector"
        ></vTextField>
      </vCol>
    </vRow>
    <vRow>
      <vCol>
        <vTextField
          v-model="violation.status"
          outlined
          label="violation.status"
        ></vTextField>
      </vCol>
      <vCol>
        <vTextField v-model="str" outlined label="str"></vTextField>
      </vCol>
    </vRow>

    <vRow>
      <vCol>
        <vTextField
          v-model="query.page"
          outlined
          label="query.page"
        ></vTextField>
      </vCol>
      <vCol>
        <vTextField
          v-model="query.page22"
          outlined
          label="query.page22"
        ></vTextField>
      </vCol>
    </vRow>
    <vRow>
      <vCol>
        <vTextField v-model="query.num" outlined label="query.num"></vTextField>
      </vCol>
      <vCol>
        Add and remove (the query param is called dynarr):
        <input v-model="tmp" placeholder="Enter value" />
        <button @click="query.addValue('dynarr', tmp)">Add</button>&nbsp;
        <button @click="query.removeValue('dynarr', tmp)">Remove</button>
      </vCol>
    </vRow>

    <v-btn @click="convert"
      >Convert simple text field to numeric model (can be used to, for example,
      define datatype later)</v-btn
    >

    <br /><br />
    query equals:
    <pre>{{ query }}</pre>
    <br />
    definition (not reactive):
    <pre>{{ query.__definition }}</pre>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import { IntDatatype, CommaArrayDatatype, useQuery } from "@/library";
import { ref } from "vue";

setTitle("urlstate");

const query = useQuery();

const violation = ref({});
const str = ref();

//query.define("violation", CommaArrayDatatype, []);

query.violation = violation;

query.str = str;

function changeViolationName() {
  violation.value.name = "ff";
  //console.log(str);
}
function changeStrName() {
  str.value = "gg";
}

query.define("dynarr", CommaArrayDatatype, []);
const tmp = ref("");

function convert() {
  query.define("page", IntDatatype, 10);
}
</script>
