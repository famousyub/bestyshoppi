import React, { useEffect, useState } from "react";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

import datas from "../../data/productsTwo.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleThreeHomeTwo from "../Helpers/SectionStyleThreeHomeTwo";
import SectionStyleTwo from "../Helpers/SectionStyleTwoHomeTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import ProductsAds from "../Home/ProductsAds";
import Banner from "./Banner";
import CampaignCountDown from "./CampaignCountDown";
import CategoriesSection from "./CategoriesSection";
import FeaturedProducts from "../Product/FeaturedProducts/FeaturedProducts";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import Categories from "../Route/Categoreis/Categories";
import { ProductPage } from "../../Routes/routes";
import BestSellers from "../Home/BestSeller";


export default function HomeTwo() {
  //const { products } = datas;

   const url ="http://localhost:1001"

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  const {products , isLoading1}  = useSelector((state) => state.product)

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const CurrentlyDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, data.length);

  useEffect(() => {
    dispatch(getAllProducts());
    if (categoryData === null) {
      const d =
        allProducts &&
        [...allProducts].sort((a, b) => a.total_sold - b.total_sold);
      setData(d);


      console.log(allProducts);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0, 0);
  }, []);


  return (
    <LayoutHomeTwo>

<Categories />

       <FeaturedProducts />
      <Banner className="banner-wrapper mb-[46px]" />
      <ViewMoreTitle
        className="my-categories mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="My Market Category"
      >
        <CategoriesSection />
      </ViewMoreTitle>
      

      

      

      <SectionStyleThreeHomeTwo
        products={allProducts}
        showProducts={6}
        sectionTitle="Featured Products"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />
      <CampaignCountDown className="mb-[60px]" lastDate="2023-10-04 4:00:00" />
      <ProductsAds
        ads={[
          `${url}/assets/images/ads-2.2.png`,
          `${url}/assets/images/ads-2.1.png`,
        ]}
        sectionHeight="sm:h-[290px] h-full"
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleThreeHomeTwo
        products={allProducts}
        showProducts={3}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="feature-products mb-[60px]"
      />
      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo products={allProducts} />
      </ViewMoreTitle>
      <ProductsAds
        ads={[`${url}/assets/images/ads-2.3.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleThreeHomeTwo
        products={allProducts}
        showProducts={9}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-arrivals mb-[60px]"
      />
      <ProductsAds
        sectionHeight="164"
        ads={[`${url}/assets/images/ads-2.4.png`]}
        className="products-ads-section mb-[60px]"
      />


      <SectionStyleFour
        products={allProducts}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />
      
    
    </LayoutHomeTwo>
  );
}
