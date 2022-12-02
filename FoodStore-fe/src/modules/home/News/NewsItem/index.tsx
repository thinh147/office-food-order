import React from "react";

interface INewsItem {
  image_url: string;
  forward: string;
  name: string;
}

const NewsItem = ({image_url ,forward,name } : INewsItem) => {
  return (
    <div className="slide-item">
      <div className="image-intro-wrapper">
        <img
          src={image_url}
          alt={name}
        />
      </div>
      <div className="name-news">
        <p>{name}</p>
      </div>
      <div className="see-more">
        <h2>ĐỌC THÊM</h2>
      </div>
    </div>
  );
};

export default NewsItem;
