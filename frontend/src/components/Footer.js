import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; TokoAZ</Col>
        </Row>
      </Container>

      {/* This is the same as above
      <div className='Container'>
        <div className='Row fixed-bottom navbar-light bg-light'>
          <div className='Col container-fluid text-center py-3'>
            Copyright &copy; TokoAZ
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
