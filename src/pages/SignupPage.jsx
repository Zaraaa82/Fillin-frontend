import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
    phoneNumber: "",
    role: "worker",
  });
  const [submitting, setSubmitting] = useState(false)

  const { username, password, passwordConf, email, phoneNumber, role } = formData;

  function handleChange(event) {
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }

  function handleRoleSelect(newRole) {
    setError("");
    setFormData({ ...formData, role: newRole });
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid() {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="role-toggle">
            <span className={`role-toggle-indicator ${role}`}></span>
            <button
              type="button"
              className={role === "worker" ? "active" : ""}
              onClick={() => handleRoleSelect("worker")}
            >
              Worker
            </button>
            <button
              type="button"
              className={role === "business" ? "active" : ""}
              onClick={() => handleRoleSelect("business")}
            >
              Business
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              className="form-input"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-input"
              value={phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary btn-block" disabled={isFormInvalid() || submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
            <button type="button" onClick={() => navigate("/")} className="btn btn-block">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Signup;
