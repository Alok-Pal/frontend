import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserTaskAction,
  deleteUserTaskAction,
  userTaskAction,
} from "../Redux/Action/userAction";
import AddTask from "../pages/AddTask";
import ConfirmDelete from "./ConfirmDelete";
import "./table.css";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

const UserTable = () => {
  const [tableData, setTableData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [modelTitle, setModelTitle] = useState("ADD TASK");
  const [isAddEdit, setIsAddEdit] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [deleteConnectionId, setDeleteConnectionId] = useState(null);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.userTask?.data);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  //
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/");
    }
  });

  const fetchTask = () => {
    dispatch(userTaskAction());
  };

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    setTableData(state?.task);
  }, [state?.task]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData({ title: "", description: "" });
    form.resetFields();
  };

  // deleteHandler
  const deleteDataHandler = (data) => {
    console.log("🚀 ~ file: Table.jsx:49 ~ deleteHandler ~ data:", data);
    setDeleteConnectionId(data?.id);
    setisDeleteModalOpen(true);
  };
  const deleteHandler = () => {
    if (deleteConnectionId) {
      dispatch(deleteUserTaskAction(deleteConnectionId)).then((res) => {
        console.log("🚀 ~ file: Table.jsx:60 ~ dispatch ~ res:", res);
        if (res?.type === "deleteUserTaskAction/fulfilled") {
          dispatch(userTaskAction());
          toast.success("Task Deleted Successfully",'success');
          setisDeleteModalOpen(false);
        }
        else{
          toast.error("You are not Authorized to delete",'error');
          setisDeleteModalOpen(false);
        }
      });
    } else {
      setisDeleteModalOpen(false);
    }
  };
  const deleteHandleCancel = () => {
    setisDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-content-end mt-2 pe-4">
        <div
          className=" btn "
          style={{ backgroundColor: "lightpink" }}
          onClick={logoutHandler}
        >
          {" "}
          <LogoutOutlined />
        </div>
      </div>
      <div className="text-center">
        <div className="">
          {" "}
          <h3 className="mt-2">Add Task's</h3>
        </div>
        <button
          className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          onClick={() => {
            showModal();
            setModelTitle("ADD TASK");
          }}
        >
          New Task
        </button>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          centered={true}
          width={500}
          footer={false}
        >
          <AddTask
            title={modelTitle}
            editData={editData}
            setIsModalOpen={setIsModalOpen}
            isAddEdit={isAddEdit}
          />
        </Modal>
      </div>
      <div className="container mt-5" style={{ height: 400, width: "100%" }}>
        <h4>All Tasks:-</h4>
        <Table
          dataSource={tableData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          checkboxSelection
        >
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            className="bg-white"
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            className="bg-white"
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            className="bg-white"
            width={"15%"}
            render={(value, data) => {
              return (
                <Space size="middle">
                  <div style={{ marginRight: "2rem" }}>
                    <EditOutlined style={{fontSize: 20 ,color : 'blue'}}
                      onClick={(e) => {
                        setEditData(data);
                        showModal();
                        setIsAddEdit(true);
                        setModelTitle("Edit TASK");
                      }}
                    />
                  </div>
                  <div style={{ marginRight: "2rem" ,color : 'red'}}>
                    <DeleteOutlined style={{fontSize: 20}}
                      onClick={() => {
                        deleteDataHandler(data);
                      }}
                    />
                  </div>
                </Space>
              );
            }}
          />
        </Table>
        <ConfirmDelete
          handleCancel={deleteHandleCancel}
          isModalOpen={isDeleteModalOpen}
          deleteHandler={deleteHandler}
        />
      </div>
    </>
  );
};

export default UserTable;
