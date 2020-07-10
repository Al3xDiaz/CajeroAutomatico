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
                {valor:500},
                {valor:100},
                {valor:50},
                {valor:20}],
            cantDinero:5000
        }
        this.cantidadBilletes=this.cantidadBilletes.bind(this);
    }
    cantidadBilletes(){      
        let estado=this.state;
        let hola=0;
        for (const billeteActual of this.state.Billetes) {
            while (billeteActual.valor<=estado.cantDinero){
                hola=estado.cantidades[billeteActual.valor];
                estado.cantidades[billeteActual.valor]=estado.cantidades[billeteActual.valor]+1;
                estado.cantDinero=estado.cantDinero-billeteActual.valor
            }
        }
        this.setState(estado);     
    }
    
    render()
    {
        return(<div>
            <button onClick={this.cantidadBilletes}>prueba</button>
            <Billetes cantidades={this.state.cantidades} />
        </div>)
    }
}

export default Cajero;