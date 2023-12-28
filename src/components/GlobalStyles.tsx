import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    position: relative;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

// export const Reset = () => <Global styles={reset} />;

const Global = createGlobalStyle`
  html,
  body {
    background: #f8fafc;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    text-rendering: optimizeLegibility;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:hover,
  a:visited {
    color: initial;
  }

  img {
    display: inline-block;
  }

  video {
    max-width: 100%;
  }

  .content {
    > * {
      background: white;
    }
  }

  strong,
  b {
    font-weight: bold;
  }

  input[type='text'] {
    touch-action: manipulation;
  }

  p {
    margin-bottom: 16px !important;
  }

  body, html {
    overflow-x: hidden;
  }
`;

export const GlobalStyles = () => (
  <>
    <Reset />
    <Global />
  </>
);

export default GlobalStyles;
