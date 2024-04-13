import { useState } from "react";

export default function NumberInput({ label, id, stateUpdateFn, value }) {
  const [isError, setIsError] = useState(false);
  //   function isNumberKey(evt) {
  //     let charCode = evt.which ? evt.which : evt.keyCode;
  //     if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  //     return true;
  //   }

  function onKeyDown(e) {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    console.log(e.key);

    if (
      !(
        re.test(e.key) ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "." ||
        e.key === "Tab"
      )
    ) {
      e.preventDefault();
    }
  }

  function validateInput(e) {
    if (isNaN(e.target.value)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  function handleKeyDown(e) {
    stateUpdateFn(e);
    validateInput(e);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <label htmlFor={id}>{label}</label>
      <input
        className="number-input"
        id={id}
        name={id}
        type="text"
        inputMode="numeric"
        onKeyDown={onKeyDown}
        onChange={(e) => handleKeyDown(e)}
        value={value}
      ></input>
      {isError && <p className="input-error">Please enter a valid number</p>}
    </div>
  );
}
