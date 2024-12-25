import React from "react"
import axios from 'axios'
import "../css/Home.css"
import Register from "./Register"
import Login from "./Login"
import Link from "./Link"
import "../css/register.css"

const activBlockMain = {
    display: "flex",
};
const activBlock = {
    display: "initial",
};
const notActivBlock = {
    display: "none",
};

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            PageActiv: "Register",
            tokin: '',
        }
    }
    changePage(page) {
        this.setState({ PageActiv: page });
    }
    tokon_change(aut) {
        this.setState({ tokin: aut });
    }
    componentDidMount() {
        const token = localStorage.getItem('authToken');
        console.log(token);
    
        if (token) {
            axios.get('http://localhost:8000/api/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response.data);
                this.changePage('Main');
                this.tokon_change(token)
            })
            .catch((error) => {
                console.log('bed');
                localStorage.removeItem('authToken');
            });
        }
    }
    render(){
        return(
            <div id="full_block" >
                <div id="block_register" style={this.state.PageActiv === "Register" ? activBlockMain : notActivBlock}>
                    {<Register changePage={this.changePage.bind(this)}/>}
                </div>
                <div id="block_login" style={this.state.PageActiv === "Login" ? activBlockMain : notActivBlock}>
                    {<Login changePage={this.changePage.bind(this)}/>}
                </div>
                <div id="block_mein" style={this.state.PageActiv === "Main" ? activBlockMain : notActivBlock}>
                    {<Link changePage={this.changePage.bind(this)} tokin={this.state.tokin}/>}
                </div>
            </div>
        )
    }
}
// localStorage.removeItem('authToken');
export default Home