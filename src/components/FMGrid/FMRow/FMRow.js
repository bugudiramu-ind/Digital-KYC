import React from "react";
import { Row, Col, Container } from "react-bootstrap";

class FMRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div >
          <div>{this.props.header}</div>
          <div className="d-flex mb-2 justify-content-around main">
          {this.props.row !== null
            ? this.props.row.map((val, index) => {
             
                return (
                  <div className=" image_data">
                    {val ? (
                      <img
                        
                        src={require("./success.svg")}
                        alt="success"
                      ></img>
                    ) : (
                      <img
                        
                        src={require("./error.svg")}
                        alt="error"
                      ></img>
                    )}
                  </div>
                );
              })
            : ""}
            </div>
        </div>
    );
  }
}

export default FMRow;
