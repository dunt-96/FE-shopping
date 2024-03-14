import { Card, Image } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {
  StarFilled,
} from '@ant-design/icons';
import logoOfficial from '../../assets/images/logo-official.png'

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 240 }}
      styles={{ body: { padding: '10px' }, header: { width: '200px', height: '200px' } }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Image src={logoOfficial} style={{ width: '89px', height: '20px', marginBottom: '10px' }} />
      <StyleNameProduct> Iphone </StyleNameProduct>
      <WrapperReportText>
        <span>4.9</span>
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)', }} />
        <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText><span style={{ marginRight: '8px' }}>1.000.000d</span> <WrapperDiscountPriceText> -5%</WrapperDiscountPriceText></WrapperPriceText>
    </WrapperCardStyle>

  )
}

export default CardComponent