import React from "react";

export default function Form({ inputs, onSubmit, register, errors, submitLabel }) {
  return (
    <form onSubmit={onSubmit}>
      {inputs.map((input) => (
        <div key={input.name} style={{ marginBottom: "10px" }}>
          <label>{input.label}</label>
          <input
            type={input.type}
            {...register(input.name)}
          />
          {errors[input.name] && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors[input.name].message}
            </p>
          )}
        </div>
      ))}
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
