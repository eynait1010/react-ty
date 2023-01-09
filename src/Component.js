import { compareTwoVdom, findDOM } from "./react-dom";

export const updateQueue = {
  isBatchingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    for (let update of updateQueue.updaters) {
      update.updateComponent();
    }
    updateQueue.updaters.clear();
    updateQueue.isBatchingUpdate = false;
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.emitUpdate();
  }
  emitUpdate() {
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }
  updateComponent() {
    const { classInstance, pendingStates } = this;
    if (pendingStates.length) {
      shouldUpdate(classInstance, this.getState());
    }
  }
  getState() {
    const { classInstance, pendingStates } = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      if (typeof pendingState === "function") {
        nextState = nextState(state);
      }
      state = { ...state, ...nextState };
    });
    pendingStates.length = 0;
    return state;
  }
}

function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;

  classInstance.forceUpdate();
}

export class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState) {
    this.updater.addState(partialState);
  }
  forceUpdate() {
    let oldRenderVDom = this.oldRenderVDom;
    let oldDOM = findDOM(oldRenderVDom);
    let newRenderVdom = this.render();
    compareTwoVdom(oldDOM.parentNode, oldRenderVDom, newRenderVdom);
    this.oldRenderVDom = newRenderVdom;
  }
}
