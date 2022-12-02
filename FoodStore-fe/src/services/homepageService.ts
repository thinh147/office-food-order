import { IProductResponse, Pagination } from "@core/models/serverResponse";
import { get } from "./api";

const getProductsHomePage = async (params: { limit: number }) => {
    const response = await get<Pagination<IProductResponse>>(`home/product`, params);

    return response;
}


export {
    getProductsHomePage,
};

