class WordleGame {
    constructor() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.maxRows = 6;
        this.maxCols = 5;
        this.gameOver = false;
        this.currentWord = '';
        this.targetWord = '';
        this.guesses = [];
        this.keyStates = {};

        this.init();
    }

    init() {
        this.selectRandomWord();
        this.setupEventListeners();
        this.updateKeyboard();
        this.loadStats();
    }

    selectRandomWord() {
        const dictionary = translationManager.getWordDictionary();
        this.targetWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    }

    setupEventListeners() {
        // Physical keyboard
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            this.handleKeyInput(e.key.toUpperCase());
        });

        // Virtual keyboard
        document.getElementById('keyboard').addEventListener('click', (e) => {
            if (e.target.classList.contains('key') && !this.gameOver) {
                const key = e.target.getAttribute('data-key');
                this.handleKeyInput(key);
            }
        });

        this.setupModalControls();

        document.addEventListener('languageChanged', () => {
            this.resetGame();
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.resetGame();
            this.closeModal('stats');
        });
    }

    setupModalControls() {
        document.getElementById('help-btn').addEventListener('click', () => {
            this.showModal('help');
        });

        document.getElementById('stats-btn').addEventListener('click', () => {
            this.showModal('stats');
            this.updateStatsDisplay();
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showModal('settings');
        });

        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.getAttribute('data-modal');
                this.closeModal(modal);
            });
        });

        document.getElementById('modal-overlay').addEventListener('click', () => {
            this.closeAllModals();
        });
    }

    handleKeyInput(key) {
        if (key === 'ENTER' || key === 'Enter') {
            this.submitWord();
        } else if (key === 'BACKSPACE' || key === 'Backspace' || key === '⌫') {
            this.deleteLetter();
        } else if (this.isValidLetter(key)) {
            this.addLetter(key);
        }
    }

    isValidLetter(key) {
        const layout = translationManager.getKeyboardLayout();
        const allKeys = layout.flat().filter(k => k !== 'Enter' && k !== 'Backspace');
        return allKeys.includes(key);
    }

    addLetter(letter) {
        if (this.currentCol < this.maxCols) {
            const box = document.querySelector(`[data-row="${this.currentRow}"][data-col="${this.currentCol}"]`);
            box.textContent = letter;
            box.classList.add('filled');
            this.currentWord += letter;
            this.currentCol++;
        }
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const box = document.querySelector(`[data-row="${this.currentRow}"][data-col="${this.currentCol}"]`);
            box.textContent = '';
            box.classList.remove('filled');
            this.currentWord = this.currentWord.slice(0, -1);
        }
    }

    submitWord() {
        if (this.currentWord.length !== this.maxCols) {
            this.showMessage(translationManager.getTranslation('msg-not-enough-letters'), 'error');
            return;
        }

        if(!this.isWordInDictionary(this.currentWord)) {
            this.showMessage(translationManager.getTranslation("msg-word-not-found"), 'error');
            return;
        }

        this.evaluateGuess();
        this.guesses.push(this.currentWord);

        if (this.currentWord === this.targetWord) {
            this.handleWin();
        } else if (this.currentRow === this.maxRows - 1) {
            this.handleLoss();
        } else {
            this.nextRow();
        }
    }

    isWordInDictionary(word) {
        const dictionary = translationManager.getWordDictionary();
        return dictionary.includes(word);
    }

    evaluateGuess() {
        const targetLetters = this.targetWord.split('');
        const guessLetters = this.currentWord.split('');
        const results = new Array(this.maxCols).fill('absent');
        const targetCounts = {};

        targetLetters.forEach(letter => {
            targetCounts[letter] = (targetCounts[letter] || 0) + 1;
        });

        for (let i = 0; i < this.maxCols; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                results[i] = 'correct';
                targetCounts[guessLetters[i]]--;
            }
        }

        for (let i = 0; i < this.maxCols; i++) {
            if (results[i] === 'absent' && targetCounts[guessLetters[i]] > 0) {
                results[i] = 'wrong-place';
                targetCounts[guessLetters[i]]--;
            }
        }

        for (let i = 0; i < this.maxCols; i++) {
            const box = document.querySelector(`[data-row="${this.currentRow}"][data-col="${i}"]`);
            const letter = guessLetters[i];

            box.classList.add(results[i]);

            this.updateKeyState(letter, results[i]);
        }

        this.updateKeyboard();
    }

    updateKeyState(letter, state) {
        const currentState = this.keyStates[letter];

        if (state === 'correct' || !currentState ||
            (state === 'wrong-place' && currentState === 'absent')) {
            this.keyStates[letter] = state;
        }
    }

    updateKeyboard() {
        document.querySelectorAll('.key').forEach(key => {
            const letter = key.getAttribute('data-key');
            if (letter && this.keyStates[letter]) {
                key.className = `key ${this.keyStates[letter]}`;
            }
        });
    }

    handleWin() {
        this.gameOver = true;
        const attempts = this.currentRow + 1;
        const message = `${translationManager.getTranslation('msg-congratulations')} \n${translationManager.getTranslation('msg-word-guessed')} ${attempts} ${translationManager.getTranslation('msg-attempts')}`;

        setTimeout(() => {
            this.showMessage(message, 'success');
            this.updateStats(true, attempts);
        }, 1500);
    }

    handleLoss() {
        this.gameOver = true;
        const message = `${translationManager.getTranslation('msg-game-over')} ${this.targetWord}`;

        setTimeout(() => {
            this.showMessage(message, 'error');
            this.updateStats(false, 0);
        }, 1500);
    }

    nextRow() {
        this.currentRow++;
        this.currentCol = 0;
        this.currentWord = '';
    }

    showMessage(text, type = 'info') {
        const messageEl = document.getElementById('game-message');
        messageEl.textContent = text;
        messageEl.className = `game-message ${type}`;
        messageEl.classList.remove('hidden');

        if (type !== 'success') {
            setTimeout(() => {
                messageEl.classList.add('hidden');
            }, 3000);
        }
    }

    showModal(modalId) {
        document.getElementById(`${modalId}-modal`).classList.remove('hidden');
        document.getElementById('modal-overlay').classList.remove('hidden');
    }

    closeModal(modalId) {
        document.getElementById(`${modalId}-modal`).classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.getElementById('modal-overlay').classList.add('hidden');
    }

    loadStats() {
        const lang = translationManager.getCurrentLanguage();
        const stats = JSON.parse(localStorage.getItem(`wordleStats_${lang}`)) || {
            totalGames: 0,
            wins: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: [0, 0, 0, 0, 0, 0]
        };
        this.stats = stats;
    }

    updateStats(won, attempts) {
        this.stats.totalGames++;

        if (won) {
            this.stats.wins++;
            this.stats.currentStreak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
            this.stats.guessDistribution[attempts - 1]++;
        } else {
            this.stats.currentStreak = 0;
        }

        const lang = translationManager.getCurrentLanguage();
        localStorage.setItem(`wordleStats_${lang}`, JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const winPercentage = this.stats.totalGames > 0
            ? Math.round((this.stats.wins / this.stats.totalGames) * 100)
            : 0;

        document.getElementById('total-games').textContent = this.stats.totalGames;
        document.getElementById('win-percentage').textContent = winPercentage;
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('max-streak').textContent = this.stats.maxStreak;

        const maxGuesses = Math.max(...this.stats.guessDistribution, 1);

        for (let i = 0; i < 6; i++) {
            const countEl = document.getElementById(`guess-${i + 1}`);
            const barEl = countEl.parentElement;
            const count = this.stats.guessDistribution[i];
            const percentage = (count / maxGuesses) * 100;

            countEl.textContent = count;
            barEl.style.width = `${Math.max(percentage, 5)}%`;
            barEl.style.backgroundColor = count > 0 ? 'var(--correct-color)' : 'var(--border-color)';
        }
    }

    resetGame() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.currentWord = '';
        this.gameOver = false;
        this.guesses = [];
        this.keyStates = {};

        // Clear grid
        document.querySelectorAll('.letter-box').forEach(box => {
            box.textContent = '';
            box.className = 'letter-box';
        });

        document.querySelectorAll('.key').forEach(key => {
            const keyText = key.getAttribute('data-key');
            if (keyText === 'Enter' || keyText === 'Backspace') {
                key.className = 'key key-wide';
            } else {
                key.className = 'key';
            }
        });

        document.getElementById('game-message').classList.add('hidden');

        this.selectRandomWord();
    }
}

let game;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        game = new WordleGame();
    }, 100);
});