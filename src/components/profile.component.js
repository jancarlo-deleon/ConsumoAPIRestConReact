import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import avatar from '../avatar.png';
let url = "";

class Profile extends Component {

    render(){

        const { user: currentUser} = this.props;
        console.log("El currentUser es:",currentUser);
        if (!currentUser) { return <Redirect to="/login" />;}

        return (
            <div>
                <section style={{ backgroundColor: "#eee"}}>
                    <div className="container-lg py-2">
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href={url}>Home</a></li>
                                        <li className="breadcrumb-item"><a href={url}>User</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Perfil de Usuario</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src={avatar}alt="avatar" 
                                        className="rounded-circle img-fluid" style={{ width:"150px" }} />
                                        <h5 className="my-3">{currentUser.nombreUsuario}</h5>
                                        {/* <p className="text-muted mb-1">{(currentUser.roles).replace("[","").replace("]","")}</p> */}
                                        <p className="text-muted mb-4">Huehuetenango, Guatemala, GT</p>
                                        <div className="d-flex justify-content-center m-2">
                                            <button type="button" className="btn btn-primary">Seguir</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Mensaje</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-globe fa-lg text-warning"></i>
                                                <p className="mb-0">https://mdbootstrap.com</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-github fa-lg" style={{ color: "#333"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-twitter fa-lg" style={{ color: "#55acee"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-instagram fa-lg" style={{ color: "#ac2bac"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-facebook-f fa-lg" style={{ color: "#3b5998"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nombre Completo</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{currentUser.nombre}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{currentUser.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Telefono 1</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">+502 3336 1433</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Telefono 2</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">+502 3586 9153</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Direccion</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Huehuetenango, Guatemala, GT</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">Tarea</span> Estado del Proyecto
                                                </p>
                                                <p className="mb-1" style={{ fontSize: ".77rem"}}>Web Design</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Website Markup</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"72%"}} aria-valuenow="72"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>One Page</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"89%"}} aria-valuenow="89"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Mobile Template</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"55%"}} aria-valuenow="55"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"66%"}} aria-valuenow="66"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">Tarea</span> Estado del Proyecto
                                                </p>
                                                <p className="mb-1" style={{ fontSize: ".77rem"}}>Web Design</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Website Markup</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"72%"}} aria-valuenow="72"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>One Page</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"89%"}} aria-valuenow="89"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Mobile Template</p>
                                                <div className="progress rounded" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"55%"}} aria-valuenow="55"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p className="mt-4 mb-1" style={{ fontSize:".77rem"}}>Backend API</p>
                                                <div className="progress rounded mb-2" style={{height:"5px"}}>
                                                    <div className="progress-bar" role="progressbar" style={{width:"66%"}} aria-valuenow="66"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);