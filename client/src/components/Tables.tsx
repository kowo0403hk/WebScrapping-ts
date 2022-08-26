import { FC } from "react";
import styled from "styled-components";
import { IdentalXChange, Identrix } from "../interface";
import Table from "./Table";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: space-between;
  padding-top: 50px;
  justify-content: center;
`;

interface ITables {
  dentrix: Identrix[];
  dentalXChange: IdentalXChange[];
  option: string;
  searchTerm: string;
}

const Tables: FC<ITables> = ({
  dentrix,
  dentalXChange,
  option,
  searchTerm,
}) => {
  return (
    <Container>
      <Table
        name="Dentrix"
        data={dentrix}
        option={option}
        searchTerm={searchTerm}
      />
      <Table
        name="DentalXChange"
        data={dentalXChange}
        option={option}
        searchTerm={searchTerm}
      />
    </Container>
  );
};

export default Tables;
