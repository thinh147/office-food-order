import React, { useState } from 'react'
import { Row, Col, Button, Typography } from 'antd';
import { Table } from 'antd';
import { Menu } from 'antd';
import ProductItem from '@modules/product/ProductItem';
import './index.scss';
const { Text, Title } = Typography;


const ProductCategory = () => {
    const [isProfile, setisProfile] = useState(0)
    const handleClick = (info: any) => {
        setisProfile(info.key);
    };
    return (
        <div className='section-body'>
            <Row className='block-head'>
                <Title level={3}>Title</Title>
                <Menu onClick={handleClick} mode="horizontal">
                    <Menu.Item key="1" >category</Menu.Item>
                    <Menu.Item key="2">category</Menu.Item>
                    <Menu.Item key="3" >category</Menu.Item>
                    <Menu.Item key="4" >category</Menu.Item>
                    <Menu.Item key="5" >category</Menu.Item>
                    <Menu.Item key="6" >category</Menu.Item>
                </Menu>
            </Row>
            <Row className='block-body'>
                <Col className='block-body-image' span={4}><p>image</p></Col>
                <Col span={20} className='block-body-item'>
                    <Row className='product_Item'>
                    {/* <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem /> */}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ProductCategory