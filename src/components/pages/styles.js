import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }

  *:focus {
    outline: 0px;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button, .btn {
    background-color: #d44059;
    border: 0px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    padding: 12px 20px;
  }

  input {
    background-color: rgba(0, 0, 0, 0.2);
    border: 0px;
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    line-height: 18px;
    height: 50px;
    margin-bottom: 10px;
    padding: 14px 20px;
    width: 100%;
  }
`;
