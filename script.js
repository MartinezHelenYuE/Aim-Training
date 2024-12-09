document.addEventListener('DOMContentLoaded', (event) => {
    const mainMenu = document.getElementById('mainMenu');
    const game = document.getElementById('game');
    const startGameButton = document.getElementById('startGameButton');
    const backToMenuButton = document.getElementById('backToMenuButton');
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    let score = 0;

    startGameButton.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        game.style.display = 'block';
        startGame();
    });

    backToMenuButton.addEventListener('click', () => {
        game.style.display = 'none';
        mainMenu.style.display = 'block';
        score = 0;
        scoreDisplay.textContent = score;
        gameArea.innerHTML = '';
    });

    function startGame() {
        createTarget();
    }

    function createTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        target.style.top = `${Math.random() * (gameArea.clientHeight - target.clientHeight)}px`;
        target.style.left = `${Math.random() * (gameArea.clientWidth - target.clientWidth)}px`;
        gameArea.appendChild(target);

        target.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            gameArea.removeChild(target);
            createTarget();
        });

        setTimeout(() => {
            if (gameArea.contains(target)) {
                gameArea.removeChild(target);
                createTarget();
            }
        }, 1000);
    }
});