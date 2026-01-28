import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #5757571f;
`;

export const Text = styled.div``;

export const Title = styled.h2`
  font-size: 28px;
  color: #373e4b;

  @media (max-width: 650px) {
    font-size: 24px;
  }

  @media (max-width: 425px) {
    font-size: 22px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #838282;

  @media (max-width: 425px) {
    font-size: 12px;
  }
`;

export const UserPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  overflow: hidden;
  background: #dfdfdf;
  border: 1px solid #c6c6c6;
  border-radius: 50%;
`;

export const UserImage = styled.img`
  width: 100%;
  margin-top: 5px;
`;
