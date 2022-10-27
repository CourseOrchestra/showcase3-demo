import { Item, ServerOptions } from "vue3-easy-data-table";
import { $tt } from "@/plugins/i18n";

export const mockClientItems = (itemsNumber = 100): Item[] => {
  const mockItems: Item[] = [];
  const sports = [
    $tt("GridPage.data.sports.basketball"),
    $tt("GridPage.data.sports.football"),
    $tt("GridPage.data.sports.running"),
    $tt("GridPage.data.sports.swimming"),
  ];
  const fruits = [
    $tt("GridPage.data.fruits.banana"),
    $tt("GridPage.data.fruits.apple"),
    $tt("GridPage.data.fruits.orange"),
    $tt("GridPage.data.fruits.peach"),
  ];

  for (let i = 1; i < itemsNumber + 1; i += 1) {
    mockItems.push({
      name: $tt("GridPage.data.name") + `-${i}`,
      address: $tt("GridPage.data.address") + `-${i}`,
      height: i,
      weight: i,
      age: i,
      favouriteSport: sports[i % 4],
      favouriteFruits: fruits[i % 4],
    });
  }
  return mockItems;
};

export const mockServerItems = async (
  serverOptions: ServerOptions
): Promise<{
  serverCurrentPageItems: Item[];
  serverTotalItemsLength: number;
}> => {
  const { page, rowsPerPage, sortBy, sortType } = serverOptions;
  const serverItemsLength = 500;
  const serverTotalItems = mockClientItems(serverItemsLength);
  if (sortBy && sortType) {
    serverTotalItems.sort((a, b) => {
      const stringSortBy: string = sortBy as string;
      if (a[stringSortBy] < b[stringSortBy])
        return sortType === "desc" ? 1 : -1;
      if (a[stringSortBy] > b[stringSortBy])
        return sortType === "desc" ? -1 : 1;
      return 0;
    });
  }
  await new Promise((s) => setTimeout(s, 2000));
  return {
    serverCurrentPageItems: serverTotalItems.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    ),
    serverTotalItemsLength: serverItemsLength,
  };
};
