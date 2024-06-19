import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesData } from '../../static/data';
import { useSearchParams } from 'react-router-dom';
import LayoutHomeFour from '../Partials/LayoutHomeFour';
import FeaturedProducts from '../Product/FeaturedProducts/FeaturedProducts';
import HeaderFour from '../Partials/Headers/HeaderFour';


// Actions
const SET_FILTER_PRICE = 'SET_FILTER_PRICE';
const SET_FILTER_NAME = 'SET_FILTER_NAME';
const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY';




// Reducer
const initialState = {
  filterPrice: null,
  filterName: '',
  filterCategory: null,
  products: [
    { id: 1, name: 'Product 1', price: 10, category: 1 },
    { id: 2, name: 'Product 2', price: 20, category: 2 },
    { id: 3, name: 'Product 3', price: 15, category: 1 },
    { id: 4, name: 'Product 4', price: 30, category: 3 },
    { id: 5, name: 'Product 5', price: 25, category: 2 },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_PRICE:
      return { ...state, filterPrice: action.payload };
    case SET_FILTER_NAME:
      return { ...state, filterName: action.payload };
    case SET_FILTER_CATEGORY:
      return { ...state, filterCategory: action.payload };
    default:
      return state;
  }
};

// Store
//const store = createStore(reducer);

// Component
function  Helpers  () {

    const { allProducts, isLoading } = useSelector((state) => state.product);
    const { products, isLoading1 } = useSelector((state) => state.product);
  const { filterPrice, filterName, filterCategory, products1 } = useSelector(state => state);
  const dispatch = useDispatch();



const [data, setData] = useState([]);





const PAGE_SIZE = 10;
const [currentPage, setCurrentPage] = useState(1);
const startIndex = (currentPage - 1) * PAGE_SIZE;
const endIndex = startIndex + PAGE_SIZE;
const CurrentlyDisplayedData = data.slice(startIndex, endIndex);
const totalPages = Math.ceil(data.length / PAGE_SIZE);
const itemStartIndex = startIndex + 1;
const itemEndIndex = Math.min(endIndex, data.length);

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  console.table(allProducts);

  useEffect(() => {
    let filtered = allProducts;

    if (filterPrice !== null) {
      filtered = filtered.filter(product => product.originalPrice <= filterPrice);
    }

    if (filterName !== '') {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(filterName.toLowerCase()));
    }

    if (filterCategory !== null) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    setFilteredProducts(filtered);
  }, [filterPrice, filterName, filterCategory, products]);

  const handlePriceFilter = (price) => {
    dispatch({ type: SET_FILTER_PRICE, payload: price });
  };

  const handleNameFilter = (name) => {
    dispatch({ type: SET_FILTER_NAME, payload: name });
  };

  const handleCategoryFilter = (categoryId) => {
    dispatch({ type: SET_FILTER_CATEGORY, payload: categoryId });
  };

  return (
    <div>
        <HeaderFour />
      <h1>Products</h1>

      <div>
        <h3>Filters</h3>
        <label>
          Price:
          <input type="number" min="0" onChange={(e) => handlePriceFilter(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" onChange={(e) => handleNameFilter(e.target.value)} />
        </label>
        <label>
          Category:
          <select onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value={null}>All</option>
            {categoriesData.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>

    

     

      <div>
        <h3>Products</h3>
        {filteredProducts.map((product ,key) => (
          <div key={key}>
            {product._id}
            <h4>{product.name}</h4>
            <p>Price: ${product.originalPrice}</p>
            <p>Category: {categoriesData.find(category => category.id === product.category)}</p>
          </div>
        ))}
      </div>
      <FeaturedProducts />


      <div>
        <h3>Products</h3>
        {allProducts.map((product ,key) => (
          <div key={key}>
            {product._id} {key}
            <h4>{product.name}</h4>
            <p>Price: ${product.originalPrice}</p>
            <p>Category: {categoriesData.find(category => category.id === product.category)}</p>
          </div>
        ))}
      </div>
    </div>


  );
};

export default helpers;