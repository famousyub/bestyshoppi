import React, { useEffect, useState } from "react";
import LayoutHomeFour from "../Partials/LayoutHomeFour";
import BrandSection from "../Home/BrandSection";
import ProductsAds from "../Home/ProductsAds";
import Banner from "./Banner";
import SectionStyleOneHmFour from "../Helpers/SectionStyleOneHmFour";
import datas from "../../data/products.json";
import CampaignCountDown from "./CampaignCountDown";
import SectionStyleThreeHmFour from "../Helpers/SectionStyleThreeHmFour";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import ProductPagefilter from "../Appfilter/Index";

function Homefour() {
  const { products1 } = datas;

  
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
  const brands = [];
  allProducts.forEach((product) => {
    brands.push(product.images[0].url);
  });

  return (
    <LayoutHomeFour>
      <Banner className="mb-[60px]" />
      <SectionStyleOneHmFour
        products={allProducts}
        sectionTitle="Trendy Design"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />
      <BrandSection className="mb-[60px]" />
      <CampaignCountDown lastDate="2023-10-04 4:00:00" className="mb-[60px]" />
      <SectionStyleOneHmFour
        products={allProducts}
        sectionTitle="Feature Design"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />
      <ProductsAds
        ads={[`${url}/assets/images/ads-3.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleThreeHmFour
        sectionTitle="New Arrival"
        seeMoreUrl="/all-products"
        products={allProducts}
        className="mb-[60px]"
      />

      <ProductsAds
        sectionHeight="164"
        ads={[`${url}/assets/images/ads-4.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStyleFour
        products={allProducts}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="mb-[60px]"
      />
      <ProductPagefilter />
    </LayoutHomeFour>
  );
}

export default Homefour;
