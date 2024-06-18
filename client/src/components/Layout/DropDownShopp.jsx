import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import { backend_url } from "../../config.js";

//../../../config.js
const DropDownShop = ({ allProducts, setDropDownShop }) => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const submitHandle = (i) => {
    dispatch(getAllProducts());
    console.table(products);
    console.table(allProducts);
  

    setDropDownShop(false);
    navigate(`/shop/preview/${i.shop._id}`);
    // window.location.reload();
  };
  return (
    <div className="pb-4 w-[260px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {allProducts &&
        allProducts.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
             src={`${backend_url}/uploads/${
                i?.images && i?.images[0]?.filename
              }`}
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
                paddingRight: "10px",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.shop.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDownShop;
