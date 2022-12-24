import React, { Component } from "react";
import { LoaderContainer } from "../utils/styledComponents";

class Loader extends Component {
  render() {
    return (
      <LoaderContainer>
        <div className="first"></div>
        <div className="second"></div>
        <div className="last"></div>
      </LoaderContainer>
    );
  }
}

export default Loader;
