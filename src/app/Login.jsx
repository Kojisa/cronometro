import React,{Component} from 'react';
import {Button,TextField} from '@material-ui/core';




export default class Login extends Component{

    constructor(props){
        super(props);
        //this.db = new db();
        this.state={
            us:'',
            pas:'',
            onLogin:props.onLogin,
        }
        this.enviar_login = this.enviar_login.bind(this)
        this.cargar_usuario = this.cargar_usuario.bind(this)
        this.actualizarDatos = this.actualizarDatos.bind(this)
        this.funcionEnter = this.funcionEnter.bind(this);
    }

    enviar_login(usuario){
        this.cargar_usuario.bind(this)(usuario)
        //this.db.login(this.cargar_usuario,this.state.us,this.state.pas);
    }

    cargar_usuario(datos){
        if('error' in datos){
            return;
        }
        this.state.onLogin(datos.usuario) //la posicion 1 es el usuario y la 3 es si es admin
    }

    funcionEnter(ev){
        if(ev.key==='Enter'){
            if(this.state.us.length > 0 && this.state.pas.length > 0){
                this.enviar_login();
                ev.preventDefault();
            }
        }
    }

    actualizarDatos(evento,texto){
        let campo = evento.target.name;
        this.setState({[campo]:texto});

    }

    render(){
        return(
            <div style={{width:'100vw',height:'100vh'}}>   
                
                    <div style={{textAlign:'center',position:'relative',top:'30%'}} zDepth={1}>
                        <TextField label='Usuario' name='us' 
                        onChange={(ev)=>this.setState({us:ev.target.value})}
                        variant='outlined'
                        onKeyPress={this.funcionEnter}/>
                        <br/>
                        <TextField label='Contraseña' name='pas' 
                        onChange={(ev)=>this.setState({pas:ev.target.value})} 
                        type='password' variant='outlined'
                        onKeyPress={this.funcionEnter}/>
                        <br/>
                        <Button variant='contained' primary 
                        onClick={this.enviar_login}
                        style={{marginTop:'5px'}}
                        >
                         Ingresar
                        </Button>
                    </div>
            </div>
        )
    }


}