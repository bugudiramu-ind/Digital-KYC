import React, { Component } from "react";
import FMRow from "./FMRow/FMRow";
import { Row, Col, Container } from "react-bootstrap";
import './FMGrid.css'
class FMGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      face_match: null,
    };
  }

  componentDidMount() {
    this.setState({ face_match: this.props.Mainchange.result.face_match });
  }

  render() {
    return (
      <div>
          <div className=" top_head pl-5">
            {this.state.face_match
              ? Object.entries(this.state.face_match.keys).map((val, index) => {
                  return (
                    <div>
                      {val[1]}
                    </div>
                  );
                })
              : null}
          </div>

        <div className="left_side_data">
          {this.state.face_match
            ? this.state.face_match.keys.map((key, index) => (
                <React.Fragment>
                {console.log(key,index,this.state.face_match.values[index])}
                  <FMRow header={key} row={this.state.face_match.values[index]} />
                </React.Fragment>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default FMGrid;
