import React from "react";
import { Row, Col } from "antd";
import "./index.scss";
import ProviderItem from "./ProviderItem";

const provider_data = [
  {
    name: "Rakuten",
    img_src:
      "https://hanaichi.vn/storage/app/media/hanaichi-japan/20190724104221.png",
    describe: "Sàn thương mại điện tử Rakuten",
    link: "https://www.rakuten.co.jp/",
  },
  {
    name: "Yahoo! Mua sắm",
    img_src:
      "https://hanaichi.vn/storage/app/media/hanaichi-japan/20190724104235.png",
    describe: "Sàn thương mại điện tử Yahoo! Nhật Bản",
    link: "https://shopping.yahoo.co.jp/",
  },
  {
    name: "Amazon",
    img_src:
      "https://hanaichi.vn/storage/app/media/hanaichi-japan/20190724104241.png",
    describe: "Sàn thương mại điện tử Amazon Nhật Bản",
    link: "https://www.amazon.co.jp/",
  },
  {
    name: "Mua",
    img_src:
      "https://hanaichi.vn/storage/app/media/hanaichi-japan/20190808104358.png",
    describe:
      "Chợ trời Online, nơi bạn có thể trả giá cho sản phẩm mình muốn mua",
    link: "https://jp.mercari.com/",
  },
  // {
  //   name: "",
  //   img_src:
  //     "",
  //   describe: "",
  // },
];

const Provider = () => {
  return (
    <div className="provider-wrapper">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {provider_data.map((ele, index) => (
          <ProviderItem key={`${index}+${ele.name}`} {...ele} />
        ))}
      </Row>
    </div>
  );
};


export default Provider;
