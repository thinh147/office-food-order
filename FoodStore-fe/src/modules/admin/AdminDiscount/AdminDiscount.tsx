import { DEFAULT_VOUCHER_REQUEST } from '@core/constant/form';
import { STATUS_CODE } from '@core/constant/setting';
import usePaging from '@core/hooks/pagingHook';
import { IVoucherCRUD, IVoucherRequest } from '@core/models/serverRequest';
import { IVoucherResponse } from '@core/models/serverResponse';
import { getVoucher } from '@services/voucherService';
import { Button, Col, Input, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import '../AdminFastOrder/index.scss';
import { columns } from '../config/voucher';
import AdminDiscountCU from './AdminDiscountCU';


const AdminDiscount = () => {
  const { Search } = Input;
  const [voucher, setVoucher] = useState<IVoucherResponse[]>([]);
  const [addVoucher, setAddVoucher] = useState<IVoucherCRUD | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [totals, setTotals] = useState(0);
  const { filter, setFilter } = usePaging({
    defaultRequest: DEFAULT_VOUCHER_REQUEST,
    callback: getVoucherList.bind(this)
  })


  async function getVoucherList(filter: IVoucherRequest) {
    const { code, data } = await getVoucher(filter);
    if (code === STATUS_CODE.SUCCESS) {
      console.log(data);

      setVoucher(data.elements);
      if (!totals) {
        setTotals(data.totalElements);
      }
    }
  }

  const onSearch = (value: string) => {
    setFilter(prev => ({
      ...prev,
      code: value
    }));
  }
  const handleOk = (data: IVoucherResponse) => {
    console.log("ok vkl", data);


  }
  const editVoucher = (data: any) => {
    setAddVoucher(data);
    setModal(true);
  }

  const addNewVoucher = () => {
    setModal(true);
    setAddVoucher(null);
  }
  const deleteVoucher = () => {
    console.log("delete fake");

  }
  return (
    <>
      <div className='mb-8'>
        <Row>
          <Col span={7}>
            <Button type='primary' icon={<IoAdd />} onClick={addNewVoucher} >Thêm mới</Button>
          </Col>
        </Row>

      </div>
      <Table columns={columns(deleteVoucher, editVoucher)} dataSource={voucher} pagination={{ position: ['bottomRight'], total: totals, pageSize: filter.size }} />
      {modal && <AdminDiscountCU
        data={addVoucher} handleOk={handleOk} handleCancel={function (): void {
          setModal(false);
        }}
      />}
    </>
  )
}

export default AdminDiscount