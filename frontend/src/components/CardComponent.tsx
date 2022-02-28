import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 10px;
  text-align: center;
`;

const CardImage = styled.img``;

const CardText = styled.p``;

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

interface InvoiceType {
  _id: String,
  invoicePrice: Number,
  user: String,
  invoiceItem: String[],
  createdAt: Date,
  updatedAt: Date,
}

interface UserTypes {
  _id: String,
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date,
}

interface CarTypes {
  _id: String,
  name: String,
  model: String,
  SKU: String,
  price: String,
  image: String,
  sold: Boolean,
  createdAt: Date,
  updatedAt: Date,

}


interface CardProps {
  invoice?: InvoiceType, 
  car?: CarTypes, 
  user: UserTypes,
  buyHandler?: (e: React.MouseEvent<HTMLButtonElement>, id: String) => void,
}
const CardComponent = ({car, user, invoice, buyHandler}: CardProps) => {
  return (
    <Card style={{ overflow: "none", borderRadius: 15 }}>
      {car && (<CardImage
        alt="car img"
        height="140px"
        width="100%"
        src={require("../../../backend/uploads/images/" + car?.image)}
      />)
      }
      <CardContent>
       {!invoice ? ( 
         <React.Fragment>
          <CardText>
            Name: {car?.name}
          </CardText>
          <CardText>
            Model: {car?.model}
          </CardText>
          <CardText>
            Price: {car?.price}$
        </CardText>
         </React.Fragment>
        ) : (
          <React.Fragment>
            <Title>Invoice</Title>
            <CardText>
              Car ID: {invoice?.invoiceItem[0]}
            </CardText>
            <CardText>
              Buyer ID: {invoice?.user}
            </CardText>
            <CardText>
              Invoice ID: {invoice?._id}
            </CardText>
            <CardText>
              Invoice Sum: {invoice?.invoicePrice}
            </CardText>
         </React.Fragment>
        )}
      </CardContent>
      {(user && !user.isAdmin && car ) && (
        <Button onClick={(e) => buyHandler?.(e, car._id)}>
          Buy
        </Button>
      )}
    </Card>
  );
}

export default CardComponent