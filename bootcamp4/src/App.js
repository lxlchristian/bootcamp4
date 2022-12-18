import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

import { Route, Switch, withRouter } from 'react-router-dom';
import Homepage from './Homepage';

const App = () => {
  return (
      <Switch>
          <Route exact path="/">
              <Homepage />
          </Route>
          <Route exact path="/editor">
              <CardEditor />
          </Route>
          <Route path="/viewer/:deckId">
            <CardViewer />
          </Route>
          <Route>
            Page not found!
          </Route>
      </Switch>
  );
}
 
export default withRouter(App);
