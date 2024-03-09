import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';



const SliderComponent = ({ arrImages }: { arrImages: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {arrImages.map((img, idx) => {
          return (<Image src={img} alt='slider' preview={false} width={'100%'} height={'274px'} />)
        })}
      </Slider>
    </div>
  );
}


export default SliderComponent