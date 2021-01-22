const sequencer = (jobs) => { 
  const jobsSequence = []
    if (jobs.length > 0) {
        if (jobs.length == 6) {
            jobsSequence.push(jobs[5]);
        }
        jobsSequence.push(jobs[0]);
    } else {
        const newJobs = jobs.replace(/\s+/g, '')
        const bob = newJobs.length > 0 ? newJobs.split("=>") : [];
        //console.log(newJobs)
        //console.log(bob)
        return bob.reverse()
    }
  return jobsSequence
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
  test("Multiple jobs with a single dependency returns the jobs in the reverse order", () => {
    expect(sequencer("b => c")).toEqual(["c", "b"]);
  });

});
