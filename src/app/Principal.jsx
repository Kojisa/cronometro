import React,{Component} from 'react';
import {Fab,Typography} from '@material-ui/core';
import Login from './Login';

let circuito = [
    {'nombre':'Polo Industrial Salida 1','partida':true,'tiempo':0},
    {'nombre':'Manguera 1-2','partida':false,'tiempo':9},
    {'nombre':'Manguera 1-3','partida':false,'tiempo':8},
    {'nombre':'Manguera 1-4','partida':false,'tiempo':91},
    {'nombre':'Manguera 1-5','partida':false,'tiempo':10},
    {'nombre':'Manguera 1-6','partida':false,'tiempo':9},
    {'nombre':'Manguera 1-7','partida':false,'tiempo':61},
    {'nombre':'Manguera 1-8','partida':false,'tiempo':9},
    {'nombre':'Manguera 1-9','partida':false,'tiempo':8},
    {'nombre':'Manguera 1-10','partida':false,'tiempo':41},
    {'nombre':'Manguera 1-11','partida':false,'tiempo':10},
    {'nombre':'Manguera 1-12','partida':false,'tiempo':50},
    {'nombre':'Manguera 1-13','partida':false,'tiempo':11},
    {'nombre':'Polo Industrial Salida 2','partida':true,'tiempo':0},
    {'nombre':'Manguera 2-2','partida':false,'tiempo':9},
    {'nombre':'Manguera 2-3','partida':false,'tiempo':8},
    {'nombre':'Manguera 2-4','partida':false,'tiempo':91},
    {'nombre':'Manguera 2-5','partida':false,'tiempo':10},
    {'nombre':'Manguera 2-6','partida':false,'tiempo':9},
    {'nombre':'Manguera 2-7','partida':false,'tiempo':61},
    {'nombre':'Manguera 2-8','partida':false,'tiempo':9},
    {'nombre':'Manguera 2-9','partida':false,'tiempo':8},
    {'nombre':'Manguera 2-10','partida':false,'tiempo':41},
    {'nombre':'Manguera 2-11','partida':false,'tiempo':10},
    {'nombre':'Manguera 2-12','partida':false,'tiempo':50},
    {'nombre':'Manguera 2-13','partida':false,'tiempo':11},
]


export default class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            login:true,
            usuario:null,
            tiempo:10,
            contando:false,
            circuito:circuito,
            actualCircuito:0, //indice del circuito
            duracionRecorrido:circuito.map((elem,ind)=>0),
            finalizoRecorrido:false,
            timerActual:null,
        }
       
    
    }

    handlerClick(){
        let actual = this.state.actualCircuito + 1;
        if(actual === this.state.circuito.length){
            if(this.state.timerActual){
                clearInterval(this.state.timerActual)
            }
            this.setState({finalizoRecorrido:true,timerActual:null})
            return;
        }
        if(this.state.circuito[actual].partida === true){
            if(this.state.timerActual){
                clearInterval(this.state.timerActual)
            }
            this.setState({timerActual:null,actualCircuito:actual})
            return;
        }
        clearInterval(this.state.timerActual);
        let timer = setInterval(this.intervalo.bind(this),1000)

        this.setState({actualCircuito:actual,timerActual:timer});
    }

    intervalo(){
        let actual = this.state.actualCircuito;
        let tiempos = this.state.duracionRecorrido;

        tiempos[actual] += 1;
        console.log(tiempos);
        this.setState({duracionRecorrido:tiempos})

    }

    render(){

        let vista = null

        let tiempo = 0;
        let actual = 0;
        let partida = false;
        if(this.state.login === false){
            vista = <Login  onLogin={()=>this.setState({login:true})}></Login>
        }
        else{
            actual = this.state.actualCircuito;
            tiempo = this.state.circuito[actual].tiempo - this.state.duracionRecorrido[actual];
            if(tiempo < 0){
                tiempo = 0;
            }
            partida = this.state.circuito[actual].partida;
        }
        let guion = this.state.circuito[actual]['nombre'].indexOf('-');
        if (guion === -1){
            guion = this.state.circuito[actual]['nombre'].length
        }

        return(<div>
            <Typography variant='h4'>Sector:{this.state.circuito[this.state.actualCircuito]['nombre'].substr(0,guion + 1)}</Typography>
            <Typography variant='h3'>{this.state.circuito[this.state.actualCircuito]['nombre'].substr(guion+1,3)}</Typography><br/>
            <Typography variant='h4'>Restante:</Typography>
            <Typography variant='h1'> {tiempo}s</Typography>  <br/>
            <Fab onClick={
                this.handlerClick.bind(this)
                }
                disabled={this.state.finalizoRecorrido}
                size='large'
                style={{width:'70vw',height:'70vw',maxHeight:'70vh',maxWidth:'70vh',marginTop:'3vh'}}
                color={partida === true? 'primary':'secondary'}
                >
                <Typography variant='h3'>{this.state.finalizoRecorrido === true? 'Finalizo' : partida === true?'Iniciar':'Taquear'}</Typography>
                </Fab>
        </div>)
    }
}