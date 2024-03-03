const boxs = document.querySelectorAll('.box')
const statusTxt = document.querySelector('.status-text')
const restartBtn = document.querySelector('.restartBtn')
let running = false
let currentPlayer = 'X'
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let opt = ['', '', '', '', '', '', '', '', '']

initial()

function initial() {
    boxs.forEach(box => {
        box.addEventListener('click', boxClicked)
    })
    restartBtn.addEventListener('click', restartGame)
    statusTxt.textContent = `${currentPlayer} is Your Turn`
    running = true
}

function boxClicked() {
    let index = this.dataset.index
    if (opt[index] != '' || !running) {
        return;
    }
    updatePlayer(this, index)
    checkWin()
}

function updatePlayer(box, index) {
    box.textContent = currentPlayer
    opt[index] = currentPlayer
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    statusTxt.textContent = `${currentPlayer} is Your Turn`
}

function checkWin() {
    let isWon = false
    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i]
        let box1 = opt[condition[0]]
        let box2 = opt[condition[1]]
        let box3 = opt[condition[2]]
        if (box1 == '' || box2 == '' || box3 == '') {
            continue
        }
        if (box1 == box2 && box2 == box3 && box1 == box3) {
            isWon = true
            boxs[condition[0]].classList.add('win')
            boxs[condition[1]].classList.add('win')
            boxs[condition[2]].classList.add('win')
        }
    }

    if (isWon) {
        statusTxt.textContent = `${currentPlayer} is Won`
        running = false
        confetti.start()
        setTimeout(() => {
            confetti.stop()
        }, 3000);
    } else if (!opt.includes('')) {
        statusTxt.textContent = `Game Draw`
        running = false
    } else {
        changePlayer()
    }

}

function restartGame() {
    running = true
    currentPlayer = 'X'
    opt = ['', '', '', '', '', '', '', '', '']
    boxs.forEach( box => {
        box.textContent = ''
        box.classList.remove('win')
    })
    statusTxt.textContent = `${currentPlayer} is Your turn`
    confetti.stop()
}