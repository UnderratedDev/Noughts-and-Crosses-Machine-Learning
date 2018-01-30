var board = new Array(1);

function generateArray(size) {
    board = new Array(size);
    for (let i = 0; i < size; ++i) {
        let row = new Array(size);
        for (let j = 0; j < size; ++j) {
            row[j] = ' ';
        }
        board[i] = row;
    }
}

function randomSelect() {
    let options = [];
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            let option = [];
            if (board[i][j] == ' ') {
                option.push (i);
                option.push (j);
                options.push(option);
            }
        }
    }
    console.log (options);
    if (options.length == 0)
        return -1;

    selected = Math.floor(Math.random() * (options.length - 1));
    return options[selected];
}

function checkWin (letter) {
    size = board.length;
    i = 0;
    j = 0;

    for (; i < size; ++i)
        if (board[i][i] != letter)
            break;

    if (i == size) {
        return true;
        console.log ("diagonal win");
    }

    for (i = (size - 1); i >= 0; --i)
        if (board[size - i - 1][i] != letter)
            break;

    if (i == -1) {
        console.log ("diagonal win");
        return true;
    }

    for (i = 0; i < size; ++i)
        for (j = 0; j < size; ++j)
            if (board[i][j] != letter)
                break;

    if (j == size) {
        console.log ("row win");
        return true;
    }

    for (i = 0; i < size; ++i)
        for (j = 0; j < size; ++j)
            if (board[j][i] != letter)
                break;

    if (j == size) {
        console.log ("column win");
        return true;
    }

    return false;
}

function setup() {
    generateArray(3);

    let table = $("#container");
    for (let i = 0; i < board.length; ++i) {
        let row = "<tr>\n";
        for (let j = 0; j < board[i].length; ++j) {
            let id = i + '_' + j;
            row += "<td text-align='center'><button id=" + id + ">" + board[i][j];
            row += "</button></td>";
        }
        row += "</tr>";
        table.append(row);
        for (let j = 0; j < board[i].length; ++j) {
            let id = i + '_' + j;
            $("#" + id).click(function (event) {
                let button = event.target;
                positionArray = button.id.split('_');
                x = parseInt(positionArray[0]);
                y = parseInt(positionArray[1]);
                board[x][y] = 'x';
                button.innerHTML = board[x][y];

                win = checkWin('x');
                aiWin = checkWin ('o');

                if (win) {
                    alert ("YOU WIN");
                }

                if (aiWin) {
                    alert ("AI WINS");
                }

                value = randomSelect();
                if (value != -1) {
                    let ai_id = value[0] + "_" + value[1];
                    let aiButton = $("#" + ai_id);
                    board[value[0]][value[1]] = 'o';
                    aiButton.text('o');
                }
            })
        }
    }
}

$(document).ready(setup);