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
    min-height: 100vh;
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

  button {
    background-color: #d44059;
    border: 0px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 20px;
  }
`;
