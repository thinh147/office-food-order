import { SortType } from "@core/models/config";
import { PagingRequest } from "@core/models/serverRequest";
import { useEffect, useState } from "react";

const DEFAULT_FILTER: PagingRequest = {
  page: 0,
  size: 20,
  sortType: SortType.id
};

interface PagingHookParams<T> {
  callback: (filter: T) => Promise<void>;
  defaultRequest: T;
}

const usePaging = <T extends Partial<PagingRequest>>({ defaultRequest, callback }: PagingHookParams<T>) => {
  const [filter, setFilter] = useState<T>({
    ...DEFAULT_FILTER,
    ...defaultRequest
  });

  useEffect(() => {
    callback(filter);
  }, [filter]);

  const pageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
    // callback(filter);
  }

  const sortChange = (sortType: SortType) => {
    setFilter((prev) => ({ ...prev, sortType }));
    // callback(filter);
  }

  return {
    pageChange,
    sortChange,
    filter,
    setFilter
  };
}

export default usePaging;