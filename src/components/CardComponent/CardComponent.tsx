import {
  StarFilled,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import logoOfficial from '../../assets/images/logo-official.png';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';

const CardComponent = (props) => {
  const navigate = useNavigate();

  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled
  } = props;

  const handleDetailProduct = () => {
    navigate('/product-detail');
  }

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 240 }}
      styles={{ body: { padding: '10px' }, header: { width: '200px', height: '200px' } }}
      cover={<img alt="example" src={image}
        onClick={handleDetailProduct}
      />}
    >
      <Image src={logoOfficial} style={{ width: '89px', height: '20px', marginBottom: '10px' }} />
      <StyleNameProduct> {name} </StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)', }} />
        </span>

        <WrapperStyleTextSell>| {selled}</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText><span style={{ marginRight: '8px' }}>{price.toLocaleString()}</span> <WrapperDiscountPriceText>- {discount}</WrapperDiscountPriceText></WrapperPriceText>
    </WrapperCardStyle>

  )
}

export default CardComponent