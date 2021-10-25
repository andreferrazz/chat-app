import { setBehaviourOfAnchorChildren } from "../../utils/component-utils"

export class Component {
  rootElement: HTMLElement | undefined
  
  setAllAnchorsBehaviour() {
    setBehaviourOfAnchorChildren(this.rootElement!)
  }
}