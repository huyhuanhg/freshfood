import { Col, Row } from 'antd';
import {
  AiFillSkype,
  FaFacebookF,
  GrGooglePlus,
  GrLinkNext,
  RiMapPin2Fill,
} from 'react-icons/all';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

import * as FooterStyle from './style';

function Footer() {
  return (
    <div>
      <FooterStyle.FooterWrap>
        <div>
          <Row gutter={50}>
            <Col span={8}>
              <FooterStyle.AboutFooter>
                <h4>About Information</h4>
                <p>
                  Lorem ipsum dolor sit amet consetuer ilmi adipiscing elit diam, sed
                  diam nonumy nibh euismod tincidunt.
                </p>
                <div>
                  <div className='facebook'>
                    <FaFacebookF />
                  </div>
                  <div className='google'>
                    <GrGooglePlus />
                  </div>
                  <div className='skype'>
                    <AiFillSkype />
                  </div>
                </div>
              </FooterStyle.AboutFooter>
            </Col>
            <Col span={8}>
              <FooterStyle.Subscribe>
                <h4>Subscribe Newsletter</h4>
                <p>Subscribe Email and Get new Updates and Notification.</p>
                <form>
                  <input type='text' placeholder='Enter Your Email Address' />
                  <button type='submit'>
                    <GrLinkNext />
                  </button>
                </form>
              </FooterStyle.Subscribe>
            </Col>
            <Col span={8}>
              <FooterStyle.GetInTouch>
                <h4>Get in Touch</h4>
                <ul>
                  <li>
                    <PhoneOutlined />
                    +84 935 906 860
                  </li>
                  <li>
                    <MailOutlined />
                    huyhuanhg@gmail.com
                  </li>
                  <li>
                    <RiMapPin2Fill />
                    K5/22 Nam Cao - Hoa Khanh Nam
                  </li>
                </ul>
              </FooterStyle.GetInTouch>
            </Col>
          </Row>
        </div>
      </FooterStyle.FooterWrap>
      <FooterStyle.Copyright>
        <span>FreshFood </span>- Copyright 2021. Design by <span> Huy Huấn</span>
      </FooterStyle.Copyright>
    </div>
  );
}

export default Footer;
