import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/constants";
import { buyCar, setCars } from "../redux/slices/carSlice";
import CardComponent from "../components/CardComponent";
import { useNavigate } from "react-router-dom";

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

const DashboardPage = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const cars = useSelector((state) => state.carSlice?.cars);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAllCars = () => {
    axios
      .get(`${BASE_URL}/api/cars`)
      .then(function (response) {
        dispatch(setCars(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buyHandler = (e, carId) => {
    e.preventDefault();
    let invoiceObject = {
      userId: user._id,
      carId: carId,
    };
    axios
      .post(`${BASE_URL}/api/invoice`, invoiceObject)
      .then((res) => {
        console.log(res);
        dispatch(buyCar(carId))
        navigate("/mycars");

      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <Wrapper>
      {cars &&
        cars
          .filter((car) => car.sold === false)
          .map((c, index) => {
            return (
              <CardComponent
                car={c}
                buyHandler={buyHandler}
                user={user}
                key={index}
              />
            );
          })}
    </Wrapper>
  );
};

export default DashboardPage;
