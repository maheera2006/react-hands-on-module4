import PropTypes from "prop-types";

// Reusable card. All data arrives through props.
export default function Student({ name, rollNo, course, college }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <section className="card">
      <div className="profile-head">
        <div className="avatar" aria-hidden="true">{initial}</div>
        <h2>Student Profile</h2>
      </div>
      <div className="row"><span>Name</span><strong>{name}</strong></div>
      <div className="row"><span>Roll No</span><strong>{rollNo}</strong></div>
      <div className="row"><span>Course</span><strong>{course}</strong></div>
      <div className="row"><span>College</span><strong>{college}</strong></div>
    </section>
  );
}

Student.propTypes = {
  name: PropTypes.string.isRequired,
  rollNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  course: PropTypes.string.isRequired,
  college: PropTypes.string.isRequired,
};
