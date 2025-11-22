class Games {
    constructor() {
        this.modal = document.getElementById('video-player-modal'); // Reusing video modal for games
        this.container = document.getElementById('video-player-container');
        this.title = document.getElementById('video-player-title');
        this.gameStartTime = null;
    }

    startGame(gameId) {
        this.modal.classList.add('active');
        this.container.innerHTML = '';
        this.gameStartTime = Date.now();
        this.currentGameId = gameId;

        // Get exercise info to determine game type
        const exercises = window.storage.getExercises();
        const exercise = exercises.find(e => e.id === gameId);
        const gameType = exercise?.gameType || 'speed';

        switch (gameId) {
            case 'ex-6': // Speed Reaction
            case 'ex-2': // High Speed Flashcards
                this.title.textContent = exercise?.title || 'Speed Reaction';
                this.startSpeedGame();
                break;
            case 'ex-7': // Memory Training
                this.title.textContent = exercise?.title || 'Memory Training';
                this.startMemoryGame();
                break;
            case 'ex-8': // Flappy Bird
                this.title.textContent = exercise?.title || 'Flappy Bird';
                this.startFlappyBird();
                break;
            case 'ex-9': // Pattern Match
                this.title.textContent = exercise?.title || 'Pattern Match';
                this.startPatternMatch();
                break;
            case 'ex-10': // Visual Memory
                this.title.textContent = exercise?.title || 'Visual Memory';
                this.startVisualMemory();
                break;
            case 'ex-11': // Math Speed
                this.title.textContent = exercise?.title || 'Math Speed';
                this.startMathSpeed();
                break;
            case 'ex-12': // Word Recall
                this.title.textContent = exercise?.title || 'Word Recall';
                this.startWordRecall();
                break;
            case 'ex-ai-1': // AI Storytelling
            case 'ex-ai-2': // AI Quiz
            case 'ex-ai-3': // AI Drawing Helper
                this.title.textContent = exercise?.title || 'AI Game';
                this.startAIGame(gameId, gameType);
                break;
            case 'ex-cv-1': // Face Expression
            case 'ex-cv-2': // Hand Gesture
            case 'ex-cv-3': // Object Recognition
                this.title.textContent = exercise?.title || 'CV Game';
                this.startCVGame(gameId, gameType);
                break;
            default:
                // Handle custom games by gameType
                if (exercise) {
                    this.title.textContent = exercise.title;
                    if (gameType === 'ai') {
                        this.startAIGame(gameId, gameType);
                    } else if (gameType === 'cv') {
                        this.startCVGame(gameId, gameType);
                    } else {
                        switch (gameType) {
                            case 'speed':
                                this.startSpeedGame();
                                break;
                            case 'memory':
                                this.startMemoryGame();
                                break;
                            case 'pattern':
                                this.startPatternMatch();
                                break;
                            case 'visual':
                                this.startVisualMemory();
                                break;
                            case 'math':
                                this.startMathSpeed();
                                break;
                            case 'word':
                                this.startWordRecall();
                                break;
                            case 'focus':
                                this.startFlappyBird();
                                break;
                            default:
                                this.startSpeedGame();
                        }
                    }
                } else {
                    this.container.innerHTML = '<h2>Game not found</h2>';
                }
        }
    }

    startSpeedGame() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Score: <span id="speed-score" class="game-score">0</span></h3>
                </div>
                <div id="grid" class="game-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 300px;">
                    ${Array(9).fill(0).map((_, i) => `<div class="game-cell" data-index="${i}" style="height: 80px;"></div>`).join('')}
                </div>
                <div class="game-controls">
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">Stop Game</button>
                </div>
            </div>
        `;

        let score = 0;
        let activeIndex = -1;
        let gameInterval;

        const cells = document.querySelectorAll('.game-cell');

        const activateRandomCell = () => {
            cells.forEach(c => c.classList.remove('active'));
            activeIndex = Math.floor(Math.random() * 9);
            cells[activeIndex].classList.add('active');
        };

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (parseInt(cell.dataset.index) === activeIndex) {
                    score++;
                    document.getElementById('speed-score').textContent = score;
                    activateRandomCell();
                }
            });
        });

        activateRandomCell();
    }

    startMemoryGame() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Level: <span id="memory-level" class="game-score">1</span></h3>
                </div>
                <div id="memory-grid" class="memory-grid">
                    <div class="memory-btn" data-color="red" style="background: #ef4444;"></div>
                    <div class="memory-btn" data-color="green" style="background: #10b981;"></div>
                    <div class="memory-btn" data-color="blue" style="background: #3b82f6;"></div>
                    <div class="memory-btn" data-color="yellow" style="background: #f59e0b;"></div>
                </div>
                <div class="game-controls">
                    <button id="start-mem" class="game-btn game-btn-primary">Start</button>
                </div>
            </div>
        `;

        let sequence = [];
        let playerSequence = [];
        let level = 1;
        const colors = ['red', 'green', 'blue', 'yellow'];
        const btns = document.querySelectorAll('.memory-btn');

        const playSequence = async () => {
            playerSequence = [];
            for (let color of sequence) {
                await new Promise(r => setTimeout(r, 500));
                const btn = document.querySelector(`.memory-btn[data-color="${color}"]`);
                btn.classList.add('active');
                await new Promise(r => setTimeout(r, 500));
                btn.classList.remove('active');
            }
        };

        const nextLevel = () => {
            sequence.push(colors[Math.floor(Math.random() * 4)]);
            document.getElementById('memory-level').textContent = level;
            playSequence();
        };

        document.getElementById('start-mem').addEventListener('click', () => {
            sequence = [];
            level = 1;
            nextLevel();
            document.getElementById('start-mem').style.display = 'none';
        });

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 200);

                playerSequence.push(color);

                if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
                    alert('Game Over! Score: ' + (level - 1));
                    document.getElementById('start-mem').style.display = 'inline-block';
                    return;
                }

                if (playerSequence.length === sequence.length) {
                    level++;
                    setTimeout(nextLevel, 1000);
                }
            });
        });
        let pipes = [];
        let frame = 0;
        let score = 0;
        let isGameOver = false;

        const draw = () => {
            if (isGameOver) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Bird
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            ctx.fillStyle = '#FFD93D';
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Pipes
            if (frame % 100 === 0) {
                pipes.push({ x: canvas.width, gap: 120, topHeight: Math.random() * 200 + 50 });
            }

            pipes.forEach((pipe, index) => {
                pipe.x -= 2;
                ctx.fillStyle = '#2ecc71';

                // Top pipe
                ctx.beginPath();
                ctx.roundRect(pipe.x, 0, 50, pipe.topHeight, [0, 0, 8, 8]);
                ctx.fill();

                // Bottom pipe
                ctx.beginPath();
                ctx.roundRect(pipe.x, pipe.topHeight + pipe.gap, 50, canvas.height - pipe.topHeight - pipe.gap, [8, 8, 0, 0]);
                ctx.fill();

                if (pipe.x + 50 < 0) pipes.splice(index, 1);

                // Collision
                if (
                    bird.x + 15 > pipe.x && bird.x - 15 < pipe.x + 50 &&
                    (bird.y - 15 < pipe.topHeight || bird.y + 15 > pipe.topHeight + pipe.gap) ||
                    bird.y + 15 > canvas.height || bird.y - 15 < 0
                ) {
                    isGameOver = true;
                    alert('Game Over! Score: ' + score);
                }

                if (pipe.x === 50) score++;
            });

            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Outfit';
            ctx.fillText('Score: ' + score, 20, 40);

            frame++;
            requestAnimationFrame(draw);
        };

        canvas.addEventListener('click', () => {
            bird.velocity = bird.jump;
        });

        draw();
    }

    startPatternMatch() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Score: <span id="pattern-score" class="game-score">0</span> | Time: <span id="pattern-time">30</span>s</h3>
                </div>
                <div id="pattern-grid" class="game-grid" style="grid-template-columns: repeat(4, 1fr); max-width: 400px;">
                </div>
                <div class="game-controls">
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">Stop Game</button>
                </div>
            </div>
        `;

        let score = 0;
        let timeLeft = 30;
        let selectedCards = [];
        let matchedPairs = 0;
        const symbols = ['🎯', '⭐', '🎨', '🎵', '🧠', '🌟', '🎪', '🎭'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        const grid = document.getElementById('pattern-grid');

        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'game-cell';
            card.dataset.index = index;
            card.dataset.symbol = symbol;
            card.style.height = '80px';
            card.style.color = 'transparent';
            card.textContent = symbol; // Pre-fill but hide with color
            card.addEventListener('click', () => flipCard(card, index));
            grid.appendChild(card);
        });

        const flipCard = (card, index) => {
            if (card.style.color !== 'transparent' || selectedCards.length === 2) return;

            card.style.color = 'var(--text-main)';
            card.style.background = 'white';
            selectedCards.push({ card, index, symbol: cards[index] });

            if (selectedCards.length === 2) {
                if (selectedCards[0].symbol === selectedCards[1].symbol) {
                    score += 10;
                    matchedPairs++;
                    selectedCards.forEach(c => {
                        c.card.classList.add('active');
                        c.card.style.pointerEvents = 'none';
                        c.card.style.color = 'white';
                    });
                    document.getElementById('pattern-score').textContent = score;
                    selectedCards = [];
                    if (matchedPairs === symbols.length) {
                        alert('Perfect! All pairs matched!');
                    }
                } else {
                    setTimeout(() => {
                        selectedCards.forEach(c => {
                            c.card.style.color = 'transparent';
                            c.card.classList.remove('active');
                        });
                        selectedCards = [];
                    }, 1000);
                }
            }
        };

        const timer = setInterval(() => {
            timeLeft--;
            document.getElementById('pattern-time').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert(`Time's up! Final score: ${score}`);
            }
        }, 1000);
    }

    startVisualMemory() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Level: <span id="visual-level" class="game-score">1</span> | Score: <span id="visual-score" class="game-score">0</span></h3>
                </div>
                <div id="visual-display" class="visual-display">
                </div>
                <div id="visual-options" class="game-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 300px;">
                </div>
                <div class="game-controls">
                    <button id="start-visual" class="game-btn game-btn-primary">Start</button>
                </div>
            </div>
        `;

        let level = 1;
        let score = 0;
        let sequence = [];
        const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪', '🔶'];
        const display = document.getElementById('visual-display');
        const options = document.getElementById('visual-options');

        const showSequence = async () => {
            display.textContent = '';
            await new Promise(r => setTimeout(r, 500));
            for (let i = 0; i < sequence.length; i++) {
                display.textContent = sequence[i];
                await new Promise(r => setTimeout(r, 800));
                display.textContent = '';
                await new Promise(r => setTimeout(r, 300));
            }
            showOptions();
        };

        const showOptions = () => {
            const correct = sequence[sequence.length - 1];
            const wrong = shapes.filter(s => s !== correct).sort(() => Math.random() - 0.5).slice(0, 5);
            const allOptions = [correct, ...wrong].sort(() => Math.random() - 0.5);
            options.innerHTML = '';
            allOptions.forEach(shape => {
                const btn = document.createElement('div');
                btn.textContent = shape;
                btn.className = 'game-cell';
                btn.style.height = '60px';
                btn.addEventListener('click', () => checkAnswer(shape === correct));
                options.appendChild(btn);
            });
        };

        const checkAnswer = (correct) => {
            if (correct) {
                score += level * 10;
                level++;
                document.getElementById('visual-score').textContent = score;
                document.getElementById('visual-level').textContent = level;
                sequence.push(shapes[Math.floor(Math.random() * shapes.length)]);
                setTimeout(showSequence, 1000);
            } else {
                alert(`Game Over! Final Score: ${score} | Level Reached: ${level - 1}`);
                document.getElementById('start-visual').style.display = 'inline-block';
            }
        };

        document.getElementById('start-visual').addEventListener('click', () => {
            sequence = [shapes[Math.floor(Math.random() * shapes.length)]];
            level = 1;
            score = 0;
            document.getElementById('start-visual').style.display = 'none';
            showSequence();
        });
    }

    startMathSpeed() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Score: <span id="math-score" class="game-score">0</span> | Time: <span id="math-time">60</span>s</h3>
                </div>
                <div id="math-question" style="font-size: 3rem; margin: 40px 0; color: var(--primary); font-weight: 800;">
                </div>
                <input type="number" id="math-answer" class="game-input" placeholder="Your answer">
                <div class="game-controls">
                    <button onclick="games.checkMathAnswer()" class="game-btn game-btn-primary">Submit</button>
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">Stop</button>
                </div>
            </div>
        `;

        let score = 0;
        let timeLeft = 60;
        let currentAnswer = 0;

        const generateQuestion = () => {
            const a = Math.floor(Math.random() * 50) + 1;
            const b = Math.floor(Math.random() * 50) + 1;
            const ops = ['+', '-', '*'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            let question = '';
            if (op === '+') {
                currentAnswer = a + b;
                question = `${a} + ${b} = ?`;
            } else if (op === '-') {
                currentAnswer = a - b;
                question = `${a} - ${b} = ?`;
            } else {
                currentAnswer = a * b;
                question = `${a} × ${b} = ?`;
            }
            document.getElementById('math-question').textContent = question;
            document.getElementById('math-answer').value = '';
            document.getElementById('math-answer').focus();
        };

        window.games.checkMathAnswer = () => {
            const userAnswer = parseInt(document.getElementById('math-answer').value);
            if (userAnswer === currentAnswer) {
                score += 10;
                document.getElementById('math-score').textContent = score;
            }
            generateQuestion();
        };

        generateQuestion();

        const timer = setInterval(() => {
            timeLeft--;
            document.getElementById('math-time').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert(`Time's up! Final score: ${score}`);
            }
        }, 1000);
    }

    startWordRecall() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Level: <span id="word-level" class="game-score">1</span> | Score: <span id="word-score" class="game-score">0</span></h3>
                </div>
                <div id="word-display" class="visual-display" style="font-size: 2rem; padding: 20px; height: auto; min-height: 150px;">
                </div>
                <input type="text" id="word-input" class="game-input" placeholder="Type the words you remember...">
                <div class="game-controls">
                    <button id="start-word" class="game-btn game-btn-primary">Start</button>
                    <button onclick="games.checkWordAnswer()" id="submit-word" class="game-btn game-btn-primary" style="display: none;">Submit</button>
                </div>
            </div>
        `;

        const wordLists = [
            ['apple', 'banana', 'cherry'],
            ['dog', 'cat', 'bird', 'fish'],
            ['red', 'blue', 'green', 'yellow', 'purple'],
            ['sun', 'moon', 'star', 'cloud', 'rain', 'wind'],
            ['book', 'pen', 'paper', 'desk', 'chair', 'lamp', 'clock']
        ];

        let level = 1;
        let score = 0;
        let currentWords = [];

        const showWords = async () => {
            currentWords = wordLists[Math.min(level - 1, wordLists.length - 1)];
            document.getElementById('word-display').textContent = currentWords.join(' • ');
            document.getElementById('word-input').value = '';
            await new Promise(r => setTimeout(r, 3000 + (level * 500)));
            document.getElementById('word-display').textContent = 'Now type the words you remember...';
            document.getElementById('submit-word').style.display = 'inline-block';
        };

        window.games.checkWordAnswer = () => {
            const userInput = document.getElementById('word-input').value.toLowerCase();
            const userWords = userInput.split(/[,\s]+/).filter(w => w);
            let correct = 0;
            currentWords.forEach(word => {
                if (userWords.includes(word)) correct++;
            });
            score += correct * 10;
            document.getElementById('word-score').textContent = score;
            if (correct === currentWords.length) {
                level++;
                document.getElementById('word-level').textContent = level;
                document.getElementById('submit-word').style.display = 'none';
                setTimeout(showWords, 1000);
            } else {
                alert(`You got ${correct}/${currentWords.length} words correct!`);
                document.getElementById('start-word').style.display = 'inline-block';
                document.getElementById('submit-word').style.display = 'none';
            }
        };

        document.getElementById('start-word').addEventListener('click', () => {
            level = 1;
            score = 0;
            document.getElementById('word-level').textContent = level;
            document.getElementById('word-score').textContent = score;
            document.getElementById('start-word').style.display = 'none';
            showWords();
        });
    }

    // AI-Based Games using Ollama
    async startAIGame(gameId, gameType) {
        // Get model from exercise if available
        const exercises = window.storage.getExercises();
        const exercise = exercises.find(e => e.id === gameId);
        const model = exercise?.ollamaModel || 'llama2';

        if (gameId === 'ex-ai-1' || gameType === 'ai-story') {
            // AI Storytelling Game
            this.container.innerHTML = `
                <div class="game-container">
                    <div class="game-header">
                        <h3>AI Storytelling Adventure</h3>
                        <p style="color: var(--text-muted); margin: 10px 0;">Tell me a topic and I'll create a story for you!</p>
                    </div>
                    <input type="text" id="story-topic" class="game-input" placeholder="Enter story topic (e.g., 'a brave lion')">
                    <div class="game-controls">
                        <button onclick="games.generateStory()" class="game-btn game-btn-primary">
                            Generate Story
                        </button>
                        <button onclick="games.endGame()" class="game-btn game-btn-danger">
                            Close
                        </button>
                    </div>
                    <div id="story-result" class="ai-result" style="display: none;">
                    </div>
                </div>
            `;
        } else if (gameId === 'ex-ai-2' || gameType === 'ai-quiz') {
            // AI Quiz Game
            this.container.innerHTML = `
                <div class="game-container">
                    <div class="game-header">
                        <h3>AI Quiz Challenge</h3>
                        <p style="color: var(--text-muted); margin: 10px 0;">Ask me a question and I'll help you learn!</p>
                    </div>
                    <input type="text" id="quiz-question" class="game-input" placeholder="Ask a question (e.g., 'What is 5+5?')">
                    <div class="game-controls">
                        <button onclick="games.askAI()" class="game-btn game-btn-primary">
                            Ask AI
                        </button>
                        <button onclick="games.endGame()" class="game-btn game-btn-danger">
                            Close
                        </button>
                    </div>
                    <div id="quiz-result" class="ai-result" style="display: none;">
                    </div>
                </div>
            `;
        } else {
            // AI Drawing Helper
            this.container.innerHTML = `
                <div class="game-container">
                    <div class="game-header">
                        <h3>AI Drawing Helper</h3>
                        <p style="color: var(--text-muted); margin: 10px 0;">Describe what you want to draw and I'll help you!</p>
                    </div>
                    <input type="text" id="draw-prompt" class="game-input" placeholder="What should we draw? (e.g., 'a cute cat')">
                    <div class="game-controls">
                        <button onclick="games.getDrawingHelp()" class="game-btn game-btn-primary">
                            Get Help
                        </button>
                        <button onclick="games.endGame()" class="game-btn game-btn-danger">
                            Close
                        </button>
                    </div>
                    <div id="draw-result" class="ai-result" style="display: none;">
                    </div>
                </div>
            `;
        }
    }


    async callOllama(prompt, model = 'llama2') {
        try {
            // Try the standard Ollama API endpoint
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        top_p: 0.9
                    }
                })
            });

            if (!response.ok) {
                // If 405, try alternative endpoint
                if (response.status === 405) {
                    return await this.callOllamaAlternative(prompt, model);
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.response || data.text || 'Sorry, I could not generate a response.';
        } catch (error) {
            console.error('Ollama error:', error);
            // Try alternative endpoint if main one fails
            if (error.message.includes('405') || error.message.includes('Failed to fetch')) {
                return await this.callOllamaAlternative(prompt, model);
            }
            return `Error: ${error.message}. Please make sure Ollama is running on http://localhost:11434. You can install it from https://ollama.ai`;
        }
    }

    async callOllamaAlternative(prompt, model = 'llama2') {
        try {
            // Alternative: Try /api/chat endpoint
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.message?.content || data.response || 'Sorry, I could not generate a response.';
        } catch (error) {
            console.error('Ollama alternative endpoint error:', error);
            return `Error connecting to Ollama. Please ensure:\n1. Ollama is installed (https://ollama.ai)\n2. Ollama is running\n3. A model is installed (e.g., run: ollama pull llama2)`;
        }
    }

    async generateStory() {
        const topic = document.getElementById('story-topic').value;
        if (!topic) {
            alert('Please enter a story topic!');
            return;
        }

        const resultDiv = document.getElementById('story-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<p>Generating your story... 🎨</p>';

        const prompt = `Write a short, fun, and educational story for kids about ${topic}. Make it engaging and age-appropriate. Keep it under 200 words.`;
        const exercises = window.storage.getExercises();
        const exercise = exercises.find(e => e.id === this.currentGameId);
        const model = exercise?.ollamaModel || 'llama2';
        const story = await this.callOllama(prompt, model);

        resultDiv.innerHTML = `
            <h4 style="margin-bottom: 15px; color: #007AFF;">Your Story:</h4>
            <p style="line-height: 1.6; color: #333;">${story}</p>
        `;

        // Track completion
        if (window.app && window.app.currentStudent && !window.app.isAdmin) {
            window.storage.updateStudentAnalytics(window.app.currentStudent.id, 'game_played', {
                gameId: this.currentGameId,
                duration: Math.floor((Date.now() - this.gameStartTime) / 60000),
                points: 50
            });
        }
    }

    async askAI() {
        const question = document.getElementById('quiz-question').value;
        if (!question) {
            alert('Please enter a question!');
            return;
        }

        const resultDiv = document.getElementById('quiz-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<p>Thinking... 🤔</p>';

        const prompt = `Answer this question in a simple, kid-friendly way: ${question}. Keep the answer short and educational.`;
        const exercises = window.storage.getExercises();
        const exercise = exercises.find(e => e.id === this.currentGameId);
        const model = exercise?.ollamaModel || 'llama2';
        const answer = await this.callOllama(prompt, model);

        resultDiv.innerHTML = `
            <h4 style="margin-bottom: 15px; color: #007AFF;">Question: ${question}</h4>
            <p style="line-height: 1.6; color: #333;">${answer}</p>
        `;

        // Track completion
        if (window.app && window.app.currentStudent && !window.app.isAdmin) {
            window.storage.updateStudentAnalytics(window.app.currentStudent.id, 'game_played', {
                gameId: this.currentGameId,
                duration: Math.floor((Date.now() - this.gameStartTime) / 60000),
                points: 30
            });
        }
    }

    async getDrawingHelp() {
        const prompt = document.getElementById('draw-prompt').value;
        if (!prompt) {
            alert('Please describe what you want to draw!');
            return;
        }

        const resultDiv = document.getElementById('draw-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<p>Creating drawing guide... ✏️</p>';

        const aiPrompt = `Give step-by-step instructions for a kid to draw ${prompt}. Make it simple and fun, with 3-5 easy steps.`;
        const exercises = window.storage.getExercises();
        const exercise = exercises.find(e => e.id === this.currentGameId);
        const model = exercise?.ollamaModel || 'llama2';
        const help = await this.callOllama(aiPrompt, model);

        resultDiv.innerHTML = `
            <h4 class="drawing-help-title">How to Draw: ${prompt}</h4>
            <p class="drawing-help-text">${help}</p>
        `;

        // Track completion
        if (window.app && window.app.currentStudent && !window.app.isAdmin) {
            window.storage.updateStudentAnalytics(window.app.currentStudent.id, 'game_played', {
                gameId: this.currentGameId,
                duration: Math.floor((Date.now() - this.gameStartTime) / 60000),
                points: 40
            });
        }
    }

    // CV-Based Games using Camera
    async startCVGame(gameId, gameType) {
        // Request camera access
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });

            if (gameId === 'ex-cv-1' || gameType === 'cv-expression') {
                this.startFaceExpressionGame(stream);
            } else if (gameId === 'ex-cv-2' || gameType === 'cv-gesture') {
                this.startHandGestureGame(stream);
            } else {
                this.startObjectRecognitionGame(stream);
            }
        } catch (error) {
            this.container.innerHTML = `
                <div class="game-container" style="text-align: center;">
                    <div class="game-header">
                        <h3>Camera Access Required</h3>
                        <p>Please allow camera access to play this game.</p>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--space-md);">Error: ${error.message}</p>
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">
                        Close
                    </button>
                </div>
            `;
        }
    }

    startFaceExpressionGame(stream) {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Face Expression Game 😊</h3>
                    <p>Make different expressions and see if the camera detects them!</p>
                </div>
                <div style="position: relative; display: inline-block; margin: var(--space-lg) 0;">
                    <video id="cv-video" autoplay playsinline style="width: 100%; max-width: 640px; border-radius: var(--radius-lg); background: #000; box-shadow: var(--shadow-lg);"></video>
                    <canvas id="cv-canvas" style="display: none;"></canvas>
                </div>
                <div id="cv-status" class="ai-result">
                    <p>Looking for your face... 👀</p>
                </div>
                <div class="game-controls">
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">
                        Stop Game
                    </button>
                </div>
            </div>
        `;

        const video = document.getElementById('cv-video');
        const canvas = document.getElementById('cv-canvas');
        const ctx = canvas.getContext('2d');
        const statusDiv = document.getElementById('cv-status');

        video.srcObject = stream;
        canvas.width = 640;
        canvas.height = 480;

        let score = 0;
        let lastExpression = '';
        const expressions = ['😊', '😮', '😴', '😠', '😃'];

        const detectExpression = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Simple brightness-based expression detection (simplified CV)
            let brightness = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                brightness += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            }
            brightness = brightness / (imageData.data.length / 4);

            // Simple expression detection based on brightness and movement
            let expression = '😊';
            if (brightness > 150) expression = '😃';
            else if (brightness < 80) expression = '😴';

            if (expression !== lastExpression) {
                score += 10;
                lastExpression = expression;
                statusDiv.innerHTML = `
                    <h4>Expression Detected: ${expression}</h4>
                    <p>Score: ${score}</p>
                    <p style="font-size: 14px; color: #666;">Try making different faces!</p>
                `;
            }

            requestAnimationFrame(detectExpression);
        };

        video.onloadedmetadata = () => {
            detectExpression();
        };

        // Track completion when game ends
        this.cvStream = stream;
    }

    startHandGestureGame(stream) {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Hand Gesture Game ✋</h3>
                    <p>Show your hand and make gestures!</p>
                </div>
                <div style="position: relative; display: inline-block; margin: var(--space-lg) 0;">
                    <video id="cv-video" autoplay playsinline style="width: 100%; max-width: 640px; border-radius: var(--radius-lg); background: #000; box-shadow: var(--shadow-lg);"></video>
                    <canvas id="cv-canvas" style="display: none;"></canvas>
                </div>
                <div id="cv-status" class="ai-result">
                    <p>Show your hand to the camera! ✋</p>
                </div>
                <div class="game-controls">
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">
                        Stop Game
                    </button>
                </div>
            </div>
        `;

        const video = document.getElementById('cv-video');
        const canvas = document.getElementById('cv-canvas');
        const ctx = canvas.getContext('2d');
        const statusDiv = document.getElementById('cv-status');

        video.srcObject = stream;
        canvas.width = 640;
        canvas.height = 480;

        let gestureCount = 0;

        const detectGesture = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Simple hand detection based on skin color detection
            let skinPixels = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];

                // Simple skin color detection
                if (r > 95 && g > 40 && b > 20 &&
                    Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
                    Math.abs(r - g) > 15 && r > g && r > b) {
                    skinPixels++;
                }
            }

            const skinRatio = skinPixels / (imageData.data.length / 4);

            if (skinRatio > 0.1) {
                gestureCount++;
                statusDiv.innerHTML = `
                    <h4>Hand Detected! ✋</h4>
                    <p>Gestures: ${gestureCount}</p>
                    <p style="font-size: 14px; color: #666;">Keep making gestures!</p>
                `;
            }

            requestAnimationFrame(detectGesture);
        };

        video.onloadedmetadata = () => {
            detectGesture();
        };

        this.cvStream = stream;
    }

    startObjectRecognitionGame(stream) {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>Object Recognition Game 🔍</h3>
                    <p>Show objects to the camera and see if it recognizes them!</p>
                </div>
                <div style="position: relative; display: inline-block; margin: var(--space-lg) 0;">
                    <video id="cv-video" autoplay playsinline style="width: 100%; max-width: 640px; border-radius: var(--radius-lg); background: #000; box-shadow: var(--shadow-lg);"></video>
                    <canvas id="cv-canvas" style="display: none;"></canvas>
                </div>
                <div id="cv-status" class="ai-result">
                    <p>Show objects to the camera! 📱📚✏️</p>
                </div>
                <div class="game-controls">
                    <button onclick="games.endGame()" class="game-btn game-btn-danger">
                        Stop Game
                    </button>
                </div>
            </div>
        `;

        const video = document.getElementById('cv-video');
        const canvas = document.getElementById('cv-canvas');
        const ctx = canvas.getContext('2d');
        const statusDiv = document.getElementById('cv-status');

        video.srcObject = stream;
        canvas.width = 640;
        canvas.height = 480;

        let objectCount = 0;
        let lastBrightness = 0;

        const detectObjects = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Simple object detection based on brightness changes
            let brightness = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                brightness += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            }
            brightness = brightness / (imageData.data.length / 4);

            const brightnessChange = Math.abs(brightness - lastBrightness);

            if (brightnessChange > 20) {
                objectCount++;
                statusDiv.innerHTML = `
                    <h4>Object Detected! 🔍</h4>
                    <p>Objects Found: ${objectCount}</p>
                    <p style="font-size: 14px; color: #666;">Try showing different objects!</p>
                `;
            }

            lastBrightness = brightness;
            requestAnimationFrame(detectObjects);
        };

        video.onloadedmetadata = () => {
            detectObjects();
        };

        this.cvStream = stream;
    }

    endGame(score = 0) {
        // Stop camera stream if active
        if (this.cvStream) {
            this.cvStream.getTracks().forEach(track => track.stop());
            this.cvStream = null;
        }

        // Track game completion for students
        if (window.app && window.app.currentStudent && !window.app.isAdmin) {
            const duration = this.gameStartTime ? Math.floor((Date.now() - this.gameStartTime) / 60000) : 10;
            const gameId = this.currentGameId || 'unknown';
            window.storage.updateStudentAnalytics(window.app.currentStudent.id, 'game_played', {
                gameId: gameId,
                duration: duration,
                points: score
            });
            if (window.app.renderProfile) {
                window.app.renderProfile();
            }
        }

        this.container.innerHTML = '';
        this.modal.classList.remove('active');
        this.gameStartTime = null;
        this.currentGameId = null;
        // Clean up any global functions
        if (window.games.checkMathAnswer) delete window.games.checkMathAnswer;
        if (window.games.checkWordAnswer) delete window.games.checkWordAnswer;
    }
}

window.games = new Games();

// Expose AI functions globally for onclick handlers
if (window.games) {
    window.games.generateStory = window.games.generateStory.bind(window.games);
    window.games.askAI = window.games.askAI.bind(window.games);
    window.games.getDrawingHelp = window.games.getDrawingHelp.bind(window.games);
}
