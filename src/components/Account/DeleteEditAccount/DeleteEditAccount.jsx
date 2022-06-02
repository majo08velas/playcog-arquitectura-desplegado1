import styles from './DeleteEditAccount.module.css';
import background from './../../../assets/fondo.png';
import React,{ Component } from 'react';
import { UserService } from '../../../services/user-service';
import Cookies from 'universal-cookie';
import { withRouter } from '../../../withRouter';
import { Button,Modal, ModalBody, ModalFooter } from 'reactstrap';

const cookies = new Cookies();

class DeleteEditAccount extends Component{
    
     constructor(){
         super();
         this.state = this.initialState;
         this.userService = new UserService();
         this.updateUser = this.updateUser.bind(this);
         this.cambioUsuario = this.cambioUsuario.bind(this);
         this.redirectLogIn =this.redirectLogIn.bind(this)
         this.getUser = this.getUser.bind(this);
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
        residencia:''
    }

    abrirVentana=()=>{
        this.setState({
            abierto: !this.state.abierto//si está en true cambia a false, y si está en false, cambia atrue
        })
    }

    componentDidMount(){
        var id = cookies.get('id');
        this.getUser(id);
       
    }

    async cambioUsuario(event){
        await this.setState({
            [event.target.name]:event.target.value
        });

        console.log(this.state)
    }

    getUser(id) {

        this.userService.get(id).then(response => {
            this.setState({
                nombre: cookies.get('nombre'),
                apellido: cookies.get('apellido'),
                correo: cookies.get('correo'),
                contrasena: response.data.contrasena,
                fecha_nacimiento:cookies.get('fecha_nacimiento'),
                telefono: cookies.get('telefono'),
                residencia: cookies.get('residencia')
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    updateUser =(event)=> {

        event.preventDefault();

        var id = cookies.get('id');

        const persona = {
            id:this.state.id,
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            correo:this.state.correo,
            contrasena:this.state.contrasena,
            fecha_nacimiento:this.state.fecha_nacimiento,
            telefono:this.state.telefono,
            residencia:this.state.residencia
        }

        this.userService.update(id,persona).then(response =>{
            if(response.data != null){
               console.log("Usuario actualizado");
            }
        })
        .catch(e => {
            console.log(e);
        });

        this.userService.getAllVideogames().then(response=>{
            if(response.data != null){
                console.log("videojuego:" + response.data)
            }
        })

    }

    deleteUser = () => { 

        var id = cookies.get('id');

        this.userService.delete(id)
        .then(response => {
            console.log("Usuario eliminado");
        })
        .catch(e => {
            console.log(e);
        });

        this.abrirVentana();
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

        const {nombre,apellido,correo,contrasena,fecha_nacimiento,telefono,residencia} = this.state;
        
        return(
            <body background={background} className={styles.body}>
                <div className={styles.section}>
                    <form>
                        <div className={styles.formClass}>
                            <div className={styles.grupo}>
                                <input 
                                name='correo'
                                className={styles.input} 
                                type="email" 
                                placeholder="Correo" 
                                value={correo}
                                onChange={this.cambioUsuario}
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name='contrasena'
                                value={contrasena}
                                onChange={this.cambioUsuario}
                                className={styles.input} 
                                type="password" 
                                placeholder="Contraseña" 
                                required/>
                            </div>
                            <div className={styles.titulo}>INFORMACIÓN PERSONAL</div><hr/>
                            <div className={styles.grupo}>
                                <input 
                                name='nombre'
                                value={nombre}
                                onChange={this.cambioUsuario}
                                className={styles.input} 
                                type="text" 
                                placeholder="Nombre" 
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name='apellido'
                                value={apellido}
                                onChange={this.cambioUsuario}
                                className={styles.input} 
                                type="text" 
                                placeholder="Apellido" 
                                required/>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                name='fecha_nacimiento'
                                value={fecha_nacimiento}
                                onChange={this.cambioUsuario}
                                className={styles.input} 
                                placeholder="Fecha de nacimiento"
                                type="text" 
                                required/>
                            </div>
                            <div  className={styles.grupo}>
                                <select 
                                name="residencia"  
                                value={residencia}
                                onChange={this.cambioUsuario}>
                                    <option value="">- Lugar de residencia -</option>
                                    <option value="bogota"> Bogotá</option>
                                </select>
                            </div>
                            <div className={styles.grupo}>
                                <input 
                                value={telefono}
                                onChange={this.cambioUsuario}
                                name='telefono'
                                className={styles.input} 
                                type="text" 
                                placeholder="Teléfono" 
                                required/>
                            </div>
                            <div className="grupoBtn">
                                <button className={styles.btnModificar} type="button" onClick={this.updateUser}>MODIFICAR CUENTA</button>
                            </div>
                            <div className="grupoBtn">
                                <button className={styles.btnEliminar} type="button" onClick={this.deleteUser}>ELIMINAR CUENTA</button>
                            </div>
                        </div>
                    </form>

                    <Modal isOpen={this.state.abierto} style={modalStyles}>
                        <ModalBody className={styles.ModalBody}>
                            La cuenta fue eliminada correctamente
                        </ModalBody>
                        <ModalFooter>
                            <Button ngIf className={styles.ModalButton} color="success" type='button' onClick={this.redirectLogIn}>OK</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </body>
        )
    }
}

export default withRouter(DeleteEditAccount);