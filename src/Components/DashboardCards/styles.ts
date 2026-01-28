import styled from "styled-components";

export const CardsContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #5757571f;
`;

export const CardItem = styled.li`
  width: 100%;
  background: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 4px 8px #0000000d;
  transition: background 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 400;
  color: #373e4b;
`;

export const CardValue = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: #373e4b;
`;
