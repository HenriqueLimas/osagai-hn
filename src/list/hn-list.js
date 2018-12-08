import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";
import { getList } from "./api";
import styles from "./hn-list.css";
import "./hn-list-item.js";

function List({ element, update }) {
  onAttributeChanged(element, ({ name, current }) => {
    const query = {
      type: element.getAttribute("type"),
      page: element.getAttribute("page")
    };

    query[name] = current;
    getList(query).then(data => {
      update((state = {}) => {
        state.page = +query.page;
        state.items = data;
        return state;
      });
    });
  });

  return ({ items = [], page } = {}) => `
    <div>
      <ol class="${styles.list}">
        ${items
          .map(
            (item, index) =>
              `
                  <li>
                    <hn-list-item
                      item-id="${item.id}"
                      index="${index + 1 + (page - 1) * 30}"
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
          .join("")}
      </ol>
    </div>
  `;
}

define("hn-list", List, { observedAttributes: ["type", "page"] });
