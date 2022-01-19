import React from "react";
import TableCheckService from "../QR-code/TableCheckAPIService";

export default class TableNr extends React.Component {
  state = {
    tablenr: "loading...",
  };

  componentDidMount() {
    TableCheckService.GetTableNr()
      .then((data) => {
        localStorage.setItem("TableNr", data);
        console.log(this.state.data);
        this.setState({ tablenr: data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  render() {
    return <div>{this.state.tablenr}</div>;
  }
}
