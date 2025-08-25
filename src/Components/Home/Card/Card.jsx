import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';

const Card = () => {
  const cards = [
    {
      title: "JavaScript Developer",
      image: "https://i.ibb.co/Hy3SnXB/1-p2-P4-Zxi2-Vdp29b-Kg-Mz0i-Dg.jpg",
      description:
        "Mastering JavaScript for dynamic interactions, event-driven programming, and building real-time user experiences with modern ES6+ practices.",
    },
    {
      title: "MERN Stack Developer",
      image: "https://i.ibb.co/h1TyXcV4/8901671.jpg",
      description:
        "Building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Clean code, REST APIs, and scalability guaranteed.",
    },
    {
      title: "React Developer",
      image: "https://i.ibb.co/KjP896gk/react-starter.png",
      description:
        "Crafting component-based UIs using React.js, React Router, and hooks for fast, maintainable, and interactive web apps.",
    },
    {
      title: "Redux Toolkit ",
      image: "https://i.ibb.co/zWp07PwB/2b750a26.webp",
      description:
        "Efficiently managing app state using Redux Toolkit with slices, async thunks, and scalable architecture for modern applications.",
    },
  ];

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="max-w-screen-xl mx-auto my-14 px-4 md:px-6"
    >
      <h2 data-aos="zoom-in" className="text-3xl md:text-4xl font-bold text-center mb-10 uppercase  text-white drop-shadow-md">
        Technologies I Work With
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="flex justify-center pb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full h-[400px] max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-4 bg-white/10 backdrop-blur-2xl border border-white/30 shadow-xl transition-all duration-300"
            >
              {!loadedImages[index] && (
                <Skeleton
                  height={160}
                  width="100%"
                  borderRadius={10}
                  baseColor="#2c2c3a"
                  highlightColor="#4338ca"
                  className="mb-6"
                />
              )}
              <img
                src={card.image}
                alt={card.title}
                onLoad={() => handleImageLoad(index)}
                className={`rounded-lg w-full h-40 object-cover mb-6 transition-opacity duration-700 ${
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ filter: 'drop-shadow(0 0 8px rgba(147, 112, 219, 0.8))' }}
              />
              <h3 className="text-xl font-semibold text-center  mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-center  leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Card;
