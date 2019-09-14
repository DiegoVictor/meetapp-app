import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #22202c, #402845);
  min-height: 100vh;
`;

export const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.3);

  > div {
    align-items: center;
    display: flex;
    height: 64px;
    justify-content: space-between;
    margin: auto;
    max-width: 940px;
    width: 100%;

    aside {
      display: flex;
      align-items: center;

      div {
        strong {
          color: #fff;
          display: block;
          font-size: 14px;
          line-height: 16px;
          text-align: right;
        }

        a {
          color: #999;
          display: block;
          font-size: 12px;
          line-height: 16px;
          margin-top: 2px;
          text-align: right;
        }
      }

      button {
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 2px;
      }
    }
  }
`;
