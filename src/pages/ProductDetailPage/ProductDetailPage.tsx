import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    return (
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 84px)', margin: '0 auto' }}>
            <div style={{ width: '2150px', height: '100%', margin: '0 auto', paddingTop: '10px' }} >
                <h5 style={{ marginTop: '0 auto' }}><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm</h5>
                <ProductDetailComponent productId={id} />
            </div>
        </div>


    )
}

export default ProductDetailPage