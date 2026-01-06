/* ==========================================
   KrutiDev 010 (ASCII) → Unicode Converter
   Stable MCQ-ready version
   Copyright © CETRanker
   ========================================== */

function convertKruti() {
  let text = document.getElementById("krutitext").value;
  if (!text.trim()) return;

  // ---------- STEP 1: WORD LEVEL FIXES (HIGHEST PRIORITY) ----------
  for (let [k,u] of wordMap) {
    text = text.split(k).join(u);
  }

  // ---------- STEP 2: CHARACTER LEVEL MAPPING ----------
  charMap.sort((a,b)=>b[0].length-a[0].length);
  for (let [k,u] of charMap) {
    text = text.split(k).join(u);
  }

  // ---------- STEP 3: FIX chhoti i (f → ि) ----------
  text = text.replace(/f(.)/g,"$1ि");

  // ---------- STEP 4: FIX reph (Z → र्) ----------
  let matras = "ािीुूृेैोौंँः";
  while (text.includes("Z")) {
    let i = text.indexOf("Z");
    let p = i - 1;
    while (p > 0 && matras.includes(text[p])) p--;
    let c = text.slice(p+1,i);
    text = text.replace(c+"Z","र्"+c);
  }

  // ---------- STEP 5: CLEANUPS ----------
  text = text.replace(/ाा/g,"ा");            // double aa
  text = text.replace(/(\d)-/g,"$1.");       // 1- → 1.
  text = text.replace(/ +/g," ");             // extra spaces

  document.getElementById("unicodetext").value = text;
}

function cleartext(){
  document.getElementById("krutitext").value="";
  document.getElementById("unicodetext").value="";
}

function copyclipboard(){
  let t=document.getElementById("unicodetext");
  t.select();
  document.execCommand("copy");
}

/* ===============================
   WORD LEVEL OVERRIDES (SAFE)
   =============================== */

const wordMap = [
  ["mÙkj%&","उत्तर:"],
  ["çfl)","प्रसिद्ध"],
  ["fl)","सिद्ध"],
  ["çkjEHk","प्रारंभ"],
  ["dkSu","कौन"],
  ["ds fy,","के लिए"],
  ["ftyk","जिला"],
  ["gS","है"],
  ["gfj;k.kk","हरियाणा"],
  ["jkT;","राज्य"],
  ["esa","में"],
  ["Sj","और"],
  ["dc","कब"],
  ["mRlo","उत्सव"],
  ["fd;k","किया"],
  ["x;k","गया"]
];

/* ===============================
   CHARACTER LEVEL MAP
   =============================== */

const charMap = [

  // vowels
  ["vks","ओ"],["vkS","औ"],["vk","आ"],["v","अ"],
  ["bZ","ई"],["b","इ"],["m","उ"],["Å","ऊ"],
  [",s","ऐ"],[",","ए"],["_","ऋ"],

  // matras
  ["ks","ो"],["kS","ौ"],["k","ा"],["h","ी"],
  ["q","ु"],["w","ू"],["`","ृ"],["s","े"],
  ["S","ै"],["a","ं"],["¡","ँ"],["%","ः"],

  // consonants
  ["d","क"],["D","ख"],["x","ग"],["X","घ"],
  ["p","च"],["P","छ"],["t","ज"],["T","झ"],
  ["V","ट"],["B","ठ"],["M","ड"],["<","ढ"],[".","ण"],
  ["r","त"],["R","थ"],["n","द"],["/","ध"],["u","न"],
  ["i","प"],["I","फ"],["Q","ब"],["c","भ"],["e","म"],
  [";","य"],["j","र"],["y","ल"],["G","व"],
  ["'k","श"],["\"k","ष"],["l","स"],["g","ह"],

  // halant
  ["~","्"],

  // punctuation
  ["¼","("],["½",")"]
];
