import { IMenuItem } from "./IMenuItem";

interface IMenuItemCategory {
  id: string;
  title: string;
  menuItems: IMenuItem[];
}

export type { IMenuItemCategory };
