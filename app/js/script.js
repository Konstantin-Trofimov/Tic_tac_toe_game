function init() {
    const field = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    drowField(field);
}

function drowField(field) {
    const cross = [];
    const zero = [];
    const out = document.querySelector('.out');
    let spot, spotStatus;
    let step = 0;
    let crossWin;
    let zeroWin;
    for (let i = 0; i < 9; i++) {
        if (i % 3 == 0) out.prepend(document.createElement('br'));
        spot = document.createElement('div');
        spot.classList.add('spot');
        out.prepend(spot);
        spot.onclick = function () {
            if (crossWin == 1) {
                goNewGame();
                return false;
            }
            else if (zeroWin == 1) {
                goNewGame();
                return false;
            }
            else if (crossWin == 0) {
                goNewGame();
                return false;
            }
            else {
                spotStatus = this.getAttribute('data');
                if (spotStatus == 'played') {
                    return false;
                }
                else {
                    step++;
                    score = field[i];
                    if (step % 2 != 0) {
                        this.classList.add('cross')
                        this.setAttribute('data', 'played');
                        cross.push(score);
                    }
                    else {
                        this.classList.add('zero')
                        this.setAttribute('data', 'played');
                        zero.push(score);
                    }
                    crossWin = checkResults(cross, 'Крестики!', step, zeroWin);
                    if (crossWin != 0) {
                        zeroWin = checkResults(zero, 'Нолики!', step, crossWin);
                    }
                }
            }
        }
    }
}

function goNewGame() {
    let spot = document.querySelectorAll('.spot');
    let reset = confirm("Начать новую игру?");
    if (reset == true) {
        for (let i = 0; i < spot.length; i++) {
            spot[i].remove();
        }
        init();
    }

}

// 987
// 654
// 321

function checkResults(arr, player, step, rival) {
    for (let i = 0; i < arr.length; i++) {
        if (arr.includes(9) && arr.includes(8) && arr.includes(7) ||
            arr.includes(6) && arr.includes(5) && arr.includes(4) ||
            arr.includes(3) && arr.includes(2) && arr.includes(1) ||
            arr.includes(9) && arr.includes(6) && arr.includes(3) ||
            arr.includes(8) && arr.includes(5) && arr.includes(2) ||
            arr.includes(7) && arr.includes(4) && arr.includes(1) ||
            arr.includes(9) && arr.includes(5) && arr.includes(1) ||
            arr.includes(7) && arr.includes(5) && arr.includes(3)) {
            console.log('Победили ' + player);
            return 1;
        }
        else if (step == 9 && rival != 1) {
            console.log('Ничья!');
            return 0;
        }
    }
}

init();
