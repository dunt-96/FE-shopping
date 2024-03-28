import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Loading } from '../../components/Loading/Loading'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { useDebounce } from '../../hooks/useDebounce'
import { useAppSelector } from '../../redux/hooks'
import ProductService from '../../services/ProductService'
import { WrapperBtnMore, WrapperProducts, WrapperTypeProduct } from './style'

const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Laptop']
    const searchProduct = useAppSelector((state) => state.product.searchString);
    const [loading, setLoading] = useState(false);
    const [allTypeProducts, setAllTypeProduct] = useState([]);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const [limit, setLimit] = useState(100);

    const fetchAllProduct = async (context) => {
        const limit = context && context.queryKey[1];
        const searchString = context && context.queryKey[2];

        setLoading(true);
        const res = await ProductService.getAllProduct(searchString, limit);
        setLoading(false);
        return res?.data;
    }

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

    const { isPending, isError, data: products, error, isPlaceholderData } = useQuery({
        queryKey: [
            'products',
            limit,
            searchDebounce
        ],
        queryFn: async (context) => {
            return await fetchAllProduct(context)
        },
        retry: 3,
        retryDelay: 1000,
        placeholderData: (previousData, previousQuery) => previousData,

    });


    return (
        <>
            <div style={{ width: '2150px', margin: '0 auto' }}>
                <WrapperTypeProduct >
                    {allTypeProducts.map((val, idx) => {
                        return <TypeProduct name={val} key={idx}></TypeProduct>
                    })
                    }
                </WrapperTypeProduct >

            </div >
            <div className='body' style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 84px)' }}>
                <div id='container' style={{ height: '1000px', width: '2150px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]}></SliderComponent>
                    <Loading isLoading={isPending}>
                        <WrapperProducts style={{ marginTop: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                            {products && products?.data.map(
                                (product) => {
                                    return (
                                        !(product.countInStock === 0) &&
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.desciption}
                                            image={product.image}
                                            name={product.name}
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
                    </Loading>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperBtnMore
                            onClick={() => setLimit((prev) => prev + 6)}
                            styleTextBtn={{ fontWeight: 500 }}
                            textBtn='Xem them'
                            type='out-line'
                            styleBtn={{ border: '1px solid rgb(11, 116, 229)', borderRadius: '4px', color: `${products?.total === products?.data.length ? '#ccc' : 'rgb(11, 116, 229)'}`, width: '240px', height: '38px' }}
                            disabled={(products?.total === products?.data.length) || products.totalPage === 1}
                        />
                    </div>
                    <NavbarComponent></NavbarComponent>
                </div>
            </div>

        </>
    )
}

export default HomePage