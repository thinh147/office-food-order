import React from "react";
import { useNavigate } from "react-router-dom";
import './index.scss'

interface ISlidesItem {
  imageUrl: string;
  name: string;
  price: number;
  url: string
}

const SlidesItem = ({ imageUrl, price, name, url }: ISlidesItem): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="item" onClick={() => navigate(url)}>
      <div className="number-sold-in-month">
        <p>Giá: {price}</p>
      </div>

      <div className="wrapper-img">
        <img
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="product-name">
        <h3>{name}</h3>
      </div>
      <div className="badge-top"></div>
    </div>
  );
};

export default SlidesItem;
