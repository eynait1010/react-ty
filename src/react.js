import { REACT_ELEMENT } from "./constants";
import { wrapToVdom } from "./utils";
function createElement(type, config, children) {
  let ref;
  let key;
  if (config) {
    delete config._self;
    delete config._source;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  let props = { ...config };
  //NOTE: children可能是数组或者对象

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }
  return {
    $$typeof: REACT_ELEMENT,
    key,
    props,
    ref,
    type,
  };
}

const React = { createElement };
export default React;
