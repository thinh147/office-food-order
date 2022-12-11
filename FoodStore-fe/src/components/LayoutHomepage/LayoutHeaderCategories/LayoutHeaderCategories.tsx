import MercariImg from "@assets/image/mercari.png";
import useCategoriesContext from "@context/categoriesContext/config";
import React from "react";
import { MdEmojiFoodBeverage, MdFastfood } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LayoutHeaderCategoryItem from "../LayoutHeaderCategoryItem";
import style from "./index.module.scss";
import { useAuthContext } from "@context";
import { message } from "antd";

const LayoutHeaderCategories = () => {
  const { getMainCategories } = useCategoriesContext();
  const navigation = useNavigate();
  const {
    auth: { token },
  } = useAuthContext();

  const food = getMainCategories().filter(
    (category) => category.channel === "Do_an"
  );
  const water = getMainCategories().filter(
    (category) => category.channel === "Thuc_uong"
  );
  const isLogin = token !== "";
  const fastOrderHandler = () => {
    if (!isLogin) {
      message.error("Bạn phải đặng nhập để sử dụng tính năng này");
      return;
    }
    navigation(`order/fast-order`);
  };

  return (
    <div className={style["categories-wrapper"]}>
      <LayoutHeaderCategoryItem page="home">
        <Link to={""} className={style["link"]}>
          <div className={style["category"]}>
            <span>Trang chủ</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      <LayoutHeaderCategoryItem page="detai">
        <Link to={"/about-us"} className={style["link"]}>
          <div className={style["category"]}>
            <span>Giới thiệu</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      <LayoutHeaderCategoryItem categories={food} page="food">
        <Link to={"product/food"} className={style["link"]}>
          <div className={style["category"]}>
            <span>Đồ ăn</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      <LayoutHeaderCategoryItem categories={water} page="water">
        <Link to={`product/water`} className={style["link"]}>
          <div className={style["category"]}>
            <span>Thức uống</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      <LayoutHeaderCategoryItem page="contact">
        <Link to={"/contact-us"} className={style["link"]}>
          <div className={style["category"]}>
            <span>Liên hệ</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
    </div>
  );
};

export default LayoutHeaderCategories;
