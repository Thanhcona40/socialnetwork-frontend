import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import PostImagePreview from './PostImagePreview';

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required")
});

const PostCreationForm = ({ user, onCreatePost }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = async (e) => {
    setUploadingImage(true);
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const uploadedImageUrls = await Promise.all(uploadPromises);
      const updatedImages = [...formik.values.image, ...uploadedImageUrls];
      formik.setFieldValue('image', updatedImages);
      setSelectedImages(updatedImages);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: [],
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onCreatePost(values);
      resetForm();
      setSelectedImages([]);
    }
  });

  return (
    <div className="py-3 border-b-8">
      <section className="flex flex-col sm:flex-row pt-3 px-4 sm:px-5 gap-3">
        <Avatar
          className="border-2 border-blue-500 sm:mt-3 sm:mr-2 self-start"
          src={user?.image}
        />

        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white rounded-lg p-4 shadow-lg"
        >
          <input
            type="text"
            name="content"
            className="w-full text-base sm:text-xl bg-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Write your status here?"
            {...formik.getFieldProps("content")}
          />
          {formik.errors.content && formik.touched.content && (
            <span className="text-red-500 text-sm">{formik.errors.content}</span>
          )}

          <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <label className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <ImageOutlinedIcon className="text-base sm:text-lg" />
              <span className="text-sm sm:text-base">Upload an Image</span>
              <input
                onChange={handleImageChange}
                type="file"
                multiple
                name="file"
                className="hidden"
                disabled={uploadingImage}
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 text-sm sm:text-base"
              disabled={uploadingImage}
            >
              {uploadingImage ? 'Uploading...' : <SendOutlinedIcon fontSize="small" />}
            </button>
          </div>
        </form>
      </section>

      {selectedImages.length > 0 && (
        <PostImagePreview
          images={selectedImages}
          onRemove={(index) => {
            setSelectedImages(prev => prev.filter((_, i) => i !== index));
            formik.setFieldValue(
              "image",
              formik.values.image.filter((_, i) => i !== index)
            );
          }}
        />
      )}
    </div>
  );
};

export default PostCreationForm;