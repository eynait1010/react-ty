import { REACT_TEXT } from "./constants";

function mount(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
}
function render(vdom, container) {
  mount(vdom, container);
}
/**
 *
 * @param {*} vdom 虚拟dom
 * @returns 真实dom
 */
function createDom(vdom) {
  const { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);
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

function mountFunctionComponent(vdom) {
  const { type, props } = vdom;
  const renderVdom = type(props);
  vdom.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}

function mountClassComponent(vdom) {
  const { type, props } = vdom;
  const classInstance = new type(props);
  const renderVdom = classInstance.render();
  classInstance.oldRenderVDom = renderVdom;
  return createDom(renderVdom);
}
/**
 * 把虚拟dom的属性挂在dom上
 * @param {*} dom
 * @param {*} oldProps
 * @param {*} newProps
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    } else if (key === "style") {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (/^on[A-Z]*/.test(key)) {
      dom[key.toLowerCase()] = newProps[key];
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

export function findDOM(vDom) {
  if (vDom.dom) {
    return vDom.dom;
  }
  return findDOM(vDom.oldRenderVDom);
}

/**
 * 替换了真实dom
 * @param {*} parentDOM
 * @param {*} oldVDOM
 * @param {*} newVDOM
 */
export function compareTwoVdom(parentDOM, oldVDOM, newVDOM) {
  const oldDom = findDOM(oldVDOM);
  const newDOM = createDom(newVDOM);
  parentDOM.removeChild(oldDom);
  parentDOM.appendChild(newDOM);
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
