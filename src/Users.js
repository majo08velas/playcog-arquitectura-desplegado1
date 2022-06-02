import { Component } from "react";
import { UserService } from "./services/user-service";

export default class Users extends Component{

  constructor(props){
    super(props);
    this.state = {personas:[]}
    this.userService = new UserService();
  }

  componentDidMount(){
    this.userService.getAll().then(data => this.setState({personas:data}))
  }

  render(){
    return(
      console.log("")
    );
  }

}