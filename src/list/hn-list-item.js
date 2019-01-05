import { define } from "osagai";
import { onAttributeChanged } from "osagai/lifecycles";
import { update } from "osagai/dom";
import styles from "./hn-list-item.css";

function ListItem({ element }) {
  onAttributeChanged(element, () => {
    update(element);
  });

  return () => {
    const id = element.getAttribute("item-id");
    const index = element.getAttribute("index");
    const url = element.getAttribute("url");
    const title = element.getAttribute("title");
    const points = element.getAttribute("points");
    const user = element.getAttribute("user");
    const time = element.getAttribute("time");
    const commentsCount = element.getAttribute("comments-count");

    return `
      <article class="${styles.article}">
        <span class="${styles.index}">${index}</span>

        <div class="${styles.metadata}">
          <h2 class="${styles.header}">
            <a href="${url}" class="${styles.link}">${title}</a>
          </h2>

          <p>
            ${points ? `${points} points` : null} ${user ? ` by ` : null}
            ${
              user
                ? `
                    <a href="/user/${user}" class="${styles.userLink}">
                      ${user}
                    </a>
                  `
                : null
            }
            ${time}

            <a href="/item/${id}" class="${styles.commentCount}">
              ${
                commentsCount === 0
                  ? "discuss"
                  : `${commentsCount} comment${commentsCount > 1 ? "s" : ""}`
              }
            </a>
          </p>
        </div>
      </article>
    `;
  };
}

define("hn-list-item", ListItem, { observedAttributes: ["item-id"] });
