import React from "react";
import ReactDOM from "react-dom";

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

let element2 = <FunctionComponent name="hello">world--2</FunctionComponent>;
console.log(element, element2, JSON.stringify(element, null, 2));

ReactDOM.render(element2, document.getElementById("root"));
