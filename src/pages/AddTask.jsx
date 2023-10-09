import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DynamicInput from "../Components/DynamicForm/DynamicInput";
import data from "../constants/Form.json";
import { useDispatch } from "react-redux";
import {
  createUserTaskAction,
  updateUserTaskAction,
  userTaskAction,
} from "../Redux/Action/userAction";
import './AddTask.css'

const INITIAL_STATE = { title: "", description: "" };

const AddTask = (props) => {
  // Inits
  const { title, editData, setIsModalOpen, isAddEdit } = props;
  const { registerFields } = data;
  const [registrationFormData, setRegistrationFormData] = useState(editData);
  const [errors, setErrors] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setRegistrationFormData(editData);
  }, [editData]);

  // calls when user do some change in input field
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    setRegistrationFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setErrors((prevState) => {
      return {
        ...prevState,
        [name]: "",
      };
    });
  };

  // For validate the form
  const validateForm = () => {
    let isValid = true;
    for (const [key, value] of Object.entries(registrationFormData)) {
      // For title
      if (key === "title") {
        if (!value) {
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: "Please enter the title",
            };
          });
        }
      }

      if (key === "description") {
        if (value.length < 0) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: "please enter the description",
            };
          });
        }
      }
    }
    return isValid;
  };

  console.log(errors);

  //Handling the form submission
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        if (!isAddEdit) {
          setIsConnecting(true);
          dispatch(createUserTaskAction(registrationFormData)).then((res) => {
            if (res?.type === "createUserTaskAction/fulfilled") {
              setRegistrationFormData(INITIAL_STATE);
              setIsModalOpen(false);
              toast.success("Task Added successfully");
              dispatch(userTaskAction());
              setIsConnecting(false);
            } else {
              toast.error("Please enter valid Details");
              setIsConnecting(false);
            }
          });
          
        } else {
          // update
          setIsConnecting(true);
          dispatch(updateUserTaskAction(registrationFormData)).then((res) => {
            if (res?.type === "updateUserTaskAction/fulfilled") {
              setRegistrationFormData(INITIAL_STATE);
              setIsModalOpen(false);
              toast.success("Task Updated successfully");
              dispatch(userTaskAction());
              setIsConnecting(false);
            } else {
              toast.error("Please enter valid Details");
              setIsConnecting(false);
            }
          });
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  return (
    <div className=" p-6 flex flex-col justify-center overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          {title}
        </h1>
        <form className="mt-6" onSubmit={formSubmitHandler}>
          {registerFields.map((singleFieldData, index) => {
            return (
              <DynamicInput
                registrationFormData={registrationFormData}
                key={index}
                singleFieldData={singleFieldData}
                handleUserDataChange={handleUserDataChange}
                errors={errors}
              />
            );
          })}
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 h-10 relative">
              {isConnecting ? (
                <img
                  src="assets/gifs/loading-black.gif"
                  className=" w-[50px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                />
              ) : (
                "AddTask"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
