/* =========================================================
   ASCII KrutiDev 010 → Unicode (Devanagari)
   Production-grade converter
   ========================================================= */

function convertKruti() {

  let text = document.getElementById("krutitext").value;

  if (!text.trim()) {
    alert("KrutiDev text empty hai");
    return;
  }

  // STEP 1: SYMBOL & LETTER MAPPING
   krutiMap.sort((a,b) => b[0].length - a[0].length);

  for (let i = 0; i < krutiMap.length; i++) {
    text = text.split(krutiMap[i][0]).join(krutiMap[i][1]);
  }
   // remove duplicate aa-matra
   text = text.replace(/ाा/g,"ा");

  // STEP 2: chhoti 'i' (ि) re-ordering
  let pos = text.indexOf("f");
  while (pos !== -1) {
    let next = text.charAt(pos + 1);
    text = text.replace("f" + next, next + "ि");
    pos = text.indexOf("f", pos + 1);
  }

  // STEP 3: reph handling (Z = र्)
  let matras = "ािीुूृेैोौंँः";
  let rpos = text.indexOf("Z");

  while (rpos !== -1) {
    let p = rpos - 1;
    while (p >= 0 && matras.indexOf(text.charAt(p)) !== -1) {
      p--;
    }
    let cluster = text.substring(p + 1, rpos);
    text = text.replace(cluster + "Z", "र्" + cluster);
    rpos = text.indexOf("Z");
  }

  // STEP 4: halant + matra correction
  text = text.replace(/ि्/g, "्ि");

  // STEP 5: punctuation cleanup
  text = text.replace(/ +/g, " ");

  document.getElementById("unicodetext").value = text;
}

/* =========================
   CORE ASCII MAPPING TABLE
   ========================= */

const krutiMap = [

/* === HIGH PRIORITY FIXES === */
["mÙkj%&","उत्तर:"],
["çfl)","प्रसिद्ध"],
["çf","प्रि"],
["ç","प्र"],
["H","म"],
["Ù","त"],
["ï","ि"],
["&",""],

/* vowels */
["vks","ओ"],["vkS","औ"],["vk","आ"],["v","अ"],
["bZ","ई"],["b","इ"],["m","उ"],["Å","ऊ"],
[",s","ऐ"],[",","ए"],["_","ऋ"],

/* matras */
["ks","ो"],["kS","ौ"],["k","ा"],["h","ी"],
["q","ु"],["w","ू"],["`","ृ"],["s","े"],
["S","ै"],["a","ं"],["¡","ँ"],["%","ः"],

/* consonants */
["d","क"],["D","ख"],["x","ग"],["X","घ"],["Ä","ङ"],
["p","च"],["P","छ"],["t","ज"],["T","झ"],["N","ञ"],
["V","ट"],["B","ठ"],["M","ड"],["<","ढ"],[".","ण"],
["r","त"],["R","थ"],["n","द"],["/","ध"],["u","न"],
["i","प"],["I","फ"],["Q","ब"],["c","भ"],["e","म"],
[";","य"],["j","र"],["y","ल"],["G","व"],
["'k","श"],["\"k","ष"],["l","स"],["g","ह"],

/* halant */
["~","्"],

/* conjuncts */
["क्ष","क्ष"],["त्र","त्र"],["ज्ञ","ज्ञ"],["श्र","श्र"],

/* punctuation */
["¼","("],["½",")"],["-","."],["?","?"],["!","!"],[".","।"],

];

/* =========================
   UTILS
   ========================= */

function copyclipboard() {
  let t = document.getElementById("unicodetext");
  t.select();
  document.execCommand("copy");
}

function cleartext() {
  document.getElementById("krutitext").value = "";
  document.getElementById("unicodetext").value = "";
}




