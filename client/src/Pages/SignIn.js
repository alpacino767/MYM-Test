import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import { useAppContext } from "../context/appContext";
import { GoogleLogin } from "react-google-login";
// eslint-disable-next-line
import { gapi } from "gapi-script";

const eye = <FontAwesomeIcon icon={faEye} />;

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
};

function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, isLoading, displayAlert, loginUser, signinGoogle } =
    useAppContext();

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  function handleGoogleLoginSuccess(tokenResponse) {
    const { accessToken } = tokenResponse;
    signinGoogle(accessToken);
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      displayAlert();
      return;
    }
    const currentUser = { email, password };
    loginUser(currentUser);
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
      <div className="App-4">
        <div className="wrapper">
          <section>
            <div className="navigation-1"></div>

            <div className="head-4">
              <h2>Login to your NASA Account</h2>
            </div>
            {showAlert && <Alert />}

            <form
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="search-3"
            >
              <h4 className="down">E-mail</h4>

              <label>
                <input
                  className="in"
                  type="text"
                  name="email"
                  placeholder="john@example.com"
                />
              </label>
            </form>
            <div className="search-3">
              <h4 className="down">Password</h4>
              <form
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              >
                <label>
                  <input
                    className="in"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="At least 6 characters"
                  />
                  <i onClick={handleShow} className="eye">
                    {eye}
                  </i>
                </label>
              </form>
            </div>

            <div className="">
              <label className="terms"></label>
            </div>
            <div className="account1">
              <button
                type="submit"
                disabled={isLoading}
                onSubmit={onSubmit}
                style={{ cursor: "pointer" }}
                className="btn-5"
              >
                Login to your NASA Account
              </button>
            </div>
            <div className="beneath">
              <Link to="/SignUp">
                <p className="ready">
                  Don't have an account?
                  <span className="sign" style={{ cursor: "pointer" }}>
                    Sign Up
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
                marginLeft: "72px",
              }}
            >
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Signin with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={(error) =>
                  console.log("Google login failed:", error)
                }
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
