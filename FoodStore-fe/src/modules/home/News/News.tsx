import React from "react";
import { Carousel } from "antd";
import { MdNavigateNext } from "react-icons/md";
import { CarouselRef } from "antd/lib/carousel";
import NewsItem from "./NewsItem";
import NewData from "@core/common/news";
import './index.scss'

const News = () => {
  const propsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const carouselRef: React.RefObject<CarouselRef> =
    React.createRef<CarouselRef>();

  const handleClickPrev = () => {
    carouselRef?.current?.prev();
  };

  const handleClickNext = () => {
    carouselRef?.current?.next();
  };

  const carouselLimitation = Math.ceil(NewData.length / 4);

  return (
    <div className="wrapper-news">
      <div className="news-intro">
        <h2> TIN TỨC</h2>
      </div>
      <div className="slider">
        <div className="arrow prev" onClick={handleClickPrev}>
          <MdNavigateNext className="icon icon-prev" />
        </div>
        <div className="arrow next" onClick={handleClickNext}>
          <MdNavigateNext className="icon icon-next" />
        </div>

        <Carousel {...propsSlider} ref={carouselRef}>
          {Array.from(Array(carouselLimitation).keys()).map((i) => (
            <div className="wrapper-slide-items" key={`${i}+carousel-pro`}>
              {NewData.slice(0 + i * 4, i * 4 + 4).map((item, index) => (
                <NewsItem
                  key={`${index}+${item.name}`}
                  image_url={item.image_url}
                  name={item.name}
                  forward={item.forward}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default News;
