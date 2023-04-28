import { useState } from "react";

const useInput = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (event) => {
    const {name, value} = event.target
    if(name === 'price'){
      setValues({
        ...values,
        [name] : Number(value)
      })
    }else{
      setValues({ ...values, [name] : value });
    }
  };

  return {
    values,
    onChange,
    setValues
  };
};

export default useInput;
