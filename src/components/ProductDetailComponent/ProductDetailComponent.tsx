import {
  MinusOutlined,
  PlusOutlined,
  StarFilled
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Col, Image, Row } from 'antd'
import { useState } from 'react'
import Anh from '../../assets/images/anh.jpg'
import { useAppSelector } from '../../redux/hooks'
import ProductService from '../../services/ProductService'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleImageSmall, WrapperStyleImageSmallCol, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'

const ProductDetailComponent = ({ productId }) => {
  const user = useAppSelector((state) => state.user);
  let [quantity, setQuantity] = useState(0);

  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  const getProductDetail = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if (id) {
      const res = await ProductService.getDetailProduct(productId);
      return res;
    }
  }



  const { isPending, data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: (context) => getProductDetail(context),
    enabled: !!productId
  });

  const renderStart = () => {
    const htmlList = [];
    // for (let index = 0; index < product?.data.rating; index++) {
    //   htmlList.push(<StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />);
    // }
    return Array.from(
      { length: product?.data.rating },
      (_, i) => (
        <StarFilled key={i} style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
      )
    );
  }


  const decreaseQuantity = () => {
    setQuantity(--quantity);
  }

  const handleChangeIncrease = () => {
    setQuantity(++quantity);
  }

  return (
    <Row style={{ background: '#fff', padding: '16px', borderRadius: '4px' }}>
      <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '10px' }}>
        <Image src={product?.data.image} alt='image product' preview={false} />
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
        <WrapperStyleNameProduct>{product?.data.name}</WrapperStyleNameProduct>
        <div style={{ display: 'flex' }}>
          {product && renderStart()}
          {/* <Rate allowHalf defaultValue={product?.data.rating} /> */}
          {/* {renderStart()} */}
          {/* <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
          <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} /> */}
          <WrapperStyleTextSell>| Da ban ${product?.data.selled}</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {product?.data.price}
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>
            Giao đến
          </span>
          <span className='address'>
            {user?.address}
          </span>
          <span className='change-address'>
            Đổi địa chỉ
          </span>
          <div style={{ borderBottom: '1px solid #cecece', marginTop: '15px' }}></div>
        </WrapperAddressProduct>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>Số lượng: </div>
          <WrapperQualityProduct>
            <ButtonComponent onClick={decreaseQuantity} icon={<MinusOutlined style={{ color: '#000', cursor: 'pointer' }} />} />
            <WrapperInputNumber onChange={onChange} value={quantity} />
            <ButtonComponent onClick={handleChangeIncrease} icon={<PlusOutlined style={{ color: '#000', cursor: 'pointer' }} />} />
          </WrapperQualityProduct>
          <div style={{ borderBottom: '1px solid #cecece', marginTop: '15px' }}></div>
          {/* <input type="number" id="fname" name="fname" style={{ height: '28px', width: '32px', borderRadius: '5px', border: '1px solid #d9d9d9', margin: '0 5px 0 5px', justifyContent: 'center', textAlign: 'center' }} /> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <ButtonComponent
            size={40}
            // onClick={decreaseQuantity}
            textBtn='Chọn mua'
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
            onClick={handleChangeIncrease}
            textBtn='Mua trả sau'
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