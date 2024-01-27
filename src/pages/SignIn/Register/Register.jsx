/* eslint-disable no-unused-vars */
import { Button, Checkbox, Divider, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { RiUserSmileFill } from "react-icons/ri";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignInHeader from "../../../components/SignInHeader";
import { registerUser } from "../../../features/auth/authActions";
import Error from "../../Error/Error";

const Register = () => {
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, error, success, userToken } = useSelector(
    (state) => state.auth
  );

  // console.log(userInfo, userToken);

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      navigate("/login");
    }

    if (userInfo || userToken) {
      navigate("/");
    }
  }, [navigate, userInfo, success, userToken]);

  const onFinish = () => {
    registerForm
      .validateFields()
      .then(() => {
        const { email, password } = registerForm.getFieldsValue();
        dispatch(registerUser({ email, password }));
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <>
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
              name="registerForm"
              form={registerForm}
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  className="rounded-[16px] h-[58px] text-[16px]"
                  prefix={
                    <RiUserSmileFill className="text-[20px] mr-2 text-[#C5CBD3]" />
                  }
                  placeholder="Your Name"
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
                    placeholder="Create Password"
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
                    I agree to the Terms & Conditions
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
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="text-[16px] font-medium text-[#B0B7C3]">
            Already have an account?{" "}
            <Link className="text-[#377DFF]" to={"/login"}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
