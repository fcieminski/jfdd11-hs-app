import React, { Component } from "react";

import "./AdvancedSearch.css";
import { withAdvancedSearch } from "../../contexts/AdvancedSearch/AdvancedSearch";

class AdvancedSearch extends Component {
  state = {
    publist: this.props.advancedSearchContext.publist,
    city: "all",
    cout: 5,
    openedFrom: "all",
    openedTill: "all"
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    console.log(this.state);
  };

  prepareArr = item => {
    let retArr = [];
    Object.entries(this.props.advancedSearchContext.publist)
      .map(([id, value]) => ({ id, ...value }))
      .forEach(pub => {
        if (retArr.includes(pub[item])) {
          return;
        } else {
          retArr.push(pub[item]);
        }
      });
    return retArr.sort();
  };

  fittingPubs = event => {
    event.preventDefault();
    const { city, cout, openedFrom, openedTill } = this.state;
    this.props.advancedSearchContext.pushFilteredPubList(
      this.props.advancedSearchContext.publist
        .filter(pub => (city === "all" ? pub : pub.city === city))
        .filter(pub => pub.space >= cout)
        .filter(pub =>
          openedFrom === "all" ? pub : pub.openhour <= openedFrom
        )
        .filter(pub =>
          openedTill === "all" ? pub : pub.closehour >= openedTill
        )
    );
    this.props.advancedSearchContext.pushFilters(
      city,
      cout,
      openedFrom,
      openedTill
    );
  };

  handleResetFilters = event => {
    event.preventDefault();
    this.props.advancedSearchContext.resetFilters();
  };

  render() {
    return (
      <div>
        <div className="AdvancedSearch">
          <h3>Advanced Search Options</h3>
          <form className="AdvancedSearch-form">
            <div>
              <label name="city">City </label>
              <select
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              >
                <option value="all">Any</option>
                {this.prepareArr("city").map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>For how many? </label>
              <input
                value={this.state.cout}
                type="number"
                name="cout"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Open from:</label>
              <select
                name="openedFrom"
                value={this.state.openedFrom}
                onChange={this.handleChange}
              >
                <option value="all">--</option>
                {this.prepareArr("openhour").map(hour => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Open till:</label>
              <select
                name="openedTill"
                value={this.state.openedTill}
                onChange={this.handleChange}
              >
                <option value="all">--</option>

                {this.prepareArr("closehour").map(hour => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="AdvancedSearch-form-buttons-wrap">
              <button onClick={this.fittingPubs}>Submit</button>
              <button onClick={this.handleResetFilters}>Reset Filters</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAdvancedSearch(AdvancedSearch);
