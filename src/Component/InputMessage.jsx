import React from "react";
function InputMessage({ form, onChange, onClick }) {
  return (
    <form onSubmit={onClick}>
      <input
        className="input-message"
        id="message"
        name="message"
        value={form.message}
        onChange={onChange}
        type="text"
      ></input>
      <span className="icon" onClick={onClick}>
        &#10148;
      </span>
    </form>
  );
}

export default InputMessage;
