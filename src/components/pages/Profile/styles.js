import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px auto;
  max-width: 940px;

  > div {
    margin-bottom: 20px;
  }

  input {
    color: #fff;
  }

  hr {
    background-color: rgba(255, 255, 255, 0.1);
    border: 0px;
    height: 1px;
    margin: 10px 0px 20px;
    width: 100%;
  }

  form {
    > div {
      text-align: right;

      button {
        font-weight: bold;
      }
    }
  }
`;
