const board_container = document.querySelector('.board');
const row = 4
const column = 4
let score = 0;
var board;
window.onload=()=>{
    setboard();
}


function setboard(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for(var i = 0; i < row; i++){
        for(var r = 0; r < column; r++){
            const tile = document.createElement('div')
            tile.classList.add('tile')
            var num = board[i][r];
            updatetile(tile,num)
            tile.id = i.toString()+'-'+r.toString();
            board_container.append(tile)
           
        }
    }

    addtwo();
    addtwo();
}
function updatetile(tile,num){
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if(num>0){
        tile.innerText = num.toString();
        if(num < 4096){
            tile.classList.add('x'+num.toString())
        }
        else{
            tile.classList.add('x8192')
        }
    }
    
 
}
function filterzero(row){
    return row.filter(r=>r!==0)
}
function slide(row){
    row = filterzero(row)//[2,2,2,0]
    for(var i=0;i<row.length-1;i++){
        if(row[i]==row[i+1]){//[2,2,2]
            row[i]*=2//[4,2,2]
            row[i+1]=0//[4,0,2]
            score+=row[i]
        }
    }
    row = filterzero(row)//[4,2]
    while(row.length<column){
        row.push(0)//[4,2,0,0]
    }
    return row;
}
function slideleft(){
    for(var i=0;i<row;i++){
        let row = board[i];
        row = slide(row);//add the near numbers
        board[i] = row
        for(var r=0;r<column;r++){
        let tile = document.getElementById(i.toString()+'-'+r.toString())
        var num = board[i][r]
        updatetile(tile,num)
        }
    }
}
function slideright(){
    for(var i=0;i<column;i++){
        let row = board[i]//[2,2,4,0]
        row.reverse()//[0,4,2,2]
        row = slide(row)//[4,4,0,0]
        board[i] = row.reverse()//[0,0,4,4]
        for(var r=0;r<column;r++){
            let tile = document.getElementById(i.toString()+'-'+r.toString())
            var num = board[i][r]
            updatetile(tile,num)
        }
    }
}
function slideup(){
    for (let c = 0; c < column; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < row; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);
        }
    }
    console.log('triggered')
}
function slidedown(){
    for (let c = 0; c < column; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < row; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);
        }
    }
}
window.addEventListener('keyup',(e)=>{
    if(e.code == 'ArrowLeft'){
        slideleft();
        addtwo();
    }
    if(e.code == 'ArrowRight'){
        slideright();
        addtwo();
    }
    if(e.code == 'ArrowUp'){
        slideup();
        addtwo();
    }
    if(e.code == 'ArrowDown'){
        slidedown();
        addtwo();
    }
})

function addtwo(){
    if(!hasemptytile()){
        return;
    }
    let finded = false;
    while(!finded){
    let r = Math.floor(Math.random()*row);
    let c = Math.floor(Math.random()*column);
    if(board[r][c]==0){
    board[r][c] = 2;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.innerText = '2';
    tile.classList.add('x2');
    finded=true
    }
}
}
function hasemptytile(){
    for(var i=0;i<row;i++){
        for(var r=0;r<column;r++){
            let num = board[i][r]
            if(num == 0){
                return true;
            }
        }
    }
    return false;
}

