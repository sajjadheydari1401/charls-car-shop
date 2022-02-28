import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import uniqid from "uniqid";

import { BASE_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import { addCar } from "../redux/slices/carSlice";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
`;

const CarForm = styled.form`
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

const AdminPanelPage = () => {
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    setSelectedImage("");

    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!file.type.includes("image")) {
      alert("Selected file must be an image");
      return;
    }
    if (file.size > 1000000) {
      alert("Image file size must be less than 1000kb");
      return;
    }

    setSelectedImage(file);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", selectedImage);
    data.append("name", carName);
    data.append("model", carModel);
    data.append("SKU", uniqid());
    data.append("price", carPrice);

    axios({
      method: "post",
      url: `${BASE_URL}/api/car`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        dispatch(addCar(response.data));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Wrapper>
      <Title>Admin Panel</Title>
      <CarForm onSubmit={submitForm} encType="multipart/form-data">
        <Label>Post a new car</Label>
        <Input
          type="text"
          onChange={(e) => setCarName(e.target.value)}
          value={carName}
          name="name"
          placeholder="Name"
          required
        />
        <Input
          type="text"
          onChange={(e) => setCarModel(e.target.value)}
          value={carModel}
          name="model"
          placeholder="Model"
          required
        />
        <Input
          type="number"
          onChange={(e) => setCarPrice(e.target.value)}
          value={carPrice}
          name="price"
          placeholder="Price"
          required
        />
        <Input type="file" onChange={uploadFileHandler} name="image" required />

        <Button type="submit">Post</Button>
      </CarForm>
    </Wrapper>
  );
};

export default AdminPanelPage;
