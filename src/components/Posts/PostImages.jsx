import { useState } from "react";
import ImageSliderModal from "../HomeSection/ImageSliderModal"; // import component mới


const PostImages = ({ images }) => {
    const [showSlider, setShowSlider] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const handleClickImage = (index) => {
      setSelectedIndex(index);
      setShowSlider(true);
    };
  
    const renderImages = () => {
      if (images.length === 1) {
        return (
          <div className="w-full max-h-[400px] overflow-hidden rounded-lg">
            <img
              src={images[0]}
              alt="post-img"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleClickImage(0)}
            />
          </div>
        );
      }
  
      if (images.length === 2) {
        return (
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-hidden">
            {images.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`img-${idx}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleClickImage(idx)}
                />
              </div>
            ))}
          </div>
        );
      }
  
      if (images.length === 3) {
        return (
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-hidden">
            <div className="col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={images[0]}
                alt="img-0"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleClickImage(0)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={images[1]}
                  alt="img-1"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleClickImage(1)}
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={images[2]}
                  alt="img-2"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleClickImage(2)}
                />
              </div>
            </div>
          </div>
        );
      }
  
      return (
        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-hidden relative">
          {images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg relative">
              <img
                src={img}
                alt={`img-${idx}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleClickImage(idx)}
              />
              {idx === 3 && images.length > 4 && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-60 text-white text-2xl font-bold flex items-center justify-center cursor-pointer"
                  onClick={() => handleClickImage(3)}
                >
                  +{images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <div className="mt-5">
        {renderImages()}

        <ImageSliderModal
            images={images}
            isOpen={showSlider}
            onClose={() => setShowSlider(false)}
            initialIndex={selectedIndex}
        />
    </div>
    );
  };
  
  export default PostImages;