import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/constants";
import { setCars } from "../redux/slices/carSlice";
import CardComponent from "../components/CardComponent";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin: 100px 0;
`

const DashboardPage = () => {
  const cars = useSelector((state) => state.carSlice?.cars);

  const dispatch = useDispatch();

  const fetchAllCars = () => {
    axios
      .get(`${BASE_URL}/api/cars`)
      .then(function (response) {
        dispatch(setCars(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buyHandler = (e, carId) => {
    e.preventDefault();
    alert(carId);
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <Wrapper>
      {cars &&
        cars.map((car, index) => {
          return (
            <CardComponent car={car} buyHandler={buyHandler} key={index} />
          );
        })}
    </Wrapper>
  );
};

export default DashboardPage;
