import React from 'react';
import Billetes from './Billetes'
export class Cajero extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            cantidades:{"500":0,"100":0,"50":0,"20":0},
            Billetes:
            [
                {valor:500,cant:0},
                {valor:100,cant:0},
                {valor:50,cant:0},
                {valor:20,cant:0}],
            cantDinero:5000
        }
        this.cantidadBilletes=this.cantidadBilletes.bind(this);
    }
    cantidadBilletes(){      
        let estado=this.state;
        for (const iterator of this.state.Billetes) {
            while (iterator.valor<=estado.cantDinero){
                iterator.cant=iterator.cant+1
                estado.cantDinero=estado.cantDinero-iterator.valor
            }
        }
        this.state=estado;
        console.log(this.state);
        
    }
    render()
    {
        this.cantidadBilletes();
        return(<div>
            <Billetes cantidades={this.state.cantidades} />
        </div>)
    }
}

export default Cajero;