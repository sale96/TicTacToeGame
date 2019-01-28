let turn = true;
let times = 0;
const newGame = document.querySelector('#button-new');
const resetGame = document.querySelector('#button-reset');
const textOut = document.querySelector('#textOutput');
const textGet = document.querySelector('#textGet');

let board = [
    [0,0,0],
    [1,1,1],
    [2,2,2]
];

let particles = {
    clicked : []
}

textChange('Turn: ', 'X');
drawBoard(board);

let part = document.querySelectorAll('.particle');

//Events
part.forEach((p)=>{
    p.addEventListener('click', clickEvent);
});

newGame.addEventListener('click', reset);
resetGame.addEventListener('click', reset);

//Functions
function clickEvent(){
    if(particles.clicked.includes(this)){
        console.log("You aren't suppose to click this twice!");
    }else{
        if(turn){
            this.innerHTML = 'X';
            textGet.innerHTML = 'O';
        }else{
            this.innerHTML = 'O';
            textGet.innerHTML = 'X';
        }
        times++;
        turn = !turn;
        this.style.opacity = 0.6;
        particles.clicked.push(this);

        checkForWinner();
    }
}

function checkForWinner(){
    let thereIswinner = false;
    
    let ids = [
        ['p00', 'p01', 'p02'], 
        ['p10', 'p11', 'p12'], 
        ['p20', 'p21', 'p22']
    ];

    let o1 = document.getElementById(ids[0][0]);
    let o2 = document.getElementById(ids[0][1]);
    let o3 = document.getElementById(ids[0][2]);
    let i1 = document.getElementById(ids[1][0]);
    let i2 = document.getElementById(ids[1][1]);
    let i3 = document.getElementById(ids[1][2]);
    let r1 = document.getElementById(ids[2][0]);
    let r2 = document.getElementById(ids[2][1]);
    let r3 = document.getElementById(ids[2][2]);
    //Vertical
    if((o1.innerHTML == i1.innerHTML) && (i1.innerHTML == r1.innerHTML) && (o1.innerHTML != "")){
        thereIswinner = true;
        colorChange(o1,i1,r1);
    }
    else if((o2.innerHTML == i2.innerHTML) && (i2.innerHTML == r2.innerHTML) && (o2.innerHTML != "")){
        thereIswinner = true;
        colorChange(o2,i2,r2);
    }
    else if((o3.innerHTML == i3.innerHTML) && (i3.innerHTML == r3.innerHTML) && (o3.innerHTML != "")){
        thereIswinner = true;
        colorChange(o3,i3,r3);
    }
    //Horizontal
    else if((o1.innerHTML == o2.innerHTML) && (o2.innerHTML == o3.innerHTML) && (o1.innerHTML != "")){
        thereIswinner = true;
        colorChange(o1,o2,o3);
    }
    else if((i1.innerHTML == i2.innerHTML) && (i2.innerHTML == i3.innerHTML) && (i1.innerHTML != "")){
        thereIswinner = true;
        colorChange(i1,i2,i3);
    }
    else if((r1.innerHTML == r2.innerHTML) && (r2.innerHTML == r3.innerHTML) && (r1.innerHTML != "")){
        thereIswinner = true;
        colorChange(r1,r2,r3);
    }
    //Diagonal
    else if((o1.innerHTML == i2.innerHTML) && (i2.innerHTML == r3.innerHTML) && (o1.innerHTML != "")){
        thereIswinner = true;
        colorChange(o1,i2,r3);
    }
    else if((o3.innerHTML == i2.innerHTML) && (i2.innerHTML == r1.innerHTML) && (o3.innerHTML != "")){
        thereIswinner = true;
        colorChange(o3,i2,r1);
    }

    decideWinner(thereIswinner);
}

function decideWinner(thereIswinner){
    if(thereIswinner){
        part.forEach((p)=>{
            p.style.opacity = 0.6;
            particles.clicked.push(p);
        });

        let winner = "";
        
        if(turn){
            winner = "O";
        }else{
            winner = "X";
        }
        
        textChange('Winner: ', winner);
    }else{
        if(times == 9){
            textChange('Draw', '');
            part.forEach((f) => {
                f.style.color = 'rgb(160, 1, 1)';
            })
        }
    }
}

function textChange(text1, text2){
    textOut.innerHTML = text1;
    textGet.innerHTML = text2;
}

function colorChange(par1, par2, par3){
    par1.style.color = 'rgb( 18, 187, 52)';
    par2.style.color = 'rgb( 18, 187, 52)';
    par3.style.color = 'rgb( 18, 187, 52)';
}

function reset(){
    turn = true;
    times = 0;
    particles.clicked = [];
    console.clear();
    textChange('Turn: ', 'X');
    part.forEach((f)=>{
        f.style.opacity = 1;
        f.innerHTML = '';
        f.style.color = '#000';
    });
}

function drawBoard(board){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            document.querySelector("#board").innerHTML += "<div class='particle' id='p" + i + j + "'></div>";
        }
    }
}