const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'rtLessonsData.js');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// The file starts with: export const RT_LESSONS_DATA = [
// We can strip that and parse the JSON.
fileContent = fileContent.replace('export const RT_LESSONS_DATA = ', '').trim();
if (fileContent.endsWith(';')) {
    fileContent = fileContent.slice(0, -1);
}

let lessons;
try {
    lessons = eval('(' + fileContent + ')');
} catch (e) {
    console.error("Failed to parse", e);
    process.exit(1);
}

const updatedLessons = lessons.map(lesson => {
    return {
        ...lesson,
        objectives: [
            "فهم واستيعاب: " + lesson.title,
            "تعلم وتطبيق المفردات الجديدة",
            "التدرب على الاستماع والقراءة"
        ],
        grammar: {
            concept: lesson.title,
            explanation: "شرح مبسط لقاعدة: " + lesson.title,
            examples: [
                { ru: "Это пример.", ar: "هذا مثال." },
                { ru: "Мы изучаем русский язык.", ar: "نحن نتعلم اللغة الروسية." }
            ]
        },
        vocabulary: [
            { word: "Слово", translation: "كلمة", example: "Это новое слово." },
            { word: "Урок", translation: "درس", example: "Это интересный урок." },
            { word: "Язык", translation: "لغة", example: "Русский язык красивый." },
            { word: "Понимать", translation: "يفهم", example: "Я понимаю по-русски." },
            { word: "Читать", translation: "يقرأ", example: "Я люблю читать." }
        ],
        reading: {
            title: lesson.title,
            text: "Это простой текст для чтения. Мы изучаем русский язык каждый день. Это очень интересно и полезно. В этом уроке мы узнали много нового.",
            translation: "هذا نص بسيط للقراءة. نحن نتعلم اللغة الروسية كل يوم. هذا ممتع ومفيد جداً. في هذا الدرس تعلمنا الكثير من الأشياء الجديدة."
        }
    };
});

const newContent = 'export const RT_LESSONS_DATA = ' + JSON.stringify(updatedLessons, null, 2) + ';\n';
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully updated rtLessonsData.js');
