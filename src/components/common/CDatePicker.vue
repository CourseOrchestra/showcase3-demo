<template>
  <c-field-col v-bind="$attrs">
    <label>{{ label }}</label>
    <date-picker
      v-model="localValue"
      :class="`masked${readonly ? ' readonly' : ''}`"
      :hidden="hidden"
      :disabled="readonly"
      model-type="timestamp"
      position="right"
      format="dd.MM.yyyy"
      locale="ru-RU"
      select-text="OK"
      cancel-text="Отменить"
      text-input
      clearable
    />
  </c-field-col>

  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          :model-value="dateFormatted"
          variant="outlined"
          append-inner-icon="mdi-calendar"
        ></v-text-field>
      </template>

      <v-date-picker
        color="primary"
        :model-value="getDate"
        @update:model-value="updateDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { MaskInput } from "maska";
import CFieldCol from "@/components/common/CFieldCol.vue";

function formatDate(val: number) {
  if (!val) {
    return null;
  }

  const d = new Date(val);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default {
  name: "CDatePicker",
  components: { CFieldCol },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
    },
    hidden: {
      type: Boolean,
    },

    ////////////////////////////////////////
    value: {
      type: String,
      default: "2023-10-10",
    },
  },
  emits: ["update:modelValue"],
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  setup(props: any, context: any) {
    const localValue = computed({
      get: () => props.modelValue,
      set: (value) => context.emit("update:modelValue", formatDate(value)),
    });
    return {
      localValue,
    };
  },
  data() {
    return {
      menu: false,
      input: null,
    };
  },
  computed: {
    dateFormatted() {
      const date = this.input ? new Date(this.input) : new Date();
      let month = 1 + date.getMonth();
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    },
    getDate() {
      /**
       * Return ISO 8601
       */
      const date = this.input ? new Date(this.input) : new Date();
      return date;
    },
  },

  ////////////////////////////////////////

  watch: {
    value: {
      handler(val) {
        this.input = val;
      },
      immediate: true,
    },
  },
  mounted() {
    new MaskInput(
      document.querySelectorAll(
        ".masked input",
        // eslint-disable-next-line no-undef
      ) as NodeListOf<HTMLInputElement>,
      { mask: "##.##.####" },
    );
  },
  methods: {
    updateDate(val) {
      // this.menu = false;
      this.input = val;
      /* eslint-disable-next-line  no-console */
      console.error(val);
    },
  },
};
</script>
