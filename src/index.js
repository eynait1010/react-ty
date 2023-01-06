import React from "./react";
import ReactDOM from "./react-dom";

let element = (
  <div className="title" style={{ color: "red" }}>
    <span>hello</span>world
  </div>
);

function FunctionComponent(props) {
  return (
    <div className="title" style={{ color: "red" }}>
      <span>{props.name}</span>
      {props.children}
    </div>
  );
}
class ClassComponent extends React.Component {
  render() {
    return (
      <div className="title" style={{ color: "red" }}>
        <span>{this.props.name}</span>
        {this.props.children}
      </div>
    );
  }
}

let element2 = <FunctionComponent name="hello">world--2</FunctionComponent>;
let element3 = <ClassComponent name="hello">world--3</ClassComponent>;

ReactDOM.render(element3, document.getElementById("root"));
