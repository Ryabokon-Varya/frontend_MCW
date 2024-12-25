import React from "react"
import axios from 'axios'
import "../css/register.css"


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            PageActiv: "RegLog",
            Loginreg: '',
            gmailreg: '',
            passreg: '',
            pass2reg: ''
        }
        this.RegisterNewAkk = this.RegisterNewAkk.bind(this)
        this.ChangeRegisterInput = this.ChangeRegisterInput.bind(this)
    }
    ChangeRegisterInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render(){
        const { changePage } = this.props;
        return(
            <div id="block_menu">
                <div className="all_block">
                    <p id="p_name_reg" className="element_text">Ім’я користувача</p>
                    <input type="text" className="input_info" onChange={this.ChangeRegisterInput} name="Loginreg"/>
                    <p id="p_grail" className="element_text">Повне ім'я</p>
                    <input type="text" className="input_info" onChange={this.ChangeRegisterInput} name="gmailreg"/>
                    <p id="p_pass" className="element_text">Пароль</p>
                    <input type="password" className="input_info" onChange={this.ChangeRegisterInput} name="passreg"/>
                    <p id="p_pass_replese" className="element_text">Повторіть пароль</p>
                    <input type="password" className="input_info" onChange={this.ChangeRegisterInput} name="pass2reg"/>
                    <button id="butoon_register" className="button_reg_log button_reg" onClick={() => {this.RegisterNewAkk()}}>Зареєструватися</button>
                    <p id="p_pass" className="element_text">Вже маєш акаунт?</p>
                    <button id="butoon_login" className="button_login_log button_reg" onClick={() => {changePage('Login')}}>Увійти</button>
                </div>
            </div>
        )
    }
    RegisterNewAkk = async () => {
        const { changePage } = this.props;
        const { Loginreg, gmailreg, passreg, pass2reg } = this.state;
        if (passreg === pass2reg){
            axios.post('http://localhost:8000/api/register', {
                username: Loginreg,
                password: passreg,
                full_name: gmailreg,
            })
        .then(function (response) {
            console.log(response);
            alert("Успішна реєстрація акаунта")
            changePage('Login')
        })
        .catch(function (error) {
            // console.log(error.response)
            alert('Не коректні дані')
        });
        }
        else{
            alert("Паролі не співпадають")
        }

    };
}  

export default Register