
const randoms = [...Array(9)].map(() => (Math.floor(Math.random() * 9) + 1));
console.log(
    randoms
)

console.log([...Array(9).keys()].sort(function() { return 0.5 - Math.random() }))

const blankGrid = Array(9).fill(Array(9).fill(0))
// check if the grid is full, change the '!==' for '==='
const checkGrid = (grid) =>{
    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++ ){
            if(grid[r][c] !== 0){
                return false
            }
        }
    }
    return true
}

console.log(
    checkGrid(blankGrid)
)

export function range(start, stop, step = 1, circularFill = false, map = (value) => value) {
	if (typeof stop === 'undefined') {
		stop = start;
		start = 0;
	}

	if (step > 0 && start >= stop) {
		step = -step;
	}

	if (step < 0 && start <= stop) {
		return [];
	}
	
	let index = start;
	const result = [];
	
	if (circularFill) {
		const size = start + stop;
		for (index; step > 0 ? index < size : index > size; index += step) {
			result.push(map(index % stop));
		}
		return result;
	}
	
	for (index; step > 0 ? index < stop : index > stop; index += step) {
		result.push(map(index));
	}

	return result;
}

export function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}


// we start with an empty sudoku...
var sudoku1 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var sudoku2 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

// ... and we solve it!!
console.log( solve(sudoku1)  )

export function getSudoku(){
	let sudoku = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	return listToMatrix(solve(sudoku), 9)
	
}

const randomInRange = (min,max) => { return Math.floor(Math.random() * (max - min + 1) + min) };

export function flatten(matrix){
	const flatArr = [];
	matrix.map((row) =>{
		row.map((item) =>{
			flatArr.push(item)
		})
	})
	return flatArr
}

console.log(flatten(getSudoku()))

// test solve function
function testSolve(){
	const baseSodu = getSudoku()
	const hideMe = listOfIndicesToHide(1)
	console.log(hideMe)
	const zero = [[0,0],[0,1],[1,0],[3,6]]
	const [r,c] = zero[3]
	const mysodu = [...baseSodu]
	baseSodu.map((row, rowIndex) =>{
		 row.map((col, colIndex) =>{
			if(zero.some(arr => arraysMatch(arr, [rowIndex, colIndex]))){
				mysodu[rowIndex][colIndex] = 0
			}
		})
	})
	console.log(
		listToMatrix( solve(flatten(baseSodu)), 9)[r][c]
		)
	console.log(
		listToMatrix(solve(flatten(mysodu)),9)[r][c]
	)
	//console.log(arraysMatch(solve(flatten(mysodu)),flatten(baseSodu)))
	
}
testSolve()






console.log(randomInRange(5,30))

export function listOfIndicesToHide(howMany){
	let indices = []
	let row
	let col
	
	while(true){
		row = randomInRange(0,8)
		col = randomInRange(0,8)

		if(!indices.some(arr => arraysMatch(arr, [row,col]))){
			indices.push([row,col])
		}

		if(indices.length >= howMany){
			return indices
		}
	}
	
}
console.log(
	listOfIndicesToHide(2)
	)



console.log(
	arraysMatch([1,2,4],[1,2,4])
)
//HACKING
export function getGame(nMissing){
	const hideElems = listOfIndicesToHide(nMissing)

	return getSudoku().map((row, rowIndex) =>{
		return row.map((item, colIndex) =>{
			if(hideElems.some(arr => arraysMatch(arr, [rowIndex, colIndex]))){
				return {val: 0, row: rowIndex, col: colIndex, answer: item, canChange: true}
			} else{
				return {val: item, row: rowIndex, col: colIndex, answer: item, canChange: false}
			}
		})
	})
	
}

console.log(
	solve(flatten(getGame(40)).map(elem => elem.val)).every(elem => elem !== 0)
)

console.log( getGame(1))


export function arraysMatch(arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

console.log(getSudoku())

// given a sudoku cell, returns the row
function returnRow(cell) {
	return Math.floor(cell / 9);
}

// given a sudoku cell, returns the column
function returnCol(cell) {
	return cell % 9;
}

// giveπn a sudoku cell, returns the 3x3 block
export function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

console.log(
	returnBlock(29)
)

// given a number, a row and a sudoku, returns true if the number can be placed in the row
function isPossibleRow(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock(number,block,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}

// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber(cell,number,sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}

// given a row and a sudoku, returns true if it's a legal row
function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}

// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}

// given a 3x3 block and a sudoku, returns true if it's a legal block 
function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}

// given a sudoku, returns true if the sudoku is solved
export function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}

// given an array of possible values assignable to a cell, returns a random value picked from the array
function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}

// given a sudoku, returns a two dimension array with all possible values 
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}

// given an array and a number, removes the number from the array
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

// given a sudoku, solves it
function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	var i=0;
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku)) {
		i++;
		nextMove = scanSudokuForUnique(sudoku);
		if (nextMove == false) {
			nextMove = saved.pop();
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove,whatToTry);
		if (nextMove[whatToTry].length>1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);
			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
	//return showSudoku(sudoku,i);
	return sudoku
}


// given a solved sudoku and the number of steps, prints out the sudoku
function showSudoku(sudoku,i) {
	var sudokuText = "";
	var solved = "\n\nSolved in "+i+" steps";
	for (var i=0; i<=8; i++) {
		for (var j=0; j<=8; j++) {
			sudokuText+=" ";
			sudokuText+=sudoku[i*9+j];
			sudokuText+=" ";
			if (j!=8) {
				sudokuText+="|";
			}
		}
		if (i!=8) {
			sudokuText+="\n---+---+---+---+---+---+---+---+---\n";
		}
	}
	sudokuText+=solved;
	return sudokuText
}
