import styled, { css } from 'styled-components';
import { Checkbox, Spin } from 'antd';
import PropTypes from 'prop-types';

const Icon = ({ icon: Icon }) => {
  return <Icon />;
};

Icon.propTypes = {
  icon: PropTypes.object,
};

export const IconCheck = ({ icon: Icon }) => {
  return (
    <IconSuccess>
      <Icon />
    </IconSuccess>
  );
};
IconCheck.propTypes = {
  icon: PropTypes.object,
};
const IconSuccess = styled.div`
  position: absolute;
  top: 50%;
  background: #38d39f;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
export const ControlLoading = styled(Spin)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
export const CheckboxWrap = styled.div`
  ${({ error }) =>
    error &&
    css`
      color: red !important;
    `}
  width: 100%;
  text-align: left;
`;
export const CheckboxCustom = styled(Checkbox)`
  color: ${({ error }) => (error ? 'red' : '#1890ff')};
`;
export const IconCustom = styled(Icon)`
  transition: 0.3s;
  font-size: 20px;
`;
export const SelectCustom = styled.select`
  padding-left: 5px;
  width: 100%;
  border: none;
  outline: none;
  background: unset;
  cursor: pointer;
  transform: translateY(40%);
  color: #999;
  font-size: 20px;
  font-weight: bold;
`;
