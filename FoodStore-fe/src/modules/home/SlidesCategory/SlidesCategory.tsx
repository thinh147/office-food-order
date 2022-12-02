import React, { useEffect, useMemo, useState } from "react";
import { Carousel } from "antd";
import { MdNavigateNext } from "react-icons/md";
import { CarouselRef } from "antd/lib/carousel";
import SlidesItem from "./SlidesItem";
import './index.scss'
import { IProductResponse } from "@core/models/serverResponse";

interface Props {
  products: IProductResponse[];
}

const SlidesCategory = (props: Props): JSX.Element => {
  const propsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const carouselRef: React.RefObject<CarouselRef> =
    React.createRef<CarouselRef>();

  const handleClickPrev = () => {
    setCurrentIndexCarousel((prev) => prev - 1);
    carouselRef?.current?.prev();
  };

  const handleClickNext = () => {
    setCurrentIndexCarousel((prev) => prev + 1);
    carouselRef?.current?.next();
  };

  const carouselLimitation = Math.ceil(props.products.length);

  const [currentIndexCarousel, setCurrentIndexCarousel] = useState(1);

  const [prevButtonShow, setPrevButtonShow] = useState<boolean>(false);

  const [nextButtonShow, setNextButtonShow] = useState<boolean>(false);

  useEffect(() => {
    if (currentIndexCarousel < carouselLimitation) setNextButtonShow(true);
    else setNextButtonShow(false);

    if (currentIndexCarousel > 1) setPrevButtonShow(true);
    else setPrevButtonShow(false);
  }, [currentIndexCarousel]);

  const groupProduct = useMemo(() => props.products.reduce((acc, cur, index) => {
    if (index && index % 4 === 0) {
      acc.push([cur]);
    } else {
      acc[acc.length !== 0 ? acc.length - 1 : 0].push(cur);
    }
    return acc;
  }, [[]] as IProductResponse[][]), [props.products]);

  return (
    <div className="slides-box-wrapper">
      <div className="slides-content">
        <div className="name-category-see-all">
          <div className="name-category">Danh mục</div>
          <div className="see-all">
            <a href="#">Xem tất cả {">"}</a>
          </div>
        </div>
        <div className="slide">
          <div
            className="arrow prev"
            onClick={handleClickPrev}
            style={prevButtonShow ? { display: "block" } : { display: "none" }}
          >
            <MdNavigateNext className="icon icon-prev" />
          </div>
          <div
            className="arrow next"
            onClick={handleClickNext}
            style={nextButtonShow ? { display: "block" } : { display: "none" }}
          >
            <MdNavigateNext className="icon icon-next" />
          </div>

          <Carousel {...propsSlider} ref={carouselRef}>
            {groupProduct.map((products) => (
              <div className="wrapper-items" key={products.join(',')}>
                {
                  products.map(product => (
                    <SlidesItem
                      key={product.id}
                      imageUrl={product.imageUrl}
                      name={product.name}
                      price={product.price}
                      url={`/product/${product.channel}/${product.id}`}
                    />
                  ))
                }
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SlidesCategory;
