import history from '../../utils/history';
import * as S from './style';
import { BiError } from 'react-icons/all';
import { Button } from 'antd';

function NotFoundPage() {
  return (
    <S.NotFoundWrap>
      <div>
        <BiError />
        <h2>Lỗi! Không tìm thấy trang này!</h2>
        <Button
          type="primary"
          onClick={() => {
            if (history.length === 0) {
              history.push('/');
            } else {
              history.goBack();
            }
          }}
        >
          Quay lại
        </Button>
      </div>
    </S.NotFoundWrap>
  );
}

export default NotFoundPage;
