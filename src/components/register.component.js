import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import Swal from 'sweetalert2';

const required = (value) => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">Este campo es requerido</div>);
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (<div className="alert alert-danger" role="alert">Este email no es valido</div>);
    }
};

const vNombreUsuario = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (<div className="alert alert-danger" role="alert">El nombre de usuario debe de tener entre 3 y 20 caracteres</div>);
    }
};

const vNombre = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (<div className="alert alert-danger" role="alert">El nombre debe de tener entre 3 y 20 caracteres</div>);
    }
};

const vPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (<div className="alert alert-danger" role="alert">La contraseña debe de tener entre 6 y 40 caracteres</div>);
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);


        this.state = {
            nombre: "",
            nombreUsuario: "",
            email: "",
            password: "",
            successful: false
        };
    }

    onChangeNombre(e) {
        this.setState({ nombre: e.target.value, });
    }

    onChangeNombreUsuario(e) {
        this.setState({ nombreUsuario: e.target.value, });
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value, });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value, });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    register(this.state.nombre, this.state.nombreUsuario, this.state.email, this.state.password)
                )
                .then(() => {
                    this.setState({
                        successful: true
                    });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario registrado exitosamente',
                        showConfirmButton: false,
                        timer: 2000 // 
                    }).then(() => {
                        this.props.history.push('/login');
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false
                    });
                    
                });
        }
    }

    render() {
        const { message } = this.props;

        return (

            <div className="col-md-12">
                <div className="card bg-light text-dark">
                    <h1 className="text-center my-4">Registro de Usuarios</h1>
                    <Form onSubmit={this.handleRegister} ref={(c) => { this.form = c; }}>
                        {!this.state.successful && (
                            <div>
                                <div className="form-group mb-3">
                                    <label htmlFor="nombre">Nombre</label>
                                    <Input type="text" className="form-control" name="nombre" value={this.state.nombre}
                                        onChange={this.onChangeNombre} validations={[required, vNombre]} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="nombreUsuario">Nombre Usuario</label>
                                    <Input type="text" className="form-control" name="nombreUsuario" value={this.state.nombreUsuario}
                                        onChange={this.onChangeNombreUsuario} validations={[required, vNombreUsuario]} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <Input type="email" className="form-control" name="email" value={this.state.email}
                                        onChange={this.onChangeEmail} validations={[required, email]} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <Input type="password" className="form-control" name="password" value={this.state.password}
                                        onChange={this.onChangePassword} validations={[required, vPassword]} />
                                </div>
                                <br/>

                                <div className="form-group d-flex justify-content-center">
                                    <button className="btn btn-dark btn-lg" style={{ minWidth: '10%' }}>Registrarse</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return { message, };
}

export default connect(mapStateToProps)(Register);