import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  width: 400px;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 70px 30px;
  background: transparent;
  border: 1px solid #aaabad;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: white;
  outline: none;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background: #2082fa;
  outline: none;
  border: none;
  margin-top: 35px;
`;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/api/register`, {
        name,
        email,
        password,
      })
      .then(function (response) {
        dispatch(login(response.data));
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Wrapper>
      <RegisterForm onSubmit={submitForm}>
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          required
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required
        />

        <Button type="submit">Register</Button>
      </RegisterForm>
    </Wrapper>
  );
};

export default RegisterPage;
