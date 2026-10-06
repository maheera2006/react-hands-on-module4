import { useState } from "react";
import PropTypes from "prop-types";

const MIN_MARKS = 0;
const MAX_MARKS = 100;
const PASS_MARKS = 35;
const STEP = 1;
const INITIAL_MARKS = 50;

// name & subject come from props, marks is kept in state.
export default function StudentMarks({ name, subject }) {
  const [marks, setMarks] = useState(INITIAL_MARKS);

  const increase = () => setMarks((m) => Math.min(MAX_MARKS, m + STEP));
  const decrease = () => setMarks((m) => Math.max(MIN_MARKS, m - STEP));
  const reset = () => setMarks(INITIAL_MARKS);

  const passed = marks >= PASS_MARKS;

  return (
    <section className="card">
      <h2>Student Marks</h2>
      <div className="row"><span>Student Name</span><strong>{name}</strong></div>
      <div className="row"><span>Subject</span><strong>{subject}</strong></div>
      <div className="row">
        <span>Marks</span>
        <strong className="big">{marks} / {MAX_MARKS}</strong>
      </div>

      <div className="progress" role="progressbar" aria-valuemin={MIN_MARKS}
           aria-valuemax={MAX_MARKS} aria-valuenow={marks}>
        <div className={passed ? "bar pass" : "bar fail"} style={{ width: `${marks}%` }} />
      </div>
      <p className={passed ? "msg success" : "msg error"}>
        {passed ? "Result: Pass" : "Result: Fail"} (pass mark {PASS_MARKS})
      </p>

      <div className="actions">
        <button className="btn" onClick={increase} disabled={marks >= MAX_MARKS}>
          Increase Marks
        </button>
        <button className="btn outline" onClick={decrease} disabled={marks <= MIN_MARKS}>
          Decrease Marks
        </button>
        <button className="btn link" onClick={reset}>Reset</button>
      </div>
      {(marks >= MAX_MARKS || marks <= MIN_MARKS) && (
        <p className="hint">
          Marks must stay between {MIN_MARKS} and {MAX_MARKS}.
        </p>
      )}
    </section>
  );
}

StudentMarks.propTypes = {
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};
