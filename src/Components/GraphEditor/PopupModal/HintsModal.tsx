import Modal from "react-bootstrap/Modal";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

const HintsModal = (props: any) => {
  const dispatch = useDispatch();
  const hintsModalArr: any = [];
  const inputScriptHint: any = useRef("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [counterAdd, setCounterAdd] = useState(0);
  const [checkTextHint, setCheckTextHint] = useState(false);
  const [checkScriptHint, setCheckScriptHint] = useState(false);

  const hintSaveHandler = (event: any) => {
    event.preventDefault();
    if (checkTextHint === true && checkScriptHint ===false) {
      if (inputFields[0].value === "") {
        setAlertMessage("Please enter the Textual Hints and remove the unwanted hint");
        setShowAlert(true);
      } else {
        hintsModalArr.push({
          hintType: "TextualHints",
          hints: inputFields,
        });
        console.log("The saved hints - ", JSON.stringify(hintsModalArr));
        localStorage.setItem("HintsModal", JSON.stringify(hintsModalArr));
        dispatch({ type: "TOGGLE_ADD_HINTS", payload: true });
        setCheckScriptHint(false);
        setCheckTextHint(false);
        props.onHide();
      }
    } else if (checkScriptHint === true && checkTextHint === false) {
      if (inputScriptHint.current.value === "") {
        setAlertMessage("Please enter the Script");
        setShowAlert(true);
      } else {
        hintsModalArr.push({
          hintType: "ScriptHints",
          hint: inputScriptHint.current.value,
        });
        console.log("The saved hints - ", JSON.stringify(hintsModalArr));
        localStorage.setItem("HintsModal", JSON.stringify(hintsModalArr));
        dispatch({ type: "TOGGLE_ADD_HINTS", payload: true });
        setCheckScriptHint(false);
        setCheckTextHint(false);
        props.onHide();
      }
    }
    
    if (checkScriptHint ===true && checkScriptHint ===true) {
      console.log("came into both true block");
      if (inputFields[0].value === "" && inputScriptHint.current.value === "") {
        setAlertMessage("Please enter the hints or Unselect the checkbox");
        setShowAlert(true);
      }
      else if (inputScriptHint.current.value === "") {
        setAlertMessage("Please enter the Script");
        setShowAlert(true);
      }
      else if (inputFields[0].value === "") {
        setAlertMessage("Please enter the Textual Hints and remove the unwanted hint");
        setShowAlert(true);
      }
      else{
        hintsModalArr.push({
          hintType: "TextandScriptHints",
          textHint:{
            hint:inputFields
          },
          scriptHint:{
          hint: inputScriptHint.current.value
          }
        });
        console.log("The saved hints - ", JSON.stringify(hintsModalArr));
        localStorage.setItem("HintsModal", JSON.stringify(hintsModalArr));
        dispatch({ type: "TOGGLE_ADD_HINTS", payload: true });
        setCheckScriptHint(false);
        setCheckTextHint(false);
        props.onHide();

      }

    }
    
};

  function handleAddField() {
    setCounterAdd(counterAdd + 1);
    setInputFields([...inputFields, { value: "" }]);
    console.log(inputFields[0]);
  }

  function handleRemoveField(index: any) {
    setCounterAdd(counterAdd - 1);
    const newInputFields = inputFields.filter((_, i) => i !== index);
    setInputFields(newInputFields);
  }

  function handleInputChange(e: any, index: any) {
    const newInputFields = [...inputFields];
    newInputFields[index].value = e.target.value;
    setInputFields(newInputFields);
  }

  // const changeOfTextualHints = (event: any) => {
  //   // const check = checkBoxArray.indexOf(event.target.value);
  //   // if (check > -1) {
  //   //   checkBoxArray.splice(check, 1);
  //   // } else {
  //   //   checkBoxArray.push(event.target.value);
  //   // }
  //   // console.log("Final value of the input checks - ",checkTextHint,checkScriptHint);
  //   // console.log("check box triggered - ", checkBoxArray);
  // };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">HINTS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>HINT TYPE</h5>
        <br />
        {/* New Change for Hints - Starts */}
        <form>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              name="checkTextualHints"
              value="TextualHints"
              onChange={() => {
                if (checkTextHint === false) {
                  setCheckTextHint(true);
                } else {
                  setCheckTextHint(false);
                }
              }}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Textual Hints
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              name="checkScriptHints"
              value="ScriptHints"
              onChange={() => {
                if (checkScriptHint === false) {
                  setCheckScriptHint(true);
                } else {
                  setCheckScriptHint(false);
                }
              }}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Script Hints
            </label>
          </div>
        {checkTextHint === true && (
          <div>
            <br />
              <h5 className="text-center text-muted">Textual Hints</h5>
              {inputFields.map((inputField, index) => (
                <div key={index}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Your Hint goes here"
                      placeholder="Your Hint goes here"
                      value={inputField.value}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    {counterAdd > 0 && (
                      <button
                        type="button"
                        className="input-group-text btn btn-outline-danger"
                        onClick={() => handleRemoveField(index)}
                      >
                        -
                      </button>
                    )}
                    <button
                      className="input-group-text btn btn-outline-primary"
                      type="button"
                      onClick={handleAddField}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <br />
          {checkScriptHint === true && (
            <div>
            <h5 className="text-center text-muted">Script Hints</h5>
            <div className="input-group mb-3">
              <textarea
                className="form-control"
                ref={inputScriptHint}
                placeholder="Your Script hint goes here"
                aria-label="Your Script hint goes here"
              ></textarea>
            </div>
            </div>
          )}
          {showAlert && (
            <h6 className="text-danger">
              <i>{alertMessage}</i>
            </h6>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-outline-primary"
          onClick={hintSaveHandler}
          disabled={checkTextHint === false && checkScriptHint === false}
        >
          Save
        </button>
        <button className="btn btn-outline-primary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default HintsModal;
