import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { setInvoices } from "../redux/slices/invoiceSlice";

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

const TotalSum = styled.p`
  position: absolute;
  top: 50px;
  left: 42.5%;
  font-weight: bold;
  font-size: 20px;
`;

const SoldCarsPage = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const invoices = useSelector((state) => state.invoiceSlice?.invoices);

  let totalSum = 0;

  const dispatch = useDispatch();

  const fetchAllInvoices = () => {
    axios
      .get(`${BASE_URL}/api/allInvoices`)
      .then(function (response) {
        dispatch(setInvoices(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  return (
    <Wrapper>
      {invoices &&
        invoices.map((invoice, index) => {
          totalSum += invoice?.invoicePrice;
          return <CardComponent user={user} invoice={invoice} key={index} />;
        })}
      <TotalSum>Total Sum: {totalSum}</TotalSum>
    </Wrapper>
  );
};

export default SoldCarsPage;
