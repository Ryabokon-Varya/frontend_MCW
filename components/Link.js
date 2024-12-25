import React from "react"
import axios from 'axios'

const stule_info = "font-size: 16px; margin-bottom: 5px;";

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            PageActiv: "Login",
            link: '',
            short_link: '',
            short: '',
        }
        this.handleLinkChange = this.handleLinkChange.bind(this)
    }
    handleLinkChange = (event) => {
        this.setState({ link: event.target.value });
    }
    handleLinkShortChange = (event) => {
        this.setState({ short_link: event.target.value });
    }
    handleShortLinkChange = (value) => {
        this.setState({ short: value });
    }
    render(){
        const { changePage } = this.props;
        return(
            <div id="block_menu">
                <div class="all_block block_link">
                    <div id="all_block_log_wach" className="block_stule">
                        <p id="p_name_log" className="element_text">Посилання</p>
                        <input type="text" className="input_info block_input" onChange={this.handleLinkChange}/>
                        <button id="butoon_link" className="button_link_log" onClick={() => {this.Link()}}>Скоротити</button>
                        <div id="link-container"></div>
                    </div>
                    <div id="block_long_link" className="block_stule">
                        <p id="p_name_log" className="element_text">Дата переходів</p>
                        <p id="p_name_log" className="element_text">Введіть ID</p>
                        <input type="text" className="input_info block_input" onChange={this.handleLinkShortChange}/>
                        <button id="butoon_link" className="button_link_log" onClick={() => {this.LinkAll()}}>Вивести дату</button>
                        <div id="link-container2"></div>
                    </div>
                    <div id="block_long_link" className="block_stule">
                        <button id="butoon_link" className="button_link_log" onClick={() => {this.MyURL()}}>Останні 10 посилань</button>
                        <div id="link-container3"></div>
                    </div>
                </div>
            </div>
        )
    }
    Link = async () => {
        const { link } = this.state;
        const { changePage } = this.props;
        const token = this.props.tokin
        console.log(token)
        console.log(link)
        try {
            axios.post('http://localhost:8000/api/me/urls', 
                { url: link }, 
                {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Використовуємо отриманий токен
                    'Content-Type': 'application/json',
                }
                })
                .then(response => {
                    console.log("Shortened URL:", response.data);
                    this.handleShortLinkChange(response.data.short)
                    const htmlContent = `<p>Ваше коротке посилання: http://localhost:8000/${response.data.short}</p>`;
                    // Вставляємо HTML код на сторінку, наприклад, в елемент з id 'link-container'
                    document.getElementById('link-container').innerHTML = htmlContent;
                })
                .catch(error => {
                    alert('Не коректні дані')
                    console.error('Error shortening URL:', error.response.data);
                });
        } catch (error) {
            console.error('Error link:', error);  // Виводимо помилки в консоль
        }
    };
    LinkAll = async () => {
        const { short_link } = this.state;
        const token = this.props.tokin
        console.log(token)
        console.log(short_link)
        try {
            axios.get(`http://localhost:8000/api/me/links/${short_link}/redirects`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(function (response) {
                console.log(response);
                const data = response.data;

                let htmlContent = '';
                data.forEach(item => {
                    const dateObject = new Date(item);
                    
                    const date = dateObject.toISOString().split('T')[0];
                    const time = dateObject.toISOString().split('T')[1].split('.')[0];
                    
                    htmlContent += `<p >Дата: ${date} Час: ${time}</p>`;
                });
                document.getElementById('link-container2').innerHTML = htmlContent;
            })
            .catch(function (error) {
                if (error.response) {
                    console.error(error.response.data);
                    alert('Не коректні дані')
                } else {
                    console.error("Network error or other issue");
                }
            });
            
        } catch (error) {
            console.error('Error link:', error);
        }
    };
    MyURL = async () => {
        const token = this.props.tokin
        console.log(token)
        try {
            axios.get(`http://localhost:8000/api/me/urls`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })
            .then(function (response) {
                console.log(response);
                const data = response.data;

                let htmlContent = '';
                data.forEach(item => {
                    const dateObject = new Date(item);
                    
                    const url = item['url'];
                    const short = item['short'];
                    const redirects = item['redirects'];
                    
                    htmlContent += `<p style="${stule_info}">Url: <b>${url}</b> ID: <b>${short}</b> Переходів: <b>${redirects}</b></p>`;

                });
                document.getElementById('link-container3').innerHTML = htmlContent;
            })
            .catch(function (error) {
                if (error.response) {
                    console.error(error.response.data);
                    alert("Помилка авторизації");
                } else {
                    console.error("Network error or other issue");
                }
            });
            
        } catch (error) {
            console.error('Error link:', error);
        }
    };
}  

export default Login