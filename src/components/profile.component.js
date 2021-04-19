import React, { Component } from "react";
import StudentCard from "./StudentCard";
import StudentInform from "./StudentInform";
export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile">
        <StudentCard props={this.props}></StudentCard>
        <div className="container student-profile">
          <StudentInform props={this.props}></StudentInform>
        </div>
        
      </div>
    );
  }
}
