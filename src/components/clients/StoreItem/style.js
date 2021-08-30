import styled from "styled-components";
import {Card} from "antd";

const {Meta} = Card;

export const CardItem = styled(Card)`
  border-radius: 4px;
`
export const StoreImage = styled.div`
  height: 141px;
  max-width: 226px;
  background-image: url(${({avatar}) => avatar});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px 4px 0 0;
  transition: .3s ease;
`
export const StoreInfo = styled.div`
  overflow: hidden;
  height: 55px;
  box-sizing: border-box;
  line-height: 1.4em;
  padding: 0 0 10px 0;
`
export const StoreNameInfo = styled.div`
  display: block;
  font-size: 14px;
  padding: 0 0 3px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline !important;
  }
`
export const StoreAddress = styled.div`
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`
export const StoreCommentWrap = styled(Meta)`
  clear: both;
  border-top: #f6f6f6 1px solid;
  overflow: hidden;
  padding: 10px 0;
`
export const StoreComment = styled.div`
  color: #666;
  height: 32px;
  overflow: hidden;
  line-height: 1.4em;
  font-size: 12px;
  position: relative;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  width: 150px !important;
  margin-left: 5px !important;
  float: left !important;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 2.1em;
    margin-top: .2em;
    background: #fff;
  }

  &:before {
    content: '...';
    position: absolute;
    right: 2px;
    bottom: 0;
  }
`
export const StoreCommentName = styled.b`
  color: #222;
  text-align: left;
  display: inline-block;
`
export const StoreCommentDoc = styled.span`
  color: #333;
  outline: 0;
`
export const StoreStatistical = styled.div`
  padding-top: 10px;
  color: #888;
  clear: both;
  border-top: #f8f8f8 1px solid;
  overflow: hidden;
  font-size: 12px;

  & > div {
    position: relative;
    color: #777;
    display: flex;

    & > div {
      margin-right: 10px;
      display: flex;
      align-items: center;

      & > svg {
        margin-right: 3px
      }

      & > span {
        font-weight: 300;
      }

      &:hover {
        color: #111;
      }
    }

    & > div:nth-child(3) > svg {
      color: orange;
    }

    & > span {
      position: absolute;
      top: 50%;
      right: 0;
      background: #ddd;
      padding: 5px 10px;
      margin: -3px 0;
      border-radius: 2px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;

      &:hover {
        background: #ccc;
      }
    }
  }
`
