import styled from 'styled-components';
import Modal from 'antd/es/modal/Modal';

export const ModalCustom = styled(Modal)`
  & .ant-modal-content {
    position: relative;

    & .ant-modal-close {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);

      & > .ant-modal-close-x {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: -5px 5px 10px 1px rgba(0, 0, 0, .4);
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;

        & > .anticon.anticon-close.ant-modal-close-icon {
          width: 25px;
          height: 25px;
          display: flex;
          border-radius: 50%;
          background-color: #444;
          color: white;
          align-items: center;
          justify-content: center;
        }
      }
    }

    & .ant-modal-header {
      padding: 8px 24px;
    }

    & .ant-modal-body {
      background-color: #eee;
      padding: 15px;
    }
  }

`;