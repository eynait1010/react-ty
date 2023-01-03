import { REACT_TEXT } from "./constants";

function mount(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
}
function render(vdom, container) {
  mount(vdom, container);
}
function createDom(vdom) {
  const { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    updateProps(dom, {}, props);
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  vdom.dom = dom;
  return dom;
}
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    } else if (key === "style") {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      dom[key] = newProps[key];
    }
  }
  for (let key in oldProps) {
    //TODO: 为什么要用 hasOwnProperty
    if (!newProps.hasOwnProperty(key)) {
      //TODO: 为啥不是 undefined
      //TODO: 用了同一个dom吗
      dom[key] = null;
    }
  }
}
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    mount(childrenVdom[i], parentDOM);
  }
}

const ReactDOM = {
  render,
};
export default ReactDOM;
