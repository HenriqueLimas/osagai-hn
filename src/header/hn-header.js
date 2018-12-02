import { define } from "osagai";

import styles from "./hn-header.css";
import Logo from "./logo.png";

function Item({ href, text }) {
  return `
    <li class=${styles.item}>
      <a class=${styles.link} href="${href}" aria-label="${text}">${text}</a>
    </li>
  `;
}

function Header() {
  const menus = [
    {
      href: "/top",
      text: "top"
    },
    {
      href: "/new",
      text: "new"
    },
    {
      href: "/show",
      text: "show"
    },
    {
      href: "/ask",
      text: "ask"
    },
    {
      href: "/jobs",
      text: "jobs"
    },
    {
      href: "/about",
      text: "about"
    }
  ];
  return () => `
    <nav class="${styles.header}">
      <ol class="${styles.links}">
        <li class="${styles.logo}">
          <a href="/" aria-label="Home">
            <img src="${Logo}" alt="Osagai Hacker News logo">
          </a>
        </li>

        ${menus.map(Item).join("")}
      </ol>
    </nav>
  `;
}

export default define("hn-header", Header);
