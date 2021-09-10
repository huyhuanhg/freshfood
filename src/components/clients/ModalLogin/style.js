import styled from 'styled-components';
import { Form, Modal, Spin } from 'antd';

export const ModalLoginCustom = styled(Modal)`
  padding-bottom: 0;
  border-radius: 10px;

  & button.ant-modal-close {
    transform: translate(40%, -40%);

    & > span.ant-modal-close-x {
      border-radius: 50%;
      transform: scale(0.7);
      background-color: #fff;
      font-size: 200%;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  & .ant-modal-content {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  & .ant-modal-body {
    padding: 3rem;

    & h2 {
      color: #0f9d58;
      font-family: "Poppins", sans-serif !important;
      font-weight: 800;
      font-size: 200%;
      margin-bottom: 0;

      & + h5 {
        font-weight: 600;
        font-size: 120%;
        color: #777;
        margin-bottom: 20px;
      }
    }
  }
  & a {
    color: #1890ff;
  }
`;
export const FormCustom = styled(Form)`
  & input {
    padding: 10px 15px !important;
    font-size: 16px;
  }

  & .ant-input-affix-wrapper.ant-input-password {
    padding: 0 !important;

    & > span.ant-input-suffix {
      margin: 0 10px !important;
    }
  }

  & .ant-col.ant-form-item-control {
    & button {
      width: 100%;
      font-weight: bold;
      padding: 5px;
      margin-top: 10px;
      height: auto;

      &[disabled] {
        cursor: wait;
      }

      & > span {
        font-size: 120%;
      }
    }
  }
`;

export const SubmitLoading = styled(Spin)`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
