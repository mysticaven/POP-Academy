// Content Verification Script
// Run this in the browser console to verify all template content

console.log('%c🎓 Pop Academy - Content Verification', 'font-size: 20px; font-weight: bold; color: #4ECDC4');
console.log('%c=========================================', 'color: #4ECDC4');

if (typeof window.storage !== 'undefined') {
    const stats = window.storage.getStats();

    console.log('\n%c📊 Content Statistics:', 'font-size: 16px; font-weight: bold; color: #FFD93D');
    console.log(`✅ Courses: ${stats.courses}`);
    console.log(`✅ Videos: ${stats.videos}`);
    console.log(`✅ PDFs: ${stats.pdfs}`);
    console.log(`✅ DPPs: ${stats.dpps}`);
    console.log(`✅ Lesson Plans: ${stats.lessonPlans}`);
    console.log(`✅ Exercises: ${stats.exercises}`);

    console.log('\n%c📚 Course Details:', 'font-size: 16px; font-weight: bold; color: #FF6B9D');
    const courses = window.storage.getCourses();
    courses.forEach((course, index) => {
        console.log(`\n${index + 1}. ${course.icon} ${course.name}`);
        console.log(`   Description: ${course.description}`);
        console.log(`   ID: ${course.id}`);

        const courseStats = window.storage.getCourseStats(course.id);
        console.log(`   📊 Content:`);
        console.log(`      - Videos: ${courseStats.videos}`);
        console.log(`      - PDFs: ${courseStats.pdfs}`);
        console.log(`      - DPPs: ${courseStats.dpps}`);
        console.log(`      - Lesson Plans: ${courseStats.lessonPlans}`);
        console.log(`      - Exercises: ${courseStats.exercises}`);
    });

    console.log('\n%c🎥 Video Details:', 'font-size: 16px; font-weight: bold; color: #A78BFA');
    const videos = window.storage.getVideos();
    videos.forEach((video, index) => {
        const course = courses.find(c => c.id === video.courseId);
        console.log(`${index + 1}. ${video.title} (${video.duration}) - ${course.name}`);
    });

    console.log('\n%c📄 PDF Details:', 'font-size: 16px; font-weight: bold; color: #4ECDC4');
    const pdfs = window.storage.getPDFs();
    pdfs.forEach((pdf, index) => {
        const course = courses.find(c => c.id === pdf.courseId);
        console.log(`${index + 1}. ${pdf.title} - ${course.name}`);
    });

    console.log('\n%c📝 Lesson Plan Details:', 'font-size: 16px; font-weight: bold; color: #6BCF7F');
    const lessonPlans = window.storage.getLessonPlans();
    console.log(`Total Lesson Plans: ${lessonPlans.length}`);
    courses.forEach(course => {
        const coursePlans = lessonPlans.filter(p => p.courseId === course.id);
        console.log(`\n${course.icon} ${course.name}: ${coursePlans.length} lesson plans`);
        coursePlans.forEach((plan, index) => {
            console.log(`   ${index + 1}. ${plan.title}`);
        });
    });

    console.log('\n%c🎮 Exercise/Game Details:', 'font-size: 16px; font-weight: bold; color: #FFD93D');
    const exercises = window.storage.getExercises();
    console.log(`Total Exercises: ${exercises.length}`);
    courses.forEach(course => {
        const courseExercises = exercises.filter(e => e.courseId === course.id);
        if (courseExercises.length > 0) {
            console.log(`\n${course.icon} ${course.name}: ${courseExercises.length} exercises`);
            courseExercises.forEach((exercise, index) => {
                const gameType = exercise.gameType || 'general';
                const icon = gameType === 'ai' ? '🤖' : gameType === 'cv' ? '📷' : '🎮';
                console.log(`   ${index + 1}. ${icon} ${exercise.title} - ${exercise.description}`);
            });
        }
    });

    console.log('\n%c✅ Verification Complete!', 'font-size: 18px; font-weight: bold; color: #6BCF7F');
    console.log('%c=========================================', 'color: #4ECDC4');

    // Summary table
    console.table({
        'Template Courses': stats.courses + ' ✓',
        'Videos (2 per course)': stats.videos + ' ✓',
        'PDFs': stats.pdfs + ' ✓',
        'Lesson Plans (10 per course)': stats.lessonPlans + ' ✓',
        'Right-Brain Exercises': stats.exercises + ' ✓'
    });

    console.log('\n%c🎯 Expected vs Actual:', 'font-size: 16px; font-weight: bold; color: #FF6B9D');
    console.table({
        'Courses': { Expected: 6, Actual: stats.courses, Status: stats.courses === 6 ? '✅' : '❌' },
        'Videos': { Expected: 12, Actual: stats.videos, Status: stats.videos === 12 ? '✅' : '❌' },
        'PDFs': { Expected: 3, Actual: stats.pdfs, Status: stats.pdfs === 3 ? '✅' : '❌' },
        'Lesson Plans': { Expected: 60, Actual: stats.lessonPlans, Status: stats.lessonPlans === 60 ? '✅' : '❌' },
        'Exercises': { Expected: '27+', Actual: stats.exercises, Status: stats.exercises >= 27 ? '✅' : '❌' }
    });

} else {
    console.error('❌ Storage system not initialized. Please reload the page.');
}
