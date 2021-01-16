import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Index from "./components";
import PostDetail from "./components/PostDetail/PostDetail";
import Users from "./components/Users/Users";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/post/:_id" exact children={<PostDetail />} />
        <Route path="/users" exact component={Users} />
        <Route path="*" component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
