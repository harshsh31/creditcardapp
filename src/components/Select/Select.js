import React from "react";

const Select = ({ onChange, value, list, label, className }) => {
  return (
    <select
      className={className ? className : ""}
      value={value}
      onChange={onChange}
    >
      {label && <option value={label.value}>{label.text}</option>}
      {list.map((item, index) => (
        <option key={item.value + index + item.text} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
