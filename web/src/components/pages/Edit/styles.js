import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  margin: auto;
  padding: 50px 0px;
  max-width: 940px;

  > div {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      justify-content: right;
    }

    > label > span {
      margin-bottom: 20px;
      position: absolute;
      bottom: -35px;
    }

    > span,
    > label > span {
      align-self: flex-start;
      color: #fb6f91;
      font-weight: bold;
      margin: 0px 0px 20px;
    }
  }
`;

export const ImagePicker = styled.label`
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  line-height: 0px;
  margin-bottom: 40px;
  min-height: 250px;
  position: relative;

  img {
    width: 100%;
  }

  > div {
    align-items: center;
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0px;
    z-index: 2;
    width: 100%;
  }

  input[type='file'] {
    display: none;
  }
`;
