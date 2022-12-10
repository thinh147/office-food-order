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

      <h2 className="quote">FastFood - MANG ĐỒ ĂN ĐẾN VỚI MỌI NHÀ</h2>

      {/* <SaleDetails /> */}

      <GuideLine />

      <SlidesCategory products={products} />
      {/* <SlidesCategory products={products} /> */}

      {/* <Banner /> */}
      <HomepageBanner section='section2' />

      {/* <SlidesCategory products={products} /> */}
      <SlidesCategory products={products} />

      {/* <Banner /> */}
      <HomepageBanner section='section3' />

      {/* <ClientFeedback /> */}

      {/* <News /> */}

    </>
  )
}
export default Home;
