import { STATUS_CODE } from '@core/constant/setting';
import usePaging from '@core/hooks/pagingHook';
import { IProductRequest } from '@core/models/serverRequest';
import { IProductResponse } from '@core/models/serverResponse';
import { deleteProduct, getProducts } from '@services/productsService';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { columns, PRODUCT_PAGING } from '../config/product';
import AdminProductCU from './AdminProductCU';


const AdminProduct = () => {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [product, setProduct] = useState<IProductResponse | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [totals, setTotals] = useState(0);
  const { filter, pageChange, setFilter, sortChange } = usePaging<IProductRequest>({ defaultRequest: PRODUCT_PAGING, callback: getProduct });

  // useEffect(() => {
  //   getProduct(filter);
  // }, [filter]);

  async function getProduct(filter: IProductRequest) {
    const { code, data } = await getProducts(filter);
    if (code === STATUS_CODE.SUCCESS) {
      setProducts(data.elements);
      if (!totals) {
        setTotals(data.totalElements);
      }
    }
  }

  const onEdit = (data: IProductResponse) => {
    console.log(data);
    setProduct(data);
    setModal(true);
  }

  const onDelete = async ({ id }: IProductResponse) => {
    const response = await deleteProduct({ id: [id] });
    setProducts((prev) => [...prev.filter(product => product.id !== id)]);
  }

  const handleOk = (data: IProductResponse) => {
    setProducts((prev) => {
      const idx = prev.findIndex(product => product.id === data.id);
      if (idx > -1) {
        prev.splice(idx, 1, data);
      } else {
        prev.unshift(data);
        setTotals(totals => totals + 1);
      }
      return [...prev];
    })
    setModal(false);
    setProduct(null);
  }

  const onAdd = () => {
    setProduct(null);
    setModal(true);
  }

  return (
    <>
      <div className='mb-8'>
        <Button type='primary' onClick={onAdd}>Thêm Sản phẩm</Button>
      </div>
      <Table columns={columns(onEdit, onDelete)} dataSource={products}
        pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }}
        rowKey={(row) => row.id}
      />
      {modal && <AdminProductCU data={product} handleOk={handleOk} handleCancel={function (): void {
        setModal(false);
      }} />}
    </>
  )
}

export default AdminProduct