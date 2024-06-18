import datas from "../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Banner from "./Banner";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import LayoutHomeThree from "../Partials/LayoutHomeThree";
import SectionStyleOneHmThree from "../Helpers/SectionStyleOneHmThree";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import FeaturedProducts from "../Product/FeaturedProducts/FeaturedProducts";
import Categories from "../Route/Categoreis/Categories";
import { ProductPage } from "../../Routes/routes";
import BestSellers from "../Home/BestSeller";









export default function HomeThree() {
 
 





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
  const brands = [];
  allProducts.forEach((product) => {
    brands.push(product.images[0].url);
  });
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
    <>
      <LayoutHomeThree type={3} childrenClasses="pt-0">
        <Banner className="banner-wrapper mb-[60px]" />
        <BrandSection
          type={3}
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />

<Categories />
        <SectionStyleThree
          type={3}
          products={allProducts}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          ads={[`${url}/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
        />

        <FeaturedProducts/>

        <SectionStyleOneHmThree
          type={3}
          products={allProducts}
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Gamer World"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Top Selling Products"
        >
          <SectionStyleTwo
            type={3}
            products={allProducts}
          />
        </ViewMoreTitle>

        <ProductsAds
          ads={[
            `${url}/assets/images/ads-1.png`,
            `${url}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOneHmThree
          type={3}
          categoryBackground={`${
            url
          }/assets/images/section-category-2.jpg`}
          products={allProducts}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-10-04 4:00:00"
        />


        <SectionStyleFour
          products={allProducts}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        

           
      </LayoutHomeThree>
    </>
  );
}
