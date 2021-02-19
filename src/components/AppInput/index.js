import React from "react";
import { View, TextInput } from 'react-native';

const AppInput = ({value, placeHolder, onChange}) => {

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
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeHolder={placeHolder}
      />
      {/* <p>// place for errors</p> */}
    </View>
  );
};

export default AppInput;  