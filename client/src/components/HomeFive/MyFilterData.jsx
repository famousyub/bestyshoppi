import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesData } from '../../static/data';
import LayoutHomeFour from '../Partials/LayoutHomeFour';
import FeaturedProducts from '../Product/FeaturedProducts/FeaturedProducts';
import HeaderFour from '../Partials/Headers/HeaderFour';
import './ProductPagefilter.css';
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailscard from '../Product/ProductDetailscard/ProductDetailscard';
import { Link } from 'react-router-dom';
import styles from '../../styles/style';
import { backend_url } from '../../config';
import Ratings from '../Product/Ratings/Ratings';

const SET_FILTER_PRICE = 'SET_FILTER_PRICE';
const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY';

// Reducer
const initialState = {
  filterPrice: null,
  filterCategory: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_PRICE:
      return { ...state, filterPrice: action.payload };
    case SET_FILTER_CATEGORY:
      return { ...state, filterCategory: action.payload };
    default:
      return state;
  }
};

function MyFilterData() {






    const { cart } = useSelector((state) => state.cart);
    const { wishList } = useSelector((state) => state.wishList);
    const dispatch = useDispatch();
  
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
  

  
    const removeFromWishListHandler = (data) => {
      setClick(!click);
      dispatch(removeFromWishList(data));
      toast.info(`Product removed from wishList items`);
    };
  
    const addToWishListHandler = (data) => {
      setClick(!click);
      dispatch(addToWishList(data));
      toast.info(`Product added to wishList items`);
    };
  
    const addToCartHandler = (id) => {
      const isItemExist = cart && cart.find((i) => i._id === id);
      if (isItemExist) {
        toast.error(`Item already exists`);
      } else {
        if (data.stock < 1) {
          toast.error(`Product Stock limited`);
          return;
        }
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success(`Item added to cart successfully`);
      }
    };
  
    











  const { allProducts, isLoading } = useSelector((state) => state.product);
  const { filterPrice, filterCategory } = useSelector((state) => state);


  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  useEffect(() => {
    let filtered = allProducts;

    if (filterPrice !== null) {
      filtered = filtered.filter(product => product.originalPrice <= filterPrice);
    }

    if (filterCategory !== null) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    setFilteredProducts(filtered);
  }, [filterPrice, filterCategory, allProducts]);

  const handlePriceFilter = (price) => {
    const filtered = allProducts.filter(p => p.originalPrice <= price);
    setFilteredProducts(filtered);
    dispatch({ type: SET_FILTER_PRICE, payload: Number(price) });
  };

  const handleCategoryFilter = (category) => {
    const filtered = allProducts.filter(p => p.category === category);
    setFilteredProducts(filtered);
    dispatch({ type: SET_FILTER_CATEGORY, payload: category });
  };

  return (
    <div>
     
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <h1>Products</h1>
          <div className="filters">
            <h3>Filters</h3>
            <label>
              Price:
              <input
                type="range"
                min="0"
                max="1000"
                onChange={(e) => handlePriceFilter(e.target.value)}
              />
              <span>{filterPrice}</span>
            </label>
            <label>
              Category:
              <select onChange={(e) => handleCategoryFilter(e.target.value)}>
                <option value={null}>All</option>
                {categoriesData.map(category => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="product-list">
            <h3>Filtered Products</h3>
            {filteredProducts.map((data, key) => (
              <div key={key} className="product-card">


<div className="justify-between">
          <Link to={`/product/${data?._id}`}>
            {/* window.location.reload(true); */}
            <img
              src={`${backend_url}/uploads/${
                data?.images && data?.images[0]?.filename
              }`}
              alt=""
              className=" h-[135px] object-contain rounded-md self-center"
            />
          </Link>
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
          </Link>
          <Link to={`/product/${data?._id}`}>
            <h4 className="pb-3 font-[500]">
              {data?.name?.length > 50
                ? data.name.slice(0, 50) + "..."
                : data.name}
            </h4>

            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex-row items-center justify-between">
                {data.discountPrice !== null ? (
                  <>
                    <h5 className={`${styles.productDiscountPrice} mb-2`}>
                      {data.discountPrice} KSHS
                    </h5>
                    <h4 className={`${styles.price} line-through`}>
                      {data.originalPrice ? data.originalPrice + " KSHS" : null}
                    </h4>
                  </>
                ) : (
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.originalPrice ? data.originalPrice + " KSHS" : null}
                  </h4>
                )}
              </div>
              <div className="py-2 flex-row items-center justify-between">
                {data?.stock !== 0 ? (
                  <div className="bg-green-600 rounded-md  p-1">
                    <span className="p-1 font-semibold text-sm text-[#fff]">
                      stock Available {data?.stock}
                    </span>
                  </div>
                ) : (
                  <div className="bg-red-600 rounded-md  p-1">
                    <span className="p-1 font-semibold text-sm text-[#fff]">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishListHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer right-2 absolute top-5"
                onClick={() => addToWishListHandler(data)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick View"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data._id)}
              color="#444"
              title="Add to cart"
            />
            {open ? (
              <ProductDetailscard open={open} setOpen={setOpen} data={data} />
            ) : null}
          </div>
        </div>









                <h4>{data.name}</h4>
                <p>Price: ${data.originalPrice}</p>
                <p>Category: {data.category}</p>
              </div>
            ))}
          </div>
          <FeaturedProducts />
          <div className="product-list">
            <h3>All Products</h3>
            {allProducts.map((product, key) => (
              <div key={key} className="product-card">
                <h4>{product.name}</h4>
                <p>Price: ${product.originalPrice}</p>
                <p>Category: {product.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFilterData;
