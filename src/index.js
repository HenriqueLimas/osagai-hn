import { define } from "osagai";
import "./header/hn-header.js";
import "./list/hn-list.js";
import "./pagination/hn-pagination.js";
import "./router/hn-router.js";

import "./styles.css";

function App({ query, update }) {
  requestAnimationFrame(() => {
    query("hn-router").then(router => {
      router.addListener(route => {
        update((state = {}) => {
          state.route = route;
          return state;
        });
      });
    });
  });

  const extractPage = route => {
    const matches = route.match(/\/(\d*)$/) || [];
    return matches[1] || "1";
  };
  const matchPage = (route, toMatch) => {
    return route.match(toMatch);
  };

  return ({ route = "/top" } = {}) => {
    const page = extractPage(route);

    return `<div>
      <hn-header></hn-header>
      <hn-router></hn-router>
      ${
        matchPage(route, "/top") || route === "/"
          ? `
              <hn-pagination
                type="top"
                page="${page}"
                max-pages="10"
              ></hn-pagination>
              <hn-list type="news" page="${page}"></hn-list>
            `
          : ""
      }
      ${
        matchPage(route, "/new")
          ? `
              <hn-pagination
                type="new"
                page="${page}"
                max-pages="12"
              ></hn-pagination>
              <hn-list type="newest" page="${page}"></hn-list>
            `
          : ""
      }
      ${
        matchPage(route, "/show")
          ? `
              <hn-pagination
                type="show"
                page="${page}"
                max-pages="2"
              ></hn-pagination>
              <hn-list type="show" page="${page}"></hn-list>
            `
          : ""
      }
      ${
        matchPage(route, "/ask")
          ? `
              <hn-pagination
                type="ask"
                page="${page}"
                max-pages="2"
              ></hn-pagination>
              <hn-list type="ask" page="${page}"></hn-list>
            `
          : ""
      }
      ${
        matchPage(route, "/jobs")
          ? `
              <hn-pagination
                type="jobs"
                page="${page}"
                max-pages="1"
              ></hn-pagination>
              <hn-list type="jobs" page="${page}"></hn-list>
            `
          : ""
      }
      </div>
    </div>`;
  };
}

define("hn-app", App);

const elm = document.createElement("hn-app");
document.body.appendChild(elm);
