interface IAddressItem {
  id: string;
  isDefault: boolean;
  detail_address: string;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
}

interface IWard {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

interface IDistrict {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  province_code: number;
  wards: IWard[] | null;
}

interface IProvince {
  name: string;
  code: number;
  division_type: string;
  phone_code: number;
  codename: string;
  districts: IDistrict[] | null;
}

type IProvinces = IProvince[];

interface IPaymentMethod {
  id: number,
  bank_name: string,
  bank_image: string,
  account_number: string,
  account_owner: string,
  bank_branch: string,
}



interface IRequestItemCustom {
  id: string,
  link_to_product: string,
  color: string,
  size: string,
  quantity: number,
  price_as_jyen: number,
  include_tax: number,
  sale_of: number,
  note: string
}

export type { IAddressItem, IWard, IDistrict, IProvince, IProvinces, IPaymentMethod, IRequestItemCustom };
