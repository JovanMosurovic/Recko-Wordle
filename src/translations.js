const translations = {
    sr: {
        'page-title': 'Rečko',
        'game-title': 'REČKO',

        'help-btn': 'Uputstvo',
        'stats-btn': 'Statistika',

        'help-title': 'Uputstvo',
        'help-goal-label': 'Cilj igre:',
        'help-goal-text': 'Pogoditi tajnu reč od 5 slova u maksimalno 6 pokušaja.',
        'help-how-title': 'Kako se igra?',
        'help-step1': 'Unesite reč od 5 slova i pritisnite ENTER',
        'help-step2': 'Slova će biti obojena na osnovu tačnosti:',
        'help-correct-label': 'Zeleno',
        'help-correct-text': 'slovo je na pravom mestu',
        'help-wrong-place-label': 'Žuto',
        'help-wrong-place-text': 'slovo postoji u reči, ali je na pogrešnom mestu',
        'help-wrong-label': 'Sivo',
        'help-wrong-text': 'slovo se ne nalazi u reči',

        'stats-title': 'Statistika',
        'stats-total': 'Ukupno odigranih igara',
        'stats-win-rate': '% dobijenih',
        'stats-current-streak': 'Trenutni niz dobijenih',
        'stats-max-streak': 'Najduzi niz dobijenih',
        'stats-distribution': 'Distribucija pogodaka',
        'new-game-btn': 'Nova igra',

        'settings-title': "Podešavanja",

        'msg-word-not-found': 'Reč nije u rečniku!',
        'msg-not-enough-letters': 'Nedovoljno slova!',
        'msg-congratulations': 'Čestitamo! Uspešno ste pogodili reč!',
        'msg-game-over': 'Kraj igre! Tajna reč je bila:',
        'msg-word-guessed': 'Pogodili ste u',
        'msg-attempts': 'pokušaja!',

        'key-enter': 'ENTER',
        'key-backspace': '⌫'
    },

    en: {
        'page-title': 'Wordle',
        'game-title': 'WORDLE',

        'help-btn': 'Help',
        'stats-btn': 'Statistics',

        'help-title': 'Instructions',
        'help-goal-label': 'Goal:',
        'help-goal-text': 'Guess the secret 5-letter word in maximum 6 attempts.',
        'help-how-title': 'How to play?',
        'help-step1': 'Enter a 5-letter word and press ENTER',
        'help-step2': 'Letters will be colored based on accuracy:',
        'help-correct-label': 'Green',
        'help-correct-text': 'letter is in the correct position',
        'help-wrong-place-label': 'Yellow',
        'help-wrong-place-text': 'letter is in the word but in wrong position',
        'help-wrong-label': 'Gray',
        'help-wrong-text': 'letter is not in the word',

        'stats-title': 'Statistics',
        'stats-total': 'Total Games',
        'stats-win-rate': '% Win Rate',
        'stats-current-streak': 'Current Streak',
        'stats-max-streak': 'Max Streak',
        'stats-distribution': 'Guess Distribution',
        'new-game-btn': 'New Game',

        'settings-title': "Settings",

        'msg-word-not-found': 'Word is not in the dictionary!',
        'msg-not-enough-letters': 'Not enough letters!',
        'msg-congratulations': 'Congratulations! You successfully guessed the word!',
        'msg-game-over': 'Game over! The secret word was:',
        'msg-word-guessed': 'You guessed it in',
        'msg-attempts': 'attempts!',

        'key-enter': 'ENTER',
        'key-backspace': '⌫'
    }
};

const keyboardLayouts = {
    sr: [
        ['Љ', 'Њ', 'Е', 'Р', 'Т', 'З', 'У', 'И', 'О', 'П', 'Ш', 'Ђ'],
        ['А', 'С', 'Д', 'Ф', 'Г', 'Х', 'Ј', 'К', 'Л', 'Ч', 'Ћ'],
        ['Enter', 'Ж', 'Џ', 'Ц', 'В', 'Б', 'Н', 'М', 'Backspace']
    ],
    en: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
    ]
};

const wordDictionaries = {
    sr: [
        'БАШТА', 'ВАТРА', 'МАЈКА', 'ОБЛАК', 'СВЕЋА',
        'ЦВЕЋЕ', 'ТАЊИР', 'МЛЕКО', 'ПЕСМА', 'ЛОПТА',
        'КЊИГА', 'ЈЕЛКА', 'СУНЦЕ', 'МЕСЕЦ', 'ШКОЛА',
        'СЕСТИ', 'СТИЋИ', 'УЧИТИ', 'ПАСТИ', 'ПТИЦА'
    ],
    en: [
        'HOUSE', 'WATER', 'LIGHT', 'WORLD', 'GREAT',
        'SMALL', 'RIGHT', 'PLACE', 'NIGHT', 'POINT',
        'SOUND', 'WRITE', 'SPELL', 'HEART', 'PLANT',
        'STUDY', 'LEARN', 'STORY', 'EARLY', 'CLEAR'
    ]
};

class TranslationManager {
    constructor() {
        this.currentLanguage = 'sr';
        this.init();
    }

    init() {
        this.updateLanguageButtons();
        this.translatePage();
        this.generateKeyboard();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('lang-sr').addEventListener('click', () => {
            this.switchLanguage('sr');
        });

        document.getElementById('lang-en').addEventListener('click', () => {
            this.switchLanguage('en');
        });
    }

    switchLanguage(lang) {
        if (lang !== this.currentLanguage) {
            this.currentLanguage = lang;
            localStorage.setItem('wordleLanguage', lang);

            this.updateLanguageButtons();
            this.translatePage();
            this.generateKeyboard();

            document.documentElement.lang = lang;

            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
    }

    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`lang-${this.currentLanguage}`).classList.add('active');
    }

    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);

            if (translation) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        document.title = this.getTranslation('page-title');
    }

    getTranslation(key) {
        return translations[this.currentLanguage]?.[key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getKeyboardLayout() {
        return keyboardLayouts[this.currentLanguage] || keyboardLayouts['sr'];
    }

    getWordDictionary() {
        return wordDictionaries[this.currentLanguage] || wordDictionaries['sr'];
    }

    generateKeyboard() {
        const keyboardContainer = document.getElementById('keyboard');
        const layout = this.getKeyboardLayout();

        keyboardContainer.innerHTML = '';

        layout.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keyboard-row';

            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                keyElement.setAttribute('data-key', key);

                if (key === 'Enter' || key === 'Backspace') {
                    keyElement.className += ' key-wide';
                    keyElement.textContent = key === 'Enter'
                        ? this.getTranslation('key-enter')
                        : this.getTranslation('key-backspace');
                } else {
                    keyElement.textContent = key;
                }

                rowElement.appendChild(keyElement);
            });

            keyboardContainer.appendChild(rowElement);
        });
    }
}

let translationManager;
document.addEventListener('DOMContentLoaded', () => {
    translationManager = new TranslationManager();
});