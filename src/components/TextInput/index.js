import React from "react";

const TextInput = ({value, placeHolder, onChange}) => {

  const handleChange = event => {
    setFields(event, field);

    if (typeof onChange === "function") {
      onChange({
        ...field,
        value: event.target.value
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={{value}}
        onChangeText={onChange}
        placeHolder={{placeHolder}}
      />
      <p>// place for errors</p>
    </div>
  );
};

export default TextInput; 