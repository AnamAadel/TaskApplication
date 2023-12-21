import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';

// import required modules



function Hero() {
  const [heroProduct, setHeroProduct] = useState();
  const [productId, setProductId] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const bannerImg = useRef(null);
  const navigation = useNavigate();

  const handleHeroImage = (swiper) => {
    console.log()
    setImgIndex(swiper.activeIndex)
    bannerImg.current.classList.add("fadeOut")
    setTimeout(()=>{bannerImg.current.classList.remove("fadeOut")} ,1100)

    const id = heroProduct?.length > 0 && heroProduct[swiper.activeIndex]._id
    console.log(id)

    setProductId(id)
  }

  const handleNavigate = ()=> {
    navigation(`/products/detail/${productId}`)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://assignment-10-server-6yim5dfbc-aadelbanat8991-gmailcom.vercel.app/new_product/all");
        const data = await res.json();
        console.log(data)
        setHeroProduct(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  
  return (
    <div className="min-h-[70vh] relative ">
      <div className="flex flex-col-reverse md:flex-row justify-center gap-4">
        <div className="w-full md:w-1/2 p-8 space-y-4 bg-primary">
          <h1 className="text-5xl font-bold text-color">{heroProduct?.length > 0 && heroProduct[imgIndex].name}</h1>
          <p className="font-medium">{heroProduct?.length > 0 && heroProduct[imgIndex].description}</p>
          <p className="font-medium text-2xl"><b>Price: </b>{heroProduct?.length > 0 && heroProduct[imgIndex].price}</p>
          <button onClick={(handleNavigate)} className='btn btn-success-content border-2 border-neutral'>Buy now</button>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          direction={'vertical'}

          breakpoints={{
                0: {
                    direction: "horizontal"
                },
                768: {
                    direction: "vertical"
                }
                }}
          pagination={{
            clickable: true,
          }}
          freeMode={true}
          centeredSlides={true}
          autoplay={{ disableOnInteraction: false }}
          modules={[FreeMode, Autoplay, Navigation]}
          onSlideChange={(swiper) => handleHeroImage(swiper)}
          className="banner cursor-grab ml-6 mr-6 shadow-xl bg-[#abc0ce6b] hidden md:block "
        >
          {heroProduct?.length > 0 && heroProduct.map((item, ind) => (
            <SwiperSlide key={ind}><img src={item.image} alt="" className={imgIndex === ind ? `opacity-100` : `opacity-20`} /></SwiperSlide>

          ))}
        </Swiper>

        <div className="card bg-base-100 w-full md:w-1/2 rounded-none">
          <figure><img src={heroProduct?.length > 0 && heroProduct[imgIndex].image} alt="Shoes" className='h-[70vh] object-cover' ref={bannerImg} /></figure>
        </div>
      </div>
    </div>
  )
}

export default Hero