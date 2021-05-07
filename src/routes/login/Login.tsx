import React, { ChangeEventHandler } from 'react';
import formStyles from '../../Form.module.scss';
import styles from './Login.module.scss';
import { Auth } from '../../api/Index';
import logo from '../../logo_dark_bg.png'
import Button from '../../components/inputs/button/Button';

interface LoginProps {
    redirect?: string
}

interface LoginState {
    login: {
        email: string,
        password: string
    }
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps){
        super(props)
        this.state = {
            login: { email: "", password: "" },
        }

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    protected handleLoginChange(event: React.ChangeEvent<HTMLInputElement>): void 
    {
        const name = event.target.name;
        if(name === "email" || name === "password"){
            let newState = {...this.state};
            newState.login[name] = event.target.value;
            this.setState(newState);
        }
    }
    
    protected handleLogin(event: React.FormEvent<HTMLFormElement>) {
        Auth.startSession().then(
                session => {
                    console.log("session success:", session);
                    Auth.login(this.state.login.email, this.state.login.password).then(
                        success => {window.location.reload()},
                        error => {console.log("error", error)}
                    );
                },
                sessionError => {
                    console.log("session failure:", sessionError);
                }
        )
        event.preventDefault();
    }

    formSection(
        label: string, 
        name: string, 
        type: string, 
        autocomplete: string,
        value: string,
        handler: ChangeEventHandler
    ){
        return (
            <label>
                <span>{label}</span>
                <input
                    name={name}
                    type={type}
                    value={value}
                    autoComplete={autocomplete}
                    onChange={handler}
                />
            </label>
        )
    }

    render() {
        return (
            <>
                <header className={styles.no_content_header}>
                    <img className={styles.logo} src={logo} alt="Woodridge Logo"/>
                </header>
                <main>
                    <section className={formStyles.centerpiece}>
                        <form onSubmit={this.handleLogin}>
                            {this.formSection("Email", "email", "email", "email", this.state.login.email, this.handleLoginChange)}
                            {this.formSection("Password", "password", "password", "current-password", this.state.login.password, this.handleLoginChange)}
                            <Button type="submit">LOGIN</Button>
                        </form>
                    </section>
                </main>
            </>
        )
    }
}