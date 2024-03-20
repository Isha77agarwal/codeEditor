import CodingPage from "./Component/CodingPage/CodingPage";
import SubmissionsTable from "./Component/Submissions/SubmissionsTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/submissions">
          <SubmissionsTable />
        </Route>
        <Route path="/">
          <CodingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
