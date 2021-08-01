import { Row, Col, Input, Button } from 'reactstrap';
import React, { useState } from 'react';
import './app.css'
//import { shape } from './forms/svg.svg'
function App() {
  const [cantidad, setcantidad] = useState('');
  const pressNumber = btn => {
    setcantidad((cantidad + btn.target.dataset.value).trim())
  }
  const backSpace = () => {
    setcantidad((cantidad.substr(0, cantidad.length - 1)))
  }
  const cancel = () => {
    setcantidad('')
  }

  return (
    <div>
      <Row className="app">
        <Col sm='6' className='display'></Col>
        <Col className="cajero" sm='6'>
          <Row>
            <Col className='colums' sm='8'>
              <Input type="text" value={cantidad} />
            </Col>
            <Col className='colums' sm='4'></Col>
            <SvgComponent color="primary" text='1' onClick={pressNumber} />
            <SvgComponent color="primary" text='2' onClick={pressNumber} />
            <SvgComponent color="primary" text='3' onClick={pressNumber} />
            <Col className='colums' sm='3'>
              <Button color='warning' size="lg" block onClick={backSpace}></Button>
            </Col>

            <SvgComponent color="primary" text='4' onClick={pressNumber} />
            <SvgComponent color="primary" text='5' onClick={pressNumber} />
            <SvgComponent color="primary" text='6' onClick={pressNumber} />
            <Col className='colums' sm='3'>
              <Button color='danger' size="lg" block onClick={cancel}></Button>
            </Col>

            <SvgComponent color="primary" text='7' onClick={pressNumber} />
            <SvgComponent color="primary" text='8' onClick={pressNumber} />
            <SvgComponent color="primary" text='9' onClick={pressNumber} />
            <Col className='colums' sm='3'>
              <Button color='success' size="lg" block ></Button>
            </Col>

            <SvgComponent color="primary" text='0' onClick={pressNumber} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
function SvgComponent(props) {
  return (
    <Col className='colums' sm='3'>
      <Button data-value={props.text} color={props.color} size="lg" block onClick={props.onClick}>{props.text}</Button>
    </Col>
  )
}
export default App;