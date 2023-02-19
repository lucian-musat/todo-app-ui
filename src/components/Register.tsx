import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { register } from "../actions/auth";
import isEmail from "validator/lib/isEmail";
import { IState } from "../types/global";

const required = (value: string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value: string) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validUserName = (value: string) => {
  if (value.length < 3 || value.length > 25) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 25 characters.
      </div>
    );
  }
};

const validPassword = (value: string) => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must have at least 6 characters.
      </div>
    );
  }
};

export const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: IState) => state.message);
  const dispatch = useDispatch();

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSuccessful(false);
    dispatch(register(userName, email, password) as any)
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card card-container p-3">
          <h2 className="text-center">Todo App - Sign Up</h2>

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userName}
                    onChange={onChangeUserName}
                    validations={[required, validUserName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, validPassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>

          {successful && (
            <div className="alert alert-success" role="alert">
              User created. <br />
              <br /> You now can go to <Link to="/login">login page</Link>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
