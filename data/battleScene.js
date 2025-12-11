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

emby.attacks.forEach(attack => {
    const button = document.createElement('button')
    button.innerHTML = attack.name;
    document.querySelector('#attacksBox').append(
        button
    )
})


// 1. Create button element 

// 2. Give it a name that corresponds with the logic

let battleAnimationId;
function animateBattle(){
    let battleAnimationId = window.requestAnimationFrame(animateBattle);
    battleBackground.draw();
    
    
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })

    
}

// animateBattle()



const queue = [];

// if ()

// Here right here the heart of the cards resides:!!!!!!!!!!!!!:
document.querySelectorAll('button').forEach(b => { 
    b.addEventListener('click', (e) => {
       
        // Using event listener, we selected the inner html to match the name of the attack within the attacks object;
        // 3. The selected name must correspond right here so it can actually assign an attack that exists within the attacks.js file
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        console.log('before emby attack:' + queue.length)



        emby.attack({ 
            attack: selectedAttack,
            recipient: draggle, 
            renderedSprites 
        })
        
        
        if (draggle.health <= 0){
            queue.push(() => {
                draggle.faint()
                // document.querySelector('dialogueBox').style.display = 'none';

                return;
            });
                queue.push(() => {
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4, 
                            onComplete(){
                                cancelAnimationFrame(battleAnimationId)
                                animate()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0
                                })
                            }
                        })
                    }
                })
            })
        }

        console.log('after emby attack:' + queue.length)
        

        // Draggle / Enemy attacks

        let randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
        // console.log(randomAttack)

        console.log('before draggle attack:' + queue.length)
        
        queue.push(() => {
            draggle.attack({ 
                attack: randomAttack,
                recipient: emby, 
                renderedSprites 
            })
            
        })

        if (emby.health <= 0){
            queue.push(() => {
                emby.faint();
                return;
            });
        }
    })

    b.addEventListener('mouseenter', (e) => {

        document.querySelector('#attackType').innerHTML = `${attacks[e.currentTarget.innerHTML].type}`
        document.querySelector('#attackType').style.color = `${attacks[e.currentTarget.innerHTML].color}`


    })
})



document.getElementById('dialogueBox').addEventListener('click', (e) => {
    // console.log(e)
    // document.getElementById('dialogueBox').style.display = 'none';
    // OR
    
    if (queue.length > 0){
        queue[0]();
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none';
    }

})