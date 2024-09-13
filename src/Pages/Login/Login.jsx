import { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup, login, resetPass } from "../../Config/Firebase";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currentState === "Sign Up") {
      signup(username, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign Up" ? (
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="email address"
          className="form-input"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          className="form-input"
          required
        />

        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>

        <div className="checkbox-wrapper-46">
          <input type="checkbox" id="cbx-46" className="inp-cbx" />
          <label htmlFor="cbx-46" className="cbx">
            <span>
              <svg viewBox="0 0 12 10" height="10px" width="12px">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            </span>
            <span>Agree to the term of use and privacy policy</span>
          </label>
        </div>

        <div className="login-forward">
          {currentState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?{"  "}
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account?{"  "}
              <span onClick={() => setCurrentState("Sign Up")}>click here</span>
            </p>
          )}

          {currentState == "Login" ? (
            <p className="login-toggle">
              Forget Password ?{"  "}
              <span onClick={() => resetPass(email)}>reset here</span>
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Login;
