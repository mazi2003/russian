const fs = require('fs');

function updateCaseOverview() {
  let code = fs.readFileSync('src/components/CaseOverview.jsx', 'utf8');

  // Add framer-motion import
  if (!code.includes('framer-motion')) {
    code = code.replace(
      "import { BookOpen, Volume2, Info, ArrowLeft, ArrowRight, Brain, Bookmark, CheckCircle2 } from 'lucide-react';",
      "import { BookOpen, Volume2, Info, ArrowLeft, ArrowRight, Brain, Bookmark, CheckCircle2 } from 'lucide-react';\nimport { motion, AnimatePresence } from 'framer-motion';"
    );
  }

  // Replace glass-card with glass-panel and hover effects
  code = code.replace(/glass-card rounded-3xl overflow-hidden/g, 'glass-panel rounded-3xl overflow-hidden hover:border-[#6C63FF]/50');
  code = code.replace(/glass-card rounded-2xl overflow-hidden/g, 'glass-panel rounded-2xl overflow-hidden hover:border-[#6C63FF]/50');

  // Replace PrepositionBox div with motion.div
  code = code.replace(
    /const PrepositionBox = \(\{ prep, ru_meaning, ar_meaning, examples, color = "#3b82f6" \}\) => \(\n  <div className="group relative rounded-3xl/g,
    'const PrepositionBox = ({ prep, ru_meaning, ar_meaning, examples, color = "#3b82f6" }) => (\n  <motion.div whileHover={{ y: -5 }} className="glass-panel group relative rounded-3xl hover:border-[#6C63FF]/50'
  );
  code = code.replace(
    /<\/div>\n\s*\}\)\)/g,
    '</motion.div>\n))'
  );
  code = code.replace(
    /style=\{\{ background: `linear-gradient\(145deg, rgba\(255,255,255,0\.03\), rgba\(0,0,0,0\.4\)\)`, border: `1px solid \$\{color\}33`, borderRight: `4px solid \$\{color\}` \}\}/g,
    'style={{ borderRight: `4px solid ${color}` }}'
  );

  // Fix the PrepositionBox closing tag manually since the above regex might miss
  // Wait, let's just do a simpler replacement for the closing tag:
  code = code.replace(
    /    <\/div>\n  <\/div>\n\);/g,
    '    </div>\n  </motion.div>\n);'
  );

  // Update Header Banner
  code = code.replace(
    /<div className="relative rounded-\[3rem\] p-8 md:p-14 overflow-hidden shadow-2xl bg-\[#0a0f1c\] min-h-\[300px\] flex flex-col justify-center mb-8 border border-white\/5 group">/g,
    '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-premium relative rounded-[3rem] p-8 md:p-14 overflow-hidden shadow-2xl min-h-[300px] flex flex-col justify-center mb-8 group hover:border-[#6C63FF]/50 transition-colors">'
  );
  code = code.replace(
    /      <\/div>\n\n      \{\!activeCase \?/g,
    '      </motion.div>\n\n      {!activeCase ?'
  );

  // Update Menu Buttons
  code = code.replace(
    /<button\n              key=\{c\.id\}\n              onClick=\{\(\) => setActiveCase\(c\.id\)\}\n              className="group relative rounded-3xl p-8 text-right overflow-hidden bg-gradient-to-br from-\[#0a0a14\] to-\[#010103\] border border-white\/\[0\.06\] hover:border-white\/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col min-h-\[220px\]"/g,
    '<motion.button\n              whileHover={{ scale: 1.02, y: -5 }}\n              whileTap={{ scale: 0.98 }}\n              key={c.id}\n              onClick={() => setActiveCase(c.id)}\n              className="glass-panel group relative rounded-3xl p-8 text-right overflow-hidden border border-white/[0.06] hover:border-[#6C63FF]/50 transition-all duration-300 flex flex-col min-h-[220px]"'
  );
  code = code.replace(
    /<\/button>\n          \)\)}/g,
    '</motion.button>\n          ))}'
  );

  // Update Main Content Area
  code = code.replace(
    /<div className="flex flex-col glass-panel p-0 overflow-hidden border border-white\/10 rounded-\[2rem\] relative shadow-2xl">/g,
    '<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col glass-premium p-0 overflow-hidden hover:border-[#6C63FF]/50 rounded-[2rem] relative shadow-2xl transition-colors duration-300">'
  );
  code = code.replace(
    /              <ActiveContent \/>\n            <\/div>\n\n          <\/div>\n        <\/div>/g,
    '              <ActiveContent />\n            </div>\n\n          </motion.div>\n        </div>'
  );

  // Buttons in content
  code = code.replace(
    /className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white\/5 hover:bg-white\/10 border border-white\/10 transition-all text-slate-300 font-bold group hover:shadow-lg backdrop-blur-md"/g,
    'className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6C63FF]/50 transition-all text-slate-300 font-bold group hover:shadow-lg backdrop-blur-md"'
  );

  code = code.replace(
    /className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-indigo-500\/10 text-indigo-300 border border-indigo-500\/30 hover:bg-indigo-500\/20 transition-all text-base font-bold shadow-lg hover:shadow-indigo-500\/20"/g,
    'className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:border-[#6C63FF]/50 hover:bg-indigo-500/20 transition-all text-base font-bold shadow-lg hover:shadow-indigo-500/20"'
  );

  fs.writeFileSync('src/components/CaseOverview.jsx', code);
}

