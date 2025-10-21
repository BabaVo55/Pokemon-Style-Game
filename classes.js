class Sprite {
    constructor({position, image, frames = {max: 1, hold: 10}, sprites = [], animate = false, isEnemy = false}){
        this.position = position
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.sprites = sprites;
        this.animate = animate;
        this.opacity = 1; // save / initialize the state desired
        this.health = 100
        this.isEnemy = isEnemy;
        
    }
  
    draw(){
        c.save()
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            // Cropping
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height, 
            // Actual Dimensions
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height, 
        )
        c.restore();
        // alter state and render state to create change movement and effect; 
        
        if (!this.animate) return;

        if (this.frames.max > 1){
            this.frames.elapsed ++
        }
        if (this.frames.elapsed % this.frames.hold === 0){
            
            if (this.frames.val < this.frames.max - 1){
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }   
    /// ************************ FOCUS RIGHT HERE> ENGINEERING IS HERE * (BELOW) *****************************************************

    attack({attack, recipient, renderedSprites}){
        let movementDistanceX = 20;
        let movementDistanceY = 10;
        // STEP 1: add health bar variable and default it to enemy ID;
        let healthBar = '#enemyHealthBar';
        const tl = gsap.timeline();


        switch(attack.name){
            case 'Tackle':
             

        
                if (this.isEnemy) {
                    movementDistanceX = -movementDistanceX;
                    movementDistanceY = -movementDistanceY;
                    // Step 2 change ID to player id if this.isEnemy is true; (Class property);
                    healthBar = '#playerHealthBar'
                }
        
                tl.to(this.position, {
                    x: this.position.x - movementDistanceX,
                    y: this.position.y + movementDistanceY
                }).to(this.position, {
                    x: this.position.x + movementDistanceX * 2,
                    y: this.position.y - movementDistanceY * 2,
                    duration: 0.1,
                    onComplete: () => { // through this Hoisting is made possible as we need to reference this.health;
                        // Attack Completed;
                        
                        // Step 3: add health bar variable rather than the enemy ID as it was done before:
                        gsap.to(healthBar, {
                            width: (this.health -= attack.damage) + '%' 
                        });
        
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
        
                        gsap.to(recipient, {
                            opacity:  0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
        
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                    y: this.position.y
                })
            break;

            case 'YogaFlame':
                if (this.isEnemy) {
                    movementDistanceX = -movementDistanceX;
                    movementDistanceY = -movementDistanceY;
                    // Step 2 change ID to player id if this.isEnemy is true; (Class property);
                    healthBar = '#playerHealthBar'
                }
                
                const fireballImage = new Image();
                fireballImage.src = './img/fireball.png';
                const yogaFlame = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true
                        
                })

                // const initialPosition = { x: this.position.x, y: this.position.y };

                // tl.to(this.position, {
                //     x: initialPosition.x - movementDistanceX,
                //     y: initialPosition.y + movementDistanceY,
                //     duration: 0.1
                // }).to(this.position, {
                //     x: initialPosition.x,
                //     y: initialPosition.y,
                //     duration: 0.1
                // });

                tl.to(this.position, {
                    x: this.position.x - movementDistanceX,
                    y: this.position.y + movementDistanceY,
                    duration: 0.1
                }).to(this.position, {
                    // changed to .02 to reduce the kick forward as character is moving forward
                    x: this.position.x + movementDistanceX * .02,
                    y: this.position.y - movementDistanceY * .02,
                    duration: 0.1 
                })

                const  index = renderedSprites.length - 1
                renderedSprites.splice(index, 0, yogaFlame)

                

                gsap.to(yogaFlame.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: (this.health -= attack.damage) + '%' 
                        });
        
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
        
                        gsap.to(recipient, {
                            opacity:  0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08,
        
                        })
                        renderedSprites.splice(1,1)
                        
                    }
                })
            break;
        }
    }

    

    // update(){
    //     if (this.frames.max > 1){
    //         this.frames.elapsed ++
    //     }
    //     if (this.frames.elapsed % 10 === 0){

    //         if (this.frames.val < this.frames.max - 1){
    //             this.frames.val++
    //         } else {
    //             this.frames.val = 0
    //         }
    //     }
    // }
}



class Boundary {
    static width = 48;
    static height = 48;
    constructor({position}){
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, .2)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

