// Enhanced LocalStorage wrapper with PDF, Video, DPP, Lesson Plan support and Caching
class Storage {
    constructor() {
        this.cache = {};
        this.initializeData();
    }

    initializeData() {
        // Validate and optimize existing data first
        if (localStorage.getItem('courses')) {
            this.validateDatabase();
            this.optimizeDatabase();
        }

        if (!localStorage.getItem('courses')) {
            // Pre-populate with template courses optimized for right brain development
            const templateCourses = [
                {
                    id: 'right-brain-101',
                    name: 'Right Brain Development',
                    description: '35-Day Intensive Program for Right Brain Activation',
                    color: '#D4F868',
                    icon: '🦁',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'handwriting-101',
                    name: 'Handwriting Mastery',
                    description: 'Right-brain based handwriting training with visual patterns',
                    color: '#FF6B9D',
                    icon: '✍️',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'phonics-101',
                    name: 'Phonics & Reading',
                    description: 'Visual phonics training for right brain learning',
                    color: '#4ECDC4',
                    icon: '📖',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'math-visual-101',
                    name: 'Visual Math',
                    description: 'Right-brain math through patterns and visualization',
                    color: '#FFD93D',
                    icon: '🧮',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'memory-101',
                    name: 'Memory Training',
                    description: 'Advanced memory techniques using right brain',
                    color: '#A78BFA',
                    icon: '🧠',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'art-creative-101',
                    name: 'Art & Creativity',
                    description: 'Unlock creativity through right brain exercises',
                    color: '#6BCF7F',
                    if(!localStorage.getItem('pdfs')) {
                    const templatePDFs = [
                        // Right Brain Development
                        { id: 'pdf-1', courseId: 'right-brain-101', title: 'Right Brain Training Guide', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooUmlnaHQgQnJhaW4gVHJhaW5pbmcpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=', createdAt: new Date().toISOString() },
                        // Handwriting
                        { id: 'pdf-2', courseId: 'handwriting-101', title: 'Handwriting Practice Sheets', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooSGFuZHdyaXRpbmcgUHJhY3RpY2UpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=', createdAt: new Date().toISOString() },
                        // Phonics
                        { id: 'pdf-3', courseId: 'phonics-101', title: 'Phonics Workbook', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooUGhvbmV0aWNzIFdvcmtib29rKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhylZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=', createdAt: new Date().toISOString() }
                    ];
                    localStorage.setItem('pdfs', JSON.stringify(templatePDFs));
                }

        // Initialize DPPs with template content
        if (!localStorage.getItem('dpps')) {
                const templateDPPs = [
                    { id: 'dpp-1', courseId: 'right-brain-101', title: 'Day 1 Practice Problems', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooRGF5IDEgRFBQKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhylZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=', createdAt: new Date().toISOString() },
                    { id: 'dpp-2', courseId: 'handwriting-101', title: 'Handwriting Practice DPP', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooSGFuZHdyaXRpbmcgRFBQKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhylZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=', createdAt: new Date().toISOString() },
                    { id: 'dpp-3', courseId: 'phonics-101', title: 'Phonics Practice DPP', data: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooUGhvbmV0aWNzIERQUCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2MCAwMDAwMCBuIAowMDAwMDAwMTI0IDAwMDAwIG4gCjAwMDAwMDAyMDkgMDAwMDAgbiAKMDAwMDAwMDM3MCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQ4MwolJUVPRg==', createdAt: new Date().toISOString() }
                ];
                localStorage.setItem('dpps', JSON.stringify(templateDPPs));
            }

            // Initialize lesson plans with template content (60 total - 10 per course)
            if (!localStorage.getItem('lessonPlans')) {
                const plans = [];
                const courseData = [
                    { id: 'right-brain-101', name: 'Right Brain Development' },
                    { id: 'handwriting-101', name: 'Handwriting Mastery' },
                    { id: 'phonics-101', name: 'Phonics & Reading' },
                    { id: 'math-visual-101', name: 'Visual Math' },
                    { id: 'memory-101', name: 'Memory Training' },
                    { id: 'art-creative-101', name: 'Art & Creativity' }
                ];

                // Generate lesson plan PDF template (simple base64 PDF)
                const generateLessonPlanPDF = (courseName, day) => {
                    // This is a minimal valid PDF with the lesson plan title
                    return 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgooTGVzc29uIFBsYW4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDEyNCAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzNzAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0ODMKJSVFT0Y=';
                };

                courseData.forEach(course => {
                    for (let i = 1; i <= 10; i++) {
                        plans.push({
                            id: `${course.id}-day-${i}`,
                            courseId: course.id,
                            title: `${course.name} - Day ${i} Lesson Plan`,
                            description: `Daily structured lesson plan for ${course.name} - Day ${i}`,
                            data: generateLessonPlanPDF(course.name, i),
                            createdAt: new Date().toISOString()
                        });
                    }
                });
                localStorage.setItem('lessonPlans', JSON.stringify(plans));
            }
            if (!localStorage.getItem('exercises')) {
                const exercises = [
                    // Right Brain Development
                    { id: 'ex-1', courseId: 'right-brain-101', title: 'Mandala Memory', description: 'Focus on the center for 10s, then recall colors.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-2', courseId: 'right-brain-101', title: 'High Speed Flashcards', description: 'Rapid image recognition training.', type: 'game', gameType: 'speed', createdAt: new Date().toISOString() },
                    { id: 'ex-3', courseId: 'right-brain-101', title: 'Tangram Puzzle', description: 'Spatial awareness and shape matching.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },
                    { id: 'ex-4', courseId: 'right-brain-101', title: 'Eye Tracking', description: 'Follow the moving object without moving head.', type: 'game', gameType: 'focus', createdAt: new Date().toISOString() },
                    { id: 'ex-5', courseId: 'right-brain-101', title: 'Alpha Music', description: 'Relaxation music for brain wave synchronization.', createdAt: new Date().toISOString() },
                    { id: 'ex-6', courseId: 'right-brain-101', title: 'Speed Reaction', description: 'Tap the targets as fast as you can!', type: 'game', gameType: 'speed', createdAt: new Date().toISOString() },
                    { id: 'ex-7', courseId: 'right-brain-101', title: 'Memory Training', description: 'Remember the sequence of colors.', type: 'game', gameType: 'memory', createdAt: new Date().toISOString() },
                    { id: 'ex-8', courseId: 'right-brain-101', title: 'Flappy Bird', description: 'Navigate the bird through the pipes.', type: 'game', gameType: 'focus', createdAt: new Date().toISOString() },
                    { id: 'ex-9', courseId: 'right-brain-101', title: 'Pattern Match', description: 'Find matching patterns quickly!', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },
                    { id: 'ex-10', courseId: 'right-brain-101', title: 'Visual Memory', description: 'Remember and recreate visual patterns.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-11', courseId: 'right-brain-101', title: 'Math Speed', description: 'Solve math problems as fast as possible!', type: 'game', gameType: 'math', createdAt: new Date().toISOString() },
                    { id: 'ex-12', courseId: 'right-brain-101', title: 'Word Recall', description: 'Remember and type words from memory.', type: 'game', gameType: 'word', createdAt: new Date().toISOString() },

                    // Handwriting Exercises
                    { id: 'ex-hw-1', courseId: 'handwriting-101', title: 'Letter Tracing Game', description: 'Trace letters with visual patterns.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },
                    { id: 'ex-hw-2', courseId: 'handwriting-101', title: 'Shape Recognition', description: 'Match shapes to improve fine motor skills.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-hw-3', courseId: 'handwriting-101', title: 'Pattern Writing', description: 'Follow visual patterns to write letters.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },

                    // Phonics Exercises
                    { id: 'ex-ph-1', courseId: 'phonics-101', title: 'Sound Matching', description: 'Match sounds to visual images.', type: 'game', gameType: 'memory', createdAt: new Date().toISOString() },
                    { id: 'ex-ph-2', courseId: 'phonics-101', title: 'Letter-Sound Game', description: 'Connect letters with their sounds visually.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-ph-3', courseId: 'phonics-101', title: 'Word Building', description: 'Build words using visual phonics.', type: 'game', gameType: 'word', createdAt: new Date().toISOString() },

                    // Visual Math Exercises
                    { id: 'ex-math-1', courseId: 'math-visual-101', title: 'Number Patterns', description: 'Identify patterns in number sequences.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },
                    { id: 'ex-math-2', courseId: 'math-visual-101', title: 'Visual Counting', description: 'Count using visual representations.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-math-3', courseId: 'math-visual-101', title: 'Math Speed Challenge', description: 'Solve math problems as fast as possible!', type: 'game', gameType: 'math', createdAt: new Date().toISOString() },

                    // Memory Training Exercises
                    { id: 'ex-mem-1', courseId: 'memory-101', title: 'Memory Palace', description: 'Create visual memory palaces.', type: 'game', gameType: 'memory', createdAt: new Date().toISOString() },
                    { id: 'ex-mem-2', courseId: 'memory-101', title: 'Visual Association', description: 'Link information with visual images.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-mem-3', courseId: 'memory-101', title: 'Sequence Memory', description: 'Remember complex sequences.', type: 'game', gameType: 'memory', createdAt: new Date().toISOString() },

                    // Art & Creativity Exercises
                    { id: 'ex-art-1', courseId: 'art-creative-101', title: 'Creative Drawing', description: 'Express creativity through drawing.', type: 'game', gameType: 'visual', createdAt: new Date().toISOString() },
                    { id: 'ex-art-2', courseId: 'art-creative-101', title: 'Color Harmony', description: 'Learn color combinations visually.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },
                    { id: 'ex-art-3', courseId: 'art-creative-101', title: 'Pattern Creation', description: 'Create unique visual patterns.', type: 'game', gameType: 'pattern', createdAt: new Date().toISOString() },

                    // AI-Based Games (using Ollama)
                    { id: 'ex-ai-1', courseId: 'right-brain-101', title: 'AI Storytelling', description: 'Create stories with AI assistance using Ollama.', type: 'game', gameType: 'ai', createdAt: new Date().toISOString() },
                    { id: 'ex-ai-2', courseId: 'right-brain-101', title: 'AI Quiz Helper', description: 'Ask questions and learn with AI.', type: 'game', gameType: 'ai', createdAt: new Date().toISOString() },
                    { id: 'ex-ai-3', courseId: 'art-creative-101', title: 'AI Drawing Helper', description: 'Get step-by-step drawing instructions from AI.', type: 'game', gameType: 'ai', createdAt: new Date().toISOString() },

                    // CV-Based Games (using Camera)
                    { id: 'ex-cv-1', courseId: 'right-brain-101', title: 'Face Expression Game', description: 'Detect and match facial expressions using camera.', type: 'game', gameType: 'cv', createdAt: new Date().toISOString() },
                    { id: 'ex-cv-2', courseId: 'right-brain-101', title: 'Hand Gesture Recognition', description: 'Control games with hand gestures via camera.', type: 'game', gameType: 'cv', createdAt: new Date().toISOString() },
                    { id: 'ex-cv-3', courseId: 'right-brain-101', title: 'Object Recognition', description: 'Identify objects using computer vision.', type: 'game', gameType: 'cv', createdAt: new Date().toISOString() }
                ];
                localStorage.setItem('exercises', JSON.stringify(exercises));
            }
            // Initialize students database
            if (!localStorage.getItem('students')) {
                localStorage.setItem('students', JSON.stringify([]));
            }

            // Initialize current user session
            if (!localStorage.getItem('currentStudent')) {
                localStorage.setItem('currentStudent', JSON.stringify(null));
            }

            if (!localStorage.getItem('profile')) {
                localStorage.setItem('profile', JSON.stringify({
                    name: 'Student',
                    level: 1,
                    day: 1,
                    points: 0,
                    completedDays: []
                }));
            }
            if (!localStorage.getItem('isAdmin')) localStorage.setItem('isAdmin', 'false');
        }

        // Helper for caching
        getData(key) {
            if (this.cache[key]) return this.cache[key];
            try {
                const data = JSON.parse(localStorage.getItem(key) || '[]');
                this.cache[key] = data;
                return data;
            } catch (e) {
                console.error(`Error reading ${key}:`, e);
                return [];
            }
        }

        saveData(key, data) {
            try {
                this.cache[key] = data;
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                console.error(`Error saving ${key}:`, e);
                // Handle quota exceeded error
                if (e.name === 'QuotaExceededError') {
                    alert('Storage limit exceeded. Please clear some data.');
                }
            }
        }

        // Database optimization and validation
        optimizeDatabase() {
            // Clean up orphaned data
            const courses = this.getCourses();
            const courseIds = courses.map(c => c.id);

            // Clean videos
            const videos = this.getVideos();
            const validVideos = videos.filter(v => courseIds.includes(v.courseId));
            if (videos.length !== validVideos.length) {
                this.saveData('videos', validVideos);
            }

            // Clean PDFs
            const pdfs = this.getPDFs();
            const validPDFs = pdfs.filter(p => courseIds.includes(p.courseId));
            if (pdfs.length !== validPDFs.length) {
                this.saveData('pdfs', validPDFs);
            }

            // Clean DPPs
            const dpps = this.getDPPs();
            const validDPPs = dpps.filter(d => courseIds.includes(d.courseId));
            if (dpps.length !== validDPPs.length) {
                this.saveData('dpps', validDPPs);
            }

            // Clean lesson plans
            const plans = this.getLessonPlans();
            const validPlans = plans.filter(p => courseIds.includes(p.courseId));
            if (plans.length !== validPlans.length) {
                this.saveData('lessonPlans', validPlans);
            }

            // Clean exercises
            const exercises = this.getExercises();
            const validExercises = exercises.filter(e => courseIds.includes(e.courseId));
            if (exercises.length !== validExercises.length) {
                this.saveData('exercises', validExercises);
            }

            // Clear cache after optimization
            this.cache = {};
            console.log('Database optimized successfully');
        }

        // Validate database integrity
        validateDatabase() {
            const issues = [];

            // Check for required keys
            const requiredKeys = ['courses', 'videos', 'pdfs', 'dpps', 'lessonPlans', 'exercises', 'profile', 'isAdmin'];
            requiredKeys.forEach(key => {
                if (!localStorage.getItem(key)) {
                    issues.push(`Missing required key: ${key}`);
                }
            });

            // Validate course references
            const courses = this.getCourses();
            const courseIds = courses.map(c => c.id);

            const allVideos = this.getVideos();
            allVideos.forEach(v => {
                if (!courseIds.includes(v.courseId)) {
                    issues.push(`Video ${v.id} references non-existent course ${v.courseId}`);
                }
            });

            const allPDFs = this.getPDFs();
            allPDFs.forEach(p => {
                if (!courseIds.includes(p.courseId)) {
                    issues.push(`PDF ${p.id} references non-existent course ${p.courseId}`);
                }
            });

            if (issues.length > 0) {
                console.warn('Database validation issues:', issues);
                return false;
            }

            return true;
        }

        // Admin
        setAdminMode(isAdmin) {
            localStorage.setItem('isAdmin', isAdmin.toString());
        }

        isAdmin() {
            return localStorage.getItem('isAdmin') === 'true';
        }

        // Courses
        getCourses() {
            return this.getData('courses');
        }

        addCourse(course) {
            const courses = this.getCourses();
            course.id = Date.now().toString();
            course.createdAt = new Date().toISOString();
            courses.push(course);
            this.saveData('courses', courses);
            return course;
        }

        deleteCourse(id) {
            const courses = this.getCourses().filter(c => c.id !== id);
            this.saveData('courses', courses);
            this.deleteVideosByCourse(id);
            this.deletePDFsByCourse(id);
            this.deleteDPPsByCourse(id);
            this.deleteLessonPlansByCourse(id);
            this.deleteExercisesByCourse(id);
        }

        // Videos
        getVideos(courseId) {
            const videos = this.getData('videos');
            return courseId ? videos.filter(v => v.courseId === courseId) : videos;
        }

        addVideo(video) {
            const videos = this.getData('videos');
            video.id = Date.now().toString();
            video.createdAt = new Date().toISOString();
            videos.push(video);
            this.saveData('videos', videos);
            return video;
        }

        deleteVideo(id) {
            const videos = this.getData('videos').filter(v => v.id !== id);
            this.saveData('videos', videos);
        }

        deleteVideosByCourse(courseId) {
            const videos = this.getData('videos').filter(v => v.courseId !== courseId);
            this.saveData('videos', videos);
        }

        // PDFs
        getPDFs(courseId) {
            const pdfs = this.getData('pdfs');
            return courseId ? pdfs.filter(p => p.courseId === courseId) : pdfs;
        }

        addPDF(pdf) {
            const pdfs = this.getData('pdfs');
            pdf.id = Date.now().toString();
            pdf.createdAt = new Date().toISOString();
            pdfs.push(pdf);
            this.saveData('pdfs', pdfs);
            return pdf;
        }

        deletePDF(id) {
            const pdfs = this.getData('pdfs').filter(p => p.id !== id);
            this.saveData('pdfs', pdfs);
        }

        deletePDFsByCourse(courseId) {
            const pdfs = this.getData('pdfs').filter(p => p.courseId !== courseId);
            this.saveData('pdfs', pdfs);
        }

        // DPPs (formerly PYQs)
        getDPPs(courseId) {
            const dpps = this.getData('dpps');
            return courseId ? dpps.filter(p => p.courseId === courseId) : dpps;
        }

        addDPP(dpp) {
            const dpps = this.getData('dpps');
            dpp.id = Date.now().toString();
            dpp.createdAt = new Date().toISOString();
            dpps.push(dpp);
            this.saveData('dpps', dpps);
            return dpp;
        }

        deleteDPP(id) {
            const dpps = this.getData('dpps').filter(p => p.id !== id);
            this.saveData('dpps', dpps);
        }

        deleteDPPsByCourse(courseId) {
            const dpps = this.getData('dpps').filter(p => p.courseId !== courseId);
            this.saveData('dpps', dpps);
        }

        // Lesson Plans
        getLessonPlans(courseId) {
            const plans = this.getData('lessonPlans');
            return courseId ? plans.filter(p => p.courseId === courseId) : plans;
        }

        addLessonPlan(plan) {
            const plans = this.getData('lessonPlans');
            plan.id = Date.now().toString();
            plan.createdAt = new Date().toISOString();
            plans.push(plan);
            this.saveData('lessonPlans', plans);
            return plan;
        }

        deleteLessonPlan(id) {
            const plans = this.getData('lessonPlans').filter(p => p.id !== id);
            this.saveData('lessonPlans', plans);
        }

        deleteLessonPlansByCourse(courseId) {
            const plans = this.getData('lessonPlans').filter(p => p.courseId !== courseId);
            this.saveData('lessonPlans', plans);
        }

        // Exercises
        getExercises(courseId) {
            const exercises = this.getData('exercises');
            return courseId ? exercises.filter(e => e.courseId === courseId) : exercises;
        }

        addExercise(exercise) {
            const exercises = this.getData('exercises');
            exercise.id = Date.now().toString();
            exercise.createdAt = new Date().toISOString();
            exercises.push(exercise);
            this.saveData('exercises', exercises);
            return exercise;
        }

        deleteExercise(id) {
            const exercises = this.getData('exercises').filter(e => e.id !== id);
            this.saveData('exercises', exercises);
        }

        deleteExercisesByCourse(courseId) {
            const exercises = this.getData('exercises').filter(e => e.courseId !== courseId);
            this.saveData('exercises', exercises);
        }

        // Profile & Gamification
        getProfile() {
            if (this.cache['profile']) return this.cache['profile'];
            return JSON.parse(localStorage.getItem('profile'));
        }

        updateProfile(profile) {
            this.cache['profile'] = profile;
            localStorage.setItem('profile', JSON.stringify(profile));
        }

        completeDay(day) {
            const profile = this.getProfile();
            if (!profile.completedDays.includes(day)) {
                profile.completedDays.push(day);
                profile.points += 100;
                profile.level = Math.floor(profile.completedDays.length / 5) + 1;
                profile.day = Math.min(day + 1, 35);
                this.updateProfile(profile);
            }
        }

        // Stats
        getStats() {
            return {
                courses: this.getCourses().length,
                videos: this.getVideos().length,
                pdfs: this.getPDFs().length,
                dpps: this.getDPPs().length,
                lessonPlans: this.getLessonPlans().length,
                exercises: this.getExercises().length
            };
        }

        // Get course statistics
        getCourseStats(courseId) {
            return {
                videos: this.getVideos(courseId).length,
                pdfs: this.getPDFs(courseId).length,
                dpps: this.getDPPs(courseId).length,
                lessonPlans: this.getLessonPlans(courseId).length,
                exercises: this.getExercises(courseId).length
            };
        }

        // Export database (for backup)
        exportDatabase() {
            return {
                courses: this.getCourses(),
                videos: this.getVideos(),
                pdfs: this.getPDFs(),
                dpps: this.getDPPs(),
                lessonPlans: this.getLessonPlans(),
                exercises: this.getExercises(),
                profile: this.getProfile(),
                exportedAt: new Date().toISOString()
            };
        }

        // Import database (for restore)
        importDatabase(data) {
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid database format');
            }

            if (data.courses) this.saveData('courses', data.courses);
            if (data.videos) this.saveData('videos', data.videos);
            if (data.pdfs) this.saveData('pdfs', data.pdfs);
            if (data.dpps) this.saveData('dpps', data.dpps);
            if (data.lessonPlans) this.saveData('lessonPlans', data.lessonPlans);
            if (data.exercises) this.saveData('exercises', data.exercises);
            if (data.profile) this.saveData('profile', data.profile);
            if (data.students) this.saveData('students', data.students);

            this.cache = {};
            this.optimizeDatabase();
        }

        // Student Management
        getStudents() {
            return this.getData('students');
        }

        getCurrentStudent() {
            const studentId = localStorage.getItem('currentStudent');
            if (!studentId) return null;
            const students = this.getStudents();
            return students.find(s => s.id === studentId) || null;
        }

        setCurrentStudent(studentId) {
            localStorage.setItem('currentStudent', JSON.stringify(studentId));
        }

        addStudent(name, studentId = null) {
            const students = this.getStudents();
            // Check if student already exists
            let student = students.find(s =>
                s.name.toLowerCase() === name.toLowerCase() ||
                (studentId && s.studentId === studentId)
            );

            if (!student) {
                student = {
                    id: Date.now().toString(),
                    name: name,
                    studentId: studentId || `STU${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    level: 1,
                    points: 0,
                    completedCourses: [],
                    watchedVideos: [],
                    playedGames: [],
                    completedExercises: [],
                    timeSpent: 0, // in minutes
                    lastActive: new Date().toISOString(),
                    streak: 0,
                    lastStreakDate: null,
                    analytics: {
                        videosWatched: 0,
                        gamesPlayed: 0,
                        exercisesCompleted: 0,
                        coursesCompleted: 0,
                        totalTimeSpent: 0,
                        dailyActivity: {}
                    }
                };
                students.push(student);
                this.saveData('students', students);
            }

            this.setCurrentStudent(student.id);
            return student;
        }

        updateStudentAnalytics(studentId, type, data) {
            const students = this.getStudents();
            const student = students.find(s => s.id === studentId);
            if (!student) return;

            const today = new Date().toISOString().split('T')[0];

            switch (type) {
                case 'video_watched':
                    if (!student.watchedVideos.includes(data.videoId)) {
                        student.watchedVideos.push(data.videoId);
                        student.analytics.videosWatched++;
                        student.timeSpent += data.duration || 5;
                        student.analytics.totalTimeSpent += data.duration || 5;
                    }
                    break;
                case 'game_played':
                    if (!student.playedGames.includes(data.gameId)) {
                        student.playedGames.push(data.gameId);
                        student.analytics.gamesPlayed++;
                        student.timeSpent += data.duration || 10;
                        student.analytics.totalTimeSpent += data.duration || 10;
                    }
                    student.points += data.points || 10;
                    break;
                case 'exercise_completed':
                    if (!student.completedExercises.includes(data.exerciseId)) {
                        student.completedExercises.push(data.exerciseId);
                        student.analytics.exercisesCompleted++;
                        student.points += data.points || 20;
                    }
                    break;
                case 'course_completed':
                    if (!student.completedCourses.includes(data.courseId)) {
                        student.completedCourses.push(data.courseId);
                        student.analytics.coursesCompleted++;
                        student.points += 100;
                        student.level = Math.floor(student.completedCourses.length / 2) + 1;
                    }
                    break;
            }

            // Update streak
            const lastDate = student.lastStreakDate ? new Date(student.lastStreakDate).toISOString().split('T')[0] : null;
            if (lastDate !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastDate === yesterdayStr) {
                    student.streak++;
                } else if (lastDate !== today) {
                    student.streak = 1;
                }
                student.lastStreakDate = today;
            }

            // Update daily activity
            if (!student.analytics.dailyActivity[today]) {
                student.analytics.dailyActivity[today] = { videos: 0, games: 0, exercises: 0 };
            }
            if (type === 'video_watched') student.analytics.dailyActivity[today].videos++;
            if (type === 'game_played') student.analytics.dailyActivity[today].games++;
            if (type === 'exercise_completed') student.analytics.dailyActivity[today].exercises++;

            student.lastActive = new Date().toISOString();
            this.saveData('students', students);
        }

        getStudentAnalytics(studentId) {
            const student = this.getStudents().find(s => s.id === studentId);
            if (!student) return null;

            return {
                name: student.name,
                level: student.level,
                points: student.points,
                streak: student.streak,
                coursesCompleted: student.completedCourses.length,
                videosWatched: student.watchedVideos.length,
                gamesPlayed: student.playedGames.length,
                exercisesCompleted: student.completedExercises.length,
                timeSpent: Math.floor(student.timeSpent / 60), // hours
                timeSpentMinutes: student.timeSpent,
                analytics: student.analytics
            };
        }
    }

// Export for use in app.js
window.storage = new Storage();

    // Auto-optimize on load
    if(window.storage) {
        setTimeout(() => {
            window.storage.validateDatabase();
        }, 1000);
    }
