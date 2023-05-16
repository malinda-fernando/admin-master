import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
// import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "TNo",
    dataIndex: "key",
  },
  {
    title: "Train Name",
    dataIndex: "name",
    
  },
  {
    title: "Distence",
    dataIndex: "distence",
    
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Trains</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
