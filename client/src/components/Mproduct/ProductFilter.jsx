import RangeSlider from "react-range-slider-input";
import Checkbox from "../Helpers/Checkbox";
import { categoriesData } from "../../static/data";


export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterStorage,
  className,
  filterToggle,
  filterToggleHandler,
  categoryHandler,
}) {
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""} ${
          filterToggle ? "block" : "hidden lg:block"
        }`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Product categories</h1>
          </div>
          <div className="filter-items">
            <ul>
              {categoriesData.map((category) => (
                <li key={category.id} className="item flex justify-between items-center mb-5">
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <Checkbox
                        id={category.title}
                        name={category.title}
                        handleChange={(e) => categoryHandler(e, category.title)}
                        checked={filters.categories.includes(category.title)}
                      />
                    </div>
                    <div>
                      <label htmlFor={category.title} className="text-xs font-black font-400 capitalize">
                        {category.title}
                      </label>
                    </div>
                  </div>
                  <div>
                    <span className="cursor-pointer">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect y="4" width="10" height="2" fill="#C4C4C4" />
                        <rect
                          x="6"
                          width="10"
                          height="2"
                          transform="rotate(90 6 0)"
                          fill="#C4C4C4"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <RangeSlider value={volume} onInput={volumeHandler} min={10} max={1000} />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: ${volume.min} - ${volume.max}
          </p>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="apple"
                      name="apple"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.apple}
                    />
                  </div>
                  <div>
                    <label htmlFor="apple" className="text-xs font-black font-400 capitalize">
                      apple
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="samsung"
                      name="samsung"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.samsung}
                    />
                  </div>
                  <div>
                    <label htmlFor="samsung" className="text-xs font-black font-400 capitalize">
                      Samsung
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="walton"
                      name="walton"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.walton}
                    />
                  </div>
                  <div>
                    <label htmlFor="walton" className="text-xs font-black font-400 capitalize">
                      walton
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="oneplus"
                      name="oneplus"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.oneplus}
                    />
                  </div>
                  <div>
                    <label htmlFor="oneplus" className="text-xs font-black font-400 capitalize">
                      oneplus
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="vivo"
                      name="vivo"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.vivo}
                    />
                  </div>
                  <div>
                    <label htmlFor="vivo" className="text-xs font-black font-400 capitalize">
                      vivo
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="oppo"
                      name="oppo"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.oppo}
                    />
                  </div>
                  <div>
                    <label htmlFor="oppo" className="text-xs font-black font-400 capitalize">
                      oppo
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="xiomi"
                      name="xiomi"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.xiomi}
                    />
                  </div>
                  <div>
                    <label htmlFor="xiomi" className="text-xs font-black font-400 capitalize">
                      xiomi
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="others"
                      name="others"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.others}
                    />
                  </div>
                  <div>
                    <label htmlFor="others" className="text-xs font-black font-400 capitalize">
                      others
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Storage</h1>
          </div>
          <div className="filter-items">
            <div className="flex space-x-[5px] flex-wrap">
              <span
                onClick={() => filterStorage("64GB")}
                className={`font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "64GB" ? "bg-qyellow text-qblack border-none" : "text-qgray"
                }`}
              >
                64GB
              </span>
              <span
                onClick={() => filterStorage("128GB")}
                className={`font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "128GB" ? "bg-qyellow text-qblack border-none" : "text-qgray"
                }`}
              >
                128GB
              </span>
              <span
                onClick={() => filterStorage("256GB")}
                className={`font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "256GB" ? "bg-qyellow text-qblack border-none" : "text-qgray"
                }`}
              >
                256GB
              </span>
              <span
                onClick={() => filterStorage("512GB")}
                className={`font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "512GB" ? "bg-qyellow text-qblack border-none" : "text-qgray"
                }`}
              >
                512GB
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={filterToggleHandler}
        className={`bg-black opacity-50 fixed left-0 top-0 w-full h-full z-[1] lg:hidden ${
          filterToggle ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
}
