import { useParams } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
    const { id } = useParams();
    return (
        <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
            <h4>Trang - Chi tiết sản phẩm</h4>
            <ProductDetailComponent productId={id}></ProductDetailComponent>
        </div>

    )
}

export default ProductDetailPage