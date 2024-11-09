import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

export default function BestSellers({ className }) {



  
  const url ="http://localhost:1001"



  
  const [shops,setShops]  = useState([]);

const [categories,setCategories] = useState([]);



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


useEffect(()=>{

 const cathelpers  = []; 
 const shopshelpers =[] ; 


 allProducts.map((el, index) =>{

   shopshelpers.push(el.shop);


   cathelpers.push (el.category);

 })
 setShops(shopshelpers);
 setCategories(cathelpers);
  console.log(categories)
  console.table(shops);

  console.table(categories);

})
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-1.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Shopno BD</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="400"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-2.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Eecoms Shop</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="300"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-3.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Fusion X</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="200"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-4.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Rikayi Rox</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-5.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Habbriyi</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <img
              src={`${
                url
              }/assets/images/saller-6.png`}
              alt=""
            />
          </div>
          <Link to="/saller-page">
            <p className="text-base font-500 text-center">Rayhans</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
