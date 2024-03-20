import { Col, Pagination, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Loading } from '../../components/Loading/Loading';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import ProductService from '../../services/ProductService';
import { WrapperNavbar, WrapperProducts } from './style';

// To parse this data:
//
//   import { Convert, Product } from "./file";
//
//   const product = Convert.toProduct(json);

export interface ProductModel {
    _id?: string;
    name?: string;
    image?: string;
    type?: string;
    price?: number;
    countInStock?: number;
    rating?: number;
    description?: string;
    discount?: null;
    selled?: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toProduct(json: string): ProductModel {
        return JSON.parse(json);
    }

    public static productToJson(value: ProductModel): string {
        return JSON.stringify(value);
    }
}


const TypeProductPage = () => {
    const { state } = useLocation();
    const onChange = () => { };
    const typeName = useParams();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [allTypeProducts, setAllTypeProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductWithType = async (type) => {
        const res = await ProductService.getAllProductWithType(type);
        if (res?.status === "OK") {
            setProducts(res?.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (state) {
            setLoading(true);
            fetchProductWithType(state);
        }
    }, [])

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
            console.log('res', res?.data);
            setAllTypeProduct(res?.data);
        }
    }

    useEffect(() => {
        fetchAllTypeProduct();
    }, [])

    console.log('typeNem', typeName.type);
    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 84px)' }}>
                <div style={{ width: '2150px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100%' }}>
                        <WrapperNavbar span={4} >
                            <NavbarComponent arr={allTypeProducts} />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {products && products?.map(
                                    (product) => {
                                        return (<CardComponent
                                            key={product?._id}
                                            countInStock={product?.countInStock}
                                            description={product?.description}
                                            image={product?.image}
                                            name={product?.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            discount={product.discount}
                                            selled={product.selled}
                                            id={product._id}
                                        ></CardComponent>)
                                    }
                                )}
                            </WrapperProducts>
                            <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>


    )
}

export default TypeProductPage