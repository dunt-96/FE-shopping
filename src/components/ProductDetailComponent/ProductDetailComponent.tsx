import {
  MinusOutlined,
  PlusOutlined,
  StarFilled
} from '@ant-design/icons'
import { Col, Image, Row } from 'antd'
import Anh from '../../assets/images/anh.jpg'
import Em from '../../assets/images/em.jpg'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleImageSmall, WrapperStyleImageSmallCol, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'

const ProductDetailComponent = () => {
  const onChange = () => { };
  return (
    <Row style={{ background: '#fff', padding: '16px', borderRadius: '4px' }}>
      <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '10px' }}>
        <Image src={Em} alt='image product' preview={false} />
        <Row style={{ marginTop: '10px', justifyContent: 'space-between' }}>
          <WrapperStyleImageSmallCol span={4}>
            <WrapperStyleImageSmall src={Anh} alt='image product' preview={false} />
          </WrapperStyleImageSmallCol>
          <WrapperStyleImageSmallCol span={4}>
            <WrapperStyleImageSmall src={Anh} alt='image product' preview={false} />
          </WrapperStyleImageSmallCol>
          <WrapperStyleImageSmallCol span={4}>
            <WrapperStyleImageSmall src={Anh} alt='image product' preview={false} />
          </WrapperStyleImageSmallCol>
          <WrapperStyleImageSmallCol span={4}>
            <WrapperStyleImageSmall src={Anh} alt='image product' preview={false} />
          </WrapperStyleImageSmallCol>
          <WrapperStyleImageSmallCol span={4}>
            <WrapperStyleImageSmall src={Anh} alt='image product' preview={false} />
          </WrapperStyleImageSmallCol>
        </Row>
        {/* <div style={{ display: 'flex' }}>
          <Image src={Anh} alt='image product' preview={false} width={300} height={200} />
          <Image src={AnhvaEm} alt='image product' preview={false} width={300} height={200} />
          <Image src={AnhvaEm} alt='image product' preview={false} width={300} height={200} />
          <Image src={AnhvaEm} alt='image product' preview={false} width={300} height={200} />
        </div> */}
      </Col>
      <Col span={14} style={{ padding: '10px' }}>
        <WrapperStyleNameProduct>das sagd asdasdasd asdsa dsad</WrapperStyleNameProduct>
        <div style={{ display: 'flex' }}>
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            200.000
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>
            Giao đến
          </span>
          <span className='address'>
            Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội -
          </span>
          <span className='change-address'>
            Đổi địa chỉ
          </span>
        </WrapperAddressProduct>
        <div>
          <div>So luong: </div>
          <WrapperQualityProduct>
            <ButtonComponent icon={<MinusOutlined style={{ color: '#000' }} />} />
            <WrapperInputNumber onChange={onChange} />
            <ButtonComponent icon={<PlusOutlined style={{ color: '#000' }} />} />
          </WrapperQualityProduct>
          {/* <input type="number" id="fname" name="fname" style={{ height: '28px', width: '32px', borderRadius: '5px', border: '1px solid #d9d9d9', margin: '0 5px 0 5px', justifyContent: 'center', textAlign: 'center' }} /> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <ButtonComponent
            size={40}
            textBtn='Chon mua'
            styleTextBtn={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            styleBtn={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '220px',
              border: 'none',
              borderRadius: '4px'
            }}
          >
          </ButtonComponent>

          <ButtonComponent
            size={40}
            textBtn='Mua tra sau'
            styleTextBtn={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}
            styleBtn={{
              background: '#fff',
              height: '48px',
              width: '220px',
              border: '1px solid rgb(13, 92, 182)',
              borderRadius: '4px'
            }}
          >
          </ButtonComponent>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailComponent