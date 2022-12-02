import { STATUS_CODE } from '@core/constant/setting';
import { ModalProps } from '@core/models/config';
import { OrderType } from '@core/models/order';
import { IOrderDetailResponse, IOrderResponse } from '@core/models/serverResponse';
import { fetchFastOrderDetail, fetchOrderDetail } from '@services/orderService';
import { message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { columnsCart } from '../config/fastOrder';

const AdminFastOrderCart = ({ data, handleCancel, handleOk }: ModalProps<IOrderResponse & { type: OrderType }, unknown>) => {
  const [detail, setDetail] = useState({} as IOrderDetailResponse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log(data);
      if (data) {
        const { type } = data;
        const response = await fetchOrderDetail(data.code, type)
        if (response.code === STATUS_CODE.SUCCESS) {
          setDetail(response.data);
          setLoading(false);
        } else {
          message.error(response.message);
        }
      }
    })()
  }, [])

  return (
    <Modal title={`Fast order item`}
      visible={true} width={700}
      onOk={() => handleOk({})}
      onCancel={handleCancel}>
      <Table columns={columnsCart} dataSource={detail.itemDetail?.elements} loading={loading} pagination={false}></Table>
    </Modal>
  )
}

export default AdminFastOrderCart