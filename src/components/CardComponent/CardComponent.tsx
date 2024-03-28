import {
  StarFilled,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import logoOfficial from '../../assets/images/logo-official.png';
import { convertPrice } from '../../utils';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';

const CardComponent = (props) => {
  const navigate = useNavigate();

  const {
    key,
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id
  } = props;

  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  }

  const renderStar = (rating) => {
    const htmlList = [];
    // for (let index = 0; index < product?.data.rating; index++) {
    //   htmlList.push(<StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />);
    // }
    return Array.from(
      { length: rating },
      (_, i) => (
        <StarFilled key={i} style={{ fontSize: '15px', color: 'rgb(253, 216, 54)', }} />
      )
    );
  }

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 240, background: `${countInStock === 0 ? '#cecece' : null} `, cursor: `${countInStock === 0 ? 'not-allowed' : 'pointer'} ` }}
      styles={{ body: { padding: '10px', }, header: { width: '200px', height: '200px' } }}
      cover={<img alt="example" src={image}
        onClick={() => handleDetailProduct(id)}
      />}
    >
      <Image src={logoOfficial} style={{ width: '89px', height: '20px', marginBottom: '10px' }} />
      <StyleNameProduct> {name} </StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          {/* <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)', }} /> */}
          {renderStar(rating)}
        </span>

        <WrapperStyleTextSell>| {selled}</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText><span style={{ marginRight: '8px' }}>{convertPrice(price) ?? ''}</span> <WrapperDiscountPriceText>- {discount}</WrapperDiscountPriceText></WrapperPriceText>
    </WrapperCardStyle>

  )
}

export default CardComponent