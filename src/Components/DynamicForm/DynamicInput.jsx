//Dynamic input for the form
const DynamicInput = (props) => {
  // Inits
  const { singleFieldData, handleUserDataChange, errors,registrationFormData } = props;
  console.log(singleFieldData,registrationFormData,"SSSSSSSSSSSSSS")
  // JSX
  console.log(registrationFormData,"DDDDDDDDDDD",registrationFormData?.name)
  return (
    <div className="mb-2">
      <label
        htmlFor={singleFieldData.id}
        className="block text-sm font-semibold text-gray-800"
      >
        {singleFieldData.title}
      </label>
      <input
        id={singleFieldData.id}
        type={singleFieldData.type}
        name={singleFieldData.name}
        value={registrationFormData[singleFieldData.name]}
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        onChange={handleUserDataChange}
      />
      <p className="text-red-700 text-sm">{errors[singleFieldData.name]}</p>
    </div>
  );
};

export default DynamicInput;
