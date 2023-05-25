let board = [...Array(4)].map(() => Array(4).fill(0));
let touchstartX = 0 ;
let touchendX = 0 ;
let touchstartY = 0 ;
let touchendY = 0 ;


/*if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){                

            var button = document.createElement("button");
            button.innerHTML = "Up";
            button.setAttribute("onclick","upButton()");
            var body = document.getElementById("Container");
            body.appendChild(button);
            var button = document.createElement("button");
            button.innerHTML = "Down";
            button.setAttribute("onclick","downButton()");
            var body = document.getElementById("Container");
            body.appendChild(button);
            var button = document.createElement("button");
            button.innerHTML = "Reset";
            button.setAttribute("onclick","resetButton()");
            var body = document.getElementById("Container");
            body.appendChild(button);
    }
else {
            var button = document.createElement("button");
            button.innerHTML = "Reset";
            button.setAttribute("onclick","resetButton()");
            var body = document.getElementById("Container");
            body.appendChild(button);
}
*/
var button = document.createElement("button");
button.innerHTML = "Reset";
button.setAttribute("onclick","resetButton()");
var body = document.getElementById("Container");
body.appendChild(button);


function checkDirection(){
    if(touchendX < touchstartX){
        leftButton();
    }
    else if(touchendX > touchstartX){
        rightButton();
    }
    if(touchendY < touchstartX){
        upButton();
    }
    else if(touchendY > touchstartY){
        downButton();
    }
    
 
}

var bb = document.getElementById("Container");

bb.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
});

bb.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
});
bb.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
});

bb.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
});
bb.addEventListener("touchstart", (e) => {
    touchstartY = e.changedTouches[1].screenX;
});

bb.addEventListener("touchend", (e) => {
    touchendY = e.changedTouches[1].screenX;
    checkDirection();
});



function resetButton() {
    initializeBoard();
    fillRandomPosition();
    fillRandomPosition(); 
    printMatrix();
}

function initializeBoard() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            board[row][col] = 0;
        }
    }
}

function fillRandomPosition() {
    let tileCount = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                tileCount++;
            }
        }
    }

    if (tileCount === 16) {
        return;
    }
    
    let row, col;
    do {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    } while (board[row][col] !== 0);
    
    board[row][col] = 2;
}

function rowEmpty(row) {
    for (let col = 0; col < 4; col++) {
        if (board[row][col] !== 0) {
            return false;
        }
    }
    return true;
}

function colEmpty(col) {
    for (let row = 0; row < 4; row++) {
        if (board[row][col] !== 0) {
            return false;
        }
    }
    return true;
}

function isGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 2048) {
                return 100;
            }
        }
    }
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                return 0;
            }
            if (col !== 3 && row !== 3) {
                if (board[row][col] === board[row][col + 1] || board[row][col] === board[row + 1][col]) {
                    return 0;
                }
            }
        }
    }
    
    return 1;
}

