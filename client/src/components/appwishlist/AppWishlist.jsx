import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../Partials/Layout";
import HeaderTwo from "../Partials/Headers/HeaderTwo";
import './appwish.css'


export default function AppWishlIst (){

    
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

    return (

<>
 

  <div className="wishlist-container">
    {user && <h2>{user.name}'s Wishlist</h2>}

    <table className="wishlist-table">
      <caption>wishList</caption>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Image</th>
          <th>Total Items</th>
        </tr>
      </thead>
      <tbody>
        {wishList && wishList.map((el, index) => (
          <tr key={index}>
            <td>{el.name}</td>
            <td>{el.originalPrice}</td>
            <td>
              <img src={el.images[0].url} alt={el.name} />
            </td>
            <td>{el.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</>)

        }

