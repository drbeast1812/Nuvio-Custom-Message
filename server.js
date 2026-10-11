
const http = require("http");

const manifest = {
  id: "community.custom-message",
  version: "1.0.0",
  name: "Custom Message",
  description: "My custom Nuvio message",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"]
};

http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/manifest.json") {
    return res.end(JSON.stringify(manifest));
  }

  if (/^\/stream\/(movie|series)\/.+\.json$/.test(req.url)) {
    return res.end(JSON.stringify({
      streams: [{
        name: "My Message",
        description: "✨ Thanks for supporting the project!"
      }]
    }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
}).listen(process.env.PORT || 7000, "0.0.0.0");
