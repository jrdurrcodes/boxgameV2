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
        this.bestSCore = document.getAnimations('bestScore')
        this.freezeColorDisplay = document.getElementById('freezeColorDisplay')
        this.freezeColor= ''
        this.colors = [
            'blue', 'yellow', 'red', 'orange', 'purple', 'green','brown', 'gray', 'white',
        ]

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

    init() {
        this.getFreezeColor()
        this.makeBoxes()

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
            console.log(`Box ${el.id} made`)

            this.addToGameboard(this.gameBoard, box)

            if(box.style.backgroundColor != this.freezeColor) {

                this.changeColor(box, this.boxes)
            }
        })
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
            this.count++
            this.countDisplay.innerText = this.count
            // element.style.backgroundColor = this.colors[Math.floor(Math.random() *
             //this.colors.length)]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == element.dataset.id) {
                //console.log(arr[i].color)
                    arr[i].color = this.colors[Math.floor(Math.random() * this.colors.length)]

                    element.style.backgroundColor = arr[i].color
                }
            }
        })
    }
}

const action = new Game()
action.init()
