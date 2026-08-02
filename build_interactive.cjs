const fs = require('fs');
const path = require('path');

const srcBase = 'C:\\\\Users\\\\mazi2\\\\.gemini\\\\antigravity\\\\brain\\\\600b6a42-08f1-435f-a919-8b86b9a6e5b1\\\\scratch\\\\extracted\\\\learnrussian.github.io-master';
const sections = ['lessons', 'grammar-tables', 'vocabulary', 'phonetics'];

sections.forEach(section => {
  const srcDir = path.join(srcBase, section);
  const destDir = path.join(__dirname, 'public', `${section}-interactive`);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(srcDir)) return;

  const folders = fs.readdirSync(srcDir);

  folders.forEach(folder => {
    const folderPath = path.join(srcDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const indexPath = path.join(folderPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf-8');
      
      // Remove Jekyll Front Matter
      content = content.replace(/---[\s\S]*?---/, '');
      
      // Replace liquid tags
      content = content.replace(/\{\{\s*'(.*?)'\s*\|\s*relative_url\s*\}\}/g, 'https://learnrussian.github.io$1');
      content = content.replace(/\{\{site\.mediaurl\}\}/g, 'https://media.githubusercontent.com/media/learnrussian/learnrussian.github.io/master');

      // Rewrite links that point to the original site to point to our local iframe-ready copies
      content = content.replace(/href="https:\/\/learnrussian\.github\.io\/(lessons|grammar-tables|vocabulary|phonetics)\/([^"]*?)\/?(index\.html)?"/g, 'href="/$1-interactive/$2/index.html"');
      
      // Some links might be hardcoded as relative in the Jekyll source, let's catch them if the previous regex missed them:
      // But we already replaced relative_urls to https://learnrussian.github.io... so the regex above will catch them!

      // Remove all h1 and h2 tags to avoid duplicate/English titles, as the React wrapper provides them
      content = content.replace(/<h[12][^>]*>[\s\S]*?<\/h[12]>/gi, '');

      // Remove "New Grammar", "New Vocabulary" etc. images (by src or alt)
      content = content.replace(/<img[^>]*src=["'][^"']*(new_grammar|new_vocab|new_words)[^"']*["'][^>]*>/gi, '');
      content = content.replace(/<img[^>]*alt=["'][^"']*(New Grammar|New Vocabulary|New Words)[^"']*["'][^>]*>/gi, '');

      // Remove English task descriptions and small UI strings
      content = content.replace(/<p>Task \d+\..*?<\/p>/g, '');
      content = content.replace(/<p class="completed">.*?<\/p>/g, '');
      content = content.replace(/<p>Learning the basics.*?<\/p>/g, '');

      // Translate remaining English UI buttons and instructions
      content = content.replace(/\bCheck\b/g, 'التحقق');
      content = content.replace(/\bReset\b/g, 'إعادة');
      content = content.replace(/\bNext\b/g, 'التالي');
      content = content.replace(/\bBack\b/g, 'السابق');
      content = content.replace(/\bSubmit\b/g, 'إرسال');
      content = content.replace(/Check your answers/gi, 'تحقق من إجاباتك');
      content = content.replace(/\bTask\s+(\d+)\./gi, 'مهمة $1.');
      content = content.replace(/\bTasks\b/gi, 'المهام');
      
      const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Interactive Lesson</title>
    <link href="https://learnrussian.github.io/s/css/style.css?v14" rel="stylesheet" type="text/css">
    <link href="https://learnrussian.github.io/s/css/lessons.css?v13" rel="stylesheet" type="text/css">
    <link href="https://learnrussian.github.io/s/css/typtask.css?v15" rel="stylesheet" type="text/css">
    <link href="https://learnrussian.github.io/s/css/custom_control.css?v4" rel="stylesheet" type="text/css">
    <style>
        /* Layout overrides */
        body { background: transparent !important; margin: 0; padding: 10px; overflow-x: hidden; font-family: 'Inter', 'Roboto', sans-serif !important; }
        #wrapper { width: 100% !important; min-width: auto !important; box-shadow: none !important; margin: 0 !important; background: transparent !important; border: none !important; }
        .inwrapper { width: 100% !important; background: transparent !important; border: none !important; }
        #conteiner { width: 100% !important; float: none !important; margin: 0 auto !important; max-width: 900px; background: transparent !important; border: none !important; }
        .topbar, .breadcrumb, .clesson .r-star-shape, .lesson .rlesson { display: none !important; }
        
        /* Dark Theme & Aesthetics overrides */
        body, p, span, div, h1, h2, h3, h4, h5, label, li { color: #e2e8f0; text-shadow: none !important; }
        
        .lesson { background: transparent !important; border: none !important; }
        .task { 
            background: rgba(15, 23, 42, 0.4) !important; 
            border: 1px solid rgba(255, 255, 255, 0.05) !important; 
            border-radius: 1.5rem !important; 
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important; 
            padding: 2rem !important;
            margin-bottom: 2rem !important;
            backdrop-filter: blur(10px);
        }
        
        .ltask, .rtask, .ctask, .content { border: none !important; background: transparent !important; }
        
        /* Tables */
        .table, table, td, th, tr, tbody, thead {
            background: transparent !important;
            color: #e2e8f0 !important;
            border-color: rgba(255,255,255,0.1) !important;
        }
        
        /* Inputs, Selects, Buttons, Draggables */
        input[type="text"], select, textarea, .draggable, .drag, .word, button, .button {
            background: rgba(30, 41, 59, 0.9) !important;
            color: #fff !important;
            border: 1px solid rgba(139, 92, 246, 0.5) !important;
            border-radius: 0.5rem !important;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.5) !important;
            padding: 4px 8px !important;
        }
        
        select option {
            background: #1e293b !important;
            color: #fff !important;
        }
        
        .droppable {
            background: rgba(0, 0, 0, 0.4) !important;
            border: 1px dashed rgba(139, 92, 246, 0.4) !important;
            border-radius: 0.5rem !important;
            padding: 5px !important;
            min-height: 30px;
        }
        
        /* Highlights and correctness */
        .if_correct { color: #34d399 !important; font-weight: bold; background: transparent !important; }
        .if_error { color: #f87171 !important; font-weight: bold; background: transparent !important; }
        .if_correct *, .if_error * { color: inherit !important; }
        
        /* Adjust tabs */
        tabcontrol ul li { background: rgba(255,255,255,0.05) !important; border-radius: 8px 8px 0 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; }
        tabcontrol ul li.select { background: rgba(139, 92, 246, 0.2) !important; border-color: rgba(139, 92, 246, 0.5) !important; color: #fff !important; }
        content { background: transparent !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 0 0 12px 12px !important; }
        
        /* Images and Charts */
        img { background: transparent !important; max-width: 100%; border-radius: 0.5rem !important; }
        
        /* Exceptions for UI icons if needed (e.g. checkmarks) */
        .check.isnt, .butreset, .play, .plpau, .swsound, .swvolume {
            background-color: transparent !important;
            filter: invert(1) brightness(2); /* make sprite icons visible on dark bg */
        }
    </style>
</head>
<body class="nojs">
    <div id="wrapper">
        <div class="inwrapper">
            <div id="conteiner">
                <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
                <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js"></script>
                <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
                <script defer src="https://learnrussian.github.io/s/js/libs.js"></script>
                <script defer src="https://learnrussian.github.io/s/js/jquery.ui.touch-punch.min.js"></script>
                <script defer src="https://learnrussian.github.io/s/js/custom_control.js?d"></script>
                <script defer src="https://learnrussian.github.io/s/js/learn_russian.js?p"></script>
                
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;

      const outFolder = path.join(destDir, folder);
      if (!fs.existsSync(outFolder)) {
        fs.mkdirSync(outFolder, { recursive: true });
      }
      fs.writeFileSync(path.join(outFolder, 'index.html'), html);
    }
  }
  });
});

console.log('Successfully built ALL interactive sections (lessons, grammar, vocab, phonetics)!');
