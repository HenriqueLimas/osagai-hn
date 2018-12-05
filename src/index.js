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

function App({ query, update }) {
  requestAnimationFrame(() => {
    import(/* webpackChunkName: "list" */ "./list/hn-list.js");
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

  return ({ route = "/top" } = {}) => `<div>
      <hn-header></hn-header>
      <hn-router></hn-router>
      ${
        route === "/top" || route === "/"
          ? `<hn-list type="news"></hn-list>`
          : ""
      }
      ${route === "/new" ? `<hn-list type="newest"></hn-list>` : ""}
      ${route === "/show" ? `<hn-list type="show"></hn-list>` : ""}
      ${route === "/ask" ? `<hn-list type="ask"></hn-list>` : ""}
      ${route === "/jobs" ? `<hn-list type="jobs"></hn-list>` : ""}
      </div>
    </div>`;
}

define("hn-app", App);

const elm = document.createElement("hn-app");
document.body.appendChild(elm);
