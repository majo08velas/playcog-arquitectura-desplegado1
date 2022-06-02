import axios from 'axios';

export class UserService{ 

  baseURL = "https://react-desplegado.rj.r.appspot.com/"

  getAll() {
    return axios.get(this.baseURL + "/mostrarUsuario")
  }

  getAllVideogames() {
    return axios.get(this.baseURL + "/mostrarJuego")
  }

  get(id) {
    return axios.get(this.baseURL +`/mostrarUsuario/${id}`);
  }

  getbymail(correo) {
    return axios.get(this.baseURL +`/correo/${correo}`);
  }

  iniciarSesion(correo,contrasena){
    return axios.get(this.baseURL + `/mostrarUsuario/${correo}/${contrasena}`);
  }

  create(data) {
    return axios.post(this.baseURL + "/crearUsuario", data);
  }

  update(id, data) {
    return axios.put(this.baseURL + `/actualizarUsuario/${id}`, data);
  }
  
  delete(id) {
    return axios.get(this.baseURL + `/eliminarUsuario/${id}`);
  }
}