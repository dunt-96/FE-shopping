import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperBtnMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Laptop']

    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct >
                    {arr.map((val, idx) => {
                        return <TypeProduct name={val} key={idx}></TypeProduct>
                    })
                    }
                </WrapperTypeProduct >

            </div >
            <div id='container' style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px', width: '100%' }}>
                <SliderComponent arrImages={[slider1, slider2, slider3]}></SliderComponent>
                <WrapperProducts style={{ marginTop: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProducts>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperBtnMore styleTextBtn={{ fontWeight: 500 }} textBtn='Xem them' type='out-line' styleBtn={{ border: '1px solid rgb(11, 116, 229)', borderRadius: '4px', color: 'rgb(11, 116, 229)', fontWeight: '500', width: '240px', height: '38px' }} />
                </div>
                <NavbarComponent></NavbarComponent>
            </div>
        </>
    )
}

export default HomePage