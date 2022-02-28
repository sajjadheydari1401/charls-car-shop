import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
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
`;

const MyCarsPage = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const cars = useSelector((state) => state.carSlice?.cars);

  return (
    <Wrapper>
      {/* {cars &&
        cars.filter((car) => car.sold === true).map((c, index) => {
          return (
            <CardComponent car={c} user={user} key={index} />
          );
        })
      } */}
      <h1>My Cars Page</h1>
    </Wrapper>
  );
};

export default MyCarsPage;
