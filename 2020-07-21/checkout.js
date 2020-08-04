const http = require("http");

const itemAPrice = 50;

module.exports = {
  itemAPrice,
  DEFAULT_PORT: 7070,
  startServer: (port = DEFAULT_PORT) => {
    let total = 0;

    const server = http.createServer((req, res) => {
      if (req.method == "POST") {
        total = total + itemAPrice;
      }
      res.statusCode = req.method === "GET" ? 200 : 204;

      res.end(total.toString());
    });

    server.listen(port);
    return server;
  },
};
