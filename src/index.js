import react from "react";
import second from "react-dom";

let element = (
  <div className="title" style={{ color: "red" }}>
    <span>hello</span>world
  </div>
);
console.log(element, JSON.stringify(element, null, 2));

ReactDOM.render(element, document.getElementById("root"));
