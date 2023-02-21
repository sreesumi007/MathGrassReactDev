import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

const MultipleChoice = () => {
  const dispatch = useDispatch();
  const multipleChoiceArr: any = [];
  const [inputOptions, setInputOptions] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });
  const [openRadioAnswer, setOpenRadioAnswer] = useState(false);
  // const [checkBlankInput, setCheckBlankInput] = useState(true);
  const [showBlankAlert, setShowBlankAlert] = useState(false);
  const [openInputOption, setOpenInputOption] = useState("1");
  const [showHideAdd, setShowHideAdd] = useState("1");

  const inputChangeHandle = (event: any) => {
    const value = event.target.value;
    setInputOptions({
      ...inputOptions,
      [event.target.name]: value,
    });
    setShowBlankAlert(false);
    // if (
    //   inputOptions.optionA !== "" &&
    //   inputOptions.optionB !== "" &&
    //   inputOptions.optionC !== "" &&
    //   inputOptions.optionD !== ""
    // ) {
    //   setCheckBlankInput(false);
    // } else {
    //   setCheckBlankInput(true);
    // }
  };
  const optionsEditHandler = (event: any) => {
    event.preventDefault();
    setOpenRadioAnswer(false);
    setShowBlankAlert(false);
    dispatch({ type: "SAVE_QUES_MODAL", payload: false });
  };
  const correctAnswerHandler = (event: any) => {
    // event.preventDefault();
    let corrAnswer = event.target.value;
    multipleChoiceArr.push({
      optionA: inputOptions.optionA,
      optionB: inputOptions.optionB,
      optionC: inputOptions.optionC,
      optionD: inputOptions.optionD,
      finalAnswer: corrAnswer,
    });
    localStorage.setItem("MultipleChoice", JSON.stringify(multipleChoiceArr));
    dispatch({ type: "SAVE_QUES_MODAL", payload: true });
  };

  const addClickHandler = (event: any) => {
    event.preventDefault();
    // if (
    //   inputOptions.optionA !== "" &&
    //   inputOptions.optionB !== "" &&
    //   inputOptions.optionC !== "" &&
    //   inputOptions.optionD !== ""
    // ) {
    //   setOpenRadioAnswer(true);
    //   setShowBlankAlert(false);
    // } else {
    //   setShowBlankAlert(true);
    // }
    if (openInputOption === "1") {
      if (inputOptions.optionA !== "") {
        inputOptions.optionB = "";
        inputOptions.optionC = "";
        inputOptions.optionD = "";
        setOpenRadioAnswer(true);
        setShowBlankAlert(false);
      }
    }
    if (openInputOption === "2") {
      if (inputOptions.optionA !== "" && inputOptions.optionB !== "") {
        inputOptions.optionC = "";
        inputOptions.optionD = "";
        setOpenRadioAnswer(true);
        setShowBlankAlert(false);
      }
    }
    if (openInputOption === "3") {
      if (
        inputOptions.optionA !== "" &&
        inputOptions.optionB !== "" &&
        inputOptions.optionC !== ""
      ) {
        inputOptions.optionD = "";
        setOpenRadioAnswer(true);
        setShowBlankAlert(false);
      }
    }
    if (openInputOption === "4") {
      if (
        inputOptions.optionA !== "" &&
        inputOptions.optionB !== "" &&
        inputOptions.optionC !== "" &&
        inputOptions.optionD !== ""
      ) {
        setOpenRadioAnswer(true);
        setShowBlankAlert(false);
      }
    }
    else {
      setShowBlankAlert(true);
    }
  };
  return (
    <Fragment>
      {!openRadioAnswer && (
        <div>
          <h5 className="text-center text-muted">OPTIONS</h5>
          <br />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">A</span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Enter Option A"
              name="optionA"
              defaultValue={inputOptions.optionA}
              onChange={inputChangeHandle}
            />
            {showHideAdd === "1" && (
              <button
                type="button"
                className="input-group-text"
                onClick={() => {
                  setOpenInputOption("2");
                  setShowHideAdd("2");
                }}
              >
                +
              </button>
            )}
          </div>
          {openInputOption >= "2" && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">B</span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Enter Option B"
                name="optionB"
                defaultValue={inputOptions.optionB}
                onChange={inputChangeHandle}
              />
              {showHideAdd === "2" && (
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => {
                    setOpenInputOption("3");
                    setShowHideAdd("3");
                  }}
                >
                  +
                </button>
              )}
              {showHideAdd === "2" && (
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => {
                    setOpenInputOption("1");
                    setShowHideAdd("1");
                  }}
                >
                  -
                </button>
              )}
            </div>
          )}
          {openInputOption >= "3" && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">C</span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Enter Option C"
                name="optionC"
                defaultValue={inputOptions.optionC}
                onChange={inputChangeHandle}
              />
              {showHideAdd === "3" && (
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => {
                    setOpenInputOption("4");
                    setShowHideAdd("4");
                  }}
                >
                  +
                </button>
              )}
              {showHideAdd === "3" && (
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => {
                    setOpenInputOption("2");
                    setShowHideAdd("2");
                  }}
                >
                  -
                </button>
              )}
            </div>
          )}
          {openInputOption === "4" && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">D</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Enter Option D"
                  name="optionD"
                  defaultValue={inputOptions.optionD}
                  onChange={inputChangeHandle}
                />
                {showHideAdd === "4" && (
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={() => {
                      setOpenInputOption("3");
                      setShowHideAdd("3");
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <p className="text-info">
                <i>Maximum 4 Options for a Question...</i>
              </p>
            </div>
          )}

          {showBlankAlert && (
            <p className="text-danger">
              <i>Please enter the options...</i>
            </p>
          )}
          <button
            className="btn btn-outline-secondary rightFloat"
            // disabled={checkBlankInput}
            type="button"
            onClick={addClickHandler}
          >
            Add
          </button>
        </div>
      )}
      {openRadioAnswer && (
        <Fragment>
          <div>
            OPTIONS &nbsp; &nbsp;
            <a href="#" onClick={optionsEditHandler}>
              edit
            </a>
          </div>
          <h5 className="text-center text-muted">CHOOSE CORRECT ANSWER</h5>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioAnswer"
              id="inlineRadioA"
              value={inputOptions.optionA}
              onChange={correctAnswerHandler}
            />
            <label className="form-check-label" htmlFor="inlineRadioA">
              {inputOptions.optionA}
            </label>
          </div>
          {openInputOption >="2" && 
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioAnswer"
              id="inlineRadioB"
              value={inputOptions.optionB}
              onChange={correctAnswerHandler}
            />
            <label className="form-check-label" htmlFor="inlineRadioB">
              {inputOptions.optionB}
            </label>
          </div> }
          {openInputOption >="3" && <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioAnswer"
              id="inlineRadioC"
              value={inputOptions.optionC}
              onChange={correctAnswerHandler}
            />
            <label className="form-check-label" htmlFor="inlineRadioC">
              {inputOptions.optionC}
            </label>
          </div>}
          {openInputOption ==="4" &&<div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioAnswer"
              id="inlineRadioD"
              value={inputOptions.optionD}
              onChange={correctAnswerHandler}
            />
            <label className="form-check-label" htmlFor="inlineRadioD">
              {inputOptions.optionD}
            </label>
          </div> }
        </Fragment>
      )}
    </Fragment>
  );
};

export default MultipleChoice;
