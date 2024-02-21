<template>
  <vContainer>
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Демонстрация компонента c-overflow-text</h1>
    <br />
    <br />

    <c-btn class="outer-app-bar-nav-icon" hint="fffffff">
      <v-icon>mdi-menu</v-icon>
    </c-btn>
    <br />
    <br />

    <v-card width="300" title="Заголовок" variant="outlined">
      <c-overflow-text
        :text="
          '1111 2222 3333 4444 5555 6666 7777 ' +
          '9999999999999999999999999999999999  00000000000000' +
          '1111111111 3333333333333 454444444 6666666666 88888 999999 2222222' +
          'dasda fdgdg fghfghfghfg fghfghgf'
        "
        :line-clamp="3"
      >
      </c-overflow-text>
    </v-card>

    <br />
    <br />

    <v-card width="300" title="Заголовок" variant="outlined">
      <div
        style="
          color: red;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        "
      >
        '1111 2222 3333 4444 5555 6666 7777 ' +
        '9999999999999999999999999999999999 00000000000000' + '1111111111
        3333333333333 454444444 6666666666 88888 999999 2222222' + 'dasda fdgdg
        fghfghfghfg fghfghgf'
      </div>
    </v-card>

    <br />
    <br />

    <!--
    <v-table>
      <thead>
      <tr>
        <th class="text-left">

          <c-overflow-text
              :text="'1111 2222 3333 4444 5555 6666 7777 9999999999999999999999999999999999  00000000000000'"
          >
          </c-overflow-text>

        </th>
        <th class="text-left">
          Calories
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>gggg</td>
        <td>ffff</td>
      </tr>
      </tbody>
    </v-table>
-->

    <c-grid
      :headers="headers"
      :items="desserts"
      :items-length="totalDesserts"
      :loading="loading"
      :items-per-page="10"
      item-value="name"
      class="c-grid"
      :headers-line-clamp="3"
      @update:options="options = $event"
    >
    </c-grid>
  </vContainer>
</template>

<script>
import { setTitle } from "@/utils/common";
import COverflowText from "@/components/common/COverflowText.vue";
import CBtn from "@/components/common/CBtn.vue";
import CGrid from "@/components/common/CGrid.vue";

export default {
  components: {
    CBtn,
    COverflowText,
    CGrid,
  },

  data() {
    setTitle("navigator");

    return {
      lineClamp: 2,

      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        {
          title:
            "1234 2222 3333 4444 5555 6666 7777 9999999999999999999999999999999999  00000000000000 1111111111 3333333333333 454444444 6666666666 88888 999999 2222222 dasda fdgdg fghfghfghfg fghfghgf",
          align: "start",
          sortable: false,
          key: "name",
          width: 200,
        },
        {
          title:
            "5678 2222 3333 4444 5555 6666 7777 9999999999999999999999999999999999  00000000000000 1111111111 3333333333333 454444444 6666666666 88888 999999 2222222 dasda fdgdg fghfghfghfg fghfghgf",
          key: "calories",
          width: 200,
        },
        { title: "Fat (g)", key: "fat" },
        { title: "Carbs (g)", key: "carbs" },
        { title: "Protein (g)", key: "protein" },
        { title: "Iron (%)", key: "iron" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    debugDate() {
      /* eslint-disable-next-line  no-console */
      console.log(this.dateField);
      /* eslint-disable-next-line  no-console */
      console.log(this.dateRange);
    },

    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall().then((data) => {
        this.desserts = data.items;
        this.totalDesserts = data.total;
        this.loading = false;
      });
    },
    /**
     * In a real application this would be a call to fetch() or axios.get()
     */
    fakeApiCall() {
      return new Promise((resolve /*, reject*/) => {
        const { sortBy = [], page, itemsPerPage } = this.options;
        let items = this.getDesserts();
        const total = items.length;
        if (sortBy.length) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0].key];
            const sortB = b[sortBy[0].key];
            if (sortBy[0].order) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }
        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }
        setTimeout(() => {
          resolve({
            items,
            total,
          });
        }, 200);
      });
    },
    getDesserts() {
      return [
        {
          name: "Frozen Yogurt22",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
        {
          name: "Frozen Yogurt 2",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich 2",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair 2",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake 2",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread 2",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean 2",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop 2",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb 2",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut 2",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat 2",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ];
    },
  },
};
</script>
