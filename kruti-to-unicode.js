function krutiunicode() {

  let fullText = document.getElementById("krutitext").value;
  let text_size = fullText.length;
  let processed_text = "";

  let max_text_size = 6000;
  let n = 0, o = 0, r = 1;

  while (r === 1) {

    n = o;

    if (o < (text_size - max_text_size)) {
      o += max_text_size;
      while (fullText.charAt(o) !== " ") { o--; }
    } else {
      o = text_size;
      r = 0;
    }

    let kruti_text = fullText.substring(n, o);

    kruti_text = replaceSymbols(kruti_text);
    processed_text += kruti_text;
  }

  document.getElementById("unicodetext").value = processed_text;
}

/* ================= CORE ENGINE ================= */

function replaceSymbols(kruti_text) {

  for (let i = 0; i < kruti_array.length; i++) {
    let from = escapeRegExp(kruti_array[i]);
    let to = unicode_array[i];
    kruti_text = kruti_text.replace(new RegExp(from, "g"), to);
  }

  // ± handling
  kruti_text = kruti_text.replace(/±/g, "Zं");

  // chhoti i (f)
  let pos = kruti_text.indexOf("f");
  while (pos !== -1) {
    let ch = kruti_text.charAt(pos + 1);
    kruti_text = kruti_text.replace("f" + ch, ch + "ि");
    pos = kruti_text.indexOf("f", pos + 1);
  }

  // fa =िं
  pos = kruti_text.indexOf("fa");
  while (pos !== -1) {
    let ch = kruti_text.charAt(pos + 2);
    kruti_text = kruti_text.replace("fa" + ch, ch + "िं");
    pos = kruti_text.indexOf("fa", pos + 2);
  }

  // reorder: ि + halant
  let idx = kruti_text.indexOf("ि्");
  while (idx !== -1) {
    let ch = kruti_text.charAt(idx + 2);
    kruti_text = kruti_text.replace("ि्" + ch, "्" + ch + "ि");
    idx = kruti_text.indexOf("ि्", idx + 2);
  }

  // reph (Z)
  let matras = "ािीुूृेैोौंँः";
  let rpos = kruti_text.indexOf("Z");

  while (rpos > 0) {
    let p = rpos - 1;
    while (matras.indexOf(kruti_text.charAt(p)) !== -1) {
      p--;
    }
    let cluster = kruti_text.substring(p, rpos);
    kruti_text = kruti_text.replace(cluster + "Z", "र्" + cluster);
    rpos = kruti_text.indexOf("Z");
  }

  return kruti_text;
}

/* ================= HELPERS ================= */

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function copyclipboard() {
  let t = document.getElementById("unicodetext");
  t.select();
  document.execCommand("copy");
}

function cleartext() {
  document.getElementById("krutitext").value = "";
  document.getElementById("unicodetext").value = "";
}
