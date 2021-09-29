import styled from 'styled-components';

export const CommentWrap = styled.div`
  background-color: #fff;
  margin-top: 10px;
  border-radius: 4px;
`;
export const CommentHeader = styled.div`
  border-bottom: 1px solid #f6f6f6;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;

  & small {
    display: flex;
    align-items: center;
    font-size: 11px;
    color: #666;
    margin-right: 20px;
  }
`;
export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;

  & h5 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 0 10px;
  }
`;
export const CommentContent = styled.div`
  padding: 10px;

  & p {
    font-size: 16px;
    margin: 0;
  }
`;
export const FormCommentWrap = styled.div`
  max-height: ${({ show }) => show ? 'auto' : 0};
  height: auto;
  padding: ${({ show }) => show ? '5px' : 0} 10px;
  background: #fff;
  overflow: hidden;
  transition: .3s ease;

  & > form {
    position: relative;

    & textarea {
      border-radius: 4px;
      background: #f5f9fd;
      min-height: 32px;
      line-height: 32px;
      padding-right: 30px;
    }

    & span.upload-picture {
      position: absolute;
      right: 10px;
      bottom: 5px;
      display: block;
      cursor: pointer;

      & svg {
        font-size: 20px;
      }
    }
  }
`;
