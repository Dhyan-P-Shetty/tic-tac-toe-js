function resetGameStatus() {
    gameData = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    activePlayer = 0;
    currentRound = 0;
    gameOverElement.firstChild.innerHTML = '<h2>You won, <span id="winner-name">PLAYER NAME</span>!</h2>';
    gameOverElement.style.display = 'none';
    for(const gameFieldElement of gameFieldElements){
        gameFieldElement.textContent = '';
        gameFieldElement.classList.remove('disabled');
    }
    gameIsOver = false;
}

function startNewGame() {
    if(players[0].name === '' || players[1].name === ''){
        alert("Please set custom player for both players!");
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block'; 
}

function switchPlayer() {
    if(activePlayer === 1){
        activePlayer = 0;
    }
    else{
        activePlayer = 1;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    if(gameIsOver){
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert("PLease click on the empty field");
        return;
    }

    currentRound++;
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');
    
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const isOver = checkForGameOver();
    if(isOver > 0){
        gameOverElement.style.display = 'block';
        winnerNameElement.textContent = players[activePlayer].name;
        gameIsOver = true;
        return;
    }
    else if(isOver === 0){
        switchPlayer();
    }
    else{
        gameOverElement.style.display = 'block';
        gameOverElement.firstElementChild.textContent = "It's a draw!";
        gameIsOver = true;
        return;
    }
}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];  
        }
    }

    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[0][0] === gameData[2][2]
    ) {
        return gameData[0][0]; 
    }

    if (
        gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[0][2] === gameData[2][0]
    ) {
        return gameData[0][2]; 
    }

    if(currentRound === 9){
        return -1;
    }

    return 0; 
}
