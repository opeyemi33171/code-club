const { scan } = require("./checkout");
const assert = require("assert");
const fetch = require("node-fetch");
const http = require("http");

describe("Checkout kata", () => {
  xit("adds the value of the scaned item", () => {
    const total = scan();
    assert(total).expect("2.89");
  });
  const port = 7070;
  http.createServer((req, res) => {
    // res = scan()
    res.end()
  }).listen(port);

  it("returns ok response when item scanned", async () => {
    

    const response = await fetch(`http://localhost:${port}/scan/item1`);

    assert.equal(response.status,200);
  });
  
});
