import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";
import { update } from "osagai/dom";
import { getList } from "./api";
import styles from "./hn-list.css";
import "./hn-list-item.js";

function List({ element }) {
  let state = "idle";

  onAttributeChanged(element, () => {
    if (state === "loading") {
      return;
    }

    const query = {
      type: element.getAttribute("type"),
      page: element.getAttribute("page")
    };

    state = "loading";

    getList(query).then(items => {
      state = "idle";
      update(element, (data = {}) => {
        data.page = +query.page;
        data.items = items;
        return data;
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
