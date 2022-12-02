import { STATUS_CODE } from "@core/constant/setting";
import { ICategory } from "@core/models/order";
import { Pagination } from "@core/models/serverResponse";
import { get } from "./api";

const getMainCategories = async () => {
  const response = await get<{ parents: ICategory[], children: ICategory[] }>('categories/main', {});
  const { data: { children, parents } } = response;
  if (response.code === STATUS_CODE.SUCCESS) {
    const childrenMap = children.reduce((acc, cur) => {
      if (acc[cur.parentId]) {
        acc[cur.parentId].push(cur);
      } else {
        acc[cur.parentId] = []
      }
      return acc
    }, {} as { [key: number]: ICategory[] });
    parents.forEach(parent => {
      parent.children = childrenMap[parent.id] || [];
    });
  }
  return {
    ...response,
    data: parents
  };
}

const getSubCategories = async (params: { mainId: number }) => {
  const response = await get<Pagination<ICategory>>('categories', params);
  if (response.code === STATUS_CODE.SUCCESS) {
    response.data.elements.forEach(el => el.parentId = params.mainId);
  }
  return response;
}

export {
  getMainCategories,
  getSubCategories
};