function updateVerbsVisualizer() {
  let code = fs.readFileSync('src/components/VerbsVisualizer.jsx', 'utf8');

  // Add framer-motion import
  if (!code.includes('framer-motion')) {
    code = code.replace(
      "import { speakRussian } from '../utils/speechUtils';",
      "import { speakRussian } from '../utils/speechUtils';\nimport { motion, AnimatePresence } from 'framer-motion';"
    );
  }

  // Accordion Update
  code = code.replace(
    /<div className=\{\`border \$\{theme\.border\} rounded-3xl overflow-hidden mb-5 bg-\[#0a0f1c\]\/80 backdrop-blur-md transition-all duration-300 \$\{isOpen \? theme\.shadow : 'hover:border-opacity-50'\}\`\}>/g,
    '<motion.div layout className={`glass-panel border ${theme.border} rounded-3xl overflow-hidden mb-5 transition-all duration-300 hover:border-[#6C63FF]/50 ${isOpen ? theme.shadow : \'\'}`}>'
  );
  // Fix the closing tag of the Accordion wrapper div
  // The structure is:
  // <div className={...}>
  //   <button ...>
  //     ...
  //   </button>
  //   {isOpen && (
  //     <div ...>
  //       {children}
  //     </div>
  //   )}
  // </div>
  code = code.replace(
    /      \{isOpen && \(\n        <div className="p-6 sm:p-8 text-slate-300 space-y-6 leading-relaxed bg-gradient-to-b from-transparent to-black\/20">\n          \{children\}\n        <\/div>\n      \)\}\n    <\/div>/g,
    '      <AnimatePresence>\n        {isOpen && (\n          <motion.div\n            initial={{ height: 0, opacity: 0 }}\n            animate={{ height: "auto", opacity: 1 }}\n            exit={{ height: 0, opacity: 0 }}\n            className="p-6 sm:p-8 text-slate-300 space-y-6 leading-relaxed bg-gradient-to-b from-transparent to-black/20"\n          >\n            {children}\n          </motion.div>\n        )}\n      </AnimatePresence>\n    </motion.div>'
  );

  // HighlightBox Update
  code = code.replace(
    /<div className=\{\`border p-6 rounded-3xl flex items-start gap-4 my-6 w-full relative overflow-hidden backdrop-blur-md \$\{styles\[type\]\}\`\}>/g,
    '<motion.div whileHover={{ scale: 1.01 }} className={`glass-panel border p-6 rounded-3xl flex items-start gap-4 my-6 w-full relative overflow-hidden backdrop-blur-md hover:border-[#6C63FF]/50 ${styles[type]}`}>'
  );
  code = code.replace(
    /      <\/div>\n    <\/div>\n  \);/g,
    '      </div>\n    </motion.div>\n  );'
  );

  // Update Header Banner
  code = code.replace(
    /<div className="relative rounded-\[2rem\] p-8 md:p-12 overflow-hidden shadow-2xl bg-\[#0a0f1c\] min-h-\[250px\] flex flex-col justify-center mb-10">/g,
    '<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-premium relative rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl min-h-[250px] flex flex-col justify-center mb-10 hover:border-[#6C63FF]/50 transition-colors duration-300">'
  );
  code = code.replace(
    /        <\/div>\n      <\/div>\n\n      <div className="flex flex-row gap-2/g,
    '        </div>\n      </motion.div>\n\n      <div className="flex flex-row gap-2'
  );

  // Tabs Update
  code = code.replace(
    /className=\{\`flex-shrink-0 whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center snap-start \$\{\n              activeTab === t\.id\n                \? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500\/25'\n                : 'text-slate-400 hover:text-slate-200 hover:bg-white\/5'\n            \}\`\}/g,
    'className={`flex-shrink-0 whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center snap-start ${activeTab === t.id ? \'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/25\' : \'glass-panel hover:border-[#6C63FF]/50 text-slate-400 hover:text-slate-200\'}`}'
  );
  // We should make the tabs motion.button
  code = code.replace(/<button\n            key=\{t\.id\}/g, '<motion.button\n            whileHover={{ scale: 1.05 }}\n            whileTap={{ scale: 0.95 }}\n            key={t.id}');
  code = code.replace(/<\/button>\n        \)\)}/g, '</motion.button>\n        ))}');

  // Visual Guide Card
  code = code.replace(
    /<div className="glass-panel p-5 rounded-3xl border border-purple-500\/20 bg-\[#0a0f1c\]\/50 mb-8">/g,
    '<motion.div whileHover={{ y: -2 }} className="glass-panel p-5 rounded-3xl border border-purple-500/20 hover:border-[#6C63FF]/50 mb-8">'
  );
  code = code.replace(
    /              <\/div>\n            <\/div>\n\n            <Accordion/g,
    '              </div>\n            </motion.div>\n\n            <Accordion'
  );

  fs.writeFileSync('src/components/VerbsVisualizer.jsx', code);
}

try {
  updateCaseOverview();
  updateVerbsVisualizer();
  console.log("UI updated successfully.");
} catch(e) {
  console.error(e);
}
