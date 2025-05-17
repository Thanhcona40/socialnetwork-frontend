import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { motion, AnimatePresence } from "framer-motion";
import ImageSliderModal from "./ImageSliderModal";
import { useState } from "react";

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-10 hover:bg-opacity-80"
  >
    <CancelOutlinedIcon style={{ fontSize: 16 }} />
  </button>
);

const PostImagePreview = ({ images, onRemove }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleClickImage = (index) => {
    setSelectedIndex(index);
    setShowSlider(true);
  };

  const motionProps = {
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25 },
    layout: true,
  };
  
  const renderImageItem = (img, idx, width = 150, height = 200, isLast = false) => (
    <motion.div
      key={img + idx}
      {...motionProps}
      whileHover={{
        rotate: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.4 },
      }}
      className={`relative overflow-hidden rounded-md`}
      style={{ width, height }}
    >
      <img
        src={img}
        alt={`img-${idx}`}
        className={`w-full h-full object-cover cursor-pointer ${isLast ? "opacity-60" : ""}`}
        onClick={() => handleClickImage(idx)}
      />
      <DeleteButton onClick={() => onRemove(idx)} />
      {isLast && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold rounded-md">
          +{images.length - 4}
        </div>
      )}
    </motion.div>
  );

  const renderImages = () => {
    const length = images.length;
  
    if (length === 1) {
      return (
        <div className="flex justify-center">
          <AnimatePresence>
            {renderImageItem(images[0], 0)}
          </AnimatePresence>
        </div>
      );
    }
  
    if (length === 2) {
      return (
        <div className="flex justify-center gap-2">
          <AnimatePresence>
            {images.map((img, idx) => renderImageItem(img, idx))}
          </AnimatePresence>
        </div>
      );
    }
  
    if (length === 3) {
      return (
        <div className="flex justify-center gap-2">
          <AnimatePresence>
            {renderImageItem(images[0], 0)}
            <div className="flex flex-col gap-2">
              {[1, 2].map((idx) =>
                renderImageItem(images[idx], idx, 150, 96)
              )}
            </div>
          </AnimatePresence>
        </div>
      );
    }
  
    // 4 ảnh trở lên
    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-2">
          <AnimatePresence>
            {images.slice(0, 4).map((img, idx) =>
              renderImageItem(img, idx, 150, 150, idx === 3 && images.length > 4)
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mt-4">{renderImages()}</div>
      <ImageSliderModal
        images={images}
        isOpen={showSlider}
        onClose={() => setShowSlider(false)}
        initialIndex={2}
      />
    </div>
     );
};

export default PostImagePreview;
