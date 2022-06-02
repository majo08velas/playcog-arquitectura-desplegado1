import logo from './../../assets/logo.png';
import account from './../../assets/account.png';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

const Navbar = (props) =>{
    const [dropdown, setDropdown] = useState(false);//booleano para controlar cuando se abre y cierra el dropdown
    const [show, setShow] = useState(false);

    const abrirCerrarDropdown=()=>{
        setDropdown(!dropdown);//cuando esta abierto se cierra, y de forma contrarias
    }

    const abrirCerrarDropdown_dos=()=>{
        setShow(!show);//cuando esta abierto se cierra, y de forma contrarias
    }

    let navigate = useNavigate();

    return(
        <nav className="navbar navbar-fixed-top">

            <img className="logo" src={logo} alt="" />

            <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} size='lg' id='dropdownAccount'>
                <DropdownToggle className='menuDesplegable'>
                    <img className="account" src={account} alt="" />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => navigate('/deleteEditAccount')}>Cuenta</DropdownItem>

                    <DropdownItem onClick={() => navigate('/logIn')}>Cerrar Sesión</DropdownItem>
                </DropdownMenu>
            </Dropdown><Dropdown isOpen={show} toggle={abrirCerrarDropdown_dos} size='lg'>
                    <DropdownToggle className='menuDesplegable_dos'>
                        Menú
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => navigate('/home')}>Home</DropdownItem>
                        <DropdownItem onClick={() => navigate('/videojuegos')}>Juegos</DropdownItem>
                        <DropdownItem onClick={() => navigate('/aboutus')}>Sobre nosotros</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

        </nav>
        
    )
}

export default Navbar;