const myWorker = new Worker("worker.js"),
	output = document.getElementById("output");
let mouseData = "",
  logging = false;

document.addEventListener("mousemove", e => {
  const s = (e.clientX+e.clientY).toString(16);
  if(mouseData.length >= 100000) mouseData = mouseData.substring(s.length);
  mouseData += s;
});

myWorker.onmessage = e => {
	const data = e.data;
	if(data.error) console.error(e.data.error);
	if(Array.isArray(data))output.innerText = JSON.stringify(data);
  else output.innerText = data;
}

const getData = () => {
  return {
    logging,
    num: document.getElementsByName("num")[0].checked,
    alpha: document.getElementsByName("alpha")[0].checked,
    char: document.getElementsByName("char")[0].checked,
    len: document.getElementsByName("len")[0].value,
    suppliedSeed: document.getElementsByName("seed")[0].value,
    amt: document.getElementsByName("amt")[0].value,
    randOrg: document.getElementsByName("randOrg")[0].checked,
    mouseData
  };
};

console.log("AlastairOS Browser Edition v.1.7.8 Ready.");
console.log("Worker Loaded.");
console.log("Mouse Logging Enabled.");

const logMode = () => {
  if(logging) {
    logging = false;
    return "Logging is now off.";
  } else {
    logging = true;
    return "Logging is now on.";
  }
};
