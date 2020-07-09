import React from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle,
    Container, Row, Col
  } from 'reactstrap';
import lps500 from '../img/lps500.jpg';
import lps100 from '../img/lps100.jpg';
import lps50 from '../img/lps50.jpg';
import lps20 from '../img/lps20.jpg';
export class Billetes extends React.Component
{
    constructor(props)
    {
        super(props);        
        let tipos=[];
        tipos["lps500"]={img:lps500,cantidad:props.cantidades["500"]};
        tipos["lps100"]={img:lps100,cantidad:props.cantidades["100"]};
        tipos["lps50"]={img:lps50,cantidad:props.cantidades["50"]};        
        tipos["lps20"]={img:lps20,cantidad:props.cantidades["20"]};
        this.state={
            tipos
        }
    }
    render()
    {
        let salida=[];
        for (const item in this.state.tipos) {
            if (this.state.tipos.hasOwnProperty(item)) {
                const element = (                    
                            <Card >
                                <CardImg top width="100%" src={this.state.tipos[item].img} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>
                                        <strong>Cant: </strong>
                                        <span className="float-right">{this.state.tipos[item].cantidad}</span>
                                        </CardTitle>
                                </CardBody>
                            </Card>);
                    salida.push(element);                
            }
        }
        
        return(<div>
                <Container>                     
                    <Row>
                    {salida.map((item,i)=><Col md="3" key={i}>{item}</Col>)}                       
                    </Row>
                </Container>
                </div>);
    }
}
export default Billetes;