import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";

import styles from "./hn-pagination.css";

const html = String.raw;

function Pagination({ element, update }) {
  onAttributeChanged(element, ({ name, current }) => {
    update((currentState = {}) => {
      currentState[name] = name === "type" ? current : +current;
      return currentState;
    });
  });

  return ({
    page = 1,
    maxPages = +element.getAttribute("max-pages"),
    type = element.getAttribute("type")
  } = {}) => html`
    <p class="${styles.pagination}">
      <a
        href="/${type}/${page - 1}"
        class="${styles.navigate}"
        disabled="${page <= 1}"
      >
        &lt; prev
      </a>

      <span class="${styles.pages}"> ${page}/${maxPages} </span>

      <a
        href="/${type}/${page + 1}"
        class="${styles.navigate}"
        disabled="${page >= maxPages}"
      >
        next &gt;
      </a>
    </p>
  `;
}

define("hn-pagination", Pagination, {
  observedAttributes: ["page", "max-pages", "type"]
});
