import { React, useState } from "react";
import CustomInput from "../components/CustomInput";

// import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import { getBrands } from "../features/brand/brandSlice";
// import { getCategories } from "../features/pcategory/pcategorySlice";
// import { getColors } from "../features/color/colorSlice";

import Dropzone from "react-dropzone";
import {uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [color, setColor] = useState([]);
  // const [images, setImages] = useState([]);
  console.log(color);
  // useEffect(() => {
  //   dispatch(getBrands());
  //   dispatch(getCategories());
  //   dispatch(getColors());
  // }, []);

  // const brandState = useSelector((state) => state.brand.brands);
  // const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  // const newProduct = useSelector((state) => state.product);
  // const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  // useEffect(() => {
  //   if (isSuccess && createdProduct) {
  //     toast.success("Product Added Successfullly!");
  //   }
  //   if (isError) {
  //     toast.error("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  // useEffect(() => {
  //   // formik.values.color = color ? color : " ";
  //   formik.values.images = img;
  // }, [img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  // const handleColors = (e) => {
  //   setColor(e);
  //   console.log(color);
  // };
  return (
    <div>
      <h3 className="mb-4 title">Add Train</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Destination Place ID"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Destination Place Name"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          
          <p className=" title">Add Destination Place Image</p>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    // onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <h5 className=" title">Add Arrival Place Information</h5>
          <CustomInput
            type="text"
            label="Enter Arrival Place ID"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Arrival Place Name"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <p className=" title">Add Arrival Place Image</p>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    // onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <CustomInput
            type="text"
            label="Enter Distence"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Address"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="number"
            label="Enter Old Prices"
            name="title"
            // onChng={formik.handleChange("title")}
            // onBlr={formik.handleBlur("title")}
            // val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="number"
            label="Enter New Price"
            name="price"
            // onChng={formik.handleChange("price")}
            // onBlr={formik.handleBlur("price")}
            // val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <p className=" title">Add Other Arrival Place Image</p>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    // onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <h5 className=" title">Add Train Types</h5>
          <CustomInput
            type="number"
            label="Train Type ID"
            name="quantity"
            // onChng={formik.handleChange("quantity")}
            // onBlr={formik.handleBlur("quantity")}
            // val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <CustomInput
            type="number"
            label="Train Type"
            name="quantity"
            // onChng={formik.handleChange("quantity")}
            // onBlr={formik.handleBlur("quantity")}
            // val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <CustomInput
            type="number"
            label="Departure Time"
            name="quantity"
            // onChng={formik.handleChange("quantity")}
            // onBlr={formik.handleBlur("quantity")}
            // val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <CustomInput
            type="number"
            label="Arrival Time"
            name="quantity"
            // onChng={formik.handleChange("quantity")}
            // onBlr={formik.handleBlur("quantity")}
            // val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Train
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
