//Change it for your module or Delete it
module YourModule {
    var normalize = Phaser.Point.normalize;
    var zero = new Phaser.Point(0, 0);
    export class VirtualJoystick extends Phaser.Sprite {

        pin: Phaser.Sprite;
        dragger: Phaser.Sprite;

        originalPosition: Phaser.Point;

        direction: Phaser.Point;
        distance:any = 0;
        pinAngle:any = 0;
        disabled: boolean = false;
        isBeingDragged: boolean = false;

        normalize: Phaser.Point;

        constructor(game, x, y, group){
            //Here include Your Own ui Joystick Base Image
            super(game, x, y, 'ui', 'joystick.png');
            this.anchor.set(0.5, 0.5);
            this.fixedToCamera = true;
            this.position.set(x, y);
            /*The group is for z-index, on sprite,
            so make it al the end of your groups*/
            group.add(this);
            //Here you can Adjust the Scale of yout Joystick
            this.scale.set(1.7, 1.7);

            this.originalPosition = new Phaser.Point(x, y);
            this.direction = new Phaser.Point(0, 0);
            this.distance = 0;
            this.pinAngle = 0;
            this.disabled = false;
            this.isBeingDragged = false;

            this.data.onMove = new Phaser.Signal();
            //Here include Your Own ui Joystick Pin Image
            this.pin = this.game.add.sprite(0, 0, 'ui', 'pin.png');
            this.pin.anchor.set(0.5,0.5);
            this.addChild(this.pin);

            this.dragger = this.game.add.sprite(x, y, null);
            this.dragger.anchor.set(0.5, 0.5);
            this.dragger.width = this.width;
            this.dragger.height = this.height;
            this.dragger.fixedToCamera = true;
            this.dragger.inputEnabled = true;
            this.dragger.input.enableDrag(true);
            this.dragger.events.onDragStart.add(this.dragStart, this);
            this.dragger.events.onDragStop.add(this.dragStop, this);
        }

        enable(){
            this.disabled = false;
        }
        disable(){
            this.disabled = true;
        }

        dragStart(){
            this.isBeingDragged = true;
            if (this.disabled) return;
            this.events.onInputDown.dispatch();
        }

        dragStop(){
            this.isBeingDragged = false;
            this.dragger.cameraOffset.setTo(this.originalPosition.x, this.originalPosition.y);
            this.pin.position.setTo(0, 0);
            this.direction.setTo(0, 0);
            if (this.disabled) return;
            this.data.onMove.dispatch(0, 0, 0, 0);
        }

        update(){
            if (this.isBeingDragged) {
                let dragger   = new Phaser.Point(this.dragger.position.x - this.position.x, this.dragger.position.y - this.position.y);
                let pin       = this.pin.position;
                let angle     = this.pinAngle = zero.angle(dragger);
                let distance  = this.distance = Math.sqrt((dragger.x * dragger.x) + (dragger.y * dragger.y));
                let direction = normalize(dragger, this.direction);
                pin.copyFrom(dragger);
                if (distance > 90) pin.setMagnitude(90);
                if (this.disabled) return;
                let distanceFromPin = pin.getMagnitude();
                this.data.onMove.dispatch(direction, distanceFromPin, angle, distance);
            }
        }

    }
}