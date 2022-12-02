import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { Button, Carousel, Col, Row, Typography } from 'antd';
import PromotionServices from "@core/common/PromotionServices";
// import '@modules/product/index.scss';

const ProductDentailInfo = () => {

    return (
        <div>
            <div className='product_infomation_page_heder'>
                <div className='product_infomation_page_hederr' style={{ fontWeight: "bold" }}>Người bán: Amazon.co.jp</div>
                <div className='product_infomation_page_hederr'>
                    <AiFillStar color='#ffc107' />
                    <AiFillStar color='#ffc107' />
                    <AiFillStar color='#ffc107' />
                    <AiFillStar color='#ffc107' />
                    <AiFillStar color='#ffc107' /></div>
                <div className='product_infomation_page_hederr'>100% đánh giá uy tín</div>
            </div>
            <div className='product_infomation_page_body'>
                <div className='product_infomation_page_body_info'>xem trên: Amazon
                </div>
            </div>
            <div className='product_infomation_page_body_two'>
                <div style={{ fontWeight: "bold" }}>Hỗ trợ khách hàng</div>
                <div style={{ fontWeight: "bold" }}>1900 292 995</div>
                <div>cskh@hanaichi.vn</div>
                <div> Hướng dẫn mua hàng</div>
                <div>Đổi trả xuyên biên giới</div>
                <div>Quy trình giao hàng của Hanaichi</div>
            </div>
            <div className='product_infomation_page_body_three'>
                <div style={{ fontWeight: "bold", fontSize: '15px', marginBottom: '20px' }}>DUY NHẤT TẠI HANAICHI</div>
                <Carousel autoplay dots={false}>
                    {PromotionServices.slice(0, PromotionServices.length).map((item, index) => (
                        <div key={index}>
                            <div style={{ fontSize: '15px', color: '#c6b600' }}> {item.title}</div>
                            <div style={{ fontSize: '10px' }}>{item.content}</div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default ProductDentailInfo