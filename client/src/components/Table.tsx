import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { IdentalXChange, Identrix } from "../interface";

const TableContainer = styled.table`
  font-size: 0.7rem;
  border: 2px solid black;
`;

const THead = styled.thead`
  border: 2px solid black;
`;

const TBody = styled.tbody``;

const Th = styled.th``;

const TRow = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const Td = styled.td``;

const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ITable {
  name: string;
  data: Identrix[] | IdentalXChange[];
  option: string;
  searchTerm: string;
}

const Table: FC<ITable> = ({ name, data, option, searchTerm }: ITable) => {
  const headers = Object.keys(data[0]);

  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    const updateFilter = (data: any, option: string, searchTerm: string) => {
      if (option === "id" && searchTerm) {
        setFilteredData(
          data.filter((eachData: any) => {
            return Object.keys(eachData)[0].includes("Payor")
              ? eachData["Payor ID"].includes(searchTerm)
              : eachData["Payer ID"].includes(searchTerm);
          })
        );
      } else if (option === "name" && searchTerm) {
        setFilteredData(
          data.filter((eachData: any) => {
            return Object.keys(eachData)[1].includes("Payor")
              ? eachData["Payor Name"].includes(searchTerm)
              : eachData["Name"].includes(searchTerm);
          })
        );
      } else {
        setFilteredData(data);
      }
    };

    updateFilter(data, option, searchTerm);
  }, [data, option, searchTerm]);

  const mappedHeaders = headers.map((header, i) => {
    return <Th key={i}>{header}</Th>;
  });

  const mappedData = filteredData.map((el: any) => {
    return (
      <TRow id={headers[1]}>
        <Td>
          <Span> {el[headers[0]]}</Span>
        </Td>
        <Td>
          <Span>{el[headers[1]]}</Span>
        </Td>
        <Td>
          <Span>
            {el[headers[2]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[3]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[4]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[5]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[6]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[7]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
        <Td>
          <Span>
            {el[headers[8]] ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
            )}
          </Span>
        </Td>
      </TRow>
    );
  });

  return (
    <TableContainer>
      <THead>
        <TRow>
          <Th colSpan={9}>{name}</Th>
        </TRow>
        {mappedHeaders}
      </THead>
      <TBody>{mappedData}</TBody>
    </TableContainer>
  );
};

export default Table;
