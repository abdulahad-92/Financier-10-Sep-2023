import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import X icon from React Icons

export default function Modal(props) {
  const [Value, setValue] = useState("");
  const [warning, setWarning] = useState(false);

  return (
    <div
      id="file_name"
      className={`relative ${
        props.show ? "show" : "hide"
      } p-4 bg-white rounded-lg shadow-lg max-w-sm mx-auto`}
    >
      {/* Delete Button */}
      <button
        onClick={props.closing}
        className="red_btn"
        aria-label="Close modal"
      >
        <FaTimes size={16} />
      </button>
      <p>File's name</p>
      <input
        type="text"
        placeholder="Set a short name"
        required
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="warning">{warning && "Please set a name"}</p>
      <button
        className="blue_btn"
        onClick={() => {
          Value === "" ? setWarning(true) : props.closing();
          Value === "" ? setWarning(true) : setValue("");
          Value === "" ? setWarning(true) : setWarning(false);
          Value === "" ? setWarning(true) : props.creating(Value);
        }}
      >
        Save
      </button>
    </div>
  );
}
