import { Link } from "react-router-dom";
export default function TopBar({ className1 }) {

    return (

<div className="container-x mx-auto h-full">
<div className="flex justify-between items-center h-full">
  <div className="topbar-nav">
    <ul className="flex space-x-6">
      <li>
        <Link to="/">
          <span className="text-xs leading-6 text-qblack font-500">
            Account
          </span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <span className="text-xs leading-6 text-qblack font-500">
            Track Order
          </span>
        </Link>
      </li>
      <li>
        <Link to="/faq">
          <span className="text-xs leading-6 text-qblack font-500">
            Support
          </span>
        </Link>
      </li>
    </ul>
  </div>
  <div className="topbar-dropdowns sm:block hidden">
    <div className="flex space-x-6">
      <div className="country-select flex space-x-1 items-center">
        <div>
             <p>me</p>
        </div>
       
      </div>
     
     
    </div>
  </div>
</div>
</div>

    )
        }