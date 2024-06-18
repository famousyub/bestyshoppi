import { Link, useParams } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function HeaderOne({ className, drawerAction, type = 1 }) {


  const url =  "http://localhost:1001";


  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownshopp, setDropDownShop] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);


  const [drawer, setDrawer] = useState(false);
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSearchData(null);

    const filteredProducts =
      allProducts &&
      allProducts.filter((products) =>
        products.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };






  return (
    <header className={` ${className || ""} header-section-wrapper relative`}>
      <TopBar className="quomodo-shop-top-bar" />
      <Middlebar
        type={type}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div>
            {type === 3 ? (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`${
                    url
                  }/assets/images/logo-3.svg`}
                  alt="logo"
                />
              </Link>
            ) : type === 4 ? (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`${
                    url
                  }/assets/images/logo-4.svg`}
                  alt="logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`${
                    url
                  }/assets/images/logo.svg`}
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="cart relative cursor-pointer">
            <Link to="/cart">
              <span>
                <ThinBag />
              </span>
            </Link>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow text-qblack"
              }`}
            >
              {cart && cart.length}
            </span>
          </div>
        </div>
      </div>
      <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
