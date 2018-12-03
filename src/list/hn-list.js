import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";
import { getList } from "./api";

function List({ element, update }) {
  onAttributeChanged(element, ({ current }) => {
    getList({ type: current }).then(data => {
      update((state = {}) => {
        state.items = data;
        return state;
      });
    });
  });

  return ({ items = [] } = {}) => `<div>
    <ol>
      ${items.map(item => `<li>${item.title}</li>`).join("")}
    </ol>
  </div>`;
}

define("hn-list", List, { observedAttributes: ["type"] });
