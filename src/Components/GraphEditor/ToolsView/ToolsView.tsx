import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import circle from "../../Sources/assets/circle.jpg";
import rectangle from "../../Sources/assets/rectangle.jpg";
import { State } from "../../../store/store";

import QuestionModal from "../PopupModal/QuestionModal";
import HintsModal from "../PopupModal/HintsModal";
const ToolsView = () => {

  const [modalQuesShow, setQuesModalShow] = useState(false);
  const [modalHintShow, setHintModalShow] = useState(false);
  const saveBtn = useSelector((state: State) => state.saveBtn);
  const quesToggle = useSelector((state: State) => state.toggleAddQues);
  const hintsToggle = useSelector((state: State) => state.toggleAddHints);
  

  const dispatch = useDispatch();
  const saveGraphNavigation = () => {
    if (saveBtn === false) {
      dispatch({ type: "SAVEBTN_TOGGLE", payload: true });
    }
  };
  const deleteQuestionHandler = (event: any) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_ADD_QUES", payload: false });
    dispatch({ type: "TOGGLE_ADD_HINTS", payload: false });
  };
  const deleteHintsHandler = (event: any) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_ADD_HINTS", payload: false });
  };
  const [isDirected, setIsDirected] = useState(false);
  

  const handleToggle = () => {
    setIsDirected(!isDirected);
    dispatch({ type: "TOGGLE_DIRECTION", payload: !isDirected });
  };
  
return (
    <Fragment>
      <header className="d-block p-2 bg-primary text-white text-center rounded blockquote">
        TOOLS VIEW
      </header>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Graph Type</h5>
          <h6 className="card-subtitle mb-2 text-muted text-center">Directed/Undirected</h6>
          {/* Toggle button  -- Start*/}
          <div className="form-check form-switch"  style={{marginLeft: "4rem"}}>
            <input
              className="form-check-input"
              type="checkbox"
              id="toggleSwitch"
              checked={isDirected}
              onChange={handleToggle}
            />
            <label className="form-check-label" htmlFor="toggleSwitch">
              {isDirected ? "Directed" : "Undirected"}
            </label>
          </div>
          {/* Toggle button  -- Ends*/}
        </div>
      </div>
      <br />
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">SHAPES</h5>
          <h6 className="card-subtitle mb-2 text-muted text-center">Basic</h6>
          <img
            className="btn btn-outline-dark"
            id="contextmenu-addRect-trigger"
            src={rectangle}
            alt="rectangle"
            onClick={saveGraphNavigation}
            style={{ width: "100px", height: "40px", marginRight: "20px" }}
          />
          <img
            className="btn btn-outline-dark"
            id="contextmenu-addCircle-trigger"
            src={circle}
            alt="circle"
            onClick={saveGraphNavigation}
            style={{ width: "60px", height: "40px", marginRight: "20px" }}
          />
        </div>
      </div>
      <br />
      {saveBtn && (
        <div>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title text-center">Questions</h5>
              {!quesToggle && (
                <h6 className="card-subtitle mb-2 text-muted text-center">
                  <a href="#" onClick={() => setQuesModalShow(true)}>
                    Add Ques
                  </a>
                </h6>
              )}
              <QuestionModal
                show={modalQuesShow}
                onHide={() => setQuesModalShow(false)}
              />
              {quesToggle && (
                <div className="card-header bg-info text-white rounded">
                  Question Added{" "}
                  <a
                    href="#"
                    className="fa fa-trash-o"
                    onClick={deleteQuestionHandler}
                    style={{ float: "right", fontSize: "28px", color: "red" }}
                  ></a>
                </div>
              )}
            </div>
          </div>
          <br />
          {quesToggle && (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title text-center">Hints</h5>
                {!hintsToggle && (
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    <a href="#" onClick={() => setHintModalShow(true)}>
                      Add Hints
                    </a>
                  </h6>
                )}
                <HintsModal
                  show={modalHintShow}
                  onHide={() => setHintModalShow(false)}
                />
                {hintsToggle && (
                  <div className="card-header bg-info text-white rounded">
                    Hints Added{" "}
                    <a
                      href="#"
                      className="fa fa-trash-o"
                      onClick={deleteHintsHandler}
                      style={{ float: "right", fontSize: "28px", color: "red" }}
                    ></a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ToolsView;
