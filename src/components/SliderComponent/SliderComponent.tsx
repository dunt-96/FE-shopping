import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import { WrapperSliderStyle } from './stylel';



const SliderComponent = ({ arrImages }: { arrImages: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((img, idx) => {
        return (<Image key={idx} src={img} alt='slider' preview={false} width={'100%'} height={'274px'} />)
      })}
    </WrapperSliderStyle>
  );
}


export default SliderComponent