import React from "react";

export default function Input({ data, handleChange, formData }) {
  return (
    <input
      type={data.type}
      name={data.name}
      placeholder={data.name}
      onChange={handleChange}
      value={formData[data.name]}
    />
  );
}
