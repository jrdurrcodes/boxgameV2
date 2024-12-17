// class Game {
//     constructor() {
//         this.countDisplay = document.getElementById('countDisplay')
//         this.gameBoard = document.getElementById('gameBoard')
//         this.count = 0
//         this.colors = [
//         'blue', 'yellow', 'red', 'orange', 'purple', 'green','brown', 'gray', 'white',
//         ]
        
//         this.boxes = [
//             {
//                 id: 1,
//                 color: 'blue',
//             },
//             {
//                 id: 2,
//                 color: 'yellow'
//             },
//             {
//                 id: 3,
//                 color: 'red'
//             },
//             {
//                 id : 4,
//                 color: 'orange'
//             },
//             {
//                 id : 5,
//                 color: 'purple'
//             },
//             {
//                 id : 6,
//                 color: 'green'
//             },
//             {
//                 id : 7,
//                 color: 'brown'
//             },
//             {
//                 id : 8,
//                 color: 'gray'
//             },
//             {
//                 id : 9,
//                 color: 'white'
//             },
//         ]
//     }
    
//     init() {
        
//         this.makeBoxes()
//     }
//     makeBoxes() {
//         this.boxes.forEach(item => {
//             const box = document.createElement('div')
//             box.classList.add('box')
//             box.setAttribute('id', `box-${item.id}`)
//             box.style.backgroundColor = item.color
//             box.style.width = '200px'
//             box.style.height = '200px'
//             this.placeOnBoard(box)
//             this.handleClick(box)
//         })
//     }
//     placeOnBoard(item) {
//         this.gameBoard.appendChild(item)
//     }
//     handleClick(item) {
//         item.addEventListener('click', ()=>{
//             //console.log(item.style.backgroundColor)
//             this.changeColor(item, this.getRandomColor())
//             this.getCount()
//         })
//     }
    
//     getRandomColor() {
//         const idx = Math.floor(Math.random() * this.colors.length)
//         const randomColor = this.colors[idx]
//        // console.log(randomColor)
//         return randomColor
//     }
// }



class Game {

    constructor() {
        this.count = 0
        this.gameBoard = document.getElementById('gameBoard')
        this.countDisplay = document.getElementById('countDisplay')
        this.bestScore = document.getElementById('bestScore')
        this.freezeColorDisplay = document.getElementById('freezeColorDisplay')
        this.message = document.getElementById('message')
        this.freezeColor= ''
        this.hasWon = false
        this.gamePlay = false
        this.colors = [
            'blue', 'yellow', 'red', 'orange', 'purple', 'green','brown', 'gray', 'white',
        ]
        this.matches = 0
        this.matchDisplay = document.getElementById('matchDisplay') 
        
        this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 4,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 5,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 6,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 7,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 8,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
            id : 9,
            color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]

        this.scores = { 
            prevScore: 0,
            currScore: 0,
            bestScore: 0
        }
    }

    init() {

        if (!this.gamePlay) return
        this.getFreezeColor()
        this.makeBoxes()
        this.getMatches()
    }

    makeBoxes() {
        this.boxes.forEach(el =>{ 
            const box  = document.createElement('div')

            box.classList.add('box')
            box.setAttribute('id', `box-${el.id}`)
            box.dataset.id = el.id
            box.style.width = '200px'
            box.style.height = '200px'
            box.style.backgroundColor = el.color
            
            //console.log(`Box ${el.id} made`)

            this.addToGameboard(this.gameBoard, box)
            this.showMatches()

                this.changeColor(box, this.boxes)
            
        })
    }

    getMatches() {
        for(let i = 0; i < this.boxes.length; i++) {
            if(this.freezeColor == this.boxes[i].color) {
                this.matches++
                this.showMatches()
            }
        }
    }

    showMatches() {
        this.matchDisplay.innerText = this.matches
    }

    addToGameboard(parent, child) {
        return parent.appendChild(child)
    }

    getFreezeColor() {
        this.freezeColor = this.colors[Math.floor(Math.random() * this.colors.length)]
        
        this.freezeColorDisplay.innerText = this.freezeColor
    }

    changeColor(element, arr) {
        element.addEventListener('click', ()=> {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == element.dataset.id) {

                // test freezeColor here 
                    if (this.freezeColor !=arr[i].color) {        
                    this.count++
                    this.scores.currScore = this.count
                    this.countDisplay.innerText = this.count
                    
                    arr[i].color = this.colors[Math.floor(Math.random() * this.colors.length)]
                    this.colors.length    
                    element.style.backgroundColor = arr[i].color

                        if  (arr[i].color == this.freezeColor) {
                            this.matches++
                            this.showMatches()
                        }
                    }
                }
                
            }
                this.checkWin()
        })
    }
    checkWin() {
        if(this.matches == 9 && this.gamePlay == true) {
            this.hasWon = !this.hasWon
            //working on checkwin; need a game start button
            this.message.innerText = `You win and it took ${this.count} clicks!`
            this.gameBoard.innerHTML = ''
            this.gamePlay = false
            this.setScores()
        }
    }

    setScores() {

        this.scores.prevScore = this.scores.currScore
        this.scores.currScore = this.count
        
        if (this.count < this.scores.bestScore && this.count > 0) {
            bestScore = this.count
        } else { 
            this.scores.bestScore = this.scores.currScore
        }
        
        // this.scores.bestScore = bestScore
        this.bestScore.innerText = this.scores.bestScore
    }

    resetGame() {
        this.resetBoxes()
        this.message.innerText = ''
        this.matches = 0
        this.count = 0
        this.countDisplay.innerText = this.count
        this.gameBoard.innerHTML = ''
        this.gamePlay = !this.gamePlay
        this.hasWon = false
        this.init()
    
    }
    resetBoxes () { 
        this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 4,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 5,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 6,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 7,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 8,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 9,
                color:  this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]
    }
}

// const action = new Game()

// const startBtn = document.getElementById('startBtn')

// startBtn.addEventListener('click', ()=> {
//     // action.gamePlay = !action.gamePlay
//     // action.gameBoard.innerHTML = ''
//     // action.init()
//     action.resetGame()
// })
//^v same thing
// startBtn.addEventListener('click', ()=> action.resetGame()))
document.getElementById('startBtn').addEventListener('click' , ()=> new Game().resetGame())
//this is a condensed version of the above code

