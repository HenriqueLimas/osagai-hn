import { define } from "osagai";
import "./header/hn-header.js";

import "./styles.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const html = String.raw;

function App({ query, update }) {
  requestAnimationFrame(() => {
    import(/* webpackChunkName: "list" */ "./list/hn-list.js");
    import(/* webpackChunkName: "pagination" */ "./pagination/hn-pagination.js");
    import(/* webpackChunkName: "router" */ "./router/hn-router.js").then(
      () => {
        query("hn-router").then(router => {
          router.addListener(route => {
            update((state = {}) => {
              state.route = route;
              return state;
            });
          });
        });
      }
    );
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

    return html`<div>
      <hn-header></hn-header>
      <hn-router></hn-router>
      ${
        matchPage(route, "/top") || route === "/"
          ? html`
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
          ? html`
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
          ? html`
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
          ? html`
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
          ? html`
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
