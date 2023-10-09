import React from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { DeleteSvg } from "../../utils/svg";
import "./confirmDelete.css";

// ConfirmDelete popup
const ConfirmDelete = (props) => {
  // Inits
  const {
    handleCancel,
    handleOk,
    isModalOpen,
    deleteHandler,
    isAddUserLoading,
  } = props;

 

  //   JSX
  return (
    <Modal
      title={
        <div className="deleteModal">
          <h4 className="deleteModalTitle">Are you sure you want to delete?</h4>
          <DeleteSvg />
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered={true}
      width={500}
      // closeIcon={<CloseSvg />}
      footer={[
        <div key={"wrapper"} className="mt-5">
          <button key="ok" className="btn btn-danger mx-3" onClick={deleteHandler}>
            {isAddUserLoading ? (
              <img src={`/assets/gifs/loading-black.gif`} height={40} />
            ) : (
              "Delete"
            )}
          </button>
          <button key="cancel" onClick={handleCancel} className=" btn">
            Cancel
          </button>
        </div>,
      ]}
    ></Modal>
  );
};

export default ConfirmDelete;
