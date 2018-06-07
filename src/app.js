import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import ArticleRoute from './components/routes/articles'
import UserForm from './components/user-form'
import Filters from './components/filters'
import Counter from './components/counter'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <NavLink to="/counter" activeStyle={{ color: 'red' }}>
              Counter
            </NavLink>
          </div>
          <div>
            <NavLink to="/filters" activeStyle={{ color: 'red' }}>
              Filters
            </NavLink>
          </div>
          <div>
            <NavLink to="/articles" activeStyle={{ color: 'red' }}>
              Articles
            </NavLink>
          </div>
        </div>
        <UserForm />
        <Switch>
          <Route path="/counter" component={Counter} exact />
          <Route path="/filters" component={Filters} />
          <Route path="/articles/new" render={() => <h1>Add New Article</h1>} />
          <Route path="/articles" component={ArticleRoute} />
        </Switch>
      </div>
    )
  }
}

export default App
