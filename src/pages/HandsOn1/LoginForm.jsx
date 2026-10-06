import { useState } from "react";
import { isValidEmail, PASSWORD_MIN_LENGTH } from "../../utils/validators.js";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const validate = () => {
    const found = {};
    if (username.trim() && !isValidEmail(username)) {
      found.username = "Enter a valid email, e.g. name@example.com";
    }
    if (password && password.length < PASSWORD_MIN_LENGTH) {
      found.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    return found;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop page reload; also lets the Enter key submit

    // Requirement from the hands-on: both fields must be filled.
    if (!username.trim() || !password) {
      setErrors({});
      setMessage({ text: "Please enter username and password", type: "error" });
      return;
    }

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMessage({ text: "Please fix the errors below", type: "error" });
      return;
    }

    setMessage({ text: "Login Successful", type: "success" });
  };

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Username (email)</label>
        <input
          id="username"
          type="text"
          placeholder="name@example.com"
          autoComplete="username"
          value={username}
          aria-invalid={Boolean(errors.username)}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="field-error">{errors.username}</p>}

        <label htmlFor="password">Password</label>
        <div className="password-wrap">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 6 characters"
            autoComplete="current-password"
            value={password}
            aria-invalid={Boolean(errors.password)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn link"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="field-error">{errors.password}</p>}

        <button type="submit" className="btn full">Login</button>
      </form>

      {message.text && (
        <p className={`msg ${message.type}`} role="status">{message.text}</p>
      )}
    </section>
  );
}
