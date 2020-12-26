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
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          font-size: 16px;
          line-height: 19px;

          svg {
            margin-left: 30px;
          }
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
`;
