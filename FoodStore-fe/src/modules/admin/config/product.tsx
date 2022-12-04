import { CurrencyWithCommas, parseJSON } from "@core/helpers/converter";
import { Channel, ICategory, IProductMetaData, SuggestPropertyProduct } from "@core/models/order";
import { IProductRequest } from "@core/models/serverRequest";
import { IProductResponse } from "@core/models/serverResponse";
import { Button, Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

export const columns = (onEdit: (data: IProductResponse) => void, onDelete: (data: IProductResponse) => void): ColumnsType<IProductResponse> => [
  {
    title: 'Thông tin sản phẩm',
    key: 'name',
    align: 'left',
    render: (row: IProductResponse) => (
      <>
        <p className="m-0"><b>Tên sản phẩm: </b>{row.name}</p>
        <p className="m-0"><b>Kênh bán: </b>{row.channel}</p>
        <p className="m-0"><b>Thương hiệu: </b>{row.trademark}</p>
        <p className="m-0"><a href={row.affiliateUrl}>Link marketing</a></p>
        <p className="m-0"><a href={row.productUrl}>Link gốc sản phẩm</a></p>
      </>
    ),
  },
  {
    title: 'Image',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (imageUrl: string) => <div style={{ width: '100px', maxHeight: '100px' }}>
      <Image src={imageUrl} alt="ảnh" style={{ width: '100%' }} />
    </div>
  },
  {
    title: 'Số lượng sản phâm',
    key: 'quantity',
    render: (row: IProductResponse) => {
      return (
        <>
          {row.metadataProperty.map((item, index) => <p key={`${item.configurationName}_${item.quantity}${item.quantity}${index}`}><b>{item.options}: </b>{item.quantity}</p>)}
        </>
      )
    }
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => CurrencyWithCommas(price, 'đ')
  },
  {
    title: 'Category',
    key: 'subCategoryName',
    dataIndex: 'subCategoryName',
    render: (row: string) => <span>{row}</span>,
  },
  {
    title: 'Discount(%)',
    key: 'discount',
    dataIndex: 'percentDiscount',
    render: (percentDiscount: number) => <span>{percentDiscount}%</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (row: IProductResponse) => (
      <div className="d-flex gap-16">
        <Button type="primary" shape="circle" onClick={() => onEdit(row)} icon={<AiFillEdit />}></Button>
        <Button danger shape="circle" onClick={() => onDelete(row)} icon={<BsFillTrashFill />}></Button>
      </div>
    ),
  },
];

export const PRODUCT_PAGING: IProductRequest = {
  key: '',
  url: '',
  updatedAtFrom: '',
  updatedAtTo: '',
  channel: [],
  trademark: [],
  categoryId: [],
}

export interface IFormProductCRUD {
  affiliateUrl: string;
  categoryId: number;
  categoryName: string;
  description: string;
  image: { originFileObj: File | string }[];
  metaDataReqs: IProductMetaData[]
  name: string;
  percentDiscount: number;
  price: number;
  productUrl: string;
  trademark: number;
  id?: number;
  // channel: Channel;
}

export const PRODUCT_FORM_DEFAULT: Partial<IFormProductCRUD> = {
  affiliateUrl: '',
  categoryId: 0,
  description: '',
  // image: [],
  metaDataReqs: [],
  name: '',
  percentDiscount: 0,
  price: 0,
  productUrl: '',
  trademark: 0,
  // channel: Channel.amazon
}

export const CONFIGURATION_NAME_SUGGEST = Object.values(SuggestPropertyProduct);