// ✅ Polyfill for Object.hasOwn for Node <16 (safe)
if (!Object.hasOwn) {
  Object.hasOwn = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Mount routes at root
app.use("/", routes);

// ✅ Redirect root to /gstar (not /api/v1/gstar-form)
//app.get("/", (req, res) => res.redirect("/gstar"));

// ✅ Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`G-Star Coming Soon Form running on port ${PORT}`);
});
