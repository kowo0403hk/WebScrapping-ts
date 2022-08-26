import { FC, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Tables from "./components/Tables";
import { IdentalXChange, Identrix } from "./interface";

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [option, setOption] = useState("");
  const [dentrix, setDentrix] = useState<Identrix[]>([]);
  const [dentalXChange, setDentalXChange] = useState<IdentalXChange[]>([]);

  return (
    <AppContainer>
      <Header
        dentrix={dentrix}
        dentalXChange={dentalXChange}
        setSearchTerm={setSearchTerm}
        setOption={setOption}
        setDentrix={setDentrix}
        setDentalXChange={setDentalXChange}
      />
      {dentrix[0] ? (
        <Tables
          dentrix={dentrix}
          dentalXChange={dentalXChange}
          option={option}
          searchTerm={searchTerm}
        />
      ) : null}
    </AppContainer>
  );
};

export default App;
