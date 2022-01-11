const myWorker = new Worker("worker.js"),
	output = document.getElementById("output");

myWorker.onmessage = e => {
	const data = e.data;
	if(data.error) console.error(e.data.error);
	if(data.password) output.innerText = data.password;
	if(data.passwords) output.innerText = JSON.stringify(data.passwords);
	console.log(`Operation took ${e.data.performance} ms.`)
}

const getData = () => {
  return {
    num: document.getElementsByName("num")[0].checked,
    alpha: document.getElementsByName("alpha")[0].checked,
    char: document.getElementsByName("char")[0].checked,
    len: document.getElementsByName("len")[0].value,
    seed: document.getElementsByName("seed")[0].value,
    amt: document.getElementsByName("amt")[0].value,
    randOrg: document.getElementsByName("randOrg")[0].checked
  };
};