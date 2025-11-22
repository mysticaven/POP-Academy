// Main application with admin login, PDF/video management, and gamification
class App {
    constructor() {
        this.currentCourse = null;
        this.selectedColor = '#FF6B9D';
        this.isAdmin = false;
        this.currentStudent = null;
        this.init();
    }

    init() {
        this.setupLogin();
    }

    setupLogin() {
        // Login tabs
        const loginTabs = document.querySelectorAll('.login-tab');
        loginTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                loginTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.login-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabName}-login`).classList.add('active');
            });
        });

        // Student login
        const studentLoginForm = document.getElementById('student-login-form');
        studentLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('student-name').value.trim();
            const studentId = document.getElementById('student-id').value.trim();

            if (!name) {
                alert('Please enter your name!');
                return;
            }

            this.currentStudent = window.storage.addStudent(name, studentId || null);
            this.isAdmin = false;
            window.storage.setAdminMode(false);
            this.enterApp();
        });

        // Admin login
        const adminLoginForm = document.getElementById('admin-login-form');
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;

            if (password === '2004') {
                this.isAdmin = true;
                this.currentStudent = null;
                if (window.storage) {
                    window.storage.setAdminMode(true);
                }
                this.enterApp();
            } else {
                alert('Incorrect password!');
            }
        });
    }

    enterApp() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';

        // Update mode badge
        const modeBadge = document.querySelector('.mode-badge');
        if (this.isAdmin) {
            modeBadge.textContent = 'Admin Mode';
            document.body.classList.remove('student-mode');
        } else {
            modeBadge.textContent = this.currentStudent ? `${this.currentStudent.name}` : 'Student';
            document.body.classList.add('student-mode');
        }

        // Hide admin buttons if not admin
        if (!this.isAdmin) {
            document.body.classList.add('view-mode');
        } else {
            document.body.classList.remove('view-mode');
        }

        this.setupApp();
    }

    setupApp() {
        this.setupNavigation();
        this.setupModals();
        this.setupTabs();
        this.setupLogout();
        this.renderCourses();
        this.renderProfile();
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Do you want to switch user or logout?')) {
                    this.logout();
                }
            });
        }
    }

    logout() {
        // Clear current session
        if (this.currentStudent) {
            window.storage.setCurrentStudent(null);
        }
        window.storage.setAdminMode(false);

        // Reset app state
        this.isAdmin = false;
        this.currentStudent = null;
        this.currentCourse = null;

        // Show login screen
        document.getElementById('app-container').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';

        // Reset login forms
        document.getElementById('student-login-form').reset();
        document.getElementById('admin-login-form').reset();
        document.querySelector('.login-tab.active').classList.remove('active');
        document.querySelector('.login-tab-content.active').classList.remove('active');
        document.querySelector('.login-tab[data-tab="student"]').classList.add('active');
        document.getElementById('student-login').classList.add('active');
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.navigateTo(page);
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    navigateTo(page) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(`${page}-page`).classList.add('active');
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`${tab}-tab`).classList.add('active');
            });
        });
    }

    setupModals() {
        // Course modal
        const addCourseBtn = document.getElementById('add-course-btn');
        const courseModal = document.getElementById('add-course-modal');
        const cancelCourse = document.getElementById('cancel-course');
        const courseForm = document.getElementById('add-course-form');
        const colorOptions = document.querySelectorAll('.color-option');

        if (addCourseBtn) {
            addCourseBtn.addEventListener('click', () => courseModal.classList.add('active'));
        }
        cancelCourse.addEventListener('click', () => {
            courseModal.classList.remove('active');
            courseForm.reset();
        });

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.selectedColor = option.dataset.color;
            });
        });

        courseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCourse();
            courseModal.classList.remove('active');
            courseForm.reset();
        });

        // Video modal
        const addVideoBtn = document.getElementById('add-video-btn');
        const videoModal = document.getElementById('add-video-modal');
        const videoForm = document.getElementById('add-video-form');

        if (addVideoBtn) {
            addVideoBtn.addEventListener('click', () => videoModal.classList.add('active'));
        }

        videoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVideo();
            videoModal.classList.remove('active');
            videoForm.reset();
        });

        // PDF modal
        const addPdfBtn = document.getElementById('add-pdf-btn');
        const pdfModal = document.getElementById('add-pdf-modal');
        const pdfForm = document.getElementById('add-pdf-form');

        if (addPdfBtn) {
            addPdfBtn.addEventListener('click', () => pdfModal.classList.add('active'));
        }

        pdfForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPDF();
            pdfModal.classList.remove('active');
            pdfForm.reset();
        });

        // DPP modal (reuse PDF modal structure)
        const addDppBtn = document.getElementById('add-dpp-btn');
        const dppModal = document.getElementById('add-dpp-modal');
        const dppForm = document.getElementById('add-dpp-form');

        if (addDppBtn) {
            addDppBtn.addEventListener('click', () => dppModal.classList.add('active'));
        }

        dppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addDPP();
            dppModal.classList.remove('active');
            dppForm.reset();
        });

        // Lesson Plan modal
        const addLessonPlanBtn = document.getElementById('add-lesson-plan-btn');
        const lessonPlanModal = document.getElementById('add-lesson-plan-modal');
        const lessonPlanForm = document.getElementById('add-lesson-plan-form');

        if (addLessonPlanBtn) {
            addLessonPlanBtn.addEventListener('click', () => lessonPlanModal.classList.add('active'));
        }

        lessonPlanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addLessonPlan();
            lessonPlanModal.classList.remove('active');
            lessonPlanForm.reset();
        });

        // Game modal
        const addGameForm = document.getElementById('add-game-form');
        if (addGameForm) {
            addGameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addGame();
            });
        }
        this.setupGameModal();

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        // Back button
        const backBtn = document.getElementById('back-to-courses');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.navigateTo('courses');
                // set sidebar active to courses
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                const coursesNav = document.querySelector('.nav-item[data-page="courses"]');
                if (coursesNav) coursesNav.classList.add('active');
            });
        }

        // Video player close
        const closeVideo = document.getElementById('close-video');
        if (closeVideo) {
            closeVideo.addEventListener('click', () => {
                document.getElementById('video-player-modal').classList.remove('active');
                document.getElementById('video-player-container').innerHTML = '';
            });
        }

        // PDF viewer close
        const closePdf = document.getElementById('close-pdf');
        if (closePdf) {
            closePdf.addEventListener('click', () => {
                document.getElementById('pdf-viewer-modal').classList.remove('active');
            });
        }

        // Print PDF
        const printPdfBtn = document.getElementById('print-pdf-btn');
        if (printPdfBtn) {
            printPdfBtn.addEventListener('click', () => {
                const frame = document.getElementById('pdf-viewer-frame');
                frame.contentWindow.print();
            });
        }
    }

    addCourse() {
        const name = document.getElementById('course-name').value;
        const description = document.getElementById('course-description').value;

        const course = {
            name,
            description,
            color: this.selectedColor,
            icon: this.getRandomIcon()
        };

        window.storage.addCourse(course);
        this.renderCourses();
        this.renderProfile();
    }

    getRandomIcon() {
        const icons = ['🧠', '🎨', '🎵', '🧮', '🌍', '🔬', '✏️', '📖', '🎭', '🏃', '🎯', '🌟', '⭐', '🎪'];
        return icons[Math.floor(Math.random() * icons.length)];
    }

    renderCourses() {
        const grid = document.getElementById('courses-grid');
        const courses = window.storage.getCourses();

        grid.innerHTML = courses.map(course => `
            <div class="course-card" onclick="app.openCourse('${course.id}')">
                <div class="course-header" style="background: linear-gradient(135deg, ${course.color} 0%, ${this.lightenColor(course.color)} 100%)">
                    <div class="course-illustration">${course.icon}</div>
                </div>
                <div class="course-body">
                    <div class="course-title">${course.name}</div>
                    <div class="course-meta">
                        <span>${window.storage.getVideos(course.id).length} Videos</span>
                    </div>
                    ${this.isAdmin ? `
                        <div class="course-actions">
                            <button class="course-btn course-btn-primary" onclick="event.stopPropagation(); app.openCourse('${course.id}')">Open</button>
                            <button class="course-btn course-btn-secondary" onclick="event.stopPropagation(); app.deleteCourse('${course.id}')">Delete</button>
                        </div>
                    ` : `
                        <div class="course-actions">
                            <button class="course-btn course-btn-primary" onclick="event.stopPropagation(); app.openCourse('${course.id}')">Start Learning</button>
                        </div>
                    `}
                </div>
            </div>
        `).join('');
    }

    lightenColor(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const newR = Math.min(255, r + 30);
        const newG = Math.min(255, g + 30);
        const newB = Math.min(255, b + 30);

        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }

    deleteCourse(courseId) {
        if (confirm('Are you sure you want to delete this course and all its content?')) {
            window.storage.deleteCourse(courseId);
            this.renderCourses();
            this.renderProfile();
        }
    }

    openCourse(courseId) {
        this.currentCourse = courseId;
        const course = window.storage.getCourses().find(c => c.id === courseId);
        document.getElementById('course-detail-title').textContent = course.name;

        this.renderVideos(courseId);
        this.renderPDFs(courseId);
        this.renderDPPs(courseId);
        this.renderLessonPlans(courseId);
        this.renderExercises(courseId);

        this.navigateTo('course-detail');
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    }

    addVideo() {
        const title = document.getElementById('video-title').value;
        const url = document.getElementById('video-url').value;
        const duration = document.getElementById('video-duration').value;

        window.storage.addVideo({
            courseId: this.currentCourse,
            title,
            url,
            duration
        });

        this.renderVideos(this.currentCourse);
        this.renderProfile();
    }

    renderVideos(courseId) {
        const list = document.getElementById('videos-list');
        const videos = window.storage.getVideos(courseId);

        list.innerHTML = videos.length > 0 ? videos.map(video => `
            <div class="content-item">
                <div class="content-info">
                    <div class="content-icon" style="background: linear-gradient(135deg, #FF6B9D 0%, #FF8FB3 100%); color: white;">
                        🎥
                    </div>
                    <div>
                        <div class="content-title">${video.title}</div>
                        <div class="content-meta">${video.duration || 'No duration'}</div>
                    </div>
                </div>
                <div class="content-actions">
                    <button class="btn-icon" onclick="app.playVideo('${video.id}')" title="Play">▶️</button>
                    ${this.isAdmin ? `<button class="btn-icon delete" onclick="app.deleteVideo('${video.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
        `).join('') : '<p style="text-align: center; color: #9ca3af; padding: 40px;">No videos added yet</p>';
    }

    playVideo(videoId) {
        const video = window.storage.getVideos().find(v => v.id === videoId);
        const modal = document.getElementById('video-player-modal');
        const container = document.getElementById('video-player-container');
        const title = document.getElementById('video-player-title');

        title.textContent = video.title;

        // Track video watch for students
        if (this.currentStudent && !this.isAdmin) {
            window.storage.updateStudentAnalytics(this.currentStudent.id, 'video_watched', {
                videoId: videoId,
                duration: this.parseDuration(video.duration) || 5
            });
            this.renderProfile();
        }

        // Embed video based on URL
        let embedHtml = '';
        if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
            const videoId = this.extractYouTubeId(video.url);
            embedHtml = `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (video.url.includes('facebook.com')) {
            embedHtml = `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>`;
        } else {
            embedHtml = `<video controls style="width: 100%; max-height: 500px;"><source src="${video.url}" type="video/mp4"></video>`;
        }

        container.innerHTML = embedHtml;
        modal.classList.add('active');
    }

    parseDuration(duration) {
        if (!duration) return 5;
        const parts = duration.split(':');
        if (parts.length === 2) {
            return parseInt(parts[0]) + parseInt(parts[1]) / 60;
        }
        return 5;
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    deleteVideo(videoId) {
        if (confirm('Delete this video?')) {
            window.storage.deleteVideo(videoId);
            this.renderVideos(this.currentCourse);
            this.renderProfile();
        }
    }

    addPDF() {
        const title = document.getElementById('pdf-title').value;
        const fileInput = document.getElementById('pdf-file');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                window.storage.addPDF({
                    courseId: this.currentCourse,
                    title,
                    data: e.target.result
                });
                this.renderPDFs(this.currentCourse);
                this.renderProfile();
            };
            reader.readAsDataURL(file);
        }
    }

    renderPDFs(courseId) {
        const list = document.getElementById('pdfs-list');
        const pdfs = window.storage.getPDFs(courseId);

        list.innerHTML = pdfs.length > 0 ? pdfs.map(pdf => `
            <div class="content-item">
                <div class="content-info">
                    <div class="content-icon" style="background: linear-gradient(135deg, #4ECDC4 0%, #6EDDD5 100%); color: white;">
                        📄
                    </div>
                    <div>
                        <div class="content-title">${pdf.title}</div>
                        <div class="content-meta">PDF Document</div>
                    </div>
                </div>
                <div class="content-actions">
                    <button class="btn-icon" onclick="app.viewPDF('${pdf.id}')" title="View">👁️</button>
                    <button class="btn-icon" onclick="app.printPDF('${pdf.id}')" title="Print">🖨️</button>
                    ${this.isAdmin ? `<button class="btn-icon delete" onclick="app.deletePDF('${pdf.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
        `).join('') : '<p style="text-align: center; color: #9ca3af; padding: 40px;">No PDFs added yet</p>';
    }

    viewPDF(pdfId) {
        const pdf = window.storage.getPDFs().find(p => p.id === pdfId);
        if (!pdf) return;
        const modal = document.getElementById('pdf-viewer-modal');
        const frame = document.getElementById('pdf-viewer-frame');
        const title = document.getElementById('pdf-viewer-title');

        title.textContent = pdf.title;
        frame.src = pdf.data;
        modal.classList.add('active');
    }

    viewDPP(dppId) {
        const dpp = window.storage.getDPPs().find(p => p.id === dppId);
        if (!dpp) return;
        const modal = document.getElementById('pdf-viewer-modal');
        const frame = document.getElementById('pdf-viewer-frame');
        const title = document.getElementById('pdf-viewer-title');

        title.textContent = dpp.title;
        frame.src = dpp.data;
        modal.classList.add('active');
    }

    viewLessonPlan(planId) {
        const plan = window.storage.getLessonPlans().find(p => p.id === planId);
        if (!plan) return;
        const modal = document.getElementById('pdf-viewer-modal');
        const frame = document.getElementById('pdf-viewer-frame');
        const title = document.getElementById('pdf-viewer-title');

        title.textContent = plan.title;
        frame.src = plan.data;
        modal.classList.add('active');
    }

    printPDF(pdfId) {
        const pdf = window.storage.getPDFs().find(p => p.id === pdfId);
        if (!pdf) return;
        const printWindow = window.open(pdf.data);
        printWindow.onload = () => {
            printWindow.print();
        };
    }

    deletePDF(pdfId) {
        if (confirm('Delete this PDF?')) {
            window.storage.deletePDF(pdfId);
            this.renderPDFs(this.currentCourse);
            this.renderProfile();
        }
    }

    addDPP() {
        const title = document.getElementById('dpp-title').value;
        const fileInput = document.getElementById('dpp-file');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                window.storage.addDPP({
                    courseId: this.currentCourse,
                    title,
                    data: e.target.result
                });
                this.renderDPPs(this.currentCourse);
                this.renderProfile();
            };
            reader.readAsDataURL(file);
        }
    }

    deleteDPP(dppId) {
        if (confirm('Delete this DPP?')) {
            window.storage.deleteDPP(dppId);
            this.renderDPPs(this.currentCourse);
            this.renderProfile();
        }
    }

    addLessonPlan() {
        const title = document.getElementById('lesson-plan-title').value;
        const fileInput = document.getElementById('lesson-plan-file');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                window.storage.addLessonPlan({
                    courseId: this.currentCourse,
                    title,
                    data: e.target.result
                });
                this.renderLessonPlans(this.currentCourse);
                this.renderProfile();
            };
            reader.readAsDataURL(file);
        }
    }

    deleteLessonPlan(planId) {
        if (confirm('Delete this Lesson Plan?')) {
            window.storage.deleteLessonPlan(planId);
            this.renderLessonPlans(this.currentCourse);
            this.renderProfile();
        }
    }

    renderDPPs(courseId) {
        const list = document.getElementById('dpp-list');
        const dpps = window.storage.getDPPs(courseId);

        list.innerHTML = dpps.length > 0 ? dpps.map(dpp => `
            <div class="content-item">
                <div class="content-info">
                    <div class="content-icon" style="background: linear-gradient(135deg, #FFD93D 0%, #FFC700 100%); color: white;">
                        📝
                    </div>
                    <div>
                        <div class="content-title">${dpp.title}</div>
                        <div class="content-meta">Daily Practice Problem</div>
                    </div>
                </div>
                <div class="content-actions">
                    <button class="btn-icon" onclick="app.viewDPP('${dpp.id}')" title="View">👁️</button>
                    ${this.isAdmin ? `<button class="btn-icon delete" onclick="app.deleteDPP('${dpp.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
        `).join('') : '<p style="text-align: center; color: #9ca3af; padding: 40px;">No DPPs added yet</p>';
    }

    renderLessonPlans(courseId) {
        const list = document.getElementById('lesson-plans-list');
        const plans = window.storage.getLessonPlans(courseId);

        list.innerHTML = plans.length > 0 ? plans.map(plan => `
            <div class="content-item">
                <div class="content-info">
                    <div class="content-icon" style="background: linear-gradient(135deg, #6BCF7F 0%, #8FE09F 100%); color: white;">
                        📋
                    </div>
                    <div>
                        <div class="content-title">${plan.title}</div>
                        <div class="content-meta">Lesson Plan</div>
                    </div>
                </div>
                <div class="content-actions">
                    <button class="btn-icon" onclick="app.viewLessonPlan('${plan.id}')" title="View">👁️</button>
                    ${this.isAdmin ? `<button class="btn-icon delete" onclick="app.deleteLessonPlan('${plan.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
        `).join('') : '<p style="text-align: center; color: #9ca3af; padding: 40px;">No lesson plans added yet</p>';
    }

    renderExercises(courseId) {
        const list = document.getElementById('exercises-list');
        const exercises = window.storage.getExercises(courseId);

        list.innerHTML = exercises.length > 0 ? exercises.map(exercise => {
            const isGame = exercise.type === 'game' || ['ex-2', 'ex-6', 'ex-7', 'ex-8', 'ex-9', 'ex-10', 'ex-11', 'ex-12', 'ex-13', 'ex-ai-1', 'ex-ai-2', 'ex-ai-3', 'ex-cv-1', 'ex-cv-2', 'ex-cv-3'].includes(exercise.id);
            const action = isGame ? `window.games.startGame('${exercise.id}')` : `alert('Exercise: ${exercise.title}')`;
            const gameIcon = exercise.gameType === 'ai' ? '🤖' : exercise.gameType === 'cv' ? '📷' : '🎮';

            return `
            <div class="content-item">
                <div class="content-info">
                    <div class="content-icon" style="background: linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%); color: white;">
                        ${isGame ? gameIcon : '🏃'}
                    </div>
                    <div>
                        <div class="content-title">${exercise.title}</div>
                        <div class="content-meta">${exercise.description || 'Brain Training Game'}</div>
                    </div>
                </div>
                <div class="content-actions">
                    <button class="btn-icon" onclick="${action}" title="Play">▶️</button>
                    ${this.isAdmin ? `<button class="btn-icon delete" onclick="app.deleteExercise('${exercise.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
            `;
        }).join('') : '<p style="text-align: center; color: #9ca3af; padding: 40px;">No games added yet</p>';

        // Add "Add Game" button for admin
        if (this.isAdmin) {
            list.innerHTML += `
                <div class="content-item" style="border: 2px dashed rgba(0,0,0,0.1); cursor: pointer; background: transparent; box-shadow: none;" onclick="app.showAddGameModal()">
                    <div class="content-info">
                        <div class="content-icon" style="background: var(--bg-input); color: var(--text-muted);">
                            ➕
                        </div>
                        <div>
                            <div class="content-title" style="color: var(--text-muted);">Add New Game</div>
                            <div class="content-meta">Create a custom brain training game</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    showAddGameModal() {
        document.getElementById('add-game-modal').classList.add('active');
    }

    addGame() {
        const title = document.getElementById('game-title').value;
        const description = document.getElementById('game-description').value;
        const gameType = document.getElementById('game-type').value;
        const ollamaModel = document.getElementById('ollama-model')?.value || 'llama2';

        window.storage.addExercise({
            courseId: this.currentCourse,
            title,
            description,
            type: 'game',
            gameType: gameType,
            ollamaModel: gameType === 'ai' ? ollamaModel : undefined
        });
        this.renderExercises(this.currentCourse);
        document.getElementById('add-game-modal').classList.remove('active');
        document.getElementById('add-game-form').reset();
    }

    setupGameModal() {
        const gameTypeSelect = document.getElementById('game-type');
        const ollamaModelGroup = document.getElementById('ollama-model-group');

        if (gameTypeSelect && ollamaModelGroup) {
            gameTypeSelect.addEventListener('change', () => {
                if (gameTypeSelect.value === 'ai') {
                    ollamaModelGroup.style.display = 'block';
                } else {
                    ollamaModelGroup.style.display = 'none';
                }
            });
        }
    }

    deleteExercise(exerciseId) {
        if (confirm('Delete this game?')) {
            window.storage.deleteExercise(exerciseId);
            this.renderExercises(this.currentCourse);
        }
    }

    renderProfile() {
        if (this.isAdmin) {
            // Admin profile - show system stats
            const stats = window.storage.getStats();
            document.getElementById('profile-name').textContent = 'Admin';
            document.getElementById('profile-level').textContent = 'Administrator';
            document.getElementById('stat-courses-completed').textContent = stats.courses;
            document.getElementById('stat-videos-watched').textContent = stats.videos;
            document.getElementById('stat-games-played').textContent = stats.exercises;
            document.getElementById('stat-points').textContent = '-';
            document.getElementById('stat-time-spent').textContent = '-';
            document.getElementById('stat-streak').textContent = '-';
        } else if (this.currentStudent) {
            // Student profile - show analytics
            const analytics = window.storage.getStudentAnalytics(this.currentStudent.id);
            if (analytics) {
                document.getElementById('profile-name').textContent = analytics.name;
                document.getElementById('profile-level').textContent = `Level ${analytics.level} Explorer`;
                document.getElementById('stat-courses-completed').textContent = analytics.coursesCompleted;
                document.getElementById('stat-videos-watched').textContent = analytics.videosWatched;
                document.getElementById('stat-games-played').textContent = analytics.gamesPlayed;
                document.getElementById('stat-points').textContent = analytics.points;
                document.getElementById('stat-time-spent').textContent = `${analytics.timeSpent}h`;
                document.getElementById('stat-streak').textContent = analytics.streak;

                // Render progress chart
                this.renderProgressChart(analytics);

                // Render recent activity
                this.renderRecentActivity(analytics);
            }
        } else {
            // Default
            document.getElementById('profile-name').textContent = 'Student';
            document.getElementById('profile-level').textContent = 'Level 1 Explorer';
        }
    }

    renderProgressChart(analytics) {
        const chart = document.getElementById('progress-chart');
        const courses = window.storage.getCourses();
        const completed = analytics.coursesCompleted;
        const total = courses.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        chart.innerHTML = `
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="progress-text">${completed} of ${total} courses completed (${percentage}%)</div>
        `;
    }

    renderRecentActivity(analytics) {
        const activityList = document.getElementById('recent-activity');
        const student = window.storage.getCurrentStudent();
        if (!student) return;

        const activities = [];

        // Get recent videos
        const recentVideos = student.watchedVideos.slice(-5).reverse();
        recentVideos.forEach(videoId => {
            const video = window.storage.getVideos().find(v => v.id === videoId);
            if (video) {
                activities.push({
                    type: 'video',
                    icon: '🎥',
                    text: `Watched: ${video.title}`,
                    time: 'Recently'
                });
            }
        });

        // Get recent games
        const recentGames = student.playedGames.slice(-5).reverse();
        recentGames.forEach(gameId => {
            const exercise = window.storage.getExercises().find(e => e.id === gameId);
            if (exercise) {
                activities.push({
                    type: 'game',
                    icon: '🎮',
                    text: `Played: ${exercise.title}`,
                    time: 'Recently'
                });
            }
        });

        if (activities.length === 0) {
            activityList.innerHTML = '<p style="text-align: center; color: #718096; padding: 20px;">No recent activity</p>';
        } else {
            activityList.innerHTML = activities.slice(0, 10).map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `).join('');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
