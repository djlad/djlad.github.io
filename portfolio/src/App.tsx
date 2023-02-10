import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Name } from './components/name';

function App() {
  return (
    <Container>
      <Row>
        <Col md='12' className='title'>
          <Name  name='Daniel Ladner'></Name>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
