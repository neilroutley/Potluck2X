import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";

import { Events } from "../api/events.js";
import EventRSVP from "./EventRSVP.jsx";
import RSVPwItems from "./RSVPwItems";

class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  getAllEvents() {
    event.preventDefault();
    Meteor.call("events.get", (err, res) => {
      if (err) {
        alert("There was an error getting");
        console.log(err);
        return;
      }
      this.setState({
        events: res
      });
      console.log(res);
    });
  }

  componentDidMount() {
    this.getAllEvents();
  }

  renderEvents() {
    return this.state.events.map((eve, i) => <EventRSVP key={i++} event={eve} />);

    // return this.props.events.map(m =>
    //   <div className="card" key={m._id}>{m.owner} : {m.event}</div>);
  }

  makeatherender() {
    return this.props.events.map((m, j) =>

      <div>
      <div className="card" key={j++}>{m.owner} : {m.name}</div>
      <RSVPwItems key={j+=3} thelist={m.list}/>
      </div>
      );
  }

  // optionsListGo() {
  //   let options = m.list;
  //   let selectList = document.getElementById(optionsselect);
  //   let count = m.list.length;
  //     for (let i = 0; i < count; i++) {
  //           let option = options[i];
  //           selectList.options.add(new Option(m.list[i].split(" ")[0]));
  //       }
  // }
//

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align" style={{ padding: "100px" }}>
      <p>Look at all these events:</p>

      <div className="row">{this.makeatherender()}</div>


      </div>
      </div>
      </div>

      );
  }
}

BrowseEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default withTracker(() => {
  const handle = Meteor.subscribe("events");
  return {
    events: Events.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(BrowseEvents);