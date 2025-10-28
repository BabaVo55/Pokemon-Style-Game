const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png';

const battleBackground = new Sprite({
    position : {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage

})

const emby = new Monster(monsters.Emby)

const draggle = new Monster(monsters.Draggle)


let bat = document.getElementById('battle')

const renderedSprites = [draggle, emby];

// 1. Create button element 
const button = document.createElement('button')
// 2. Give it a name that corresponds with the logic
button.innerHTML = "YogaFlame";

document.querySelector('#attacksBox').append(
    button
)

function animateBattle(){
    window.requestAnimationFrame(animateBattle);
    battleBackground.draw();
    // no need anymore
    // draggle.draw();
    // emby.draw();
    
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
    
    // bat.style.visibility.hidden;
    // console.log('animating broski')
}

animateBattle()


const queue = [];


// let draggleHealth = document.getElementById('enemyHealthBar');
// let embyHealth = document.getElementById('playerHealthBar');

// Here right here the heart of the cards resides:!!!!!!!!!!!!!:
document.querySelectorAll('button').forEach(b => { 
    b.addEventListener('click', (e) => {
       
        // Using event listener, we selected the inner html to match the name of the attack within the attacks object;
        // 3. The selected name must correspond right here so it can actually assign an attack that exists within the attacks.js file
        const selectedAttack = attacks[e.currentTarget.innerHTML]

        emby.attack({ 
            attack: selectedAttack,
            recipient: draggle, 
            renderedSprites 
        })

        queue.push(() => {
            draggle.attack({ 
                attack: attacks.Tackle,
                recipient: emby, 
                renderedSprites 
            })
        })
    })
})

document.getElementById('dialogueBox').addEventListener('click', (e) => {
    console.log(e)
    // document.getElementById('dialogueBox').style.display = 'none';
    // OR
    
    if (queue.length > 0){
        queue[0]();
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none';
    }

})


// document.getElementById('tackle').addEventListener('click', () => {
//         emby.attack({ attack: {
//                 name: 'Tackle',
//                 damage: 10,
//                 type: 'Normal'
//             },
//             recipient: draggle 
//         })
// })



// document.getElementById('tackle').addEventListener('click', () => console.log('click'))

// const tackle = document.getElementById('tackle')

// tackle.addEventListener('click', () => console.log('click'))

// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', () => console.log('clicked'))
// })