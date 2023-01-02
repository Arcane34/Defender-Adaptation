# Defender-Adaptation
An adaption of the game "Defender (1981)"

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
