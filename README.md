# Color Sort Game

**Authors:** Tumelo Maja (GitHub username: tumelo-maja)

Project intro  

**The website is aimed at helping users to:** 
  - Aim #1

**Target audience:** 
  - target #1

project desription (full)

## Features 

### Existing Features
- **Index: Logo Icon**


- **Index: Play Game Button**


- **Index: How to Play header**


- **Index: Footer**
- Disclaimer 

- **Game: Game header - Hamburger Icon (modal)**

- Sound settings (toggle)

- vibration settings (toggle - mobile only)

- Clear All Progress button

- Home icon (navigation)


- **Game: Game header - Score Display**

- score display

- odometer counter


- **Game: Game header - Help Icon (modal)**

- how to play

- score calculation 

- Keyboard shortcuts


- **Game: Game Mode and moves display**

- Mode select element

- Remaining moves bar and counts


- **Game: Game area**

- bolts layout and nuts (for different difficulty modes)
- Extra bolt

- **Game: Game win modal**
- win display

- **Game: Game loss modal**
- loss display

- **Game: Game Button controls**

- undo move button

- Add extra bolt button

- restart/reset button

- Load new game button


- **Game: User progress and localStorage**

- localStorage




### Features Left to Implement
Features that would be good to have in the game and will be reserved for future version releases fo the game.

1. User feedback form
This would allow users to share their experience about the stacking game with the developers. Comments, complaints and suggestion would all be submitted through this form.

## Project planning
In this section, we provide all tasks related to project planning. User stories and business goals are defined in this section

### Key business goals

Primary goal: Design an interactive, user-friendly and appealing color stacking game that gives a positive user experience to all users.

Other goals:
- Encourage user participation  in the game play through game rewards
- Enhance user experience with appealing design and sound effects 
- Attract and retain users to play regularly through various difficulty levels


### User stories

- **Engaging and Interactive Game layout (must-have)**

  - Story: 
  As a player, I want to have enjoyable and easy gameplay which lets me know how and what I should do to play the game.

  - Acceptance Criteria:
  The game layout is intuitive and has instructions making it easier for players to understand how to play.
  The website is fully responsive and accessible on various devices with different screen sizes

  - Tasks:
  Implement HTML/CSS code to create an engaging gameplay layout
  Use the appropirate color contrast that pass the accessibility requirements


- **Intuitive Game Controls (must-have)**

  - Story: 
  As a player, I want easy-to-use game controls so I can enjoy playing the game without difficulty.

  - Acceptance Criteria:
  * Users can click (tap) on an item and place it where they desire if permissible to game rules. 
  * Game provide visual feedback to indicate if the move was completed or not.
  * Game control functionality is responsive on mobile and destop devices.

  - Tasks:
  * Implement JavaScript code to respond to user clicks/taps
  * Add visual indicators to give feedback to user during game play. Include error messages for invalid moves
  * Implement animations to show items when clicked/tapped and or moved


- **Reset Moves (must-have)**

  - Story: 
  As a player, I want be able to reset the game so that I can try a different strategy to play the game.

  - Acceptance Criteria:
  * A clickable 'Reset play' button is available on the game controls section. 
  * Users can restore all moves without having to refresh/reload the gameplay page.
  * 'Reset' play button resets the game while maintaining scores, levels and difficulty settings

  - Tasks:
  * Implement an HTML and css-styled button to reset the game
  * Implement JavaScript code to ensure the game is reset when the button is clicked
  * Ensure other game features are not changed: scores, level, and difficulty setting

- **New Game Button (must-have)**

  - Story: 
  As a player, I want be able to load a new game so I can play a different configuration of the same level if I do not like the current game.

  - Acceptance Criteria:
  * A clickable 'New Game' button is available on the game controls section. 
  * Users can load a new game for the same level without having to refresh/reload the gameplay page.
  * 'New Game' button loads a new game for the same level and difficulty setting

  - Tasks:
  * Implement an HTML and css-styled button to load a new game
  * Implement JavaScript code to ensure a new game loaded with different configurations for the same level & difficulty setting
  * Implement a confirmation prompt to ensure user can confirm if they want to load a new game (also when reloading the page)


