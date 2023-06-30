import React, { useState, useEffect, useRef } from "react";

import "./AutoInput.css";
import chevron from "./chevron.svg";

export const AutoInput = ({
  value = "",
  etc,

  //   field,
  //   addText = "",
  //   inputName,
  //   handleAutoinput,
  //   height,
  //   width,
  //   flexGrow,
}) => {
  const { optionList: list = [], idx: fieldIndex, handler } = etc;

  const [inputValue, setInputValue] = useState(value);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const ref = useRef(null);

  const handleOptionClick = (idx) => {
    const sValue = options[idx];
    setSelectedValue(sValue);
    setInputValue(sValue);
    setIsOptionsListOpen(false);

    handler({ idx: fieldIndex, value: options[idx] });
  };

  useEffect(() => {
    !isOptionsListOpen && inputValue !== selectedValue && setInputValue("");
  }, [inputValue, isOptionsListOpen, selectedValue]);

  useEffect(() => {
    setOptions(
      list.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, list]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOptionsListOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="wrapper" ref={ref}>
      <div className="input-wrapper">
        <input
          className="input-field"
          //   name={inputName}
          type="text"
          value={inputValue}
          autoComplete="off"
          required
          //   height={height}
          //   width={width}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={() => {
            setIsOptionsListOpen(true);
          }}
        />
        <button
          className="control-btn"
          type="button"
          onClick={() => {
            setIsOptionsListOpen((s) => !s);
          }}
        >
          <img
            className={`chevron ${isOptionsListOpen ? "open" : ""}`}
            src={chevron}
            alt="open list"
            rotate={isOptionsListOpen.toString()}
          />
        </button>
      </div>
      {isOptionsListOpen && (
        <ul className="option-list">
          {options.map((option, index) => (
            <li
              className="option-item"
              key={index}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
