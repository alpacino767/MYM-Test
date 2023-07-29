import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import { GoogleLogin } from "react-google-login";
import { useAppContext } from "../context/appContext";
// eslint-disable-next-line
import { gapi } from "gapi-script";

window.gapi.load("client:auth2", () => {
  window.gapi.client.init({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    plugin_name: "chat",
  });
});

const initialState = {
  name: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    showAlert,
    isLoading,
    displayAlert,
    registerUser,
    loginUser,
    signupGoogle,
  } = useAppContext();

  function handleGoogleSignupSuccess(tokenResponse) {
    const { accessToken } = tokenResponse;
    signupGoogle(accessToken);
  }

  const eye = <FontAwesomeIcon icon={faEye} />;

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <form onSubmit={onSubmit}>
      <div className="App-5">
        <div className="wrapper">
          <section className="left">
            <div className="navigation-1">
              <p className="fib-1">NASA</p>
            </div>

            <div className="head-4">
              <h2>Create your NASA Account</h2>
            </div>
            {showAlert && <Alert />}

            <div
              value={values.name}
              onChange={handleChange}
              className="search-3"
            >
              <h4 className="down">Your name</h4>

              <label>
                <input
                  className="in2"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="John Doe"
                />
              </label>
            </div>
            <div
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="search-3"
            >
              <h4 className="down">E-mail</h4>

              <label>
                <input
                  className="in2"
                  type="text"
                  name="email"
                  placeholder="john@example.com"
                />
              </label>
            </div>
            <div className="search-3">
              <h4 className="down">Password</h4>
              <div
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              >
                <label>
                  <input
                    className="in2"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="At least 6 characters"
                  />
                  <i onClick={handleShow} className="eye1">
                    {eye}
                  </i>
                </label>
              </div>
            </div>

            <div className="account">
              {/* <Link to="/Dashboard"> */}
              <button
                type="submit"
                disabled={isLoading}
                onSubmit={onSubmit}
                style={{ cursor: "pointer" }}
                className="btn-6"
              >
                Create NASA Account
              </button>
              {/* </Link> */}
            </div>
            <div className="beneath">
              <Link to="/SignIn">
                <p className="ready">
                  Already have an account?
                  <span className="sign" style={{ cursor: "pointer" }}>
                    Sign in
                  </span>
                </p>{" "}
              </Link>
            </div>
            <div
              style={{
                marginTop: "-9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Signup with Google"
                onSuccess={handleGoogleSignupSuccess}
                onFailure={(error) =>
                  console.log("Google login failed:", error)
                }
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </section>
          <section className="right">
            <div className="img-4">
              <img className="pic-2" src="Assets/galaxy.jpg" alt=""></img>
            </div>
            <div className="last-man">
              <h2 className="last-last">Amazing NASA Images</h2>
              <p className="la-2">
                Experience space from the comfort of your home, with just an
                internet connection
              </p>
            </div>
          </section>
        </div>
        <div className="divide"></div>
      </div>
    </form>
  );
}

export default SignUp;
