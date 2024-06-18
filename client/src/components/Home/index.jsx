

import React  from 'react' ;
import { ProductPage } from '../../Routes/routes';
import Banner from './Banner';
import BrandSection from './BrandSection';
import BestSellers from './BestSeller';
import AllProductPage from '../AllProductPage';



export default class HomeApp extends React.Component {


       render(){

         return (

          <>          
            <div className="btn w-5 h-5 "></div>
            <Banner className="banner-wrapper mb-[60px]" />

        <BrandSection />
              <ProductPage/>

              <AllProductPage/>
              <BestSellers/>

              </>
         )
       }
}