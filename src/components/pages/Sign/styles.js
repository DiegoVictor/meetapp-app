import styled from 'styled-components';

export const Box = styled.div`
  margin: auto;
  max-width: 315px;
  text-align: center;
  width: 100%;

  img {
    height: 42px;
    margin-bottom: 50px;
    width: 42px;
  }

  a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
    line-height: 19px;
  }

  form {
    display: flex;
    flex-direction: column;

    button {
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 5px;
      font-size: 18px;
      width: 100%;
    }

    span {
      align-self: flex-start;
      color: #fb6f91;
      font-weight: bold;
      margin: 0px 0px 20px;
    }
  }
`;
