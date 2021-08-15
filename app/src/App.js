import { Row, Col, Input, Button } from 'reactstrap';
import React, { useState } from 'react';
import './app.css'
//import { shape } from './forms/svg.svg'
let billetes = []

function App() {
  const backMoney=async ()=>{
    if(billetes.length>0) return null;
    try {
      var response =await (await fetch('/billetes.json')).json()
      billetes= response;
      
    } catch (error) {
      console.log(error);
      billetes=[]
      alert("no se pudo conectar con el servidor :(")      
    }
    let totalDinero=0
    for(let i of billetes){
      totalDinero+= i.cantidad*i.value
    }
  }
  const uriCloudDinary="https://res.cloudinary.com/dd7jrtxu5/image/upload/w_300/CajeroAutomatico/"
  backMoney();
  const [cantidad, setcantidad] = useState('');
  const pressNumber = btn => {
    setcantidad((cantidad + btn.target.dataset.value).trim())
  }
  const backSpace = () => {
    setcantidad((cantidad.substr(0, cantidad.length - 1)))
  }
  const cancel = () => {
    getCanvas()
    setcantidad('')
  }
  const pressSuccess = () => {
    let result={};
    let remaiting=cantidad;
    for (let i of billetes) {
      if (remaiting>0) {
        const value=parseInt(remaiting/i.value)
        if (value<i.cantidad){
          result[i.value]={value}
          remaiting=remaiting-(value * i.cantidad);
        }
        else{
          result[i.value]={value:i.cantidad}
          remaiting=remaiting-(i.value * i.cantidad);
        }
      }
    }
    let paper=getCanvas()
    if(remaiting>0) 
      alert('fondos insuficientes!!! :(')
    else 
      drawImages(paper,result)
  }
  const getCanvas=()=>{
    const canvas=document.getElementById('draw')
    let paper=canvas.getContext('2d')
    paper.clearRect(0, 0, canvas.width, canvas.height);
    return paper;
  }
  const drawImages=(paper,retirados)=>{
    let position=6;
    const images=[]
    Object.keys(retirados).forEach((i)=>{
      const image=new Image()
      image.src=uriCloudDinary+i+".jpg"
      image.addEventListener("load",()=>{
        for (let index = 0; index <retirados[i].value; index++) {
          position+=20
          paper.drawImage(image,position,position)          
        }
      })
      images.push(image)
    })
  }
  return (
    <div>
      <Row className="app">
        <Col sm='6' className='display'>
          <canvas id='draw' width='700' height='270' ></canvas>
        </Col>
        <Col className="cajero" sm='6'>
          <Row>
            <Col className='colums' sm='12'>
              <Input type="text" defaultValue={cantidad} />
            </Col>
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
              <Button color='success' size="lg" block onClick={pressSuccess}></Button>
            </Col>

            <SvgComponent className='cero' color="primary" text='0' onClick={pressNumber} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
function SvgComponent(props) {
  return (
    <Col className={'colums ' + props.className} sm='3'>
      <Button data-value={props.text} color={props.color} size="lg" block onClick={props.onClick}>{props.text}</Button>
    </Col>
  )
}
export default App;