const { DEFAULT_PORT, startServer, itemAPrice } = require("./checkout");
const assert = require("assert");
const fetch = require("node-fetch");

describe("Checkout kata", () => {
  let server;

  beforeEach(() => {
    server = startServer(DEFAULT_PORT);
  });

  afterEach(() => {
    server.close();
  });

  it("returns 204 ok response when item scanned", async () => {
    const response = await fetch(`http://localhost:${DEFAULT_PORT}/scan/A`, {
      method: "POST",
    });

    assert.equal(response.status, 204);
  });

  it("returns 200 ok response when total is requested", async () => {
    const response = await fetch(`http://localhost:${DEFAULT_PORT}/total`, {
      method: "GET",
    });

    assert.equal(response.status, 200);
    assert.equal(await response.text(), "0");
  });

  it("returns price of item A after it is scanned", async () => {
    await fetch(`http://localhost:${DEFAULT_PORT}/scan/A`, {
      method: "POST",
    });
    const response = await fetch(`http://localhost:${DEFAULT_PORT}/total`, {
      method: "GET",
    });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), itemAPrice);
  });

  it("returns price of item B after it is scanned", async () => {
    await fetch(`http://localhost:${DEFAULT_PORT}/scan/B`, {
      method: "POST",
    });
    const response = await fetch(`http://localhost:${DEFAULT_PORT}/total`, {
      method: "GET",
    });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "30");
  });
});