- **Game Scores and Progress (should-have)**

  - Story: 
  As a player, I want be see my scores and level progression so I can track my achievements and improve my game play.

  - Acceptance Criteria:
  * Users earn points for each completed level and progress to the next level upon completion
  After completing a level, a congratulation modal appears and ask user to confirm if the want to continue playing. 
  * Users can see their current level and accumulated points.
  * Users get bonus points for the remaining moves at the end of the game and for not using extra rod

  - Tasks:
  * Implement an HTML and css-styled container to display points and level.
  * Implement JavaScript code add score and update the display element as user progresses through levels
  * Ensure the bonuses are included for completed levels with remaining moves and for not using extra rod


- **Undo Last Move (should-have)**

  - Story: 
  As a player, I want be able to undo my last move so I can play that move differently.

  - Acceptance Criteria:
  * A clickable 'Undo' button is available on the game controls section. 
  * Users can 'undo' the most-recent move when clicking the 'Undo' button - limited to 1 move.
  * 'Undo' button reverts to the previous step. A nut item is return to its previous position
  * A reverse move animation displays and give user feedback when it has completed the move

  - Tasks:
  * Implement an HTML and css-styled button to revert a move.
  * Implement JavaScript code to ensure the most recent move is reversed
  * Ensure the 'undo' button becomes inactive after being used until a new move is made


- **Add Extra Slot/Rod (should-have)**

  - Story: 
  As a player, I want be able to add an additional slot to a rod so I can have more slots to place nut items.

  - Acceptance Criteria:
  * A clickable 'Add slot' button is available on the game controls section. 
  * Users can add an extra rod by clicking 'Add slot' button - limited to 1 nut item height per level.
  * A animation displays and give user feedback when an extra rod has been added

  - Tasks:
  * Implement an HTML and css-styled button to add an extra rod.
  * Implement JavaScript code to ensure the rod has same functionality as other rods
  * Ensure the 'Add slot' button becomes inactive after being used level is completed or reset


