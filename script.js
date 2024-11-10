let headingContainer = document.querySelector(".heading-container");
let gameContainer = document.querySelector(".game-container");
let startBtn = document.querySelector(".start-btn");
let restartBtn = document.querySelector(".restart-btn");
let resetBtn = document.querySelector(".reset-btn");
let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msgContainer");

let num = 1;

let leftCol = [
    0, 9, 18, 27, 36, 45, 54, 63, 72
]

let rightCol = [
    8, 17, 26, 35, 44, 53, 62, 71, 80
]

// solved sodukoSolver
let solved = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,
    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,
    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
]

const boxInnerText = (box) => {
    return box.textContent;
}

const startGame = () => {
    gameContainer.classList.remove("hide");
    headingContainer.classList.add("hide");
}
const restartGame = () => {
    gameContainer.classList.remove("hide");
    headingContainer.classList.add("hide");
    msgContainer.classList.add("hide");
}
const resetGame = () => {
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let color = box.style.color;
        if (color == "green" || color == "red") {
            box.innerText = "";
        }
    }
}

const isNum = (innerText) => {
    for (let index = 1; index <= 9; index++) {
        if (innerText == index) {
            return true;
        }
    }
    return false;
}

//l -> left, r -> right
const checkRow = (l, r, num) => {
    for (let j = l; j <= r; j++) {
        if (boxInnerText(boxes[j]) == num) {
            return false;
        }
    }
    return true;
}

// t -> top, b -> bottum
const checkCol = (t, b, num) => {
    for (let j = t; j <= b;) {
        if (boxInnerText(boxes[j]) == num) {
            return false;
        }
        j += 9;
    }
    return true;
}

const checkGrid = (i, num) => {
    
    // 1 grid have 3 rows
    // sub-array show starting point of each row of  1 grid
    gridSPoint = [
        [0, 9, 18], [3, 12, 21], [6, 15, 24],
        [27, 36, 45], [30, 39, 48], [33, 42, 51],
        [54, 63, 72], [57, 66, 75], [60, 69, 78]
    ]

    rsp = ((Math.floor(i / 3)) * 3); // grid : row start point


    let gs = 0; // grid start 

    for (let idx = 0; idx < gridSPoint.length; idx++) {
        let arr = gridSPoint[idx];
        for (let j = 0; j < arr.length; j++) {
            if (rsp == arr[j]) {
                gs = arr[0];
                break;
            }
        }
    }

    let temp = 1; // temp traverse each row of grid

    let trv = gs;
    // loop run 9 times because 1 grid have 9 box
    for (let k = 0; k < 9; k++) {
        let box = boxes[trv];
        if (boxInnerText(box) == num) {
            return false;
        }

        // incearmentation of traverse pointers
        if (temp < 3) {
            //traverse current row
            trv++;
            temp++;
        } else {
            //traverse next row
            trv = trv + 7;
            temp = 1;
        }
    }
    return true;
}

const isSafe = (box, j) => {
    for (let i = 0; i < boxes.length; i++) {
        if (box == boxes[i]) {
            let lCol;
            // check for row
            for (let k = 0; k < leftCol.length; k++) {
                if (leftCol[k] <= i && rightCol[k] >= i) {
                    lCol = leftCol[k];
                    if (!checkRow(leftCol[k], rightCol[k], j)) {
                        console.log("not safe in row");
                        return false;
                    }
                }
            }

            // check for column
            let topRow = i - lCol;
            let botRow = topRow + 72;
            if (!checkCol(topRow, botRow, j)) {
                console.log("not safe in col");
                return false;
            }

            // grid
            if (!checkGrid(i, j)) {
                console.log("not safe in grid");
                return false;
            }
        }
    }
    return true;
}

const reClick = (box) => {
    box.addEventListener("click", () => {
        if (isSafe(box, num)) {
            box.innerText = num;
            box.style.color = "green";
            num++;
        } else {
            box.innerText = num;
            box.style.color = "red";
            num++;
        }
        if (num > 9) {
            num = 1;
        }
    })
}

const isSolved = () => {
    let match = false;
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        if (boxInnerText(box) != solved[i]) {
            match = false;
            return;
        } else {
            match = true;
        }
        i++;
    }


    if (match) {
        showResult();
    }
}

const showResult = () => {
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!isNum(boxInnerText(box))) {
            if (isSafe(box, num)) {
                box.innerText = num;
                box.style.color = "green";
                reClick(box);
                num++;
            } else {
                box.innerText = num;
                box.style.color = "red";
                reClick(box);
                num++;
            }
            if (num > 9) {
                num = 1;
            }
        }
        isSolved();
    })
})

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", resetGame);