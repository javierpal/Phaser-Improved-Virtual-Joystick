# Phaser Improved Virtual Joystick

A better and updated version of Nguyen Tuan Anh Virtual Joystick for Phaser 2.10.5, you can find the original post
here [Original Post](https://medium.com/@netcell/a-virtual-joystick-for-phaser-f59a7a38a642)

 - Demo Gif
 
![](http://www.shiftsoftmx.com/imagenes/vj.gif)

## How to use

Copy and paste the VirtualJoystick.ts file into your proyect, and modify this lines with your preferences.

```javascript
    //Here include Your Own ui Joystick Base Image. Line 20.
    super(game, x, y, 'ui', 'joystick.png');

    //Here you can Adjust the Scale of yout Joystick. Line 27.
    this.scale.set(1.7, 1.7);

    //Here include Your Own ui Joystick Pin Image. Line 38.
    this.pin = this.game.add.sprite(0, 0, 'ui', 'pin.png');
```

and in the end use it like this

```javascript
    // you need to provide a Phaser.Group to put the joystick at the top of sprite z-index.
    this.joystick = new VirtualJoystick(game, YOUR_X, YOUR_Y, JOYSTICK_GROUP);
    this.joystick.data.onMove.add(this.joystickMove, this);

    //and then in the CallBack
    joystickMove(direccion, distanceFromPin, angle, distance){
        //your code here
    }
```

That's it, now you have a virtual joystick for your movile games!! :D.

This code is Totally Free.