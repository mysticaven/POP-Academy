// Official Right-Brain Education Resources
// This file contains all official course resources with real URLs

const OfficialResources = {
    // Course data with official resource links
    courses: [
        {
            id: 'right-brain-101',
            name: 'Right Brain Development',
            description: '35-Day Intensive Program for Right Brain Activation\n\n📚 Official Resources:\n• Right Brain Education Library\n• Training Manual (Scribd PDF)\n• Think Right Centre Workshops',
            color: '#D4F868',
            icon: '🦁',
            resources: [
                { name: 'Right Brain Education Library', url: 'https://www.rightbraineducationlibrary.com', type: 'portal' },
                { name: 'Right Brain Training Manual (PDF)', url: 'https://www.scribd.com/document/613152275/Right-Brain-Education-Manual', type: 'pdf' },
                { name: 'Think Right Centre', url: 'https://thinkright.co.in', type: 'workshop' },
                { name: 'Right Brain Baby Activities', url: 'https://www.rightbrainbaby.com', type: 'activities' },
                { name: 'Shichida Activities Guide', url: 'https://www.shichida.com.au/blog/right-brain-development-activities-for-babies/', type: 'guide' }
            ]
        },
        {
            id: 'handwriting-101',
            name: 'Handwriting Mastery',
            description: 'Right-brain based handwriting training with visual patterns\n\n📚 Official Resources:\n• Right Brain Writing Method\n• Mastering Handwriting Manual\n• Free Printable Worksheets',
            color: '#FF6B9D',
            icon: '✍️',
            resources: [
                { name: 'Right Brain Writing Techniques', url: 'https://diannecraft.org/right-brain-writing/', type: 'portal' },
                { name: 'Mastering Handwriting (PDF)', url: 'https://www.scribd.com/document/363735196/Mastering-Handwriting', type: 'pdf' },
                { name: 'Handwriting Course (Skillshare)', url: 'https://www.skillshare.com/en/classes/improve-your-handwriting-strategies-for-better-form-legibility-and-speed/1332239399', type: 'course' },
                { name: 'Free Tracing Worksheets', url: 'https://www.youtube.com/watch?v=X6aGqcmnztU', type: 'worksheets' }
            ]
        },
        {
            id: 'phonics-101',
            name: 'Phonics & Reading',
            description: 'Visual phonics training for right brain learning\n\n📚 Official Resources:\n• Kiz Phonics Complete Materials\n• Jolly Phonics Official Training\n• Visual Phonics Method',
            color: '#4ECDC4',
            icon: '📖',
            resources: [
                { name: 'Kiz Phonics Materials (PDFs & Games)', url: 'https://www.kizphonics.com/materials/', type: 'portal' },
                { name: 'Visual Phonics Introduction', url: 'https://www.youtube.com/watch?v=Zujjrn8Fg0A', type: 'video' },
                { name: 'Jolly Phonics Webinar', url: 'https://www.youtube.com/watch?v=TIb-eWOyMts', type: 'video' },
                { name: 'Free Phonics Workshop', url: 'https://www.youtube.com/watch?v=W8IyJOBPlhA', type: 'video' }
            ]
        },
        {
            id: 'math-visual-101',
            name: 'Visual Math',
            description: 'Right-brain math through patterns and visualization\n\n📚 Official Resources:\n• BrainCells Math Program\n• Visual Math Games\n• Right Brain Kids Math',
            color: '#FFD93D',
            icon: '🧮',
            resources: [
                { name: 'Right Brain Baby Math Games', url: 'https://www.rightbrainbaby.com', type: 'portal' },
                { name: 'BrainCells Math Program', url: 'https://course.braincells.in', type: 'course' },
                { name: 'Tweedlewink Right Brain Kids Math', url: 'https://www.rightbrainkids.com', type: 'portal' }
            ]
        },
        {
            id: 'memory-101',
            name: 'Memory Training',
            description: 'Advanced memory techniques using right brain\n\n📚 Official Resources:\n• Memory Training Manual\n• Visual Memory Guide\n• Memory Palace Techniques',
            color: '#A78BFA',
            icon: '🧠',
            resources: [
                { name: 'Right Brain Memory Manual (PDF)', url: 'https://www.scribd.com/document/613152275/Right-Brain-Education-Manual', type: 'pdf' },
                { name: 'Visual Memory Lesson Guide', url: 'https://simplebooklet.com/rightbraineducationmanual', type: 'guide' }
            ]
        },
        {
            id: 'art-creative-101',
            name: 'Art & Creativity',
            description: 'Unlock creativity through right brain exercises\n\n📚 Official Resources:\n• Drawing on the Right Side of the Brain\n• Right Brain Kids Art Program\n• Creative Exercises',
            color: '#6BCF7F',
            icon: '🎨',
            resources: [
                { name: 'Drawing on the Right Side of the Brain (Full PDF)', url: 'https://dn790001.ca.archive.org/0/items/pdfy-5dQt81v7NYVZl2La/The%20New%20Drawing%20on%20the%20Right%20Side%20of%20the%20Brain.pdf', type: 'book' },
                { name: 'Right Brain Kids Art & Creativity', url: 'https://www.rightbrainkids.com', type: 'portal' }
            ]
        }
    ],

    // Official educational videos by course
    videos: [
        // RIGHT BRAIN DEVELOPMENT - Official videos
        { id: 'vid-rb-1', courseId: 'right-brain-101', title: 'Right Brain Education Overview', url: 'https://www.youtube.com/watch?v=AJlXPGuHnNY', duration: '8:45', type: 'introduction' },
        { id: 'vid-rb-2', courseId: 'right-brain-101', title: 'Daily Right Brain Activities Demo', url: 'https://www.youtube.com/watch?v=bHDz5hfBJqU', duration: '12:30', type: 'activities' },
        { id: 'vid-rb-3', courseId: 'right-brain-101', title: 'Whole Brain Thinking Documentary', url: 'https://www.youtube.com/watch?v=dqTTojTija8', duration: '52:18', type: 'documentary' },
        { id: 'vid-rb-4', courseId: 'right-brain-101', title: 'Photographic Memory Training', url: 'https://www.youtube.com/watch?v=6OXUgaDaQoo', duration: '10:25', type: 'training' },
        { id: 'vid-rb-5', courseId: 'right-brain-101', title: 'Speed Reading Techniques', url: 'https://www.youtube.com/watch?v=ZwEquW_Yij0', duration: '15:33', type: 'technique' },
        { id: 'vid-rb-6', courseId: 'right-brain-101', title: 'Visualization Meditation', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4', duration: '20:00', type: 'meditation' },

        // HANDWRITING MASTERY - Official tutorial
        { id: 'vid-hw-1', courseId: 'handwriting-101', title: 'Improve Your Handwriting - Complete Guide', url: 'https://www.youtube.com/watch?v=pRebkWHsYOA', duration: '10:15', type: 'tutorial' },
        { id: 'vid-hw-2', courseId: 'handwriting-101', title: 'Handwriting Practice Worksheets Demo', url: 'https://www.youtube.com/watch?v=X6aGqcmnztU', duration: '15:42', type: 'practice' },
        { id: 'vid-hw-3', courseId: 'handwriting-101', title: 'Cursive Writing for Beginners', url: 'https://www.youtube.com/watch?v=OcbzkiwzMPc', duration: '8:30', type: 'tutorial' },
        { id: 'vid-hw-4', courseId: 'handwriting-101', title: 'Hand Lettering 101', url: 'https://www.youtube.com/watch?v=mUd5B5hL6fw', duration: '22:15', type: 'advanced' },
        { id: 'vid-hw-5', courseId: 'handwriting-101', title: 'Fix Your Handwriting in 10 Minutes', url: 'https://www.youtube.com/watch?v=ZFMbiZBqYmI', duration: '10:08', type: 'quick-fix' },
        { id: 'vid-hw-6', courseId: 'handwriting-101', title: 'Calligraphy for Kids', url: 'https://www.youtube.com/watch?v=lTBrFKjJhCo', duration: '12:45', type: 'kids' },

        // PHONICS & READING - Official phonics education
        { id: 'vid-ph-1', courseId: 'phonics-101', title: 'Visual Phonics Introduction & Demo', url: 'https://www.youtube.com/watch?v=Zujjrn8Fg0A', duration: '10:20', type: 'official' },
        { id: 'vid-ph-2', courseId: 'phonics-101', title: 'Jolly Phonics Official Webinar', url: 'https://www.youtube.com/watch?v=TIb-eWOyMts', duration: '45:30', type: 'official' },
        { id: 'vid-ph-3', courseId: 'phonics-101', title: 'Free Phonics Workshop for Parents', url: 'https://www.youtube.com/watch?v=W8IyJOBPlhA', duration: '35:15', type: 'official' },
        { id: 'vid-ph-4', courseId: 'phonics-101', title: 'Phonics Song - Letter Sounds', url: 'https://www.youtube.com/watch?v=BELlZKpi1Zs', duration: '4:30', type: 'song' },
        { id: 'vid-ph-5', courseId: 'phonics-101', title: 'Blending Sounds Practice', url: 'https://www.youtube.com/watch?v=U2HYM9VXz9k', duration: '6:15', type: 'practice' },
        { id: 'vid-ph-6', courseId: 'phonics-101', title: 'Sight Words for Kids', url: 'https://www.youtube.com/watch?v=eHQzCs9nPNA', duration: '18:40', type: 'practice' },

        // VISUAL MATH - Pattern-based learning
        { id: 'vid-vm-1', courseId: 'math-visual-101', title: 'Visual Math - Number Patterns', url: 'https://www.youtube.com/watch?v=SjSHVDfXHQ4', duration: '11:28', type: 'patterns' },
        { id: 'vid-vm-2', courseId: 'math-visual-101', title: 'Mental Math Tricks', url: 'https://www.youtube.com/watch?v=e4PTvXtz4GM', duration: '8:52', type: 'tricks' },
        { id: 'vid-vm-3', courseId: 'math-visual-101', title: 'Multiplication Tricks for Kids', url: 'https://www.youtube.com/watch?v=Av88aD2BTRM', duration: '7:15', type: 'tricks' },
        { id: 'vid-vm-4', courseId: 'math-visual-101', title: 'Visual Fractions Explained', url: 'https://www.youtube.com/watch?v=lKtHzYGPmfI', duration: '9:30', type: 'concept' },
        { id: 'vid-vm-5', courseId: 'math-visual-101', title: 'Fun Math Games', url: 'https://www.youtube.com/watch?v=xtifvF2tkIU', duration: '12:20', type: 'games' },
        { id: 'vid-vm-6', courseId: 'math-visual-101', title: 'Geometry Basics - Shapes and Patterns', url: 'https://www.youtube.com/watch?v=guJGRZ5W33Y', duration: '10:45', type: 'geometry' },

        // MEMORY TRAINING - Advanced techniques
        { id: 'vid-mem-1', courseId: 'memory-101', title: 'Memory Palace Tutorial', url: 'https://www.youtube.com/watch?v=5pGUf6Zqkkk', duration: '16:45', type: 'technique' },
        { id: 'vid-mem-2', courseId: 'memory-101', title: 'Visual Association Method', url: 'https://www.youtube.com/watch?v=pxWjNANZRfU', duration: '14:20', type: 'technique' },
        { id: 'vid-mem-3', courseId: 'memory-101', title: 'Remember Names and Faces', url: 'https://www.youtube.com/watch?v=yonCRH0ql-A', duration: '8:15', type: 'practice' },
        { id: 'vid-mem-4', courseId: 'memory-101', title: 'Photographic Memory Training Guide', url: 'https://www.youtube.com/watch?v=YzP2FqANRhc', duration: '20:30', type: 'advanced' },
        { id: 'vid-mem-5', courseId: 'memory-101', title: 'Memory Improvement for Students', url: 'https://www.youtube.com/watch?v=KsIGB3C_-IQ', duration: '12:40', type: 'students' },
        { id: 'vid-mem-6', courseId: 'memory-101', title: 'Chunking Method Explained', url: 'https://www.youtube.com/watch?v=XZwAQt58wGo', duration: '9:55', type: 'technique' },

        // ART & CREATIVITY - Right brain drawing
        { id: 'vid-art-1', courseId: 'art-creative-101', title: 'Unlock Your Creativity - Drawing Basics', url: 'https://www.youtube.com/watch?v=ewMksAbgdBI', duration: '18:30', type: 'basics' },
        { id: 'vid-art-2', courseId: 'art-creative-101', title: 'Right Brain Drawing - Betty Edwards Method', url: 'https://www.youtube.com/watch?v=7TXEZ4tP06c', duration: '25:15', type: 'official' },
        { id: 'vid-art-3', courseId: 'art-creative-101', title: 'Mandala Art Tutorial', url: 'https://www.youtube.com/watch?v=KYi7SkNneWQ', duration: '15:20', type: 'tutorial' },
        { id: 'vid-art-4', courseId: 'art-creative-101', title: 'Creative Thinking Exercises', url: 'https://www.youtube.com/watch?v=bEusrD8g-dM', duration: '10:45', type: 'exercises' },
        { id: 'vid-art-5', courseId: 'art-creative-101', title: 'Color Theory for Kids', url: 'https://www.youtube.com/watch?v=YeI6Wqn4I78', duration: '8:30', type: 'theory' },
        { id: 'vid-art-6', courseId: 'art-creative-101', title: 'Easy Doodle Art - Creative Expression', url: 'https://www.youtube.com/watch?v=OqIGUIZz7y8', duration: '12:15', type: 'fun' }
    ],

    // Helper functions to integrate with existing storage system
    updateCourses: function () {
        try {
            const currentCourses = JSON.parse(localStorage.getItem('courses') || '[]');
            if (currentCourses.length === 0) {
                // No courses exist, add official courses with resources
                localStorage.setItem('courses', JSON.stringify(this.courses.map(c => ({
                    ...c,
                    createdAt: new Date().toISOString()
                }))));
                console.log('✅ Official courses with resources added');
            } else {
                // Update existing courses with resource links
                const updated = currentCourses.map(course => {
                    const officialCourse = this.courses.find(c => c.id === course.id);
                    if (officialCourse) {
                        return {
                            ...course,
                            description: officialCourse.description,
                            resources: officialCourse.resources
                        };
                    }
                    return course;
                });
                localStorage.setItem('courses', JSON.stringify(updated));
                console.log('✅ Courses updated with official resources');
            }
        } catch (error) {
            console.error('Error updating courses:', error);
        }
    },

    updateVideos: function (force) {
        try {
            const currentVideos = JSON.parse(localStorage.getItem('videos') || '[]');
            if (currentVideos.length === 0 || force === true || confirm('Replace existing videos with official educational videos?')) {
                localStorage.setItem('videos', JSON.stringify(this.videos.map(v => ({
                    ...v,
                    createdAt: new Date().toISOString()
                }))));
                console.log('✅ Official educational videos added');
            }
        } catch (error) {
            console.error('Error updating videos:', error);
        }
    },

    // Initialize all official resources (confirm still required for videos)
    initializeAll: function () {
        console.log('🚀 Initializing official Right-Brain Education resources...');
        this.updateCourses();
        this.updateVideos();
        console.log('✅ All official resources initialized!');
        console.log('📚 Total courses: ' + this.courses.length);
        console.log('🎥 Total videos: ' + this.videos.length);
        alert('✅ Official resources loaded!\n\n📚 ' + this.courses.length + ' courses\n🎥 ' + this.videos.length + ' videos\n\nPlease refresh the page to see all updates.');
    },

    // Seed all official resources without prompts (developer helper)
    seedAll: function () {
        console.log('🔧 Seeding official resources (no prompts)...');
        this.updateCourses();
        this.updateVideos(true);
        console.log('✅ Seed complete. Refresh the page to view changes.');
    }
};

// Auto-run on page load if needed
if (typeof window !== 'undefined') {
    window.OfficialResources = OfficialResources;
    console.log('📚 Official Resources module loaded. Run OfficialResources.initializeAll() or OfficialResources.seedAll() to add resources.');
}
// Official Right-Brain Education Resources
// This file contains all official course resources with real URLs

const OfficialResources = {
    // Course data with official resource links
    courses: [
        {
            id: 'right-brain-101',
            name: 'Right Brain Development',
            description: '35-Day Intensive Program for Right Brain Activation\n\n📚 Official Resources:\n• Right Brain Education Library\n• Training Manual (Scribd PDF)\n• Think Right Centre Workshops',
            color: '#D4F868',
            icon: '🦁',
            resources: [
                { name: 'Right Brain Education Library', url: 'https://www.rightbraineducationlibrary.com', type: 'portal' },
                { name: 'Right Brain Training Manual (PDF)', url: 'https://www.scribd.com/document/613152275/Right-Brain-Education-Manual', type: 'pdf' },
                { name: 'Think Right Centre', url: 'https://thinkright.co.in', type: 'workshop' },
                { name: 'Right Brain Baby Activities', url: 'https://www.rightbrainbaby.com', type: 'activities' },
                { name: 'Shichida Activities Guide', url: 'https://www.shichida.com.au/blog/right-brain-development-activities-for-babies/', type: 'guide' }
            ]
        },
        {
            id: 'handwriting-101',
            name: 'Handwriting Mastery',
            description: 'Right-brain based handwriting training with visual patterns\n\n📚 Official Resources:\n• Right Brain Writing Method\n• Mastering Handwriting Manual\n• Free Printable Worksheets',
            color: '#FF6B9D',
            icon: '✍️',
            resources: [
                { name: 'Right Brain Writing Techniques', url: 'https://diannecraft.org/right-brain-writing/', type: 'portal' },
                { name: 'Mastering Handwriting (PDF)', url: 'https://www.scribd.com/document/363735196/Mastering-Handwriting', type: 'pdf' },
                { name: 'Handwriting Course (Skillshare)', url: 'https://www.skillshare.com/en/classes/improve-your-handwriting-strategies-for-better-form-legibility-and-speed/1332239399', type: 'course' },
                { name: 'Free Tracing Worksheets', url: 'https://www.youtube.com/watch?v=X6aGqcmnztU', type: 'worksheets' }
            ]
        },
        {
            id: 'phonics-101',
            name: 'Phonics & Reading',
            description: 'Visual phonics training for right brain learning\n\n📚 Official Resources:\n• Kiz Phonics Complete Materials\n• Jolly Phonics Official Training\n• Visual Phonics Method',
            color: '#4ECDC4',
            icon: '📖',
            resources: [
                { name: 'Kiz Phonics Materials (PDFs & Games)', url: 'https://www.kizphonics.com/materials/', type: 'portal' },
                { name: 'Visual Phonics Introduction', url: 'https://www.youtube.com/watch?v=Zujjrn8Fg0A', type: 'video' },
                { name: 'Jolly Phonics Webinar', url: 'https://www.youtube.com/watch?v=TIb-eWOyMts', type: 'video' },
                { name: 'Free Phonics Workshop', url: 'https://www.youtube.com/watch?v=W8IyJOBPlhA', type: 'video' }
            ]
        },
        {
            id: 'math-visual-101',
            name: 'Visual Math',
            description: 'Right-brain math through patterns and visualization\n\n📚 Official Resources:\n• BrainCells Math Program\n• Visual Math Games\n• Right Brain Kids Math',
            color: '#FFD93D',
            icon: '🧮',
            resources: [
                { name: 'Right Brain Baby Math Games', url: 'https://www.rightbrainbaby.com', type: 'portal' },
                { name: 'BrainCells Math Program', url: 'https://course.braincells.in', type: 'course' },
                { name: 'Tweedlewink Right Brain Kids Math', url: 'https://www.rightbrainkids.com', type: 'portal' }
            ]
        },
        {
            id: 'memory-101',
            name: 'Memory Training',
            description: 'Advanced memory techniques using right brain\n\n📚 Official Resources:\n• Memory Training Manual\n• Visual Memory Guide\n• Memory Palace Techniques',
            color: '#A78BFA',
            icon: '🧠',
            resources: [
                { name: 'Right Brain Memory Manual (PDF)', url: 'https://www.scribd.com/document/613152275/Right-Brain-Education-Manual', type: 'pdf' },
                { name: 'Visual Memory Lesson Guide', url: 'https://simplebooklet.com/rightbraineducationmanual', type: 'guide' }
            ]
        },
        {
            id: 'art-creative-101',
            name: 'Art & Creativity',
            description: 'Unlock creativity through right brain exercises\n\n📚 Official Resources:\n• Drawing on the Right Side of the Brain\n• Right Brain Kids Art Program\n• Creative Exercises',
            color: '#6BCF7F',
            icon: '🎨',
            resources: [
                { name: 'Drawing on the Right Side of the Brain (Full PDF)', url: 'https://dn790001.ca.archive.org/0/items/pdfy-5dQt81v7NYVZl2La/The%20New%20Drawing%20on%20the%20Right%20Side%20of%20the%20Brain.pdf', type: 'book' },
                { name: 'Right Brain Kids Art & Creativity', url: 'https://www.rightbrainkids.com', type: 'portal' }
            ]
        }
    ],

    // Official educational videos by course
    videos: [
        // RIGHT BRAIN DEVELOPMENT - Official videos
        { id: 'vid-rb-1', courseId: 'right-brain-101', title: 'Right Brain Education Overview', url: 'https://www.youtube.com/watch?v=AJlXPGuHnNY', duration: '8:45', type: 'introduction' },
        { id: 'vid-rb-2', courseId: 'right-brain-101', title: 'Daily Right Brain Activities Demo', url: 'https://www.youtube.com/watch?v=bHDz5hfBJqU', duration: '12:30', type: 'activities' },
        { id: 'vid-rb-3', courseId: 'right-brain-101', title: 'Whole Brain Thinking Documentary', url: 'https://www.youtube.com/watch?v=dqTTojTija8', duration: '52:18', type: 'documentary' },
        { id: 'vid-rb-4', courseId: 'right-brain-101', title: 'Photographic Memory Training', url: 'https://www.youtube.com/watch?v=6OXUgaDaQoo', duration: '10:25', type: 'training' },
        { id: 'vid-rb-5', courseId: 'right-brain-101', title: 'Speed Reading Techniques', url: 'https://www.youtube.com/watch?v=ZwEquW_Yij0', duration: '15:33', type: 'technique' },
        { id: 'vid-rb-6', courseId: 'right-brain-101', title: 'Visualization Meditation', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4', duration: '20:00', type: 'meditation' },

        // HANDWRITING MASTERY - Official tutorial
        { id: 'vid-hw-1', courseId: 'handwriting-101', title: 'Improve Your Handwriting - Complete Guide', url: 'https://www.youtube.com/watch?v=pRebkWHsYOA', duration: '10:15', type: 'tutorial' },
        { id: 'vid-hw-2', courseId: 'handwriting-101', title: 'Handwriting Practice Worksheets Demo', url: 'https://www.youtube.com/watch?v=X6aGqcmnztU', duration: '15:42', type: 'practice' },
        { id: 'vid-hw-3', courseId: 'handwriting-101', title: 'Cursive Writing for Beginners', url: 'https://www.youtube.com/watch?v=OcbzkiwzMPc', duration: '8:30', type: 'tutorial' },
        { id: 'vid-hw-4', courseId: 'handwriting-101', title: 'Hand Lettering 101', url: 'https://www.youtube.com/watch?v=mUd5B5hL6fw', duration: '22:15', type: 'advanced' },
        { id: 'vid-hw-5', courseId: 'handwriting-101', title: 'Fix Your Handwriting in 10 Minutes', url: 'https://www.youtube.com/watch?v=ZFMbiZBqYmI', duration: '10:08', type: 'quick-fix' },
        { id: 'vid-hw-6', courseId: 'handwriting-101', title: 'Calligraphy for Kids', url: 'https://www.youtube.com/watch?v=lTBrFKjJhCo', duration: '12:45', type: 'kids' },

        // PHONICS & READING - Official phonics education
        { id: 'vid-ph-1', courseId: 'phonics-101', title: 'Visual Phonics Introduction & Demo', url: 'https://www.youtube.com/watch?v=Zujjrn8Fg0A', duration: '10:20', type: 'official' },
        { id: 'vid-ph-2', courseId: 'phonics-101', title: 'Jolly Phonics Official Webinar', url: 'https://www.youtube.com/watch?v=TIb-eWOyMts', duration: '45:30', type: 'official' },
        { id: 'vid-ph-3', courseId: 'phonics-101', title: 'Free Phonics Workshop for Parents', url: 'https://www.youtube.com/watch?v=W8IyJOBPlhA', duration: '35:15', type: 'official' },
        { id: 'vid-ph-4', courseId: 'phonics-101', title: 'Phonics Song - Letter Sounds', url: 'https://www.youtube.com/watch?v=BELlZKpi1Zs', duration: '4:30', type: 'song' },
        { id: 'vid-ph-5', courseId: 'phonics-101', title: 'Blending Sounds Practice', url: 'https://www.youtube.com/watch?v=U2HYM9VXz9k', duration: '6:15', type: 'practice' },
        { id: 'vid-ph-6', courseId: 'phonics-101', title: 'Sight Words for Kids', url: 'https://www.youtube.com/watch?v=eHQzCs9nPNA', duration: '18:40', type: 'practice' },

        // VISUAL MATH - Pattern-based learning
        { id: 'vid-vm-1', courseId: 'math-visual-101', title: 'Visual Math - Number Patterns', url: 'https://www.youtube.com/watch?v=SjSHVDfXHQ4', duration: '11:28', type: 'patterns' },
        { id: 'vid-vm-2', courseId: 'math-visual-101', title: 'Mental Math Tricks', url: 'https://www.youtube.com/watch?v=e4PTvXtz4GM', duration: '8:52', type: 'tricks' },
        { id: 'vid-vm-3', courseId: 'math-visual-101', title: 'Multiplication Tricks for Kids', url: 'https://www.youtube.com/watch?v=Av88aD2BTRM', duration: '7:15', type: 'tricks' },
        { id: 'vid-vm-4', courseId: 'math-visual-101', title: 'Visual Fractions Explained', url: 'https://www.youtube.com/watch?v=lKtHzYGPmfI', duration: '9:30', type: 'concept' },
        { id: 'vid-vm-5', courseId: 'math-visual-101', title: 'Fun Math Games', url: 'https://www.youtube.com/watch?v=xtifvF2tkIU', duration: '12:20', type: 'games' },
        { id: 'vid-vm-6', courseId: 'math-visual-101', title: 'Geometry Basics - Shapes and Patterns', url: 'https://www.youtube.com/watch?v=guJGRZ5W33Y', duration: '10:45', type: 'geometry' },

        // MEMORY TRAINING - Advanced techniques
        { id: 'vid-mem-1', courseId: 'memory-101', title: 'Memory Palace Tutorial', url: 'https://www.youtube.com/watch?v=5pGUf6Zqkkk', duration: '16:45', type: 'technique' },
        { id: 'vid-mem-2', courseId: 'memory-101', title: 'Visual Association Method', url: 'https://www.youtube.com/watch?v=pxWjNANZRfU', duration: '14:20', type: 'technique' },
        { id: 'vid-mem-3', courseId: 'memory-101', title: 'Remember Names and Faces', url: 'https://www.youtube.com/watch?v=yonCRH0ql-A', duration: '8:15', type: 'practice' },
        { id: 'vid-mem-4', courseId: 'memory-101', title: 'Photographic Memory Training Guide', url: 'https://www.youtube.com/watch?v=YzP2FqANRhc', duration: '20:30', type: 'advanced' },
        { id: 'vid-mem-5', courseId: 'memory-101', title: 'Memory Improvement for Students', url: 'https://www.youtube.com/watch?v=KsIGB3C_-IQ', duration: '12:40', type: 'students' },
        { id: 'vid-mem-6', courseId: 'memory-101', title: 'Chunking Method Explained', url: 'https://www.youtube.com/watch?v=XZwAQt58wGo', duration: '9:55', type: 'technique' },

        // ART & CREATIVITY - Right brain drawing
        { id: 'vid-art-1', courseId: 'art-creative-101', title: 'Unlock Your Creativity - Drawing Basics', url: 'https://www.youtube.com/watch?v=ewMksAbgdBI', duration: '18:30', type: 'basics' },
        { id: 'vid-art-2', courseId: 'art-creative-101', title: 'Right Brain Drawing - Betty Edwards Method', url: 'https://www.youtube.com/watch?v=7TXEZ4tP06c', duration: '25:15', type: 'official' },
        { id: 'vid-art-3', courseId: 'art-creative-101', title: 'Mandala Art Tutorial', url: 'https://www.youtube.com/watch?v=KYi7SkNneWQ', duration: '15:20', type: 'tutorial' },
        { id: 'vid-art-4', courseId: 'art-creative-101', title: 'Creative Thinking Exercises', url: 'https://www.youtube.com/watch?v=bEusrD8g-dM', duration: '10:45', type: 'exercises' },
        { id: 'vid-art-5', courseId: 'art-creative-101', title: 'Color Theory for Kids', url: 'https://www.youtube.com/watch?v=YeI6Wqn4I78', duration: '8:30', type: 'theory' },
        { id: 'vid-art-6', courseId: 'art-creative-101', title: 'Easy Doodle Art - Creative Expression', url: 'https://www.youtube.com/watch?v=OqIGUIZz7y8', duration: '12:15', type: 'fun' }
    ],

    // Helper functions to integrate with existing storage system
    updateCourses: function () {
        try {
            const currentCourses = JSON.parse(localStorage.getItem('courses') || '[]');
            if (currentCourses.length === 0) {
                // No courses exist, add official courses with resources
                localStorage.setItem('courses', JSON.stringify(this.courses.map(c => ({
                    ...c,
                    createdAt: new Date().toISOString()
                }))));
                console.log('✅ Official courses with resources added');
            } else {
                // Update existing courses with resource links
                const updated = currentCourses.map(course => {
                    const officialCourse = this.courses.find(c => c.id === course.id);
                    if (officialCourse) {
                        return {
                            ...course,
                            description: officialCourse.description,
                            resources: officialCourse.resources
                        };
                    }
                    return course;
                });
                localStorage.setItem('courses', JSON.stringify(updated));
                console.log('✅ Courses updated with official resources');
            }
        } catch (error) {
            console.error('Error updating courses:', error);
        }
    },

    updateVideos: function () {
        try {
            const currentVideos = JSON.parse(localStorage.getItem('videos') || '[]');
            if (currentVideos.length === 0 || confirm('Replace existing videos with official educational videos?')) {
                localStorage.setItem('videos', JSON.stringify(this.videos.map(v => ({
                    ...v,
                    createdAt: new Date().toISOString()
                }))));
                console.log('✅ 36 official educational videos added');
            }
        } catch (error) {
            console.error('Error updating videos:', error);
        }
    },

    // Initialize all official resources
    initializeAll: function () {
        console.log('🚀 Initializing official Right-Brain Education resources...');
        this.updateCourses();
        this.updateVideos();
        console.log('✅ All official resources initialized!');
        console.log('📚 Total courses: 6');
        console.log('🎥 Total videos: 36');
        console.log('🔗 Total resource links: 20+');
        alert('✅ Official resources loaded!\n\n📚 6 courses\n🎥 36 videos\n🔗 20+ resource links\n\nPlease refresh the page to see all updates.');
    }
};

// Auto-run on page load if needed
if (typeof window !== 'undefined') {
    window.OfficialResources = OfficialResources;
    console.log('📚 Official Resources module loaded. Run OfficialResources.initializeAll() to add all resources.');
}
