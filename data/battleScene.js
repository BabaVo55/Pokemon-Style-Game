const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png';

const battleBackground = new Sprite({
    position : {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage

})

const embyImage = new Image();
embyImage.src = './img/embySprite.png';

const emby = new Sprite({
    position: {
        x: 290,
        y: 325,
    },
    image: embyImage,
    frames: {
        max: 4,
        hold: 30
    }, 
    animate: true,
    name: 'Emby'
})

const draggleImage = new Image();
draggleImage.src = './img/draggleSprite.png';

const draggle = new Sprite({
    position: {
        x: 800,
        y: 100
    },
    image: draggleImage,
    frames: {
        max: 4,
        hold: 30
    }, 
    animate : true,
    isEnemy : true,
    name: 'Draggle',
})
let bat = document.getElementById('battle')

const renderedSprites = [draggle, emby];


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


// let draggleHealth = document.getElementById('enemyHealthBar');
// let embyHealth = document.getElementById('playerHealthBar');

// Here right here the heart of the cards resides:!!!!!!!!!!!!!:
document.querySelectorAll('button').forEach(b => { 
    b.addEventListener('click', (e) => {
       
        // Using event listener, we selected the inner html to match the name of the attack within the attacks object;
        const selectedAttack = attacks[e.currentTarget.innerHTML]

        emby.attack({ 
            attack: selectedAttack,
            recipient: draggle, 
            renderedSprites 
        })
    })
})

document.getElementById('dialogueBox').addEventListener('click', (e) => {
    console.log(e)
    document.getElementById('dialogueBox').style.display = 'none'

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