export const ViolationService = {
  getData() {
    return [
      {
        id: 1000,
        name: "Нарушение 2",
        act: "Ссылка на нормативный акт 2",
        inspector: "Инспектор 1",
        status: "черновик",
        group: "Группа нарушений 4",
        order: 9009,
      },
      {
        id: 1001,
        name: "Нарушение 1",
        act: "Ссылка на нормативный акт 1",
        inspector: "Инспектор 2",
        status: "подтверждено",
        group: "Группа нарушений 4",
        order: 9010,
      },
      {
        id: 1002,
        name: "Нарушение 3",
        act: "Ссылка на нормативный акт 3",
        inspector: "Инспектор 3",
        status: "в акте",
        group: "Группа нарушений 1",
        order: 10001,
      },
      {
        id: 1003,
        name: "Нарушение 4",
        act: "Ссылка на нормативный акт 4",
        inspector: "Инспектор 1",
        status: "черновик",
        group: "Группа нарушений 2",
        order: 3002,
      },
      {
        id: 1004,
        name: "Нарушение 5",
        act: "Ссылка на нормативный акт 5",
        inspector: "Инспектор 2",
        status: "подтверждено",
        group: "Группа нарушений 2",
        order: 3001,
      },
      {
        id: 1005,
        name: "Нарушение 6",
        act: "Ссылка на нормативный акт 6",
        inspector: "Инспектор 3",
        status: "в акте",
        group: "Группа нарушений 2",
        order: 3003,
      },
      {
        id: 1006,
        name: "Нарушение 7",
        act: "Ссылка на нормативный акт 7",
        inspector: "Инспектор 1",
        status: "черновик",
        group: "Группа нарушений 3",
        order: 4001,
      },
      {
        id: 1007,
        name: "Нарушение 8",
        act: "Ссылка на нормативный акт 8",
        inspector: "Инспектор 2",
        status: "подтверждено",
        group: "Группа нарушений 3",
        order: 4002,
      },
      {
        id: 1008,
        name: "Нарушение 9",
        act: "Ссылка на нормативный акт 9",
        inspector: "Инспектор 3",
        status: "в акте",
        group: "Группа нарушений 3",
        order: 4003,
      },
      {
        id: 1009,
        name: "Нарушение 10",
        act: "Ссылка на нормативный акт 10",
        inspector: "Инспектор 3",
        status: "в акте",
        group: "Группа нарушений 3",
        order: 4004,
      },
    ];
  },

  getViolations() {
    return Promise.resolve(this.getData().slice(0, 10));
  },
};
