<template>
  <vContainer>
    <!--    tag::template_i18n[] -->
    <h1>{{ $t("UrlStatePage.title") }}</h1>
    <!--    end::template_i18n[] -->

    <div class="home">
      <table>
        <tr>
          <td>Field stored to the local storage22:</td>
          <td><input v-model="query.page" /><br /><br /></td>
        </tr>

        <tr>
          <td><input v-model="str" /><br /><br /></td>

          <td>
            <button @click="func22">func</button>
          </td>
        </tr>

        <tr>
          <td>Simple text field 22</td>
          <td><input v-model="query.page22" /><br /><br /></td>
        </tr>
        <tr>
          <td>Number field with the default value of 10:</td>
          <td><input v-model="query.num" type="number" /><br /><br /></td>
        </tr>
        <tr>
          <td>Checkbox:</td>
          <td><input v-model="query.check" type="checkbox" /><br /><br /></td>
        </tr>
        <tr>
          <td>
            Array (multiple selection, control-click for selecting both values):
          </td>
          <td>
            <select v-model="query.option" multiple>
              <option value="first">First choice</option>
              <option value="second">Second choice</option></select
            ><br /><br />
          </td>
        </tr>
        <tr>
          <td>
            Comma-separated array (multiple selection, control-click for
            selecting both values):
          </td>
          <td>
            <select v-model="query.option2" multiple>
              <option value="first">First choice</option>
              <option value="second">Second choice</option></select
            ><br /><br />
          </td>
        </tr>
        <tr>
          <td>
            Space-separated array (multiple selection, control-click for
            selecting both values):
          </td>
          <td>
            <select v-model="query.option3" multiple>
              <option value="first">First choice</option>
              <option value="second">Second choice</option></select
            ><br /><br />
          </td>
        </tr>
        <tr>
          <td>Add and remove (the query param is called dynarr):</td>
          <td>
            <input v-model="tmp" placeholder="Enter value" /><br /><br />
            <button @click="query.addValue('dynarr', tmp)">Add</button>&nbsp;
            <button @click="query.removeValue('dynarr', tmp)">Remove</button>
            <br />
          </td>
        </tr>
      </table>
      <br /><br />
      <button @click="convert">
        Convert simple text field to numeric model (can be used to, for example,
        define datatype later)
      </button>
      <br /><br />
      query equals:
      <pre>{{ query }}</pre>
      stringified query:
      <pre>{{ JSON.stringify(query, null, 4) }}</pre>
      definition (not reactive):
      <pre>{{ query.__definition }}</pre>
    </div>
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import { /*IntDatatype,*/ CommaArrayDatatype, useQuery } from "@/library";
import { ref } from "vue";

setTitle("urlstate");

const query = useQuery();

//console.log(query);

//    query.parentId = myModel.parentId;

/*
    const str = ref();
    query.str = str;
*/
//    const str = query.str;

const str = ref();
if (query.str) {
  str.value = query.str;
}
query.str = str;
//console.log(str);

function func22() {
  str.value = "gg";
  //console.log(str);
}

query.define("dynarr", CommaArrayDatatype, []);
const tmp = ref("");

function convert() {
  /*
  query.define('search2', IntDatatype)
*/
}
</script>
