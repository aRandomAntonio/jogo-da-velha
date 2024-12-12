let casas = [
    [],
    [],
    []
];

let endMatch = false;

casas[0][0] = document.getElementById("1");
casas[0][1] = document.getElementById("2");
casas[0][2] = document.getElementById("3");
casas[1][0] = document.getElementById("4");
casas[1][1] = document.getElementById("5");
casas[1][2] = document.getElementById("6");
casas[2][0] = document.getElementById("7");
casas[2][1] = document.getElementById("8");
casas[2][2] = document.getElementById("9");

console.log(casas[0][0].textContent);

let X = document.getElementById("X");
let O = document.getElementById("O");

let user, IA;
let selectedIds = [];
let aviso = document.getElementById("aviso");
let reset = document.getElementById("reset");

X.addEventListener("click", () => {
    if(user === undefined){
    user = "X";
    IA = "O";
    }
    else{
        aviso.innerHTML = "voce ja escolheu um jogador"
    }
});

O.addEventListener("click", () => {
    if(user === undefined){
        user = "O";
        IA = "X";
        }
        else{
            aviso.innerHTML = "voce ja escolheu um jogador"
        }
});

let squares = document.querySelectorAll(".square");

squares.forEach(square =>{
    square.addEventListener("click", () =>{
        let count3 = 0;
        if(user === undefined){
            aviso.innerHTML = "escolha um jogador primeiro";
        }
        else if(endMatch === true){
            aviso.innerHTML = "a partida ja acabou";
            return;
        }
        else if(square.textContent.trim()){
            aviso.innerHTML = "escolha um espaço vazio";
        }
        else if(!square.textContent.trim() && user !== undefined){
            square.innerHTML = user;
            aviso.innerHTML = "";
            selectedIds.push(parseInt(square.id));
            for(let i = 0; i < 3; i++){
                let count1 = 0, count2 = 0
                let temp = user
            
                for(let j = 0; j < 3; j++){
                    if(casas[i][j].textContent === temp && temp !== ""){

                        count1++;
                    }
                    if(casas[j][i].textContent === temp  && temp !== ""){
                        count2++;
                    }
                    if(casas[i][j].textContent !== ""){
                        count3++;
                    }
                }
                if(count2 === 3 || count1 === 3){
                    aviso.innerHTML = "parabens, voce ganhou"
                    endMatch = true;
                    break;
                }
                else if(count3 === 9){
                    aviso.innerHTML = "o jogo empatou"
                    endMatch = true;
                }
            }
            if(casas[0][0].textContent === user && user === casas[1][1].textContent && user === casas[2][2].textContent){
                aviso.innerHTML = "parabens, voce ganhou"
                endMatch = true;
            }
            if(casas[0][2].textContent === user && casas[2][0].textContent === user && user === casas[1][1].textContent){
                aviso.innerHTML = "parabens, voce ganhou"
                endMatch = true;
            }
            if(endMatch === true){
                return;
            }
            setTimeout(() => {
                let randomId;
                do{
                    randomId = Math.floor(Math.random() * 9) + 1;

                }while(selectedIds.includes(randomId));

                let IAsquare = document.getElementById(randomId.toString());

                IAsquare.innerHTML = IA;

                selectedIds.push(randomId);

                for(let i = 0; i < 3; i++){
                    let count1 = 0, count2 = 0;
                    let temp = IA
                
                    for(let j = 0; j < 3; j++){
                        if(casas[i][j].textContent === temp && temp !== ""){
                            count1++;
                        }
                        if(casas[j][i].textContent === temp && temp !== ""){
                            count2++;
                        }
                    }
                    if(count2 === 3 || count1 === 3){
                        aviso.innerHTML = "voce perdeu";
                        endMatch = true;
                        break;
                    }
                }
                if(casas[0][0].textContent === IA && casas[1][1].textContent === IA && casas[2][2].textContent === IA){
                    aviso.innerHTML = "voce perdeu";
                    endMatch = true;
                }
                if(casas[0][2].textContent === IA && casas[1][1].textContent === IA && casas[2][0].textContent === IA){
                    aviso.innerHTML = "voce perdeu";
                    endMatch = true;
                }
            }, 200);
        }
    })
})

reset.addEventListener("click", () => {
    aviso.innerHTML = "ola, escolha um jogador";
    user = undefined;
    IA = undefined;
    squares.forEach(square => {
        square.innerHTML = "";
    })
    endMatch = false;
    selectedIds = [];
})
