import { ICategoriesContext } from "@core/models/config";
import { ICategory } from "@core/models/order";
import { createContext, useContext } from "react";


export const defaultCategoriesState: ICategory[] = [];

export const CategoriesContext = createContext<ICategoriesContext>({
  categories: defaultCategoriesState,
  getMainCategories: () => [],
  getSubCategories: () => [],
  getAllSubByChannelCategories: () => [],
})

const useCategoriesContext = () => useContext(CategoriesContext);
export default useCategoriesContext;