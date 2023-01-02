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
