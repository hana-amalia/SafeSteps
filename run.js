// Extracts the engine from index.html and runs scenario tests. No dependencies.
const fs = require("fs"), path = require("path");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const js = html.match(/<script>([\s\S]*?)\/\/ ---------- UI/)[1];
const engine = new Function(js + "; return {FACTS, infer, setFacts:(f,o)=>{facts=f;order=o}, get facts(){return facts}, get order(){return order}};")();

function run(name, answers, expect) {
  const facts = {}, order = [];
  engine.setFacts(facts, order);
  let res = engine.infer();
  for (const a of answers) {
    if (!res.ask) break;
    facts[res.ask] = a === "unsure" ? { v: engine.FACTS[res.ask].def, assumed: true } : { v: a === "yes", assumed: false };
    order.push(res.ask);
    res = engine.infer();
  }
  const got = res.fired ? res.fired.id : res.ask ? "ASK:" + res.ask : "NONE";
  const ok = got === expect;
  console.log((ok ? "PASS" : "FAIL") + " | " + name + " -> " + got);
  return ok;
}
const T = [
 ["Bus stop collapse", ["no","no"], "R1"],
 ["Unresponsive, breathing, no spine risk", ["no","yes","no"], "R2a"],
 ["Unresponsive, breathing, possible spine injury", ["no","yes","yes"], "R2b"],
 ["Choking, cannot cough", ["yes","yes","no"], "R3"],
 ["Choking signs but coughing (no rule)", ["yes","yes","yes","no","no"], "NONE"],
 ["Bleeding controlled by pressure", ["yes","no","yes","yes"], "R4"],
 ["Bleeding not controlled", ["yes","no","yes","no"], "R5"],
 ["Severe burn", ["yes","no","no","yes","yes"], "R6"],
 ["Minor burn", ["yes","no","no","yes","no"], "R7"],
 ["Unsure: gasping", ["no","unsure"], "R1"],
 ["Unsure: responsive and breathing", ["unsure","unsure"], "R1"],
 ["Unsure: burn size", ["yes","no","no","yes","unsure"], "R6"],
 ["Unsure: spinal injury", ["no","yes","unsure"], "R2b"],
];
const failed = T.filter(t => !run(...t)).length;
console.log(failed ? failed + " failed" : "All " + T.length + " passed");
process.exit(failed ? 1 : 0);
