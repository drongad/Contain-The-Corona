class Doctor{
    constructor(x,y,w,h){
        this.body = Bodies.rectangle(x,y,w,h)
        this.w = w
        this.h = h
        this.image = loadImage("doctor.png")
        this.setCollider = ("circle",20,20)
        World.add(world,this.body)
    }
    display(){
        var pos = this.body.position
        push()
        translate(pos.x,pos.y)
        imageMode(CENTER)
        image(this.image,pos.x,pos.y,this.w,this.h)
        pop()

    }
}