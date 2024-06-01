# Defender-Adaptation
An adaption of the game "Defender (1981)"
It can be viewed here: [Website](https://arcane34.github.io/Defender-Adaptation/)

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/Defender-Adaptation-Preview.gif)

This adaptation was inspired by another game called 'Fez', as you'll see the player plays as the main character from Fez and the blackholes are also taken out from it too.

## Game Mechanics
The basic game mechanics are as follows:
- Basic up/down/left/right movement of a ship
- Obstacles come from the right to the left, requiring to be dodged

However I decided on removing left/right movement as the mechanic of being able to destroy obstacles doesn't exist in my adaptation.

The basic method of implementing motion in games is to change the motion of the sprite of the character:
- You can make this more understandable by creating velocity variables that change the position of the player
- Then you can add variability to their motion such as friction etc via acceleration and deceleration

Obstacle generation on the other hand is done via procedural generation:

- The obstacles used are tetris blocks drawn by me in the style of pixel art 
- Obstacle position is randomly determined across a long rectangle from the starting window to far east from it, essentially generating the level to the end.

### Collision Detection
Collision Detection is then required for the game to function, collision detection is essentially checking if there is overlap between objects where in most occasions both player and enemies along with any structures will have a collision rectangle or collision point. Other times a collision circle is simulated by checking the distance between objects than the overlap of shapes.

However, checking collision with every other object is an arduous process and wastes a lot of CPU cycles on objects that are too far to be checked for collision.

There are ways to optimise this ofcourse, a few ways I know are:
- Only checking collision with objects that are on screen 
- Doing a binary search to find objects in close proximity to the player and checking collision with those

I chose to take the second option and did a binary search on all enemy objects until I get to the object closest to the player to check if the distance is smaller than a fixed constant being the collision constant.

## Procedularal Generation
There are background elements to the game such as the black holes amd lightning strikes during the game which are generated procedurally through code.

### Lightning Strikes
The lightning itself is a composition of lines that travel from the top to the bottom of the screen, starting from a single point.

1. The line travels down using a vector of fixed size which is rotated by a random amount
2. It then make a choice on if the next line will consist of 2 separate lines or only 1
3. It then repeats step 1 and 2 for the following lines until it reaches the bottom of the screen

This create the image of the lightning, we can save this generation of a lightning strike via a random seed, then during the game we flash the image in random intervals to give the impression of a lightning strike.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/Lightning-Gen-Preview.gif)

### Black Holes
The black holes are also inspired from the ame FEZ where the game showed blackholes as obstacles for the player, contrary to this adaptation where they are background elements.
However the blackholes of FEZ are minimalistically designed, having a basic border, a glitch effect and a parallax effect with the stars shown inside. This design works for the game as the game is all about change in perspective and the blackholes can transform accordingly creating a visually pleasing effect but as this adaptation of Defender is 2 dimensional without a change in perspective a different design needed to be made which led to this.

The black holes are generated via recursion and random generation. The generation consists of 5 steps:
- Generating the star layer
- Adding outline to the blackhole
- Generating a blackhole mask into the star layer
- Moving the object as a whole
- Generating multiple blackholes layered on top of each other


#### 1. Stars
Generating the star layer is simple as it only consists of generating 280 Star objects which requires the creating 280 random (x,y) coordinates within the screen's boundaries via a random seed. After that they are displayed onto the screen via the object's show function which draws a rect on screen.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/starsPrev.jpg)

#### 2. Outline
Generating the outline of the blackhole was a bit more difficult as I decided it needed to mimic a glitch effect. My visualisation of the glitch effect was the red green and blue part of the hole being separated and moved out of place at the edges, so I created the outline by having 3 rectangles that are coloured red green and blue respectively that are drawn rotated by a random amount within the range of -0.05 to 0.05 radians. Finally, a black square is drawn at the centre which blends in with the black background creating the blackhole.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/outlinePrev.gif)

#### 3. Blackhole Mask
Generating the blackhole mask consisted of essentially drawing the stars only when its coordinates were located within the boundaries of any blackhole. This is done via a for loop that essentially checks the collision between any star and blackhole object, when this occurs the star object's show function is called otherwise it will not be shown thereby creating the mask effect.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/outlineStarPrev.gif)

#### 4. Moving Blackholes
Moving the blackhole objects was done simply via a random assignment of negative x velocities which decreases the x value of the object by a set amount everytime the draw function is called.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/movementPrev.gif)

#### 5. Recursive Blackholes
The blackholes are created similarly to the lightning in that blackholes are generated recursively from the parameters of the original blackhole such that it resides on the edges of the original blackhole, this has a random chance of happening multiple times which helps to create variety in the shapes of the objects. I also ensure that the black square of each blackhole is drawn last such that the objects seem to merge when displayed rather than having overlapping blackholes each with their outline clashing with the other.

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/recursionPrev.gif)

#### Creation of Blackhole Objects
The creation of the blackhole objects is done differently to how the obstacles of the game are generated in that the game creates new blackholes at the right edge of the screen if the total number of blackholes visible is less than 5, after any blackhole object reaches further left from the left edge of the screen such that the player is unable to see it, the object will be destroyed and removed. 

This creates the illusion of an infinite background regardless of how long the player plays the game.

### Player Ship
Most of the sprites regarding the player are digitally drawn however the propulsion particles are procedurally generated. This is done via a basic system of particle emission from the (x,y) coordinate of the end of the rocket of the player sprite. This particle emission has a random range of -1 to -3 x velocity and a random range of -0.5 to 0.5 for its y velocity per particle, this creates a burst of particles with a small cone shape as the width is controlled by the y velocity and the length of the cone is determined by the x velocity. 

Particles also change colour as time passes after a particle is created, along with the particle's alpha value. This creates the effect of a flame burning more impurely over time changing from red to yellow as it moves away from the source and the alpha value change is the flame disappearing, when any particle's alpha value is below 0 its object is destroyed and removed so as to not slow down the system.

Particle system before adaptation for project:

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/particlePrev.gif)

Particle system in adapted game:

![](https://github.com/Arcane34/Defender-Adaptation/blob/main/rocketParticlePrev.gif)

### Summary
This project utilises procedural generation, collision detection, particle simulation, recursion and more to create an adaptation of the game Defender from 1981, with its art style borrowing from the game FEZ.
