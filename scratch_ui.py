import re

files = [
    'src/components/StudyMap.jsx',
    'src/components/VocabularyMapSection.jsx',
    'src/components/VocabularySection.jsx'
]

# 1. StudyMap.jsx
with open(files[0], 'r', encoding='utf-8') as f:
    content = f.read()

# Replace background
content = content.replace('bg-[#010103]', 'bg-[#08080D]')

# Replace whileHover
content = content.replace('whileHover={{ y: -5 }}', 'whileHover={{ scale: 1.02 }}')

# Replace primary color (indigo-400 -> [#6C63FF], etc. where appropriate)
content = content.replace('text-indigo-400', 'text-[#6C63FF]')
content = content.replace('bg-indigo-500', 'bg-[#6C63FF]')
content = content.replace('text-indigo-300', 'text-[#6C63FF]')
content = content.replace('from-indigo-400', 'from-[#6C63FF]')

with open(files[0], 'w', encoding='utf-8') as f:
    f.write(content)

# 2. VocabularyMapSection.jsx
with open(files[1], 'r', encoding='utf-8') as f:
    content = f.read()

# Imports
if 'framer-motion' not in content:
    content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { motion } from \'framer-motion\';')

# Add Globe, Flag to lucide-react if not present
if 'Globe' not in content:
    content = content.replace('from \'lucide-react\';', ', Globe, Flag } from \'lucide-react\';')

# Emojis
content = content.replace('🇷🇺', '<Globe className="w-6 h-6 text-slate-500" />')
content = content.replace('🇸🇦', '<Flag className="w-6 h-6 text-slate-500" />')

# Background
content = content.replace('bg-[#010103]', 'bg-[#08080D]')
content = content.replace('from-[#0a0a14] to-[#010103]', 'from-[#08080D] to-[#08080D]')

# Primary color
content = content.replace('text-violet-400', 'text-[#6C63FF]')
content = content.replace('text-violet-300', 'text-[#6C63FF]')
content = content.replace('bg-violet-500', 'bg-[#6C63FF]')
content = content.replace('bg-violet-600', 'bg-[#6C63FF]')
content = content.replace('border-violet-500', 'border-[#6C63FF]')
content = content.replace('from-violet-500', 'from-[#6C63FF]')
content = content.replace('from-violet-400', 'from-[#6C63FF]')

# Motion div for cards
content = content.replace('<div key={i} className="glass-card', '<motion.div key={i} whileHover={{ scale: 1.02 }} className="glass-card')
content = content.replace('</div >\n                ))}', '</motion.div>\n                ))}') # rough fix
content = re.sub(r'<div key=\{i\} className="glass-card(.*?)\>(.*?)</div>', r'<motion.div key={i} whileHover={{ scale: 1.02 }} className="glass-card\1>\2</motion.div>', content, flags=re.DOTALL)

with open(files[1], 'w', encoding='utf-8') as f:
    f.write(content)

# 3. VocabularySection.jsx
with open(files[2], 'r', encoding='utf-8') as f:
    content = f.read()

if 'framer-motion' not in content:
    content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { motion } from \'framer-motion\';')

if 'Book' not in content:
    content = content.replace('from \'lucide-react\';', ', Book } from \'lucide-react\';')

# Remove emoji usage
content = content.replace('<span className="text-2xl">{category.emoji}</span>', '<Book className="text-[#6C63FF] w-6 h-6" />')

# Background
content = content.replace('bg-[#0a0f1c]', 'bg-[#08080D]')
content = content.replace('from-[#04060f]', 'from-[#08080D]')
content = content.replace('rgba(8,13,28', 'rgba(8,8,13')
content = content.replace('rgba(15,23,42', 'rgba(15,15,20')

# Primary
content = content.replace('text-indigo-300', 'text-[#6C63FF]')
content = content.replace('bg-indigo-500', 'bg-[#6C63FF]')
content = content.replace('ring-indigo-500', 'ring-[#6C63FF]')

# Motion div for cards
content = re.sub(r'<div \n            key=\{index\} \n            className="glass-card(.*?)>(.*?)\n          </div>', r'<motion.div \n            key={index} \n            whileHover={{ scale: 1.02 }}\n            className="glass-card\1>\2\n          </motion.div>', content, flags=re.DOTALL)

with open(files[2], 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
