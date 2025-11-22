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
