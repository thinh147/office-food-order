import { useAuthContext } from '@context';
import { STATUS_CODE } from '@core/constant/setting';
import { IProductResponse } from '@core/models/serverResponse';
import { Role } from '@core/models/user';
import GuideLine from '@modules/home/GuideLine';
import SlidesCategory from '@modules/home/SlidesCategory';
import { getProductsHomePage } from '@services/homepageService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomepageBanner from './HomepageBanner';
import { AiOutlineStar } from 'react-icons/ai';

import pic1 from '../../assets/image/pic1.png';
import pic2 from '../../assets/image/pic2.png';
import pic3 from '../../assets/image/pic3.png';
import bannerFeedback from '../../assets/image/banner-feedback.jpg';

import './index.scss'

const Home = () => {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const { auth: { user: { role } }, } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '' || location.pathname === '/' && role === Role.ADMIN) {
      navigate('/admin');
    }
    if(location.pathname === '' || location.pathname === '/' && role === Role.SHIPPER){
      navigate('/shipper')
    }
  }, [])
  useEffect(() => {
    const getListProduct = async () => {
      const { code, data } = await getProductsHomePage({ limit: 4 });
      if (code === STATUS_CODE.SUCCESS) {
        setProducts(data.elements);
        // product = data.elements;
      }
    }
    getListProduct()
  }, []);


  return (
    <>
      {/* <Provider /> */}

      <HomepageBanner section='section1' />

      {/* <Guarantee /> */}

      <h2 className="quote">OfficeFood - MANG ĐỒ ĂN ĐẾN VỚI MỌI VĂN PHÒNG</h2>
      <div className='three-point-item container'>
        <div className='point-item'>
          <img src={pic1} alt="" />
          <div className='content'>
            <h3 className='title'>CHÚNG TÔI HỖ TRỢ 24/7</h3>
            <p className='sub-content'>Chúng tôi luôn sẵn sàng bất kỳ lúc nào bạn thắc mắc và thông thường mỗi ngày</p>
          </div>
        </div>
        <div className='point-item'>
          <img src={pic2} alt="" />
          <div className='content'>
            <h3 className='title'>ĐẢM BẢO & CHẤT LƯỢNG</h3>
            <p className='sub-content'>Chúng tôi luôn cung cấp thực phẩm sạch và chất lượng tốt nhất cho bạn.</p>
          </div>
        </div>
        <div className='point-item'>
          <img src={pic3} alt="" />
          <div className='content'>
            <h3 className='title'>VẬN CHUYỂN TẬN NƠI</h3>
            <p className='sub-content'>Giao tận nơi nhanh chóng các khu vực nội thành, Vui lòng liên hệ chúng tôi !</p>
          </div>
        </div>
      </div>

      <SlidesCategory products={products} />
      {/* <SlidesCategory products={products} /> */}

      {/* <Banner /> */}
      <HomepageBanner section='section2' />

      {/* <SlidesCategory products={products} /> */}
      <SlidesCategory products={products} />

      <div className='customer-feedback'>
        <img src={bannerFeedback} alt="" />
        <div className='content'>
          <h3>Tầm nhìn, sứ mệnh, giá trị cốt lõi</h3>
          <div className='sub-content'>
            <p>Tầm nhìn: </p>
            <p>Trở thành thương hiệu chuyên cung cấp cơm trưa văn phòng hàng đầu TP. Hồ Chí Minh.</p>
          </div>
          <div className='sub-content'>
            <p>Sứ mệnh: </p>
            <p>Nâng cao chất lượng thực phẩm, chất lượng cuộc sống của người Việt.</p>
          </div>
          <div className='sub-content'>
            <p>Giá trị cốt lõi: </p>
            <p>Với phương châm “NGON - SẠCH - AN TOÀN CHẤT LƯỢNG”</p>
          </div>
          <div className='sub-icon'>
            <AiOutlineStar className='star-icon'/>
            <p>NGON là yếu tố quan trọng bậc nhất mà chúng tôi mang đến cho khách hàng. Đầu bếp với nhiều năm kinh nghiệm ẩm thực, chúng tôi mang đến những món cơm NGON, phù hợp với khẩu vị và những dịch vụ TỐT nhất cho khách hàng.</p>
          </div>
          <div className='sub-icon'>
            <AiOutlineStar className='star-icon'/>
            <p>SẠCH: Toàn bộ món ăn đều dùng nước từ máy lọc nước chất lượng. Chúng tôi luôn ưu tiên nguyên liệu thiên nhiên và nguồn gốc rõ ràng</p>
          </div>
          <div className='sub-icon'>
            <AiOutlineStar className='star-icon'/>
            <p>AN TOÀN CHẤT LƯỢNG: Bếp sử dụng hộp giấy thân thiện môi trường. Chúng tôi cam kết hoàn toàn không dùng hóa chất, phẩm màu, không lạm dụng bột ngọt và tuân thủ vệ sinh an toàn thực phẩm.</p>
          </div>
        </div>
      </div>

      <GuideLine />


      {/* <ClientFeedback /> */}

      {/* <News /> */}

    </>
  )
}
export default Home;
