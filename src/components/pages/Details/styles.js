import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  padding: 50px 0px;
  max-width: 940px;

  img {
    margin-bottom: 25px;
    width: 100%;
  }
`;

export const Description = styled.div`
  color: #fff;
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

  h2 {
    align-items: center;
    display: flex;

    a {
      margin-right: 10px;
      margin-top: 4px;
    }
  }

  div {
    display: flex;

    button,
    a {
      margin-left: 15px;

      &.blue {
        background-color: #4dbaf9;
      }
    }
  }
`;

export const Footer = styled.div`
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  font-size: 16;
  line-height: 19px;

  > * {
    align-items: center;
    display: flex;
    margin-right: 30px;

    svg {
      margin-right: 5px;
    }
  }
`;
