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
        this.opacity = 1; // save / intialize the state desired
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

    attack({attack, recipient}){

        let movementDistanceX = 20;
        let movementDistanceY = 10;
        let healthBar = '#enemyHealthBar'

        if (this.isEnemy) {
            movementDistanceX = -movementDistanceX;
            movementDistanceY = -movementDistanceY;
            healthBar = '#playerHealthBar'
        }

        const tl = gsap.timeline();
        tl.to(this.position, {
            x: this.position.x - movementDistanceX,
            y: this.position.y + movementDistanceY
        }).to(this.position, {
            x: this.position.x + movementDistanceX * 2,
            y: this.position.y - movementDistanceY * 2,
            duration: 0.1,
            onComplete: () => { // through this Hoisting is made possible as we need to reference this.health;
                // Attack Completed;
                gsap.to(healthBar, {
                    width: this.health - attack.damage + '%' 
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

