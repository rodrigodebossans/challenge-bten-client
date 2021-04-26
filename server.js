const express = require("express");
const path = require("path");
const nomeApp = process.env.npm_package_name || 'challenge-bten-front';
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
