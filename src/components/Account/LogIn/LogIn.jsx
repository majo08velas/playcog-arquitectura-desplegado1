import styles_login from './LogIn.module.css';
import user from './../../../assets/user.png'
import pass from './../../../assets/pass.png'
import background from './../../../assets/fondo.png'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Component } from 'react';
import { withRouter } from  '../../../withRouter';
import { UserService } from '../../../services/user-service';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class LogIn extends Component{

    constructor(){
        super();
        this.state = this.initialState;
        this.redirectNewAccount =this.redirectNewAccount.bind(this)
        this.cambioUsuario = this.cambioUsuario.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.redirectLogIn = this.redirectLogIn.bind(this);
        this.userService = new UserService();
    }

    state={
        abierto:false,
    }

    initialState = {
        correo:'',
        contrasena:''
    }

    abrirVentana=()=>{
        this.setState({
            abierto: !this.state.abierto//si está en true cambia a false, y si está en false, cambia atrue
        })
    }

    async cambioUsuario(event){
        await this.setState({
            [event.target.name]:event.target.value
        });

        console.log(this.state)
    }

    iniciarSesion(event){

        event.preventDefault();

        const correo = {
            correo:this.state.correo,
        }

        const contrasena = {
            contrasena:this.state.contrasena,
        }

        this.userService.iniciarSesion(correo.correo,contrasena.contrasena).then(res =>{
            if(res.data != null){
                console.log(res);
                return res.data;
            }
        }).then(res =>{
            if(res !== ''){//si encuentra un usuario que coincide retorna al menos un dato
                //var res = res[];
                cookies.set('id', res.id, {path:"/"});
                cookies.set('nombre', res.nombre, {path:"/"});
                cookies.set('apellido', res.apellido, {path:"/"});
                cookies.set('correo', res.correo, {path:"/"});
                cookies.set('fecha_nacimiento', res.fecha_nacimiento, {path:"/"});
                cookies.set('telefono', res.telefono, {path:"/"});
                cookies.set('residencia', res.residencia, {path:"/"});

                this.props.navigate('/home');

            }else{
                this.abrirVentana();
            }
        })

    }

    redirectNewAccount()
    {
        this.props.navigate('/newaccount')
    }

    redirectLogIn(){
        this.props.navigate('/login')
    }

    render(){

        const modalStyles = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: 'translate(-50%,-50%)', 
        }

        const {correo,contrasena} = this.state;

        return(
            <body background={background} className={styles_login.body}>
                <div className={styles_login.section}>
                    <form className={styles_login.formClass} onSubmit={this.iniciarSesion}>
                        <div className={styles_login.form}>
                            <div className={styles_login.grupo}>
                                <img className={styles_login.user} src={user} alt=""/>
                                <input 
                                name="correo" 
                                className={styles_login.input} 
                                value={correo}
                                onChange={this.cambioUsuario}
                                type="text"
                                required/>
                            </div>
                            <div className={styles_login.grupo}>
                                <img className={styles_login.pass} src={pass} alt=""/>
                                <input 
                                name="contrasena" 
                                className={styles_login.input} 
                                value={contrasena}
                                onChange={this.cambioUsuario}
                                type="password"
                                required/>
                            </div>
                            <div className={styles_login.recuperarPass}>
                                <a href="/forgetPass">¿Olvidaste la constraseña?</a>
                            </div>
                            <div>
                                <button className={styles_login.btnIniciar} type="submit">INICIAR SESIÓN</button>
                            </div>
                            <div>
                                <button className={styles_login.btnCrear} type="button" onClick={this.redirectNewAccount}>CREAR CUENTA</button>
                            </div>
                        </div>
                    </form>

                    <Modal isOpen={this.state.abierto} style={modalStyles}>
                        <ModalHeader className={styles_login.ModalHeader}>
                            <Button close color="secondary" onClick={this.abrirVentana}></Button>
                        </ModalHeader>
                        <ModalBody className={styles_login.ModalBody}>
                            Usuario y/o contraseña incorrecta
                        </ModalBody>
                        <ModalFooter>
                            <Button className={styles_login.ModalButton} color="success" type='button' onClick={this.abrirVentana}>OK</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </body>
        )
    }
}

export default withRouter(LogIn)