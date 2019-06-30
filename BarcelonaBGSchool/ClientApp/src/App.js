import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateGroup from "./components/group/CreateGroup.component";
import EditGroup from "./components/group/EditGroup.component";
import IndexGroup from "./components/group/IndexGroup.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={"/"} className="navbar-brand">
              Българско Неделно Училище "Св. св.Кирил и Методий" - Барселона
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    Добави клас
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/index"} className="nav-link">
                    Всички класове
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/create" component={CreateGroup} />
            <Route path="/edit/:id" component={EditGroup} />
            <Route path="/index" component={IndexGroup} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
