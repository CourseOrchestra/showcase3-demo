<template>
  <vContainer>
    <br />
    <br />
    <!--    <h1 class="text-center">{{ $t("NavigatorPage.title") }}</h1>-->
    <h1 class="text-center">Демонстрация компонента c-overflow-text</h1>
    <br />
    <br />
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
  </vContainer>
</template>

<script setup lang="ts">
import { setTitle } from "@/utils/common";
import COverflowText from "@/components/common/COverflowText.vue";

setTitle("navigator");
</script>
