import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px auto;
  max-width: 940px;

  ul {
    li {
      a {
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        color: #fff;
        display: flex;
        height: 62px;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 20px 30px;

        span {
          font-size: 18px;
          line-height: 21px;
        }

        time {
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;

  a {
    font-weight: bold;
  }
`;
