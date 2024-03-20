import { Col, Pagination, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Loading } from '../../components/Loading/Loading';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppSelector } from '../../redux/hooks';
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
    const typeName = useParams();
    let [products, setProducts] = useState<ProductModel[]>([]);
    const [allTypeProducts, setAllTypeProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentType, setCurrentType] = useState(state);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 3,
        total: 1,
    });

    const searchString = useAppSelector((state) => state.product.searchString);
    const searchDebounce = useDebounce(searchString, 500);

    const fetchProductWithType = async (type, page, limit) => {
        const res = await ProductService.getAllProductWithType(type, page, limit);
        if (res?.status === "OK") {
            setProducts(res?.data);
            setPaginate({
                ...paginate,
                total: res?.total
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        if (currentType) {
            setLoading(true);
            fetchProductWithType(currentType, paginate.page, paginate.limit);
        }
    }, [paginate.page, currentType])

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === "OK") {
            setAllTypeProduct(res?.data);
        }
    }

    useEffect(() => {
        fetchAllTypeProduct();
    }, [])

    const onChange = (number, pagSize) => {
        setPaginate({
            ...paginate,
            page: --number
        })
    };

    const handleOnClickNavType = (type) => {
        setCurrentType(type);
    }

    return (
        <Loading isLoading={loading}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 84px)' }}>
                <div style={{ width: '2150px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100%', width: '100%' }}>
                        <WrapperNavbar span={4} >
                            <NavbarComponent currentSelectedType={currentType} onClick={handleOnClickNavType} arr={allTypeProducts} />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {products?.filter((prod) => {
                                    if (searchString === '') {
                                        return prod;
                                    } else if (prod?.name?.toLocaleLowerCase().includes(searchDebounce?.toLocaleLowerCase())) {
                                        return prod;
                                    }
                                })?.map(
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
                            <Pagination showQuickJumper={false} defaultPageSize={paginate.limit} defaultCurrent={paginate.page + 1} total={paginate.total} onChange={(number, pagSize) => onChange(number, pagSize)} style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }} />
                        </Col>
                    </Row>
                </div>
            </div >
        </Loading>

    )
}

export default TypeProductPage