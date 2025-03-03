const css = `
c-header {
  background-color: #450c36;
  border-bottom: 1px solid #741c6d;
  padding: 10px 20px;
}

c-header h1 {
  font-size: 28px;
  font-weight: bold;
  margin: 0px 0px 4px 0px;
  color: #f76ed3;
  color: #ffffff;
  text-shadow: 1px 1px 8px rgba(200,200,200,0.5);
}

c-header h2 {
  position: absolute;
  top: -999px;
  left: -999px;
}

c-header nav {
  font-size: 12px;
}

c-header nav a {
  color: #f0b206;
  margin-right: 10px;
  text-decoration: none;
}

c-header nav a[aria-current="page"] {
  text-decoration: underline;
}
`;

export default css;