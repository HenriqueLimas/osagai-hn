import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";
import { getList } from "./api";
import styles from "./hn-list.css";
import "./hn-list-item.js";

const html = String.raw;

function List({ element, update }) {
  onAttributeChanged(element, ({ current }) => {
    getList({ type: current }).then(data => {
      update((state = {}) => {
        state.items = data;
        return state;
      });
    });
  });

  return ({ items = [] } = {}) => html`
    <div>
      <ol class="${styles.list}">
        ${
          items
            .map(
              (item, index) =>
                html`
                  <li>
                    <hn-list-item
                      item-id="${item.id}"
                      index="${index + 1}"
                      url="${item.url}"
                      title="${item.title.replace(/"/g, "&quot;")}"
                      points="${item.points}"
                      user="${item.user}"
                      time="${item.time}"
                      comments-count="${item.comments_count}"
                    ></hn-list-item>
                  </li>
                `
            )
            .join("")
        }
      </ol>
    </div>
  `;
}

define("hn-list", List, { observedAttributes: ["type"] });
