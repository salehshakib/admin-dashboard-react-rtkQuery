/* eslint-disable no-unused-vars */
import { Button, Checkbox, Divider, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignInHeader from "../../../components/SignInHeader";
import { userLogin } from "../../../features/auth/authAction";

const Login = () => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, error } = useSelector((state) => state.user);

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onFinish = () => {
    loginForm
      .validateFields()
      .then(() => {
        const { email, password } = userLogin.getFieldsValue();
        dispatch(userLogin({ email, password }));
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <>
      <SignInHeader />
      <div className="mt-[122px] w-full text-center">
        <span className="font-bold text-[26px] text-[#323B4B] block">
          Getting Started
        </span>
        <span className="mt-5 font-medium text-[18px] text-[#8A94A6]">
          Create an account to continue!
        </span>

        <div className=" w-fit mx-auto ">
          <div className="mt-7 flex justify-center items-center gap-[35px] w-full  ">
            <Button className="text-[#8A94A6] text-[16px] font-medium flex justify-center items-center gap-2 rounded-[16px] bg-[#F0F5FA] w-[255px] h-[58px] border-none">
              <img
                src="/src/assets/google-symbol.png"
                alt="no_image"
                className="w-[25px] h-[25px]"
              />
              <span>Sign Up with Google</span>
            </Button>

            <Button className="text-[#8A94A6] text-[16px] font-medium flex justify-center items-center gap-2 rounded-[16px] bg-[#F0F5FA] w-[255px] h-[58px] border-none">
              <img
                src="/src/assets/apple.png"
                alt="no_image"
                className="w-[25px] h-[25px]"
              />
              <span>Sign Up with Apple Id</span>
            </Button>
          </div>

          <Divider>
            <span className="text-[#B0B7C3] font-medium text-[20px]">OR</span>
          </Divider>

          <div>
            <Form
              name="loginForm"
              form={loginForm}
              onFinish={onFinish}
              autoComplete="off"
              className="text-start"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  type="email"
                  allowClear
                  className="rounded-[16px] h-[58px] text-[16px]"
                  placeholder="Your Email"
                  prefix={
                    <img
                      src="/src/assets/at.png"
                      alt="no_image"
                      className="w-[20px] mr-2"
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <div>
                  <Input.Password
                    onChange={(event) => setPassword(event.target.value)}
                    className="rounded-[16px] h-[58px] text-[16px]"
                    placeholder="Password"
                    prefix={
                      <img
                        src="/src/assets/lock.png"
                        alt="no_image"
                        className="w-[20px] mr-2"
                      />
                    }
                  />
                  <PasswordStrengthBar
                    password={password}
                    className="mt-6"
                    scoreWordStyle={{
                      display: "none",
                    }}
                    minLength={5}
                  />
                </div>
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="" style={{}}>
                  <span className="text-[15px] font-medium text-[#B0B7C3]">
                    Remember Me
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="bg-[#377DFF] w-full rounded-[16px] h-[58px]"
                  onClick={onFinish}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="text-[16px] font-medium text-[#B0B7C3] ">
            {`Don't have an account yet?`}{" "}
            <Link className="text-[#377DFF]" to={"/register"}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
