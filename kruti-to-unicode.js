/* ===============================
   KrutiDev → Unicode Converter
   Source-compatible logic
   =============================== */

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const kruti_array = [ /* --- SAME ARRAY YOU SHARED --- */ 
"Ã±","Q+Z","sas","aa",")Z","ZZ","â€˜","â€™","â€œ","â€","Ã¥","Æ’","â€ž","â€¦","â€ ","â€¡","Ë†","â€°","Å ","â€¹",
"Â¶+","d+","[+k","[+","x+","T+","t+","M+","<+","Q+",";+","j+","u+",
"Ã™k","Ã™","Ã¤","â€“","â€”","Ã©","â„¢","=kk","f=k","Ã ",
"Ã¡","Ã¢","Ã£","Âºz","Âº","Ã­","{k","{","=","Â«",
"NÃ®","VÃ®","BÃ®","MÃ®","<Ã®","|","K","}","J",
"VÂª","MÂª","<ÂªÂª","NÂª","Ã˜","Ã","nzZ","Ã¦","Ã§","Ã",
"xz","#",":","vâ€š","vks","vkS","vk","v","bÂ±","Ãƒ","bZ","b","m","Ã…",
",s",",","_","Ã´","d","Dk","D","[k","[","x","Xk","X","Ã„","?k","?",
"Â³","pkS","p","Pk","P","N","t","Tk","T",">","Ã·","Â¥",
"Ãª","Ã«","V","B","Ã¬","Ã¯","M+","<+","M","<",".k",".","r","Rk","R",
"Fk","F",")","n","/k","Ã¨k","/","Ã‹","Ã¨","u","Uk","U",
"i","Ik","I","Q","Â¶","c","Ck","C","Hk","H","e","Ek","E",";",
"Â¸","j","y","Yk","Y","G","o","Ok","O","'k","'","\"k","\"",
"l","Lk","L","g","Ãˆ","z","ÃŒ","Ã","ÃŽ","Ã","Ã‘","Ã’","Ã“","Ã”","Ã–","Ã˜","Ã™",
"Ãœk","Ãœ","â€š","ks","kS","k","h","q","w","`","s","S","a","Â¡","%","W",
"â€¢","Â·","âˆ™","Â·","~j","~","\\","+","à¤ƒ","^","*","Ãž","ÃŸ",
"(","Â¼","Â½","Â¿","Ã€","Â¾","A","-","&","&","Å’","]","~ ","@"
];

const unicode_array = [ /* --- SAME UNICODE ARRAY --- */ 
"र्","QZ+","sa","a","र्द्ध","Z","“","”","‘","’","०","१","२","३","६","७","८","९","॰","॥",
"फ़्","क़","ख़","ख़्","ग़","ज़्","ड़","ढ़","फ़","य़","ऱ","ऩ",
"त्त","त्त्","क्त","दृ","कृ","न्न","न्न्","=k","f=",
"ह्न","ह्य","हृ","ह्म","ह्र","ह्","द्द","क्ष","क्ष्","त्र","त्र्",
"छ्य","ट्य","ठ्य","ड्य","ढ्य","द्य","ज्ञ","द्व","श्र","ट्र","ड्र","ढ्र","छ्र","क्र","फ्र",
"र्द्र","द्र","प्र","प्र","ग्र","रु","रू","ओ","औ","आ","अ","ईं","ई","ई","इ","उ","ऊ","ऐ","ए","ऋ",
"क्क","क","क","क्","ख","ख्","ग","ग","ग्","घ","घ","घ्","ङ","चै","च","च","च्","छ","ज","ज","ज्",
"झ","झ्","ञ","ट्ट","ठ","ट","ठ","ड्ड","ड्ढ","ड़","ढ़","ड","ढ","ण","ण्","त","त","त्","थ","थ्","द्ध",
"द","ध","ध","ध्","ध्","ध्","न","न","न्","प","प","प्","फ","फ्","ब","ब","ब्","भ","भ्","म","म","म्",
"य","य्","र","ल","ल","ल्","ळ","व","व","व्","श","श्","ष","ष्","स","स","स्","ह","ीं","्र","द्द",
"ट्ट","ठ","ड्ड","कृ","भ","्य","ड्ढ","झ्","क्र","त्त्","श","श्",
"ॉ","ो","ौ","ा","ी","ु","ू","ृ","े","ै","ं","ँ","ः","ॅ","ऽ","ऽ","ऽ","ऽ","्र","्","?","़",":",
"‘","’","“","”",";","(",")","{","}","=","।",".","-","µ","॰",",","् "
];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function krutiunicode() {

  let text = document.getElementById("krutitext").value;
  if(!text.trim()){
    alert("KrutiDev text empty hai");
    return;
  }

  // STEP 1: Symbol replacement
  for (let i = 0; i < kruti_array.length; i++) {
    let from = escapeRegExp(kruti_array[i]);
    let to = unicode_array[i];
    let regex = new RegExp(from, "g");
    text = text.replace(regex, to);
  }

  // STEP 2: chhoti 'i' (f)
  let pos = text.indexOf("f");
  while (pos !== -1) {
    let nextChar = text.charAt(pos + 1);
    text = text.replace("f" + nextChar, nextChar + "ि");
    pos = text.indexOf("f", pos + 1);
  }

  // STEP 3: reph (Z)
  let matras = "ािीुूृेैोौंँः";
  let rpos = text.indexOf("Z");

  while (rpos > 0) {
    let p = rpos - 1;
    while (matras.indexOf(text.charAt(p)) !== -1) {
      p--;
    }
    let cluster = text.substring(p, rpos);
    text = text.replace(cluster + "Z", "र्" + cluster);
    rpos = text.indexOf("Z");
  }

  // FINAL OUTPUT
  document.getElementById("unicodetext").value = text;
}

function copyclipboard(){
  let t = document.getElementById("unicodetext");
  t.select();
  document.execCommand("copy");
  alert("Unicode copied");
}

function cleartext(){
  document.getElementById("krutitext").value="";
  document.getElementById("unicodetext").value="";
}

