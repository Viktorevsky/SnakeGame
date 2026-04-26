const readline = require('readline')
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let HEIGTH = 32
let WIDTH = HEIGTH*2

function createZone(n){
    let zone = ''
    zone += '#'.repeat(WIDTH) + '\n';
    for(let i=0;i<n;i++){
        zone += '#' + ' '.repeat(WIDTH-2) + '#\n';
    }
    zone += '#'.repeat(WIDTH) + '\n';
    return zone
}

function CoordinCenter(n){
    let col = n;
    let row = Math.round(n/2);
    return row * (WIDTH+1) + col 
}

function SnakeCoord(zone,x){
    let index = zone.indexOf(x);
    let col = index % (WIDTH+1)
    let row = Math.round((index-col)/(WIDTH+1))
    return [col,row]
}

function createSnake(zone,n){
    let snake = '@';
    let arr = zone.split('')
    let index = CoordinCenter(n)  // +1 из-за \n
    arr[index] = snake
    return arr.join('')
}

let = moveList = []


let Zone = createZone(HEIGTH)

Zone = createSnake(Zone,HEIGTH)

function gameOver(){
    console.log('GAME OVER')
    process.exit()
}

let BlockedDir = {'up':['up','down'],
                  'down':['up','down'],
                  'left':['left','right'],
                  'right':['left','right']
}



let coords = SnakeCoord(Zone,'@')
let col = coords[0]
let row = coords[1]
let tailLen = 5
let Tail = []
let dir = 'right'
let nextdir = 'right';
let timer;
let time = 200;
let arr = Zone.split('');
let applesCount = 1

function apple() {
    let num;
    do {
        let r = Math.floor(Math.random() * (HEIGTH)) + 1;  
        let c = Math.floor(Math.random() * (WIDTH - 2)) + 1; 
        num = r * (WIDTH + 1) + c;
    } while (arr[num] === '#' || arr[num] === '\n' || arr[num] === '0' || arr[num] === '@' || arr[num] === 'X');
    
    arr[num] = 'X';
}


function main(h){
    clearInterval(timer)
    timer = setInterval(() =>{
        dir = nextdir;
        time = (dir == 'up' || dir == 'down') ? 200 : 50;
        let Index = row * (WIDTH+1) + col

        if(dir == 'up')row--;
        else if(dir == 'down') row++;
        else if(dir == 'right') col++; 
        else if(dir == 'left') col--;
        arr[Index] = '0' 
        Tail.unshift(Index)
        if(tailLen == Tail.length){
            arr[Tail[tailLen-1]] = ' '
            Tail.pop()
        }    
        
        if(!arr.includes('X')){
            for(let i=0;i<applesCount;i++){
            apple()    
            tailLen++
        }
    }
        

        time = (dir == 'up' || dir == 'down') ? 75 : 150;
        let newIndex = row * (WIDTH+1) + col
        if(arr[newIndex] == '0') gameOver()
        arr[newIndex] = '@'
        Zone = arr.join('')
        process.stdout.write('\x1Bc' + Zone + tailLen + '\n' + SnakeCoord(Zone,'@') + '\n');
        if(col <= 0 || col > WIDTH-2 || row > h || row <= 0){
            gameOver()
        }
        },time)
    }

process.stdin.on('keypress',(str,key) =>{
    if(key.ctrl && key.name == 'c') process.exit(); 
    if(!BlockedDir[dir].includes(key.name)){ 
        nextdir = key.name;
        main(HEIGTH);
        }
})

process.stdout.write('\x1Bc' + Zone)
console.log('Start with up or down key')


