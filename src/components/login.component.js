import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from 'react-redux';
import { login } from "../actions/auth";
import logo from '../login-img.png';

const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role="alert">
                Este campo es requerido!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            nombreUsuario: "",
            password: "",
            loading: false
        };
    }

    onChangeNombreUsuario(e) {
        this.setState({
            nombreUsuario: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.nombreUsuario, this.state.password))
                .then(() => {
                    history.push("/profile");
                    window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/profile" />;
        }

        return (
            <div className='col-md-12'>
                <div className='card bg-light text-dark'>
                    <h1 className="text-center my-4">Inicio de Sesión</h1>

                    <div className="d-flex justify-content-center mb-4">
                        <img src={logo} width="150" height="150" alt="logo" />
                    </div>

                    <Form
                        onSubmit={this.handleLogin}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className='form-group mb-3'>
                            <label htmlFor="nombreUsuario">Nombre Usuario</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="nombreUsuario"
                                value={this.state.nombreUsuario}
                                onChange={this.onChangeNombreUsuario}
                                validations={[required]}
                            />
                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor="password">Contraseña</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>
                        <br/>
                        <div className='form-group d-flex justify-content-center'>
                            <button
                                className='btn btn-dark btn-lg'
                                style={{ minWidth: '10%' }}
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                <span>Ingresar</span>
                            </button>
                        </div>

                        {message && (
                            <div className='form-group'>
                                <div className='alert alert-danger text-center' role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);