/*function printMatrix() {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let value = board[row][col];
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(`cell-${value}`);
            cell.textContent = value !== 0 ? value : '';
            gameContainer.appendChild(cell);
        }
        
    }
}*/
function printMatrix() {
let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    let output = '<table>';
    for (let row = 0; row < 4; row++) {
        output += '<tr>';
        for (let col = 0; col < 4; col++) {
            let value = board[row][col];
            if(value === 0){
                output += `<td class = 'cell-0'></td>`;
            }
            else{
                output += `<td class = 'cell-${value}'>${value}</td>`;
            }
        }
        output += '</tr>';
    }
    output += '</table>';
    gameContainer.innerHTML= output ;
} 

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        if (rowEmpty(row)) {
            continue;
        }
        
        for (let i = 0; i < 4; i++) {
            for (let col = 3; col > 0; col--) {
                if (board[row][col] !== 0 && board[row][col - 1] === 0) {
                    [board[row][col], board[row][col - 1]] = [board[row][col - 1], board[row][col]];
                }
            }
        }
        
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === board[row][col + 1]) {
                board[row][col] *= 2;
                board[row][col + 1] = 0;
            }
        }
        
        for (let i = 0; i < 4; i++) {
            for (let col = 3; col > 0; col--) {
                if (board[row][col] !== 0 && board[row][col - 1] === 0) {
                    [board[row][col], board[row][col - 1]] = [board[row][col - 1], board[row][col]];
                }
            }
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        if (rowEmpty(row)) {
            continue;
        }
        
        for (let i = 0; i < 4; i++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] !== 0 && board[row][col + 1] === 0) {
                    [board[row][col], board[row][col + 1]] = [board[row][col + 1], board[row][col]];
                }
            }
        }
        
        for (let col = 3; col > 0; col--) {
            if (board[row][col] === board[row][col - 1]) {
                board[row][col] *= 2;
                board[row][col - 1] = 0;
            }
        }
        
        for (let i = 0; i < 4; i++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] !== 0 && board[row][col + 1] === 0) {
                    [board[row][col], board[row][col + 1]] = [board[row][col + 1], board[row][col]];
                }
            }
        }
    }
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        if (colEmpty(col)) {
            continue;
        }
        
        for (let i = 0; i < 4; i++) {
            for (let row = 3; row > 0; row--) {
                if (board[row][col] !== 0 && board[row - 1][col] === 0) {
                    [board[row][col], board[row - 1][col]] = [board[row - 1][col], board[row][col]];
                }
            }
        }
        
        for (let row = 0; row < 3; row++) {
            if (board[row][col] === board[row + 1][col]) {
                board[row][col] *= 2;
                board[row + 1][col] = 0;
            }
        }
        
        for (let i = 0; i < 4; i++) {
            for (let row = 3; row > 0; row--) {
                if (board[row][col] !== 0 && board[row - 1][col] === 0) {
                    [board[row][col], board[row - 1][col]] = [board[row - 1][col], board[row][col]];
                }
            }
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        if (colEmpty(col)) {
            continue;
        }
        
        for (let i = 0; i < 4; i++) {
            for (let row = 0; row < 3; row++) {
                if (board[row][col] !== 0 && board[row + 1][col] === 0) {
                    [board[row][col], board[row + 1][col]] = [board[row + 1][col], board[row][col]];
                }
            }
        }
        
        for (let row = 3; row > 0; row--) {
            if (board[row][col] === board[row - 1][col]) {
                board[row][col] *= 2;
                board[row - 1][col] = 0;
            }
        }
        
        for (let i = 0; i < 4; i++) {
            for (let row = 0; row < 3; row++) {
                if (board[row][col] !== 0 && board[row + 1][col] === 0) {
                    [board[row][col], board[row + 1][col]] = [board[row + 1][col], board[row][col]];
                }
            }
        }
    }
}

function handleKey(event) {
    if (event.keyCode === 37) { // Left
        setTimeout(moveLeft(), 1000) ;
    } else if (event.keyCode === 39) { // Right
        moveRight();
    } else if (event.keyCode === 38) { // Up
        moveUp();
    } else if (event.keyCode === 40) { // Down
        moveDown();
    } else {
        return;
    }

    if (isGameOver() === 1) {
        alert('Game Over!');
        return;
    } else if (isGameOver() === 100) {
        alert('Congratulations! You reached 2048!');
        return;
    }

    fillRandomPosition();
    printMatrix();
}

function leftButton(){
    event.keyCode = 37;
    handleKey(event);    
}

function rightButton(){
    event.keyCode = 39;
    handleKey(event);    
}

function upButton(){
    event.keyCode = 38;
    handleKey(event);    
}

function downButton(){
    event.keyCode = 40;
    handleKey(event);    
}

initializeBoard();
setTimeout(fillRandomPosition(),500);
setTimeout(fillRandomPosition(),500);
setTimeout(printMatrix(),500);

document.addEventListener('keydown', handleKey);
