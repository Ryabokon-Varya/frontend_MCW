import React from "react"
import axios from 'axios'
import "../css/register.css"

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            PageActiv: "Login",
            usernameLogin: '',
            passwordLogin: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.ChangeRegisterInput = this.ChangeRegisterInput.bind(this)
    }
    ChangeRegisterInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleUsernameChange = (event) => {
        this.setState({ usernameLogin: event.target.value });
    }
    
    handlePasswordChange = (event) => {
        this.setState({ passwordLogin: event.target.value });
    }
    render(){
        const { changePage } = this.props;
        return(
            <div id="block_menu">
                <div className="all_block">
                    <p id="p_name_log" className="element_text">Ім’я користувача</p>
                    <input type="text" className="input_info2" onChange={this.handleUsernameChange}/>
                    <p id="p_pass" className="element_text">Пароль</p>
                    <input type="password" className="input_info2" onChange={this.handlePasswordChange}/>
                    <button id="butoon_login" className="button_reg_log button_reg" onClick={() => {this.Register()}}>Увійти</button>
                </div>
            </div>
        )
    }
    Register = async () => {
        const { usernameLogin, passwordLogin } = this.state;
        const { changePage } = this.props;
        const { changeAutorized } = this.props;
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', usernameLogin);
        data.append('password', passwordLogin);
        data.append('scope', '');
        data.append('client_id', '');
        data.append('client_secret', '');

        try {
            const response = await axios.post('http://localhost:8000/api/login', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const token = response.data.access_token;
            console.log(token);
            localStorage.setItem('authToken', token);
            axios.get('http://localhost:8000/api/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                }
            })
            .then(function (response) {
                console.log(response.data);
                alert("Успішна авторизація акаунта");
                changePage('Main')
            })
            .catch(function (error) {
                alert("Помилка авторизації");
            });

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
}  

export default Login