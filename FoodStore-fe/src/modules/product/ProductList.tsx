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
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import './index.scss';
import ProductItem from './ProductItem';

const { Title } = Typography;


const ProductList = () => {

  const { page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageProduct, setPageProduct] = useState<IProductResponse[]>([]);
  const [totals, setTotals] = useState(0);
  const { filter, pageChange, setFilter } = usePaging<IProductRequest>({ defaultRequest: getSearchQueryObject(), callback: getProduct });

  const { categories } = useCategoriesContext();

  useEffect(() => {
    // searchParams.forEach(value => console.log(value));
    const searchQuery = getSearchQueryObject();
    setFilter(prev => ({
      ...prev,
      ...searchQuery
    }));
  }, [searchParams]);


  function getSearchQueryObject() {
    const searchQuery = PRODUCT_PAGING;
    const categories = searchParams.get('categories')?.split('_')
      .map(id => Number(id)).filter(id => id);
    if (categories != null) {
      searchQuery.categoryId = categories;
    }
    // if (page === 'all') {
    //   searchQuery.channel = [Channel.amazon, Channel.mercari];
    // } else {
    //   searchQuery.channel = [page || ''];
    // }
    return searchQuery;
  }

  async function getProduct(filter: IProductRequest) {
    if (loadingPage) return;
    setLoadingPage(true);
    const { code, data } = await getProducts(filter);
    setLoadingPage(false);
    if (code === STATUS_CODE.SUCCESS) {
      setPageProduct(data.elements);
      setTotals(data.totalElements);
    }
  }

  const categoriesMenu = useMemo(() => categories.map(category => categoryToMenuItem(category)), [categories, page])

  const onClick = (key: string) => {
    console.log(key)
    const params = {
      ...searchParams,
      categories: key
    };
    setSearchParams(params)
  };

  return (
    <Row>
      <Col span={5} className='list_menu'>
        <div className='list_menu_title'>
          <MenuOutlined />
          <h5>Danh mục sản phẩm</h5>
        </div>
        <Menu
          onClick={({ key }) => onClick(key)}
          mode="vertical"
          items={categoriesMenu}
        />
      </Col>
      <Col style={{ width: '2%' }}>
      </Col>
      <Col span={18} className='list_item'>
        <div className='half-circle'>
        </div>
        <div className='title'>
          <Title level={5}>Thông tin cá nhân</Title>
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
          {totals > 0 && <Pagination current={filter.page} onChange={(e) => pageChange(e)} defaultCurrent={1} total={totals} />}
        </div>
      </Col>
    </Row>
  )
}

export default ProductList