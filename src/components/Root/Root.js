import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "../HomeScreen";
import SearchResults from "../SearchResults/SearchResults";
import PubScreen from "../PubScreen";
import AdvancedSearch from "../AdvancedSearch";
import SignUp from "../SignUp/SignUp";
import LogIn from "../LogIn";
import UserProfile from "../UserProfile";
import BookingPage from "../BookingPage";
import { withAuth } from "../../contexts/AuthContext/AuthContext";

class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/advancedSearch" component={AdvancedSearch} />
          <Route exact path="/publist" component={SearchResults} />
          <Route exact path="/publist/:pubId" component={PubScreen} />
          <Route path="/signup" component={SignUp} />
          {this.props.authContext.user === null ? (
            <>
              <Route path="/login" component={LogIn} />
            </>
          ) : (
            <>
              <Route path="/publist/:pubId/booking" component={BookingPage} />
              <Route path="/profile" component={UserProfile} />
            </>
          )}
        </div>
      </Router>
    );
  }
}

export default withAuth(Root);
