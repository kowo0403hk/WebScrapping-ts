import axios from "axios";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { IdentalXChange, Identrix } from "../interface";

const Container = styled.div`
  height: 25vh;
  background-color: rgb(63, 116, 197);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Input = styled.input``;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button`
  margin: 10px;
  cursor: pointer;
`;

const FetchButtons = styled.div``;

interface IHeader {
  dentrix: Identrix[];
  dentalXChange: IdentalXChange[];
  setSearchTerm: (s: string) => void;
  setOption: (s: string) => void;
  setDentrix: (data: Identrix[]) => void;
  setDentalXChange: (data: IdentalXChange[]) => void;
}

const Header: FC<IHeader> = ({
  dentrix,
  dentalXChange,
  setSearchTerm,
  setOption,
  setDentrix,
  setDentalXChange,
}: IHeader) => {
  const [input, setInput] = useState("");
  const [localOption, setLocalOptionValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "All") {
      setLocalOptionValue("");
    } else if (value === "Name") {
      setLocalOptionValue("name");
    } else {
      setLocalOptionValue("id");
    }
  };

  // get data set
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dentrix[0] || !dentalXChange[0]) {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/webscrapper"
        );

        setSearchTerm(input);
        setOption(localOption);
        setDentrix(data.dentrix);
        setDentalXChange(data.dentalXChange);
        setInput("");
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchTerm(input);
      setOption(localOption);
      setInput("");
    }
  };

  // refresh or delete data set
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let path = e.currentTarget.id;

    try {
      if (path === "refresh") {
        const { data } = await axios.get(
          "http://localhost:8080/api/webscrapper"
        );
        setDentrix(data.dentrix);
        setDentalXChange(data.dentalXChange);
        setSearchTerm(input);
        setOption(localOption);
        setInput("");
      } else {
        setDentrix([]);
        setDentalXChange([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Payer/Payor name or ID"
          size={30}
          value={input}
          onChange={handleInput}
        />
        <Select name="searchOption" onChange={handleOption}>
          <Option>All</Option>
          <Option>Payer/Payor ID</Option>
          <Option>Name</Option>
        </Select>
        <Button>Get Data</Button>
      </Form>
      <FetchButtons>
        <Button onClick={handleClick} id="refresh">
          Refresh Data
        </Button>
        <Button onClick={handleClick} id="delete">
          Delete Data
        </Button>
      </FetchButtons>
    </Container>
  );
};

export default Header;
