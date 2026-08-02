const fs = require('fs');
const path = require('path');

const b1Topics = [
    "Education and Learning", "Work and Careers", "Travel and Tourism", "Health and Fitness", "Environment and Nature",
    "Technology and Science", "Media and Entertainment", "Culture and Art", "Social Issues", "Relationships and Family",
    "Money and Finance", "Food and Cuisine", "History and Traditions", "Sports and Hobbies", "Shopping and Consumerism",
    "City Life vs Country Life", "Law and Order", "Transportation and Future", "Personal Development", "Global Challenges"
];

const b2Topics = [
    "Advanced Communication", "Professional Networking", "Academic Discourse", "Political Systems", "Economic Trends",
    "Literature and Philosophy", "Psychology and Human Behavior", "Technological Ethics", "Sustainable Development", "Global Conflicts",
    "Art Movements", "Cultural Diversity", "Societal Changes", "Legal Frameworks", "Medical Advancements",
    "Space Exploration", "Media Manipulation", "Demographic Shifts", "Philosophical Dilemmas", "Future of Humanity"
];

function generateCurriculum(level, unitsCount, topics, hasReview) {
    let lessons = [];
    let lessonCounter = 1; // start from 100 for B1 to not overlap maybe? But it's separate files, so it's fine.
    
    if(level === 'B1') lessonCounter = 100;
    if(level === 'B2') lessonCounter = 300;

    for (let u = 1; u <= unitsCount; u++) {
        const unitTopic = topics[u - 1] || `Topic ${u}`;
        
        const lessonsPerUnit = hasReview ? 4 : 4; 
        const totalLessons = hasReview ? 5 : 4; // 4 lessons + 1 review = 5

        for (let l = 1; l <= totalLessons; l++) {
            const isReview = (l === totalLessons) && hasReview;
            
            const title = isReview ? `مراجعة الوحدة ${u}: ${unitTopic}` : `الوحدة ${u}، الدرس ${l}: ${unitTopic}`;
            
            let lesson = {
                number: lessonCounter++,
                slug: `${level.toLowerCase()}-u${u}-l${l}`,
                title: title,
                description: `في درس "${title}" (${level}) ستتعلم الكثير من الكلمات والقواعد المتعلقة بموضوع ${unitTopic}.`,
                dialogues: [
                    {
                        audioUrl: "",
                        lines: [
                            { ru: "Привет, как дела?", ar: "مرحباً، كيف حالك؟" },
                            { ru: "Отлично! Мы обсуждаем: " + unitTopic, ar: "ممتاز! نحن نناقش: " + unitTopic }
                        ]
                    }
                ],
                unit: u,
                lesson: l,
                isReview: isReview,
                objectives: [
                    `Master vocabulary related to ${unitTopic}`,
                    `Understand intermediate/advanced grammar in context`,
                    `Improve listening and reading comprehension`
                ],
                grammar: {
                    concept: `قاعدة الوحدة ${u} (${level})`,
                    explanation: `شرح مفصل للقاعدة المناسبة لمستوى ${level}.`,
                    examples: [
                        { ru: "Пример предложения на русском языке.", ar: "مثال على جملة باللغة الروسية." }
                    ]
                },
                vocabulary: Array.from({length: 10}).map((_, i) => ({
                    word: `Слово ${i+1}`,
                    translation: `الكلمة ${i+1}`,
                    example: `Пример с словом ${i+1}.`
                })),
                reading: {
                    title: `Текст о ${unitTopic}`,
                    content: `Это длинный и подробный текст о ${unitTopic}. Он содержит много новых слов и грамматических конструкций.`,
                    translation: `هذا نص طويل ومفصل حول ${unitTopic}. يحتوي على العديد من الكلمات الجديدة والتراكيب النحوية.`
                }
            };
            lessons.push(lesson);
        }
    }
    return lessons;
}

const b1Data = generateCurriculum('B1', 20, b1Topics, true); // 20 units * 5 (4+review) = 100 lessons
const b2Data = generateCurriculum('B2', 20, b2Topics, true); // 20 units * 5 (assuming 4+review or just 5 for 20 units = 100 lessons)

const b1Content = `export const B1_LESSONS_DATA = ${JSON.stringify(b1Data, null, 2)};\n`;
const b2Content = `export const B2_LESSONS_DATA = ${JSON.stringify(b2Data, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'b1LessonsData.js'), b1Content, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'b2LessonsData.js'), b2Content, 'utf8');

console.log('Successfully generated b1LessonsData.js and b2LessonsData.js');
