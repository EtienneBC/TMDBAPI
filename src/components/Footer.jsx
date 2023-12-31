import React, { useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Text, Container, Row, Col, Image, Spacer } from '@nextui-org/react';

export default function Footer () {
  return (
    <div>
    <Spacer y={3}/>
    <footer className="footer">
      <Container css={{backgroundColor:"#020202"}} fluid>
        <Row justify="center">
          <Col align="center">
            <img
              src="https://site1.etiennecouture.ca/wp-content/uploads/2023/08/logofooter.png"
              width={100}
              height={100}
              className="logo"
            />
            <Text h5>© 2023, All Rights Reserved.</Text>
          </Col>
          <Col align="center" css={{textAlign:"left"}}>
            <Spacer y={2}/>
            <Text h5>
              <NavLink to="/pages/about">About us</NavLink>
            </Text>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
}