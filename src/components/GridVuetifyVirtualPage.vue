<template>
  <div>
    <br />
    <br />
    <br />
    <br />

    <v-responsive class="mx-auto mb-4" max-width="400">
      <v-text-field
        v-model="visibleItems"
        label="Visible items"
        max="30"
        min="10"
        type="number"
      ></v-text-field>
    </v-responsive>

    <v-data-table-virtual
      :headers="headers"
      :items="virtualDesserts"
      class="elevation-1"
      height="400"
      item-value="name"
      :visible-items="visibleItems"
      fixed-footer
      fixed-header
    ></v-data-table-virtual>
  </div>
</template>

<script>
import { setTitle } from "@/utils/common";

export default {
  data() {
    setTitle("gridvuetifyvirtual");

    return {
      visibleItems: 30,
      headers: [
        {
          title: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Calories", align: "end", key: "calories" },
        { title: "Fat (g)", align: "end", key: "fat" },
        { title: "Carbs (g)", align: "end", key: "carbs" },
        { title: "Protein (g)", align: "end", key: "protein" },
        { title: "Iron (%)", align: "end", key: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6",
        },
      ],
    };
  },
  computed: {
    virtualDesserts() {
      return [...Array(10000).keys()].map((i) => {
        const dessert = { ...this.desserts[i % 10] };
        dessert.name = `${dessert.name} #${i}`;
        return dessert;
      });
    },
  },
};
</script>
