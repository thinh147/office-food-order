import { MenuOutlined } from '@ant-design/icons';
import { categoryToMenuItem } from '@components/LayoutHomepage/LayoutHeaderCategoryItem/LayoutHeaderCategoryItem';
import { useCategoriesContext } from '@context';
import { STATUS_CODE } from '@core/constant/setting';
import usePaging from '@core/hooks/pagingHook';
import { Channel } from '@core/models/order';
import { IProductRequest } from '@core/models/serverRequest';
import { IProductResponse } from "@core/models/serverResponse";
import { PRODUCT_PAGING } from '@modules/admin/config/product';
import { getProducts } from '@services/productsService';
import { Col, Menu, Pagination, Row, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import './index.scss';
import ProductItem from './ProductItem';

const { Title } = Typography;


const ProductList = () => {

  const { page } = useParams();
  const { search } = useLocation();
  const params = useParams();
  const searchValue = new URLSearchParams(search).get("search") || '';
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageProduct, setPageProduct] = useState<IProductResponse[]>([]);
  const [totals, setTotals] = useState(0);
  const { filter, pageChange, setFilter } = usePaging<IProductRequest>({ defaultRequest: getSearchQueryObject(), callback: getProduct });
  const { categories } = useCategoriesContext();

  useEffect(() => {
    if (searchValue) {
      setFilter(prev => ({
        ...prev,
       
      }));
    }
  }, [params, searchValue]);

  useEffect(() => {
    const searchQuery = getSearchQueryObject();
    setFilter(prev => ({
      ...prev,
      ...searchQuery,
      name: searchValue
    }));
  }, [searchParams]);

  function getSearchQueryObject() {
    const searchQuery = PRODUCT_PAGING;
    const categories = searchParams.get('categories')?.split('_')
      .map(id => Number(id)).filter(id => id);
    if (categories != null) {
      searchQuery.categoryId = categories;
    }
    if (page === 'all') {
      searchQuery.channel = [Channel.food, Channel.water];
    } else {
      searchQuery.channel = [Channel[page] || ''];
    }
    return searchQuery;
  }

  async function getProduct(filter: IProductRequest) {
    if (loadingPage) return;
    setLoadingPage(true);
    const { code, data } = await getProducts({...filter, key: searchValue});
    setLoadingPage(false);
    if (code === STATUS_CODE.SUCCESS) {
      setPageProduct(data.elements);
      setTotals(data.totalElements);
    }
  }
  const categoriesMenu = useMemo(() => categories
    .filter((item) => page === 'food' ? item.parentId === 1 : item.parentId === 2)
    .map(category => categoryToMenuItem(category)), 
  [categories, page]);

  const onClick = (key: string) => {
    const params = {
      ...searchParams,
      categories: key
    };
    setSearchParams(params)
  };
  
  return (
    <Row>
      {
        !searchValue && 
        <Col span={5} className='list_menu'>
          <div className='list_menu_title'>
            <MenuOutlined />
            <h5>Danh mục sản phẩm</h5>
          </div>
          <Menu
            onClick={({ key }) => onClick(key)}
            mode="vertical"
            items={categoriesMenu}
            className="categories-menu"
            selectedKeys={[searchParams.get('categories')?.replaceAll('+', ' ')]}
          />
        </Col>
      }
      
      <Col style={{ width: '2%' }}>
      </Col>
      <Col span={searchValue ? 24 : 18} className='list_item'>
        <div className='half-circle'>
        </div>
        <div className='title'>
          <Title level={5}>Danh sách sản phẩm</Title>
        </div>
        <div className='list_item_body'>
          <hr />
          <Row className='product_Item'>
            {pageProduct.map((item, index) => (
              <ProductItem
                key={index}
                {...item}
              />
            ))}
          </Row>
          {totals > 0 && <Pagination current={filter.page} onChange={(e) => pageChange(e)} total={totals} />}
        </div>
      </Col>
    </Row>
  )
}

export default ProductList