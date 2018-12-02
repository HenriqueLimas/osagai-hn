import { define } from "osagai";
import "./header/hn-header.js";
import "./router/hn-router.js";

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
  query("hn-router").then(router => {
    router.addListener(route => {
      update((state = {}) => {
        state.route = route;
        return state;
      });
    });
  });

  return ({ route = "/top" } = {}) => `<div>
      <hn-header></hn-header>
      <hn-router></hn-router>
      ${route === "/top" || route === "/" ? "top" : ""}
      ${route === "/new" ? "new" : ""}
      ${route === "/show" ? "show" : ""}
      ${route === "/ask" ? "ask" : ""}
      ${route === "/jobs" ? "jobs" : ""}
      ${route === "/about" ? "about" : ""}
      </div>
    </div>`;
}

define("hn-app", App);

const elm = document.createElement("hn-app");
document.body.appendChild(elm);
