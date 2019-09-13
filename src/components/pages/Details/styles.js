import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  padding: 50px 0px;
  max-width: 940px;

  img {
    margin-bottom: 25px;
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

  button {
    font-weight: bold;
    margin-left: 15px;

    &.blue {
      background-color: #4dbaf9;
    }
  }
`;

export const Footer = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16;
  line-height: 19px;

  * {
    margin-right: 30px;
  }
`;
