import React, { useState, useEffect } from "react";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/images/svg/logo.svg";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import DropDownShop from "./DropDownShopp";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../config.js";
import Cart from "../AppComponents/cart/Cart.jsx";
import WishList from "../wishlist/WishList.jsx";
import TopBar from "./Tobbar";
import Drawer from "../Mobile/Drawer";

const Header = ({ activeHeading }) => {
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
     <Drawer open={drawer} action={() => setDrawer(!drawer)} />
    <header className="header-section-wrapper relative">
      <div className={`${styles.section}`}>
        <TopBar className="quomodo-shop-top-bar" />
        <div className="hidden sm:h-[50px] sm:my-[20px] sm:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo image" />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
              onClick={handleSearchChange}
            />
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => {
                  const d = i._id;
                  return (
                    <Link to={`/product/${d}`} key={index}>
                      <div className="w-full flex items-start-py-5 gap-3 mt-4">
                        <img
                          src={i.images[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px] rounded-md"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {user && user.role === "Admin" && (
            <div className={`${styles.button} w-[200px]`}>
              <Link to={`/admin-dashboard`}>
                <h1 className="text-[#fff] flex items-center">
                  Admin Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          <div className={`${styles.button}`}>
            {isSeller ? (
              <Link to={`/dashboard`}>
                <h1 className="text-[#fff] flex items-center">
                  Go Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            ) : (
              <Link to="/seller-register">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div
        style={{backgroundColor:"rgb(255 187 56 / var(--tw-bg-opacity))"}}
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-[10]" : ""
        } transition hidden sm:flex items-center justify-between w-full bg-yellow-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[260px] hidden sm:block">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 cursor-pointer"
              />
              <button className="h-[100%] w-full flex justify-between items-center pl-20 pr-20 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          <div onClick={() => setDropDownShop(!dropDownshopp)}>
            <div className="relative h-[60px] mt-[10px] w-[260px] hidden sm:block">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 cursor-pointer"
              />
              <button className="h-[100%] w-full flex justify-between items-center pl-20 pr-20 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All boutique
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDownShop(!dropDownshopp)}
              />
              {dropDownshopp && (
                <DropDownShop
                  allProducts={allProducts}
                  setDropDownShop={setDropDownShop}
                />
              )}
            </div>
          </div>

          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {wishList && wishList.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="rgb(255  255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <Link to="/home">more</Link>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                    src={`${backend_url}/${user?.avatar.filename}`}
                     // src={`${backend_url}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                    
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <WishList setOpenWishList={setOpenWishList} />}
          </div>
        </div>
      </div>
      {/* Responsive Header */}
      <div className={`w-full h-[60px] bg-yellow-500 fixed top-0 left-0 z-10 sm:hidden flex items-center justify-between`}>
        <div className="flex items-center">
          <BiMenuAltLeft
            size={30}
            className="mx-4 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-8" />
          </Link>
        </div>
        <div className="flex items-center">
          <AiOutlineSearch size={30} className="mx-4 cursor-pointer" onClick={handleSearchChange} />
          <Link to="/profile">
            {isAuthenticated ? (
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[35px] h-[35px] rounded-full"
                alt=""
              />
            ) : (
              <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
            )}
          </Link>
        </div>
      </div>
      {open && (
        <div className="w-full h-screen fixed top-0 left-0 bg-gray-800 bg-opacity-75 z-20 flex flex-col items-center justify-center">
          <RxCross1 size={30} className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)} />
          <Navbar active={activeHeading} />
        </div>
      )}
      </header>
    </>
  );
};

export default Header;
