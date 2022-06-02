import styles from './NewAccount.module.css';
import background from './../../../assets/fondo.png';
import { Component } from 'react';
import { UserService } from '../../../services/user-service';
import flecha from '../../../assets/flecha.png'
import { withRouter } from '../../../withRouter';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class NewAccount extends Component{

    constructor(){
        super();
        this.state = this.initialState;
        this.nuevoUsuario = this.nuevoUsuario.bind(this);
        this.cambioUsuario = this.cambioUsuario.bind(this);
        this.userService = new UserService();
        this.redirectLogin =this.redirectLogin.bind(this)
        this.redirectEdit =this.redirectEdit.bind(this)
    }

    abrirVentana=()=>{
        this.setState({
            abierto: !this.state.abierto//si está en true cambia a false, y si está en false, cambia atrue
        })
    }

    redirectLogin(){
        this.props.navigate('/login')
    }

    redirectEdit(){
        this.props.navigate('/deleteEditaccount')
    }

    state={
        abierto:false,
    }

    initialState = {
        id: null,
        nombre:'',
        apellido:'',
        correo:'',
        contrasena:'',
        fecha_nacimiento:'',
        telefono:'',
        residencia:'',   
    }

    nuevoUsuario = event =>{

        event.preventDefault();

        const persona = {
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            correo:this.state.correo,
            contrasena:this.state.contrasena,
            fecha_nacimiento:this.state.fecha_nacimiento,
            telefono:this.state.telefono,
            residencia:this.state.residencia
        }

        this.userService.create(persona).then( res =>{
            if(res.data != null){
                this.setState(this.initialState);
                this.userService.getbymail(persona.correo).then(res =>{
                    if(res.data != null){
                        const id = res.data.id;
                        console.log("Usuario creado con id " + id);
                    }
                })
            }
        });

        this.abrirVentana()

    }

    cambioUsuario(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){

        const modalStyles = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: 'translate(-50%,-50%)', 
        }

        const {id,nombre,apellido,correo,contrasena,fecha_nacimiento,telefono,residencia} = this.state;

        return(
            <body background={background} className={styles.body}>
                <div className={styles.section}>
                    <form id='crearUsuario' onSubmit={this.nuevoUsuario} key={id}>
                        <div className={styles.flecha}>
                            <img src={flecha} alt="" type="button" onClick={this.redirectLogin} />
                        </div>
                        <div className={styles.titulo}>REGISTRATE</div><hr/>
                        <div className={styles.formClass}>
                            <div className={styles.grupo}>
                                <input 
                                name="nombre" 
                                className={styles.input} 
                                type="text" 
                                placeholder="Nombre" 
                                value={nombre}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name="apellido" 
                                className={styles.input} 
                                type="text" 
                                placeholder="Apellido" 
                                value={apellido}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name="correo" 
                                className={styles.input} 
                                type="email" 
                                placeholder="Correo" 
                                value={correo}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name="fecha_nacimiento" 
                                className={styles.input} 
                                type="text"
                                placeholder='Fecha de nacimiento' 
                                value={fecha_nacimiento}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div  className={styles.grupo}>
                                <select name="residencia" id="residencia" value={residencia} onChange={this.cambioUsuario}>
                                    <option value="">- Lugar de residencia -</option>
                                    <option value="bogota"> Bogotá</option>
                                </select>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name="telefono" 
                                className={styles.input} 
                                type="number" 
                                placeholder="Teléfono" 
                                value={telefono}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name="contrasena" 
                                className={styles.input}
                                type="password" 
                                placeholder="Contraseña" 
                                value={contrasena}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className="grupoBtn">
                                <button className={styles.btnCrear} type="submit">CREAR CUENTA</button>
                            </div>
                        </div>
                    </form>

                    <Modal isOpen={this.state.abierto} style={modalStyles}>
                        <ModalHeader className={styles.ModalHeader}>
                            <Button close color="secondary" onClick={this.abrirVentana}></Button>
                        </ModalHeader>
                        <ModalBody className={styles.ModalBody}>
                            La cuenta fue creada correctamente
                        </ModalBody>
                        <ModalFooter>
                            <Button className={styles.ModalButton} color="success" type='button' onClick={this.redirectLogin}>OK</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </body>
        )
        
    }
}

export default withRouter(NewAccount)