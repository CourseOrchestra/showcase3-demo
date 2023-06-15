export const ViolationService = {
  getData() {
    return [
      {
        id: 1000,
        name: "Нарушение 2",
        date: "2015-09-13",
        status: "unqualified",
        group: "Группа нарушений 4",
      },
      {
        id: 1001,
        name: "Нарушение 1",
        date: "2019-02-09",
        status: "proposal",
        group: "Группа нарушений 4",
      },
      {
        id: 1002,
        name: "Нарушение 3",
        date: "2017-05-13",
        status: "qualified",
        group: "Группа нарушений 1",
      },
      {
        id: 1003,
        name: "Нарушение 4",
        date: "2020-09-15",
        status: "new",
        group: "Группа нарушений 2",
      },
      {
        id: 1004,
        name: "Нарушение 5",
        date: "2016-05-20",
        status: "proposal",
        group: "Группа нарушений 2",
      },
      {
        id: 1005,
        name: "Нарушение 6",
        date: "2018-02-16",
        status: "qualified",
        group: "Группа нарушений 2",
      },
      {
        id: 1006,
        name: "Нарушение 7",
        date: "2018-02-19",
        status: "renewal",
        group: "Группа нарушений 3",
      },
      {
        id: 1007,
        name: "Нарушение 8",
        date: "2019-08-13",
        status: "renewal",
        group: "Группа нарушений 3",
      },
      {
        id: 1008,
        name: "Нарушение 9",
        date: "2018-11-21",
        status: "unqualified",
        group: "Группа нарушений 3",
      },
      {
        id: 1009,
        name: "Нарушение 10",
        date: "2015-07-07",
        status: "proposal",
        group: "Группа нарушений 3",
      },
    ];
  },

  getViolations() {
    return Promise.resolve(this.getData().slice(0, 10));
  },
};
