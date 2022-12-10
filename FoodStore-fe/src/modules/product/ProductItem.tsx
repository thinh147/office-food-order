import { ShoppingCartOutlined } from '@ant-design/icons';
import { CHANNEL_FORM } from '@core/constant/form';
import { CurrencyWithCommas } from '@core/helpers/converter';
import { Channel } from '@core/models/order';
import { IProductResponse } from '@core/models/serverResponse';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './index.scss';

// import style from './index.module.scss'

type ProductItem = IProductResponse;

const mapper = CHANNEL_FORM.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.label }), {} as { [key in Channel]: string })

const ProductItem = ({ imageUrl, price, name, id, channel, percentDiscount }: ProductItem) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${id}`);
	};

	return (
		<Col span={8} className='product_Item_information pointer' onClick={handleClick}>
			<div className='image'><img src={imageUrl} alt="" /></div>
			<Row className='meta-field'>
				<div className='meta-field-col-1'>
					<div className='meta-star' >
						<AiFillStar color='#ffc107' />
						<AiFillStar color='#ffc107' />
						<AiFillStar color='#ffc107' />
						<AiFillStar color='#ffc107' />
						<AiFillStar color='#ffc107' />
					</div>
					<div className='meta-comment' >bình luận </div>
				</div>
				<div className='meta-field-col-2'> Từ {mapper[channel]}</div>
			</Row>
			<div className='name'>
				{name.length > 30 ? name.slice(0, 30) + "...." : name}
			</div>
			<div>
				<div className='price'>{CurrencyWithCommas(price * (100 - (percentDiscount || 0)) / 100)} <sup>đ</sup></div>
				{percentDiscount && <div className='price text-black text-cross'>{CurrencyWithCommas(price)} <sup>đ</sup></div>}
			</div>
			<div className='price-alert'>* Chưa bao gồm phí phát sinh</div>
			<div className='product_Item_information_cart'>
				<Button type="primary" icon={<ShoppingCartOutlined />}>
					Thêm vào giỏ hàng
				</Button>
			</div>
		</Col>
	)
}

export default ProductItem