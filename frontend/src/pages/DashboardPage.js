import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/constants";
import { setCars } from "../redux/slices/carSlice";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardPage = () => {
  const cars = useSelector((state) => state.carSlice?.cars[0]);

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

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <Wrapper>
      {cars &&
        cars.map((car) => {
          return <div key={car._id}>{car.name}</div>;
        })}
    </Wrapper>
  );
};

export default DashboardPage;
