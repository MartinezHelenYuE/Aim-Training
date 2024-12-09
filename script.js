document.addEventListener('DOMContentLoaded', (event) => {
    const mainMenu = document.getElementById('mainMenu');
    const game = document.getElementById('game');
    const startEasyButton = document.getElementById('startEasyButton');
    const startMediumButton = document.getElementById('startMediumButton');
    const startHardButton = document.getElementById('startHardButton');
    const backToMenuButton = document.getElementById('backToMenuButton');
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let difficulty = 'easy';
    const records = {
        easy: localStorage.getItem('easyRecord') || 0,
        medium: localStorage.getItem('mediumRecord') || 0,
        hard: localStorage.getItem('hardRecord') || 0
    };

    startEasyButton.addEventListener('click', () => startGame('easy'));
    startMediumButton.addEventListener('click', () => startGame('medium'));
    startHardButton.addEventListener('click', () => startGame('hard'));

    backToMenuButton.addEventListener('click', () => {
        game.style.display = 'none';
        mainMenu.style.display = 'block';
        if (score > records[difficulty]) {
            records[difficulty] = score;
            localStorage.setItem(`${difficulty}Record`, score);
        }
        score = 0;
        scoreDisplay.textContent = score;
        gameArea.innerHTML = '';
    });

    function startGame(selectedDifficulty) {
        difficulty = selectedDifficulty;
        mainMenu.style.display = 'none';
        game.style.display = 'block';
        createTarget();
    }

    function createTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        target.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
        target.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
        gameArea.appendChild(target);

        target.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            gameArea.removeChild(target);
            setTimeout(createTarget, 500); // Добавляем задержку перед созданием нового круга
        });

        setTimeout(() => {
            if (gameArea.contains(target)) {
                gameArea.removeChild(target);
                setTimeout(createTarget, 500); // Добавляем задержку перед созданием нового круга
            }
        }, getTimeout());
    }

    function getTimeout() {
        switch (difficulty) {
            case 'easy': return 1500;
            case 'medium': return 1000;
            case 'hard': return 500;
            default: return 1000;
        }
    }
});