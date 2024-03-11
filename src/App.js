import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import User from "./components/user.component";
import Products from "./components/products.component"; 
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import eventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = { currentUser: undefined };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({ currentUser: user });
    }
    eventBus.on("logout", () => { this.logOut(); });
  }

  componentWillUnmount() {
    eventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({ currentUser: undefined });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: "#3271bf" }}>
            <Link to={"/"} className="navbar-brand"></Link>
            <div className="navbar-nav mr-auto">
              {/* {currentUser && (
                <li className="nav-item"> <Link to={"/user"} className="nav-link">Resource</Link></li>
              )} */}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><Link to={"/profile"} className="nav-link">Perfil</Link></li>
                <li className="nav-item"><Link to={"/productos"} className="nav-link">Productos</Link></li>                
                <li className="nav-item"><a href="/login" className="nav-link" onClick={this.logOut}>Cerrar Sesión</a></li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><Link to={"/login"} className="nav-link">Iniciar Sesión</Link></li>
                <li className="nav-item"><Link to={"/register"} className="nav-link">Registrarse</Link></li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/register"]} component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={User} />
              <Route exact path="/productos" component={Products} /> 
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

export default connect(mapStateToProps)(App);
