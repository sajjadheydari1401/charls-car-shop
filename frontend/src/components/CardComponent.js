import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Button = styled.button`
  width: 90%;
  height: 50px;
  display: block;
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background: #2082fa;
  outline: none;
  border: none;
  margin: auto;
  margin-bottom: 20px;
`;
export default function ImgMediaCard({ car, buyHandler }) {
  return (
    <Card style={{ overflow: "none", borderRadius: 15 }}>
      <img
        alt="car img"
        height="140px"
        width="100%"
        src={require("../../../backend/uploads/images/" + car.image)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {car.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Model: {car.model}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Price: {car.price}$
        </Typography>
      </CardContent>
      <Button size="small" onClick={(e) => buyHandler(e, car._id)}>
        Buy
      </Button>
    </Card>
  );
}
