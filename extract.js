const fs = require('fs');
const path = require('path');
const REPO = 'C:\\\\Users\\\\mazi2\\\\.gemini\\\\antigravity\\\\brain\\\\600b6a42-08f1-435f-a919-8b86b9a6e5b1\\\\scratch\\\\extracted\\\\learnrussian.github.io-master';
const MEDIA = 'https://media.githubusercontent.com/media/learnrussian/learnrussian.github.io/master';
const OUT = 'c:\\\\Users\\\\mazi2\\\\Documents\\\\antigravity\\\\agitated-borg\\\\src\\\\data\\\\phoneticsData.js';

function clean(s) { return s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); }
function readHtml(p) { return fs.existsSync(p) ? fs.readFileSync(p,'utf8') : ''; }

function parsePart(html, part, title) {
  const entries = [];
  const audioReg = /audio="(?:{{\s*site\.mediaurl\s*}})?\/?(s\/content\/[^"]+\.mp3)"/g;
  const audioList = [];
  let am;
  while((am = audioReg.exec(html)) !== null) audioList.push({ url:`${MEDIA}/${am[1]}`, pos:am.index });

  // Try right_c (Part 1 structure)
  const rightReg = /<div class="right_c[^"]*">([\s\S]*?)<\/div>/g;
  const rightList = [];
  let rm;
  while((rm = rightReg.exec(html)) !== null) rightList.push({text:clean(rm[1]), pos:rm.index});

  if (rightList.length > 0) {
    const used = new Set();
    audioList.forEach(a => {
      const r = rightList.find(r => r.pos>a.pos && !used.has(r.pos) && r.text.length>1);
      if(r) {
        const between = audioList.filter(x=>x.pos>a.pos&&x.pos<r.pos);
        if(between.length===0) { used.add(r.pos); entries.push({audioUrl:a.url,text:r.text}); }
      }
    });
  }

  // Try <p> tag (Part 2 structure): audio then nearest <p>text</p>
  if (entries.length === 0) {
    const pReg = /<p>([^<]{1,200})<\/p>/g;
    const pList = [];
    let pm;
    while((pm = pReg.exec(html)) !== null) pList.push({text:pm[1].trim(), pos:pm.index});
    const used2 = new Set();
    audioList.forEach(a => {
      const p = pList.find(p => p.pos>a.pos && !used2.has(p.pos));
      if(p) {
        const between = audioList.filter(x=>x.pos>a.pos&&x.pos<p.pos);
        if(between.length===0 && p.text.length>0) { used2.add(p.pos); entries.push({audioUrl:a.url,text:p.text}); }
      }
    });
  }

  // Try example3_subtext (Part 3 structure)
  if (entries.length === 0) {
    const subReg = /<div class="example3_subtext">\s*([^<]+?)\s*<\/div>/g;
    const subList = [];
    let sm;
    while((sm = subReg.exec(html)) !== null) subList.push({text:sm[1].trim(), pos:sm.index});
    const used3 = new Set();
    audioList.forEach(a => {
      const s = subList.find(s => s.pos>a.pos && !used3.has(s.pos));
      if(s) {
        const between = audioList.filter(x=>x.pos>a.pos&&x.pos<s.pos);
        if(between.length===0) { used3.add(s.pos); entries.push({audioUrl:a.url,text:s.text}); }
      }
    });
  }

  console.log(`Part ${part}: ${entries.length} entries`);
  if(entries[0]) console.log(`  Sample: ${entries[0].audioUrl.split('/').pop()} → "${entries[0].text.substring(0,60)}"`);
  return {part, title, entries};
}

const phonetics = { parts: [
  parsePart(readHtml(path.join(REPO,'phonetics/index.html')), 1, 'الجزء الأول: قراءة الحروف الروسية'),
  parsePart(readHtml(path.join(REPO,'phonetics/part-2/index.html')), 2, 'الجزء الثاني: قواعد القراءة والنطق'),
  parsePart(readHtml(path.join(REPO,'phonetics/part-3/index.html')), 3, 'الجزء الثالث: التنغيم (Intonation)'),
]};

const total = phonetics.parts.reduce((a,p)=>a+p.entries.length,0);
console.log(`Total: ${total} entries`);
fs.writeFileSync(OUT, `export const PHONETICS_DATA = ${JSON.stringify(phonetics, null, 2)};`);
console.log('Saved!');
