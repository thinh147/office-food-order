import "./index.scss";
import { Carousel, Skeleton } from "antd";
import { useAdvertisementSetting } from "@context/propertyContext/config";
import { IAdvertisementSetting } from "@core/models/config";

interface Props {
  section: keyof Omit<IAdvertisementSetting, 'id'>
}

const HomepageBanner = ({ section }: Props) => {
  const advertisement = useAdvertisementSetting();
  const propsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  if (!advertisement[section] || !advertisement[section].length) {
    return <Skeleton />
  }
  return (
    <Carousel {...propsSlider}>
      {advertisement[section].map((url) => (
        <div className="main-intro-banner" key={url}>
          <img
            src={ 'https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cefeb46a.jpg' }
            alt="Main Banner"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HomepageBanner;
