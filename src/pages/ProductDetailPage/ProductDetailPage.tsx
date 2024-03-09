import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { Col, Row } from 'antd'

const ProductDetailPage = () => {
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <h4>Trang Chu</h4>
            <ProductDetailComponent></ProductDetailComponent>
        </div>

    )
}

export default ProductDetailPage