/* html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
} */
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
  font-family:sans-serif;
  color:black;
  }
  *, *::after, *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  } 
`;

export default GlobalStyle;
