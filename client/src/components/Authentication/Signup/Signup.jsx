import { React, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../../assets/images/svg/logo.svg";
import styles from "../../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import FacebookOauth from "../Oauth/FacebookOauth";
import GoogleOauth from "../Oauth/GoogleOauth";
import AppleOauth from "../Oauth/AppleOauth";
import { useSelector } from "react-redux";

import Thumbnail from "./Thumbnail";

import Layout from "../../Partials/Layout";




function Signup() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isTerms, setIsTerms] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);


  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };

  // const [userId, setUserId] = useState(user && user._id);
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const [open, setOpen] = useState(false);

  // const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handlePrivacyChange = () => {
    setIsPrivacy(!isPrivacy);
  };
  const handleTermsChange = () => {
    setIsTerms(!isTerms);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?!.*(.)\1{7})(?!.*12345678)(?=.*\d).{8,24}$/;
  // Create an array of items for the list
  const items = [
    "Should have atleast 8 -24 characters",
    "Should have atleast 1 special letter @!>",
    "Should have atleast 1 uppercase letter",
    "Should have atleast 1 lowercase letter",
  ];
  // Generate the list markup
  const CustomToast = ({ items }) => (
    <div className=" p-4 rounded shadow-md w-[100%]">
      <ol className="list-disc pl-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error(`Please input your full names`);
    }
    // Check if email is empty or doesn't match the expected format
    if (!email) {
      return toast.error(`Please input your email`);
    } else if (!emailRegex.test(email)) {
      return toast.error(`Please input a valid email address`);
    }
    if (!password) {
      return toast.error(`Please input your password`);
    }
    if (!passwordRegex.test(password)) {
      setTimeout(() => {
        // Render the custom toast component inside the toast
        return toast.info(<CustomToast items={items} />, {
          autoClose: 6000, // Keep the toast open indefinitely or set autoClose to a duration in milliseconds
          closeOnClick: true, // Close the toast when clicked
          closeButton: true, // Show a close button
          draggable: true, // Allow the toast to be draggable
        });
      }, 1000);
      // Password does not meet the requirements
      return toast.error("Password does not meet the requirements");
    }
    if (!avatar) {
      return toast.error(`Please select an image`);
    }
    if (!isTerms) {
      return toast.error("You must agree to the terms and conditions.");
    }
    if (!isPrivacy) {
      return toast.error("You must agree to our privacy and policies.");
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${BASE_URL}/user/create-user`, newForm, config)
      .then((response) => {
        // console.log(response);
        toast.success(response.data.message); // Display success toast
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
         setOpen(true);
        navigate("/login");

        //axios.post(`${BASE_URL}/user/user-activation/`)
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Display error toast
      });
  };

  // const handleOtpChange = (index, value) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   if (value && index < inputRefs.length - 1) {
  //     inputRefs[index + 1].current.focus();
  //   } else if (!value && index > 0) {
  //     inputRefs[index - 1].current.focus();
  //   }
  // };

  // const handleAccountVerification = async (e) => {
  //   e.preventDefault();
  //   const otpValue = otp.join("");
  //   // Check if any  field is empty
  //   if (!userId) {
  //     toast.error("Please enter your secret key!");
  //     return;
  //   }
  //   if (userId.length < 24) {
  //     toast.error("Secret Key can not be less than 24 digits!");
  //     return;
  //   }
  //   if (!otpValue) {
  //     toast.error("Please enter the OTP CODES ");
  //     return;
  //   }
  //   if (otpValue.length < 4) {
  //     toast.error("Enter all the OTP digits");
  //     return;
  //   }

  //   axios
  //     .post(`${BASE_URL}/user/verify-user`, { userId, otp: otpValue })
  //     .then((response) => {
  //       if (
  //         (response.data.success === true &&
  //           response.data.message ===
  //             `Account already verified!, Kindly login`) ||
  //         (response.data.success === true &&
  //           response.data.message === `Account verified succesfully`)
  //       ) {
  //         toast.success(response.data.message);
  //         setUserId("");
  //         setOtp(["", "", "", ""]);
  //         setOpen(false);
  //         navigate(`/login`);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };

  return (

    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
             
                <div className="input-area">
                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                  <div className="min-h-screen bg-grsy-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl uppercase font-extrabold text-gray-900">
        <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Create Account
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm::px-10">
          <form
            action=""
            className="space-y-6 flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="self-center">
              <img src={Logo} alt="Logo image" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Names
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  id="signup-name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="signup-password"
                  autoComplete="current-password"
                  placeholder="Enter you password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 v-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-8 w-8 object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span className="cursor-pointer">Upload an image</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="sr-only "
                    />
                  </label>
                </div>
              </label>
            </div>
            <div>
              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    checked={isTerms}
                    onChange={handleTermsChange}
                    name="terms-conditions"
                    id="terms-conditions"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms-conditions"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to ShopO’s{" "}
                    <Link
                      to={`/terms&cookies`}
                      className="underline hover:text-blue-400"
                    >
                      {" "}
                      Terms and Conditions
                    </Link>{" "}
                    .
                  </label>
                </div>
              </div>
              <div className={`${styles.normalFlex} justify-between mt-2 mb-4`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    checked={isPrivacy}
                    onChange={handlePrivacyChange}
                    name="privacy-policy"
                    id="privacy-policy"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="privacy-policy"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to ShopO’s{" "}
                    <Link
                      to={`/privacy&policy`}
                      className="underline hover:text-blue-400"
                    >
                      {" "}
                      Privacy and Cookie Policy
                    </Link>{" "}
                    .
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                REGISTER
              </button>
            </div>
            {/* <div className="  flex justify-center  text-lg font-bold text-gray-700 ">
              -- OR --
            </div>
            <div className="flex justify-center space-x-6 w-full">
              <FacebookOauth />
              <GoogleOauth />
              {/* <AppleOauth /> 
            </div> */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative w-full flex justify-center font-Poppins">
                Already have an account? Login as
              </h4>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="w-full h-[10] flex justify-around">
                <Link to="/login" className="text-white pr-2">
                  <div
                    className={`${styles.button} !h-[42px] !rounded-[5px] uppercase`}
                  >
                    Customer
                  </div>
                </Link>
                <Link to="/seller-login" className="text-white pl-2">
                  <div
                    className={`${styles.button} !h-[42px] !rounded-[5px] uppercase`}
                  >
                    {" "}
                    Seller{" "}
                  </div>
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
      

      {/* {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[75%] bg-gray-200 shadow rounded min-h-[30vh] p-3`}
            >
              {/* <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div> 
              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="text-[22px] font-Poppins text-center  pb-5 font-[600]">
                  ACCOUNT VERIFICATION
                </h3>
                <p className="text-center">
                  Enter the <span className="font-semibold">OTP</span> and{" "}
                  <span className="font-semibold">SECRET KEY</span> sent to your
                  email account
                </p>
                <form
                  action=""
                  className="mt-5 flex gap-3 items-center flex-col"
                >
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Secret Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${styles.input} !w-[270px] mb-1 mt-1 sm:mb-0 px-3 py-2 mr-2 text-center  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    required
                    value={userId}
                    placeholder="Input your Secret Key"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    OTP CODE <span className="text-red-500">*</span>
                  </label>
                  <div className={`flex justify-center gap-3`}>
                    {otp.map((value, index) => (
                      <>
                        <input
                          key={index}
                          className="otp text-center appearance-none block w-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          type="number"
                          autoComplete={false}
                          required
                          placeholder={`${index + 1}`}
                          value={value}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          ref={inputRefs[index]}
                        />
                        <span></span>
                      </>
                    ))}
                  </div>
                </form>
                <div className="mt-4 flex justify-center">
                  <hr className="mt-4" />
                  <button
                    onClick={handleAccountVerification}
                    type="button"
                    className="m-7 group relative w-auto h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 self-center"
                  >
                    VERIFY ACCOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
    </div>
</div>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Alrady have an Account?
                      <Link to="/login" className="ml-2 text-qblack">
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    
  );
}

export default Signup;