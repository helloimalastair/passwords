const BetterRand = t => {const n=function(t){for(var n=0,r=1779033703^t.length;n<t.length;n++)r=(r=Math.imul(r^t.charCodeAt(n),3432918353))<<13|r>>>19;return function(){return r=Math.imul(r^r>>>16,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^=r>>>16)>>>0}}((void 0===t?null:t.toString())+crypto.getRandomValues(new Uint8Array(10)).toString()+Date.now());return r=n(),a=n(),e=n(),o=n(),function(){var t=a<<9,n=5*r;return o^=a,a^=e^=r,r^=o,e^=t,o=o<<11|o>>>21,((n=9*(n<<7|n>>>25))>>>0)/4294967296};var r,a,e,o},
	numSet = ["1","2","3","4","5","6","7","8","9","0"],
	alphaSet = 
["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","T","U","V","W","X","Y","Z"],
	charSet = ["`","-","=","[","]","\\",";","'",",",".","/","~","!","@","#","$","%","^","&","*","(",")","_","+","{","}","|",":","\"","<",">","?"];

onmessage = async e => {
  const {logging, len, suppliedSeed, amt, num, alpha, char, randOrg, mouseData} = e.data;
  if(!num && !alpha && !char) return postMessage({error: "Missing CharSet"});
  if(len && (len < 1 || len > 4096)) return postMessage({error: "Invalid Length"});
  if(amt && (amt < 1 || amt > 128)) return postMessage({error: "Invalid Amount"});
	const beginTimer = performance.now(),
    seed = suppliedSeed + (await(await fetch("https://drand.cloudflare.com/public/latest")).json()).signature + (randOrg ? (await (await fetch("https://www.random.org/strings/?num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new")).text()) : "Random.org Placeholder Seed") + (await (await fetch("https://passwords.goalastair.com/hotprox")).text()) + mouseData,
    allSet = [];
  if(num) allSet.push(numSet);
  if(alpha) allSet.push(alphaSet);
  if(char) allSet.push(charSet);
  if(!amt || amt == 1) {
    const password = await genPass(seed, len, allSet);
    if(logging) console.log(`Generation took ${performance.now() - beginTimer} ms., utilizing ${encodeURI(seed).split(/%..|./).length - 1} bytes of entropy, which has been gathered from mouse movements, any seed you may have provided manually, https://drand.love${randOrg ? ", https://www.fourmilab.ch/hotbits/, and https://random.org" : ", and https://www.fourmilab.ch/hotbits/"}. Utilized the ${Object.entries({num, alpha, char}).map(e => e[1] ? e[0] : "").join(", ")} characterset(s), generating 1 password with a length of ${len || 128}.`);
    return postMessage(password);
  }
  let passwords = [];
	for(let i = 0; i < amt; i++)
		passwords.push(await genPass(seed, len, allSet));
  if(logging) console.log(`Generation took ${performance.now() - beginTimer} ms., utilizing ${encodeURI(seed).split(/%..|./).length - 1} bytes of entropy, which has been gathered from mouse movements, any seed you may have provided manually, https://drand.love${randOrg ? ", https://www.fourmilab.ch/hotbits/, and https://random.org" : ", and https://www.fourmilab.ch/hotbits/"}. Utilized the ${Object.entries({num, alpha, char}).map(e => e[1] ? e[0] : "").join(", ")} characterset(s), generating ${amt} passwords with a length of ${len || 128}.`);
	return postMessage(passwords);
}

const genPass = async (s, len, charSet) => {
  const rand = BetterRand(s);
	let password = "";
  for(let i = 0; i < (len || 128); i++) {
    let set = charSet[inRange(rand, 0, charSet.length-1)];
    password += set[inRange(rand, 0, set.length-1)];
  }
	return password;
}

const inRange = (r, b, e) => Math.round(r() * (b-e) + e);
