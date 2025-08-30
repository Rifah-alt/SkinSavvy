import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { userRequest } from "../requestMethods.js";

const Users = () => {
  const [users, setUsers] = useState([]);

  // 1. Create the handleDelete function
  const handleDelete = async (id) => {
    try {
      // Call the API to delete the user from the database
      await userRequest.delete(`/users/${id}`);
      // Update the frontend state to remove the user from the list
      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      // 2. Update renderCell to include the onClick handler
      renderCell: (params) => {
        return (
          <FaTrash
            className="text-red-500 cursor-pointer m-2"
            onClick={() => handleDelete(params.row._id)} // Call handleDelete with the user's ID
          />
        );
      },
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[5px]">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
      </div>

      <div className="m-[30px]">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Users;