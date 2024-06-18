import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { BiEdit } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../config";
import { getAllUsers } from "../../redux/actions/user";
import { toast } from "react-toastify";
import styles from "../../styles/style";
import { getAllSellers } from "../../redux/actions/seller";

const AdminInactiveSellers = () => {
  const { sellers, adminUsersLoading } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  const activeSellers = sellers && sellers.filter((i) => i.isActive === false);

  const [userData, setUserData] = useState([]);

  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(userData.role);
    await axios
      .put(
        `${BASE_URL}/shop/update-shop-role/${userData.id}`,
        {
          newRole: role,
        },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllSellers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const activateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${BASE_URL}/shop/activate-shop/${userData.id}`,
        { status: true },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllSellers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // console.log(sellers);
  const deleteUser = async (e) => {
    e.preventDefault();

    await axios
      .delete(`${BASE_URL}/shop/delete-shop/${userData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllSellers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const columns = [
    { field: "id", headerName: "Shop ID", minWidth: 150, flex: 0.8 },

    {
      field: "name",
      headerName: "Shop Names",
      type: "text",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "joinedOn",
      headerName: "Joined On",
      type: "number",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "number",
      minWidth: 40,
      flex: 0.7,
    },

    {
      field: "   ",
      flex: 0.5,
      minWidth: 10,
      headerName: "Edit Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true) || setUserData(params.row)}>
              <BiEdit size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  activeSellers &&
    activeSellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        joinedOn: item.createdAt.slice(0, 10),
        joinedAt: item.createdAt.slice(11, 19),
      });
    });

  return (
    <>
      {adminUsersLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center mt-3">
          <div className="w-[95%]">
            <h3 className="text-[22px] font-Poppins pb-2">All Inactive Shop</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </div>
            <div className="w-full mt-6 justify-end flex gap-3">
              <Link
                to={`/admin-active-sellers`}
                className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
              >
                view Active shops
              </Link>
            </div>{" "}
          </div>{" "}
        </div>
      )}

      {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[25%] w-[70%] bg-gray-200 shadow rounded min-h-[30vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                <h1 className="text-center font-Poppins font-[600] text-[22px]">
                  Change User Account Role
                </h1>

                <form
                  className="w-[80%] items-center flex flex-col "
                  onSubmit={updateUserSubmitHandler}
                >
                  {/* <img
                    src={`${backend_url}/uploads/`}
                    alt=""
                    srcset=""
                    className="w-[100px] h-[100px] rounded-full self-center m-3"
                  /> */}

                  <div className=" w-full items-center flex flex-row">
                    {/* <IoPersonCircleOutline
                        className="absolute "
                        size={35}
                        color="gray"
                      /> */}
                    <div
                      className={`group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase mt-7  cursor-pointer`}
                      onClick={activateUser}
                    >
                      Acivate User
                    </div>
                  </div>
                  <div className=" w-full items-center flex flex-row mt-7">
                    {/* <IoMailOutline
                        className="absolute"
                        size={35}
                        color="gray"
                      /> */}

                    <div
                      className={`group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase mt-7 cursor-pointer `}
                      onClick={deleteUser}
                    >
                      Delete User
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="w-full sm:w-auto flex ">
                    <div className="w-full  self-center flex-col sm:m-0 m-10">
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px] `}
                        >
                          Activate User
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px]`}
                        >
                          Deactivete User
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px]`}
                        >
                          Delete User
                        </div>
                      </div>
                    </div>
                  </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default AdminInactiveSellers;
