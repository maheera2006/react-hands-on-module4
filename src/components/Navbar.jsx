import PropTypes from "prop-types";

export default function Navbar({ tabs, activeId, onChange }) {
  return (
    <header className="navbar">
      <div className="brand">
        <h1>React Hands-On</h1>
        <span>Module 4</span>
      </div>
      <nav aria-label="Exercises">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeId ? "tab active" : "tab"}
            aria-current={tab.id === activeId ? "page" : undefined}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  activeId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
