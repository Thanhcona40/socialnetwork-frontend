import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ImageSliderModal = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (isOpen && swiperRef.current) {
      swiperRef.current.slideTo(initialIndex, 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative h-[70vh] flex items-center">
        <Swiper
          modules={[Navigation]}
          navigation
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-full max-h-full"
          style={{ width: "auto", maxWidth: "50vw" }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`img-${idx}`}
                className="h-full w-auto object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute top-12 right-1 text-white text-xl bg-black bg-opacity-60 rounded-full px-3 py-1 z-50 hover:bg-opacity-80"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageSliderModal;
