import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./components/Home";
import { SubjectPracticeList } from "./components/SubjectPracticeList";
import { ReferenceBookPracticeList } from "./components/ReferenceBookPracticeList";
import { UnitPracticeList } from "./components/UnitPracticeList";
import { IssueList } from "./components/IssueList";
import { SubjectTestList } from "./components/SubjectTestList";
import { ReferenceBookTestList } from "./components/ReferenceBookTestList";
import { UnitTestList } from "./components/UnitTestList";
import { IssueTestList } from "./components/IssueTestList";
import { AdminHome } from "./components/AdminHome";
import { AdminUserResultList } from "./components/AdminUserResultList";
import { AdminEditSubjectList } from "./components/AdminEditSubjectList";
import { AdminEditReferenceBookList } from "./components/AdminEditReferenceBookList";
import { AdminEditUnitList } from "./components/AdminEditUnitList";
import { AdminEditIssueList } from "./components/AdminEditIssueList";
import { AdminEditProblem } from "./components/AdminEditProblem";
import { AdminCreateIssue } from "./components/AdminCreateIssue";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from 'axios';
import { LoginProviders } from "./components/providers/LoginProviders";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


const App = () => {

  return (
    <BrowserRouter>
        <div className="App">
        </div>
        <LoginProviders>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="/subject_test">
                <SubjectTestList />
            </Route>
            <Route path="/subject_practice">
                <SubjectPracticeList />
            </Route>

            <Route path="/reference_book_test/:subject_id">
                <ReferenceBookTestList />
            </Route>
            <Route path="/reference_book_practice/:subject_id">
                <ReferenceBookPracticeList />
            </Route>

            <Route path="/unit_test/:reference_book_id">
                <UnitTestList />
            </Route>
            <Route path="/unit_practice/:reference_book_id">
                <UnitPracticeList />
            </Route>

            <Route path="/issue_test/:unit_id">
                <IssueTestList />
            </Route>
            <Route path="/issue/:unit_id">
                <IssueList />
            </Route>



            <Route exact path="/admin">
                <AdminHome />
            </Route>
            <Route path="/admin/user_result/:user_id">
                <AdminUserResultList />
            </Route>
            <Route path="/admin/create_issue">
                <AdminCreateIssue />
            </Route>
            <Route path="/admin/edit_subject">
                <AdminEditSubjectList />
            </Route>
            <Route path="/admin/edit_reference_book/:subject_id">
                <AdminEditReferenceBookList />
            </Route>
            <Route path="/admin/edit_unit/:reference_book_id">
                <AdminEditUnitList />
            </Route>
            <Route path="/admin/edit_issue/:unit_id">
                <AdminEditIssueList />
            </Route>
            <Route path="/admin/edit/:id">
                <AdminEditProblem />
            </Route>
        </Switch>
    </LoginProviders>
    </BrowserRouter>
  );
}

if (document.getElementById('nav')) {
    ReactDOM.render(<App />, document.getElementById('nav'));
}

export default App;
