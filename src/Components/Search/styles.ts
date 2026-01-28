import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 1rem;

  @media (max-width: 650px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 25rem;
  padding: 14px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  background: #ffffff;
  color: #373e4b;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2c70c8;
  }
`;

export const OrderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #373e4b;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
`;
