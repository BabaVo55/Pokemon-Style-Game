class Sprite {
    constructor({position, image, frames = {max: 1}}){
        this.position = position
        this.image = image;
        this.frames = {...frames, val: 0};

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        
    }
  
    draw(){
        c.drawImage(
            this.image,
            // Cropping
            this.frames.val,
            0,
            this.image.width / this.frames.max,
            this.image.height, 
            // Actual Dimensions
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height, 
        )
        if (this.frames.val < this.frames.max){
            this.frames.val++
        } else {
            this.frames.val = 0
        }
    }   
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

