const sequencer = (jobs) => {
  switch (jobs) {
    case "a =>":
      return ["a"];
      break;

    case "b =>":
      return ["b"];
      break;

    default:
      return [];
  }
};

describe("Ordered jobs", () => {
  test("Empty string returns empty sequence", () => {
    expect(sequencer("")).toEqual([]);
  });
  test("Single job string returns single job sequence", () => {
    expect(sequencer("a =>")).toHaveLength(1);
  });
  test("A single job string returns a sequence only containing that job", () => {
    expect(sequencer("a =>")).toEqual(["a"]);
    expect(sequencer("b =>")).toEqual(["b"]);
  });
});
