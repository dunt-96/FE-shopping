import { useQuery } from '@tanstack/react-query'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import ProductService from '../../services/ProductService'
import { WrapperBtnMore, WrapperProducts, WrapperTypeProduct } from './style'

const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Laptop']
    const fetchAllProduct = async () => {
        const res = await ProductService.getAllProduct();

        return res?.data;
    }
    const { isPending, isError, data: products, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetchAllProduct(),
        retry: 3,
        retryDelay: 1000
    })
    return (
        <>
            <div style={{ width: '2150px', margin: '0 auto' }}>
                <WrapperTypeProduct >
                    {arr.map((val, idx) => {
                        return <TypeProduct name={val} key={idx}></TypeProduct>
                    })
                    }
                </WrapperTypeProduct >

            </div >
            <div className='body' style={{ width: '100%', background: '#efefef' }}>
                <div id='container' style={{ height: '1000px', width: '2150px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]}></SliderComponent>
                    <WrapperProducts style={{ marginTop: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                        {/* {products.data.map(
                            (product) => {
                                return (<CardComponent
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
                                ></CardComponent>)
                            }
                        )} */}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperBtnMore styleTextBtn={{ fontWeight: 500 }} textBtn='Xem them' type='out-line' styleBtn={{ border: '1px solid rgb(11, 116, 229)', borderRadius: '4px', color: 'rgb(11, 116, 229)', width: '240px', height: '38px' }} />
                    </div>
                    <NavbarComponent></NavbarComponent>
                </div>
            </div>

        </>
    )
}

export default HomePage