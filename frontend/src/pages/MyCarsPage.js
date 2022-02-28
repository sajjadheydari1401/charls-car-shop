import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/constants";
import CardComponent from "../components/CardComponent";
import { setCars } from "../redux/slices/carSlice";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin: 100px 0;
`;

const MyCarsPage = () => {
  const user = useSelector((state) => state.userSlice?.user);
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

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <Wrapper>
      {cars &&
        cars
          .filter((car) => car.sold === true && car.ownerId === user._id)
          .map((c, index) => {
            return <CardComponent car={c} user={user} key={index} />;
          })}
    </Wrapper>
  );
};

export default MyCarsPage;
