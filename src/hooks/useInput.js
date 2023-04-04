import { useState } from "react";

const useInput = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (event) => {
    const {name, value} = event.target
    console.log(name)
    setValues({ ...values, [name] : value });
  };

  console.log(values)

  return {
    values,
    onChange,
  };
};

export default useInput;
