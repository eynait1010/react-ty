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
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  add() {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
    });
  }
  render() {
    return (
      <div className="title" style={{ color: "red" }}>
        <span>{this.props.title}</span>:
        <span onClick={() => this.add()}>{this.state.number}</span>
      </div>
    );
  }
}

let element2 = <FunctionComponent name="hello">world--2</FunctionComponent>;
let element3 = <ClassComponent title="count">world--3</ClassComponent>;

ReactDOM.render(element3, document.getElementById("root"));
