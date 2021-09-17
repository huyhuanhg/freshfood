import styled from 'styled-components';
import { Table } from 'antd';

export const ProfileWrap = styled.div`
  min-height: calc(100vh - 475px);
`;
export const ProfileSidebar = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid #ddd;
  padding: 20px 0 10px 0;
  margin-top: -20px;

  & li {
    border-top: 1px solid #e7ecef;
  }
`;
export const ProfileAvatarWrap = styled.div`
  position: relative;

  & img {
    float: none;
    margin: 0 auto;
    width: 126px;
    height: 126px;
    border-radius: 50% !important;
    display: block;
    max-width: 100%;
    cursor: pointer;
  }

  & img:hover + svg {
    opacity: 1;
  }

  & svg {
    position: absolute;
    font-size: 250%;
    opacity: 0;
    transition: 0.4s;
    bottom: 0;
    color: #888;
    right: calc(50% - 126px / 2);
  }
`;

export const ProfileFullName = styled.div`
  text-align: center;
  margin-top: 10px;

  & > div {
    color: #5a7391;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 7px;
  }
`;
export const ProfileContent = styled.div`
  background: rgb(255, 255, 255);
  margin-top: -20px;
  min-height: 378.031px;
`;
export const ProfileEmpty = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;

  & > div {
    align-self: center;
    padding: 10px;
    font-size: 16px;

    & > svg, & > span > svg {
      color: #aaa;
      font-size: 400%;
    }
  }
`;
export const TableCustom = styled(Table)`
  & .ant-table-cell.order-address, .ant-table-cell.order-note {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .ant-table-row {
    cursor: pointer;
  }
  & th.ant-table-cell.order-name, td.ant-table-cell.order-name{
    padding-left: 0;
  }
  & tr.ant-table-row.ant-table-row-level-0 > td.ant-table-cell.ant-table-row-expand-icon-cell,
  & th.ant-table-cell.ant-table-row-expand-icon-cell {
    padding: 16px 8px;
  }

  & tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td.ant-table-cell {
    padding-left: 62px;
  }
`;
export const StoreTitle = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  & a {
    color: rgba(0, 0, 0, .85);
    font-weight: 700;
    display: inline-block;
    white-space: nowrap;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const CommentTitleContent = styled.p`
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;

  & + div {
    & > span {
      display: flex;
      align-items: center;
      color: #aaa;

      & > svg {
        margin-left: 5px;
      }
    }
  }
`;
export const StoreList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  & a {
    color: rgba(0, 0, 0, .85);
    font-weight: 700;
  }
`;
export const FoodList = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    margin-left: 8px;
    color: rgba(0, 0, 0, .65);
    font-weight: 600;

    & > img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  & > div:last-child {
    display: flex;
    align-items: center;

    & > p {
      margin-bottom: 0;
      margin-right: 25px;
      font-weight: 600;

      & > span.value {
        color: red;
      }
    }
  }
`;
export const OrderInfo = styled.div`
  & > p > span {
    font-weight: 600;
  }
`;
export const PaginationBox = styled.div`
  margin: 20px;
  display: flex;
  justify-content: end;
`;
export const TitleContent = styled.div`
  padding: 8px 15px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  background-color: rgb(221, 221, 221);
`;
export const UserProfile = styled.div`
  & p {
    font-size: 14px;
    font-weight: bold;

    & > span {
      display: inline-block;
      padding: 12px 0;
      width: 100%;

      & > span.edit {
        position: relative;
        float: right;
        margin-right: 16px;
        font-size: 14px;
        font-weight: 300;
        color: #5b9bd1;
        opacity: 0;
        transition: .3s;
        cursor: pointer;

        &:hover:after {
          position: absolute;
          content: '';
          display: block;
          bottom: 2px;
          width: 100%;
          border-bottom: 1px solid #5b9bd1;
        }
      }
    }

    & > span:hover > span.edit {
      opacity: 1;
    }
  }


  & .user-profile-title {
    text-align: right;
  }
`;
// export const EditProfile = styled.div`
//   padding-right: 60px;
// `;