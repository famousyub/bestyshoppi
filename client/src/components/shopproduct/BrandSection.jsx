import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { backend_url } from "../../config";

export default function BrandSection({ className, sectionTitle }) {




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
 

 })





  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-1.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-2.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-3.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-4.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-5.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-6.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-7.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-8.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-9.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-10.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-11.png`}
                alt="logo"
              />
            </div>
          </div>
          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <img
                src={`${
                  url
                }/assets/images/brand-12.png`}
                alt="logo"
              />
            </div>
          </div>


          {shops.map((el,index) =>{
                <div className="item">
                <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
                <img src={`${backend_url}/uploads/${
                                  el.avatar.filename
                                }`}    height={70} width={75} />
                </div>
              </div>
          })}


          {categories.map((el,index) =>{
               <div className="item">
               <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
                 <img
                   src={`${
                     url
                   }/assets/images/brand-12.png`}
                   alt="logo"
                 />
                 {el.value}
               </div>
             </div>
          }) }
        </div>


      </div>
    </div>
  );
}
