<template>
  <v-container>
    <br />
    <br />
    <h1 class="text-center">Демонстрация грида</h1>
    <br />
    <br />
    <easy-data-table :headers="headers" :items="items" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setTitle } from "@/utils/common";

export default defineComponent({
  name: "GridPage",

  data: () => ({
    headers: [
      { text: "PLAYER", value: "player", sortable: true },
      { text: "TEAM", value: "team", sortable: true },
      { text: "NUMBER", value: "number", sortable: true },
      { text: "POSITION", value: "position", sortable: true },
      { text: "HEIGHT", value: "indicator.height", sortable: true },
      { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
      {
        text: "LAST ATTENDED",
        value: "lastAttended",
        width: 200,
        sortable: true,
      },
      { text: "COUNTRY", value: "country", sortable: true },
    ],

    items: [
      {
        player: "Stephen Curry",
        team: "GSW",
        number: 30,
        position: "G",
        indicator: { height: "6-2", weight: 185 },
        lastAttended: "Davidson",
        country: "USA",
      },
      {
        player: "Lebron James",
        team: "LAL",
        number: 6,
        position: "F",
        indicator: { height: "6-9", weight: 250 },
        lastAttended: "St. Vincent-St. Mary HS (OH)",
        country: "USA",
      },
      {
        player: "Kevin Durant",
        team: "BKN",
        number: 7,
        position: "F",
        indicator: { height: "6-10", weight: 240 },
        lastAttended: "Texas-Austin",
        country: "USA",
      },
      {
        player: "Giannis Antetokounmpo",
        team: "MIL",
        number: 34,
        position: "F",
        indicator: { height: "6-11", weight: 242 },
        lastAttended: "Filathlitikos",
        country: "Greece",
      },
    ],
  }),

  created() {
    setTitle("Грид");
  },
});
</script>
