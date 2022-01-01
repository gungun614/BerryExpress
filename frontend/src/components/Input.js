import React from "react";

const Input = (props) => {
  // const [value, setValue] = useState(props.value[props.name] || "");
  // const onChange = (event) => {
  //   const newValue = event.target.value
  //   setValue(newValue)
  // }

  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;