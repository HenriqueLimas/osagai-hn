import { define } from "osagai";

function Router({ element }) {
  element._listeners = [];

  element.addListener = listener => {
    element._listeners.push(listener);
  };

  const handleUrlChange = () => {
    element.location = window.location.href;
    element._listeners.forEach(fn => fn(location.pathname));
  };

  const handleClick = e => {
    // Left click and No modifiers
    if (e.button !== 0 || (e.metaKey || e.ctrlKey)) {
      return;
    }

    let origin;

    if (window.location.origin) {
      origin = window.location.origin;
    } else {
      origin = window.location.protocol + "//" + window.location.host;
    }

    let anchor = e.composedPath().filter(n => n.localName === "a")[0];
    if (anchor && anchor.href.indexOf(origin) === 0) {
      e.preventDefault();
      window.history.pushState({}, "", anchor.href);
      handleUrlChange();
    }
  };

  document.body.addEventListener("click", handleClick);
  window.addEventListener("popstate", handleUrlChange);

  handleUrlChange();
}

define("hn-router", Router);
