import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import "./Question.css";
import MultipleChoice from "./MultipleChoice";
import { State } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";

function QuestionModal(props: any) {
  const inputQues: any = useRef("");
  const inputAnswer: any = useRef("");
  const inputScript: any = useRef("");
  const saveQuesModal = useSelector((state: State) => state.saveQuesModal);
  const dispatch = useDispatch();
  let question: any;
  let writtenAnswer: any;
  let sageScript: any;
  let quesType: any;
  const questionModalArr: any = [];

  const [addQues, setAddQues] = useState(true);
  const [showQues, setShowQues] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [showScript, setShowScript] = useState("");
  const [showAlertWrittenAns, setShowAlertWrittenAns] = useState(false);
  const [showAlertSageMath, setShowAlertSageMath] = useState(false);
  const [radioBtn, setRadioBtn] = useState(false);
  const [checkBlankInput, setCheckBlankInput] = useState(true);
  const [radioClick, setRadioClick] = useState("");

  const questionInputChange = () => {
    question = inputQues.current.value;
    if (question !== "") {
      setCheckBlankInput(false);
    } else {
      setCheckBlankInput(true);
    }
  };
  const inputAnswerHandler = () => {
    writtenAnswer = inputAnswer.current.value;
    setShowAnswer(writtenAnswer);
    setShowAlertWrittenAns(false);
    dispatch({ type: "SAVE_QUES_MODAL", payload: true });
  };
  const inputSageScriptHandler = () => {
    sageScript = inputScript.current.value;
    setShowScript(sageScript);
    setShowAlertSageMath(false);
    dispatch({ type: "SAVE_QUES_MODAL", payload: true });
  };
  const addQuestion = (event: any) => {
    event.preventDefault();
    setAddQues(false);
    setShowQues(question);
    setRadioBtn(true);
  };
  const onRadioChange = (event: any) => {
    quesType = event.target.value;
    setRadioClick(quesType);
    dispatch({ type: "SAVE_QUES_MODAL", payload: false });
  };

  const saveModal = (event: any) => {
    event.preventDefault();
    let checkLocal = JSON.parse(localStorage.getItem("MultipleChoice") || "[]");
    if (radioClick === "MultipleChoice") {
      questionModalArr.push({
        Question: showQues,
        AnswerType: radioClick,
        OptionsAndAnswer: checkLocal,
      });
      localStorage.removeItem("MultipleChoice");
      localStorage.setItem("QuestionModal", JSON.stringify(questionModalArr));
      dispatch({ type: "TOGGLE_ADD_QUES", payload: true });
      props.onHide();
    }
    if (radioClick === "WrittenAnswer") {
      if (showAnswer === "") {
        setShowAlertWrittenAns(true);
      } else {
        setShowAlertWrittenAns(false);
        questionModalArr.push({
          Question: showQues,
          AnswerType: radioClick,
          Answer: showAnswer,
        });
        localStorage.removeItem("QuestionModal");
        localStorage.setItem("QuestionModal", JSON.stringify(questionModalArr));
        dispatch({ type: "TOGGLE_ADD_QUES", payload: true });
        props.onHide();
      }
    }
    if (radioClick === "SageMath") {
      if (showScript === "") {
        setShowAlertSageMath(true);
      } else {
        setShowAlertSageMath(false);
        questionModalArr.push({
          Question: showQues,
          AnswerType: radioClick,
          script: showScript,
        });
        localStorage.removeItem("QuestionModal");
        localStorage.setItem("QuestionModal", JSON.stringify(questionModalArr));
        dispatch({ type: "TOGGLE_ADD_QUES", payload: true });
        props.onHide();
      }
    }
    console.log("JSON OF QUESTION MODAL - ", JSON.stringify(questionModalArr));
  };
  const clickQuestionEdit = (event:any) =>{
    event.preventDefault();
    setAddQues(true);
    setRadioBtn(false);

  }
  const submitQuestionForm = () => {};

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">QUESTION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Task</h4>
        <form onSubmit={submitQuestionForm}>
          {!addQues && (
            <div>
              {showQues} &nbsp; &nbsp;
              <a
                href="#"
                onClick={clickQuestionEdit}
              >
                edit
              </a>
            </div>
          )}
          {addQues && (
            <div className="input-group mb-3">
              <textarea
                className="form-control"
                aria-label="Question goes here"
                placeholder="Question goes here"
                ref={inputQues}
                defaultValue={showQues}
                onChange={questionInputChange}
              ></textarea>
              {/* <input
                type="text"
                className="form-control"
                ref={inputQues}
                defaultValue={showQues}
                onChange={questionInputChange}
                placeholder="Question goes here"
                aria-label="Question goes here"
              /> */}
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={addQuestion}
                  disabled={checkBlankInput}
                >
                  Add
                </button>
              </div>
            </div>
          )}
          <br />
          {radioBtn && (
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="MultipleChoice"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Multiple Choice
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="WrittenAnswer"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Written Answer
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="SageMath"
                  onChange={onRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">
                  Sage Math
                </label>
              </div>
            </div>
          )}
          <br />
          {radioClick === "MultipleChoice" && <MultipleChoice />}
          {radioClick === "WrittenAnswer" && (
            <div>
              <h4 className="text-center text-muted">Written Answer</h4>
              <div className="input-group mb-3">
              <textarea
                className="form-control"
                ref={inputAnswer}
                defaultValue={showAnswer}
                onChange={inputAnswerHandler}
                placeholder="Your Answer goes here"
                aria-label="Your Answer goes here"
              ></textarea>
                {/* <input
                  type="text"
                  className="form-control"
                  ref={inputAnswer}
                  defaultValue={showAnswer}
                  onChange={inputAnswerHandler}
                  placeholder="Your Answer goes here"
                  aria-label="Your Answer goes here"
                /> */}
              </div>
              {showAlertWrittenAns && (
                <p className="text-danger">
                  <i>Please enter any answer...</i>
                </p>
              )}
            </div>
          )}
          {radioClick === "SageMath" && (
            <div>
              <h4 className="text-center text-muted">Sage Math</h4>
              <div className="input-group mb-3">
              <textarea
                className="form-control"
                ref={inputScript}
                defaultValue={showScript}
                onChange={inputSageScriptHandler}
                placeholder="Your Script goes here"
                aria-label="Your Script goes here"
              ></textarea>
              </div>
              {showAlertSageMath && (
                <p className="text-danger">
                  <i>Please enter any text...</i>
                </p>
              )}
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveModal} disabled={!saveQuesModal}>
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default QuestionModal;