- **Difficulty type (could-have)**

  - Story: 
  As a player, I want the option to choose the difficulty type (Easy, Medium, Hard) so I play the game type that suit my skill.

  - Acceptance Criteria:
  * A drop down element with difficulty types (Easy, Medium, Hard) is available for users to select their preferred difficulty type. 
  * Each difficulty type has a different layout and stacking that gets more complex at Medium and Hard levels.
  * The selected difficulty type is always in display for different levels.
  * Change is difficulty type resets the levels while maintaining accumulated points.
  * Users get more points for completing higher difficulty games. 

  - Tasks:
  * Implement an HTML and css-styled dropdown menu with Easy, Medium, Hard as options (default= Easy).
  * Implement JavaScript code to ensure appropriate scoring for difficulty type (limit undo's/moves)
  * Ensure there is a clear visual feedback for the user to know the current difficulty selection


- **Keyboard Shortcuts For Desktop Users (could-have)**

  - Story: 
  As a Desktop player, I want to use simple and intuitive keyboard shortcuts to perform game actions easily so I can be more efficient in my gameplay.

  - Acceptance Criteria:
  * Users can use keyboard shortcuts for game actions such as numbers for numbered rods, Undo, Reset, New game 
  * Help section contains 'shortcuts' to be displayed for desktop screens and lists all available shortcuts
  * Game is responsive to keyboard input for the defined shortcuts

  - Tasks:
  * Implement JavaScript code to listen for keyboard inputs and action the relevant code/functions
  * Ensure there is a clear visual feedback for the user to know the current difficulty selection
  * Ensure default browser shortcuts do not conflict the game-defined shortcuts
  * Add Help section to display shortcuts for desktop screens


- **Submit Feedback and Report Bugs (could-have)**

  - Story: 
  As a player, I want the ability to submit feedback related to my gaming experience or report issues so that it can be improved, and problems are fixed.

  - Acceptance Criteria:
  * Users can submit a feedback form to share their experience, report bugs or offer suggestions.
  * Form fields are validated and users get error messages to inform them about invalid inputs or missing fields
  * Users receive feedback to thank and confirm their submission was successful.

  - Tasks:
  * Implement HTML/CSS code to style a form modal
  * Implement JavaScript code to listen for keyboard inputs and validate user's inputs.
  * Show players a thank you message after feedback submission is completed.


- **Suitable Game Sound Effects (could-have)**

  - Story: 
  As a player, I want the option to play the game with satisfying sound effects when I do certain moves, win or lose.

  - Acceptance Criteria:
  * There are suitable and satisfying sound effects for different actions during the game gameplay
    * Raising or lowering a nut
    * Completing a rod
    * Winning a level
    * Losing a level
  * Users can toggle the sound element to turn sound effect on/off with ease

  - Tasks:
  * Implement HTML/CSS code for the sound toggle
  * Define and declare sound effect for specific actions
  * Implement JavaScript code to play sounds when sound effect setting is set to on (default is off)
  * Ensure the file types for the sound effect are compatible with commonly used browsers


### Wireframes

## Testing 

### Feature Testing
For each interactive feature, a testing was conducted and the results are outlined in a table below

| Feature       | Testing | Outcome  |
| --------      | ------- |-------   |
| feature item  | ------- |------    |

### Browser Compatibility
The website's layout and responsiveness was tested on the commonly used browsers. The test is based on the quality of browser rendering of the website as intended and its responsiveness to screen width variations. 

| Browser         | Intended Appearance | Intended Responsiveness |  
|---------------  |---------------------|-------------------------|  
| Google Chrome   |                     |                         |  
| Mozilla Firefox |                     |                         |  
| Microsoft Edge  |                     |                         |  

### Responsive Testing 

### Code validation

| Page Tested | Screenshot of Errors | Solution Applied   | Screenshot of Clear Validator Output |  
|------------ |------------          |------------        |------------                          |
| index.html  |------------          |------------        |------------                          |    

### Bugs

### Lighthouse Testing

### Accessibility Testing

**Lighthouse - Accessibility**

**WebAIM - Contrast Checker**

## Deployment

This section provides the steps to follow when deploying the project.

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - Scroll to and select 'GitHub pages'
  - Under the 'Source' drop-down menu, select the 'main'(master) as the branch.
  - Once the master branch has been selected, the page will be automatically refreshed. There should be a ribbon displayed at the top of the page indicating successful deployment.
  - The website is now live and can be accessed from repository home page by clicking 'github-pages' under 'Deployments' on the right-side.
  - The link to the website should be displayed at the top showing the latest deployed version.   

Alternatively the site's live link can be found here - ()

## Credits 
Youtube video on using getBoundingClientRect() - (https://www.youtube.com/watch?v=MKpZadkuT-0)

Link to Stackoverflow method to appendChild with animation - (https://stackoverflow.com/questions/52129197/how-to-appendchild-with-animation-in-javascript)

link to using 'animate' in JS for keyframes  - (https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
link to example of animate in JS - (https://stackoverflow.com/questions/59573722/how-can-i-set-a-css-keyframes-in-javascript)

### Game inspiration

### Images

### Tutorials and other resources
Tutorial on inserting google icons: (https://www.youtube.com/watch?v=D9ciQq6cwmI)

Canvas confetti: (https://www.npmjs.com/package/canvas-confetti)

Create element with attribute
https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

Creating Custom Modal: (https://www.youtube.com/watch?v=XH5OW46yO8I)

Odometer CDN for Number counter Animation: (https://www.youtube.com/watch?v=p2rV9tKvjFg)
Odometer Library: (https://cdnjs.com/libraries/odometer.js/0.4.7)

IntersectionObserver: (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

Randomize array using  Durstenfeld Shuffle: (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
more link - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

Repeat elements in an array: (https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times)

Sum an array
https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers

Array.From
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

Check if duplicate elements in the array are adjacent 
(https://www.geeksforgeeks.org/check-if-all-duplicate-elements-in-the-array-are-adjacent-or-not)

Mixkit Game Sound effects (https://mixkit.co/free-sound-effects/)

Pixabay Sound effects (https://pixabay.com/sound-effects/)

Sounds and Music in Javascript games (Tutorial)
https://www.youtube.com/watch?v=hn7MhPt24L4

Howler.js library (via cdn.js)
https://howlerjs.com/

Stripes generator CSS
https://stripesgenerator.com/

Crazy 3D Rotation Effect Using CSS Only (https://www.youtube.com/watch?v=ymuBowcODVU)

Setting vibration on mobile devices
(https://www.youtube.com/shorts/Yw9xyLJ8tRo)

classic derivv for resizing the nut outline (https://classic.derivv.com/)

Generate Favicons (https://favicon.io/favicon-converter/)