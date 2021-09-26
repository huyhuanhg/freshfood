import styled, { css } from 'styled-components';
import { Form, Spin } from 'antd';


export const FormTitle = styled.h2`
  margin: 15px 0;
  color: #6c6c6c;
  text-transform: uppercase;
  font-size: 2.9rem;
  font-weight: bold;
`;
export const FormControl = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.5rem 0.7rem;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  font-family: "Poppins", sans-serif;
`;
export const BtnSubmit = styled.button`
  position: relative;
  display: block;
  margin: 3rem 0 1rem;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.5s;
  font-weight: bold;

  &[disabled] {
    cursor: wait;
  }

  &:hover {
    background-position: right !important;
  }
`;
export const InvalidMsg = styled.h6`
  position: absolute;
  left: 0;
  bottom: ${({ centerGrid, leftGrid }) => (centerGrid || leftGrid ? '0' : '-25px')};
  margin: 0;
  width: 100%;
  font-size: 14px;
  color: #ff3e3e;
  font-weight: bold;
  text-align: left;
`;
export const FormGroup = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 12px 0 24px;
  padding: 5px 0;
  ${({ grid }) => grid && css`padding-left: 5px;`}
  border-bottom: 2px solid #d9d9d9;

  &:before {
    right: 50%;
    width: ${({ focus, error }) => (focus || error ? '50%' : '0')};
    background-color: ${({ error }) => (error ? '#ff7878' : '#38d39f')};
  }

  &:after {
    left: 50%;
    width: ${({ focus, error }) => (focus || error ? '50%' : '0')};
    background-color: ${({ error }) => (error ? '#ff7878' : '#38d39f')};
  }

  &:before,
  &:after {
    position: absolute;
    bottom: -2px;
    height: 2px;
    content: "";
    transition: 0.4s;
  }
`;
export const IconWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  color: ${({ focus, error }) => error ? '#ff7878' : focus ? '#38d39f' : '#d9d9d9'};
  transition: 0.3s;
  font-size: 20px;
`;
export const TitleFormControl = styled.label`
  position: absolute;
  left: 10px;
  z-index: 99;
  ${({ focus }) => focus ? css`
    top: -5px;
    font-size: 17px;` : css`top: 50%;
    font-size: 20px;`}
  transform: translateY(-50%);
  color: #999;
  font-weight: bold;
  transition: 0.3s;
`;
export const FormControlWrap = styled.div`
  position: relative;
  height: 45px;
`;
export const SubmitLoading = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 50%;
  display: ${({ show }) => (show ? 'block' : 'none')};
  transform: translate(-50%, -50%);
`;
export const FormGroupx = styled(Form.Item)`
  position: relative;

  &.ant-row.ant-form-item {
    margin-bottom: 30px !important;

    & input {
      font-size: 1.2rem;
      font-weight: bold;
      color: #555;
    }

    & .ant-col.ant-form-item-label {
      position: absolute;
      left: 35px;
      top: ${({ focus }) => focus ? '0' : '50%'};
      z-index: 100;
      padding: 0;
      transform: translateY(-50%);
      transition: .3s;

      & > label {
        font-size: 20px;
        color: #999;
        font-weight: bold;

        &:before {
          display: none;
        }
      }
    }

    & .ant-col.ant-form-item-control {
      & .ant-input-affix-wrapper {
        border: 0;
        box-shadow: none !important;
        border-bottom: 2px solid #d9d9d9;

        &:before {
          right: 50%;
        }

        &:after {
          left: 50%;
        }

        &:before,
        &:after {
          position: absolute;
          bottom: -2px;
          height: 2px;
          content: "";
          transition: 0.4s;
          visibility: unset;
        }

        &:hover {
          border-color: #d9d9d9;
        }

        & .ant-input-prefix {
          height: 45px;
          color: #d9d9d9;
          -webkit-transition: 0.3s;
          transition: 0.3s;
          font-size: 20px;
        }

        &.ant-input-affix-wrapper-focused {
          &:before {
            width: 50%;
            background-color: #38d39f !important;
          }

          &:after {
            width: 50%;
            background-color: #38d39f !important;
          }
          & .ant-input-prefix {
            color: #38d39f !important;
          }
        }
      }

      & .ant-form-item-explain {
        position: absolute !important;
        left: 0 !important;
        bottom: -25px !important;
        margin: 0 !important;
        width: 100% !important;
        font-size: 14px !important;
        color: #ff3e3e !important;
        font-weight: bold !important;
        text-align: left !important;
      }
    }

    &.ant-form-item-has-error {
      & .ant-col.ant-form-item-control {
        & .ant-input-affix-wrapper {
          &:before {
            width: 50%;
            background-color: #ff7878;
          }

          &:after {
            width: 50%;
            background-color: #ff7878;
          }
        }
        & .ant-input-prefix {
          color: #ff7878;
        }
      }
    }
    &.ant-form-item-has-success {
       & .ant-col.ant-form-item-control {
         & .ant-input-affix-wrapper {
           &:before {
             width: 50%;
             background-color: #38d39f;
           }

           &:after {
             width: 50%;
             background-color: #38d39f;
           }
         }
         & .ant-input-prefix {
           color: #38d39f;
         }
       }
     }
  }




`;