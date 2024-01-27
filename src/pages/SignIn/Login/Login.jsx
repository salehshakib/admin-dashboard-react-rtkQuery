/* eslint-disable no-unused-vars */
import { Button, Checkbox, Divider, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../../app/services/auth/authServices";
import SignInHeader from "../../../components/SignInHeader";
import { userLogin } from "../../../features/auth/authActions";
import { setCredentials } from "../../../features/auth/authSlice";
import Error from "../../Error/Error";
import { notification } from "antd";

const Login = () => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [api, contextHolder] = notification.useNotification();
  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message: "Login Successful",
  //     description: "You are logged in!!!",
  //   });
  // };

  const openNotification = () => {
    notification.open({
      type: "success",
      message: "Login Successful",
      description: "You are logged in!!!",
    });
  };

  const { loading, userInfo, error, userToken } = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState("");

  // automatically authenticate user if token is found
  const { data: userData, isFetching } = useGetUserDetailsQuery("userDetails");

  useEffect(() => {
    if (userToken) {
      dispatch(setCredentials(userData?.data));
    }
  }, [dispatch, userData?.data, userToken]);

  useEffect(() => {
    if (userInfo) {
      // openNotificationWithIcon("success");
      openNotification();
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userInfo]);

  const onFinish = () => {
    loginForm
      .validateFields()
      .then(() => {
        const { email, password } = loginForm.getFieldsValue();
        dispatch(userLogin({ email, password }));
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <>
      {/* {contextHolder} */}
      <SignInHeader />
      {error && <Error>{error}</Error>}
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
              autoComplete="on"
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
                  loading={loading}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="text-[16px] font-medium text-[#B0B7C3] ">
            {`Don't have an account yet?`}{" "}
            <Link className="text-[#377DFF]" to={"/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
