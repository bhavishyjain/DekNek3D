import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const AuthForm = ({ mode }) => {
  const { login, signup, loading } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const action = isSignup ? signup : login;
    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    const result = await action(payload);

    if (!result.success) {
      setMessage(result.message);
    }
  };

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">{isSignup ? "Create account" : "Welcome back"}</p>
        <h2>
          {isSignup
            ? "Create your workspace account"
            : "Sign in to continue"}
        </h2>
      </div>

      {isSignup ? (
        <label>
          Full name
          <input
            name="name"
            onChange={handleChange}
            placeholder="Your name"
            required
            type="text"
            value={formData.name}
          />
        </label>
      ) : null}

      <label>
        Email
        <input
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          required
          type="email"
          value={formData.email}
        />
      </label>

      <label>
        Password
        <input
          minLength="6"
          name="password"
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          required
          type="password"
          value={formData.password}
        />
      </label>

      {message ? <p className="form-error">{message}</p> : null}

      <button className="primary-button" disabled={loading} type="submit">
        {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
      </button>
    </form>
  );
};
