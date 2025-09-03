import { createVNode, render } from "vue";
import type { MessageProps } from "./message";
import MessageVue from "./message.vue";

export function message(props:MessageProps | string) {
  let messagesP = document.getElementById("my-messages");
  if (!messagesP) {
    messagesP = document.createElement("div");
    messagesP.id = "my-messages";
    document.body.appendChild(messagesP);
  }
  const container = document.createElement('div')
  const vNode = createVNode(MessageVue,typeof props === 'string'? {content:props} : props)
  render(vNode,container)
  messagesP.appendChild(container.firstChild!)
}