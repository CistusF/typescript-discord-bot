import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Pages
import Home from './Pages/Home';
import Support from './Pages/Support';

//Components
import Header from './Components/Header';
import Footer from './Components/Footer';

import style from './App.module.css';

type Props = {}

type State = {
  theme: string;
};

export default class App extends Component<Props, State> {
  state: State = {
    theme: localStorage.getItem("theme") ?? "white"
  };
  render() {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "white");
    }
    return (
      <Router>
        <Header />
        <div className={style.Main}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/support" component={Support} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  };
  componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  };
}