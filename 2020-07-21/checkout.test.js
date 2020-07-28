const { scan } = require("./checkout");
const assert = require("assert");
const fetch = require("node-fetch");
const http = require("http");

describe("Checkout kata", () => {
  const port = 7070;
  let server;
  let total;

  beforeEach(() => {
    total = 0;

    server = http.createServer((req, res) => {
      if (req.method == "POST") total++;
      res.statusCode = req.method === "GET" ? 200 : 204;

      res.end(total.toString());
    });
    server.listen(port);
  });

  afterEach(() => {
    server.close();
  });

  it("returns 204 ok response when item scanned", async () => {
    const response = await fetch(`http://localhost:${port}/scan/item1`, {
      method: "POST",
    });

    assert.equal(response.status, 204);
  });

  it("returns 200 ok response when total is requested", async () => {
    const response = await fetch(`http://localhost:${port}/total`, {
      method: "GET",
    });

    assert.equal(response.status, 200);
    assert.equal(await response.text(), "0");
  });

  it("returns non zero total after item is scanned", async () => {
    await fetch(`http://localhost:${port}/scan/item1`, {
      method: "POST",
    });
    const response = await fetch(`http://localhost:${port}/total`, {
      method: "GET",
    });
    assert.equal(response.status, 200);
    assert.notEqual(await response.text(), "0");
  });
});
