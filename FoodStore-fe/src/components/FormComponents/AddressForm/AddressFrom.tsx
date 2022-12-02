import { STATUS_CODE } from '@core/constant/setting';
import { updateItemArray } from '@core/helpers/utils';
import { IUserAddress } from '@core/models/user';
import { deleteAddress, fetchAllAddress } from '@services/userService';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaAddressBook, FaEdit, FaTrash } from 'react-icons/fa';
import AddressFormItem from './AddressFormItem';
import "./index.scss";

interface Props {
  onClickAddress: (address: IUserAddress) => void,
  addButtonWrapper?: React.ReactNode
}

const AddressFrom = ({ onClickAddress, addButtonWrapper }: Props) => {
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const [selected, setSelected] = useState<IUserAddress | null>(null);
  const [clickedAddress, setClickedAddress] = useState(-1);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // first
    getAddress();
  }, []);

  const getProvinces = async () => {
    const provinceAPI = await fetch(
      `https://provinces.open-api.vn/api/?depth=3`
    ).then((res) => res.json());
    // setProvinces(provinceAPI);
  };

  const getAddress = async () => {
    const response = await fetchAllAddress();
    if (response.code === STATUS_CODE.SUCCESS) {
      setAddress(response.data.elements);
    }
  }

  const handleDeleteAddress = async (id: number) => {
    setLoading(true);
    const response = await deleteAddress(id);
    setLoading(false);
    if (response.code === STATUS_CODE.SUCCESS) {
      setAddress(prev => prev.filter(address => address.addressId !== id));
      message.success('Xóa thành công');
    } else {
      message.error('Xóa thất bại');
    }
  }

  const updateAddress = (data: IUserAddress | null) => {
    setModal(true);
    setSelected(data);
  }

  const addButton = addButtonWrapper ?
    <div onClick={() => updateAddress(null)}>{addButtonWrapper}</div>
    : <Button type='primary'
      icon={<FaAddressBook className="icon-edit" fontSize={18} />}
      className="d-flex align-items-center gap-8" onClick={() => updateAddress(null)}>Thêm địa chỉ</Button>

  return (
    <>
      {address.length < 5 && addButton}
      {address.map((addressItem) => (
        <div className={`address-item pointer ${clickedAddress === addressItem.addressId ? 'active' : ''}`} key={addressItem.addressId} onClick={() => {
          onClickAddress(addressItem);
          setClickedAddress(addressItem.addressId);
        }}>
          <div className="name-check-box">
            <p className="name">{addressItem.name}</p>
            <div className="check-box">
              <Button type="primary" className="mr-8"
                ghost icon={<FaEdit className="icon-edit" />}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  updateAddress(addressItem);
                }} loading={loading}>
              </Button>
              <Button danger ghost icon={<FaTrash className="icon-edit" />}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleDeleteAddress(addressItem.addressId);
                }} loading={loading}>
              </Button>
            </div>
          </div>
          <div className="address-info-phone">
            <div className="address-info-phone-right">
              <p>Địa chỉ:</p>
            </div>
            <div className="address-info-phone-left">
              <p className="break-word">
                {addressItem.address}
              </p>
            </div>
          </div>
          <div className="address-info-phone">
            <div className="address-info-phone-right">
              <p>Điện thoại:</p>
            </div>
            <div className="address-info-phone-left">
              <p>{addressItem.phone}</p>
            </div>
          </div>
        </div>))
      }
      {modal && <AddressFormItem data={selected} handleCancel={() => setModal(false)} handleOk={(data) => {
        setModal(false);
        setAddress(prev => updateItemArray(data, prev, 'addressId'));
      }} />}
    </>
  )
}

export default AddressFrom;