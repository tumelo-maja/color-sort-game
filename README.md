# Nut Stacker Game

**Authors:** Tumelo Maja (GitHub username: tumelo-maja)

Nut Stacker is a fun and exciting color-stacking game where the player is challenged to stack colorful nuts onto bolts. The nuts are stacked following rules in the game. The game is easy to learn and play while still giving players a challenge at each level.  

**The website is aimed at helping users to:** 
  - Enjoy a fun and relaxing game experience
  - Get a sense of satisfaction when they win a level and earn game points.
  - Challenge and test their coordination/strategy skills in a playful setting.
  - Improve their strategy and scores as they play the game frequently.
  -

**Target audience:** 
  - Anyone who enjoys simple and fun games
  - Puzzle enthusiasts who enjoy challenging online games (color-matching/stacking)
  - Individuals looking for a quick gameplay experience without having to commit to playing in future.


Nut Stacker can be played on mobile and desktop screens. It features easy-to-use controls to undo moves, restart game and more. The game also offers options to enable sound effects (and vibration effects for players using mobile devices - only supported for edge and chrome browsers). The rule are simple, stacking is only allowed for matching colors. Players need to strategize and think about their moves wisely as there are limited number of moves in each level; the least moves used to win a level, there more bonus points the player earns. 

There are 3 difficulty modes to choose from; 'easy', 'medium' and 'hard'. Players can choose a difficulty mode that suits their skills; the game gets more challenging at higher difficulty modes. The player's progress will not be lost if the refresh or accidentally close the page. Furthermore, players can switch between different modes and their highest achieved level in each mode will be remembered by the game.    

**Site Mockup:** 

<figure>
  <img src="docs/site-screenshots/full-site-mockup.png" width="900px" >
  <br>
  <figcaption><strong><em>Site mockup</em></strong></figcaption>
</figure>

## Features 

### Existing Features
- **Index: Full view**
  <figure>
    <img src="docs/site-screenshots/index-fullview-large-screen.png" width="300px">
    <br>
    <figcaption><strong><em>Index: Full view</em></strong></figcaption>
  </figure>

  - **Logo** - page features an appealing and colorful logo with a clear heading for the name of the game.

  - **Play Game Button** - When clicked, it allows user to navigate to the game.html page where the game can be played.


  - **How to Play header** - a clickable header to display a guide on how to play the game

  <figure>
    <img src="docs/site-screenshots/index-how-to-play-large-screen.png" width="300px">
    <br>
    <figcaption><strong><em>Index: How to Play header</em></strong></figcaption>
  </figure>


  - **Page footer** - contains a disclaimer about the game and its purpose. 

  <figure>
    <img src="docs/site-screenshots/index-footer-large-screen.png" width="600px">
    <br>
    <figcaption><strong><em>Index: Page footer</em></strong></figcaption>
  </figure>



- **Game: Game header - Hamburger Icon (modal)**
  <figure>
    <img src="docs/site-screenshots/game-fullview-large-screen.png" width="250px">
    <br>
    <figcaption><strong><em>Game: Full view</em></strong></figcaption>
  </figure>


  - **Setting button** - when the hamburger icon is clicked, a settings modal appears. Items in the modal and their use are outlined below
  <figure>
    <img src="docs/site-screenshots/game-header-settings-button-large-screen.png" width="200px">
    <img src="docs/site-screenshots/game-modal-settings-off-large-screen.png" width="200px">
    <img src="docs/site-screenshots/game-modal-settings-on-large-screen.png" width="200px">
    <br>
    <figcaption><strong><em>Game: Settings button</em></strong></figcaption>
  </figure>

    - **Sound settings (toggle)** - this can be activated to include sound effects in the gameplay.

    - **vibration settings (toggle - mobile only)** - for vibration effects on mobile devices

    - **Clear All Progress button** - to clear the game progress, levels and score will be restored to default values 

    - **Home icon (navigation)** - to navigate users back to the home page.


- **Game: Game header - Score Display**

  <figure>
    <img src="docs/site-screenshots/game-header-score-display-large-screen.png" width="250px">
    <br>
    <figcaption><strong><em>Game: Score Display</em></strong></figcaption>
  </figure>

  - Score display - the user's earned points are displayed here. After the each level has been completed, the score number is animated using odometer counter to increase the score by earned points.


- **Game: Game header - Help Icon (modal)**

  <figure>
    <img src="docs/site-screenshots/game-header-help-button-large-screen.png" width="200px">
    <img src="docs/site-screenshots/game-modal-help-all-large-screen.png" width="200px">
    <img src="docs/site-screenshots/game-modal-help-expanded-large-screen.png" width="200px">
    <br>
    <figcaption><strong><em>Game: Help button</em></strong></figcaption>
  </figure>

    Help modal features 3 expandable headings:
  - **How to play** - has same content as the index page

  - **Score calculation** - provides a breakdown of how points are earned including bonus points which the user could win if conditions are met.

  - **Keyboard shortcuts (desktop only)** - display a list of keyboard shortcuts that desktop users can use as an alternative to the game's button controls


- **Game: Game Mode and moves display**

  <figure>
    <img src="docs/site-screenshots/game-current-difficulty-mode-display-large-screen.png" width="300px">
    <img src="docs/site-screenshots/game-current-moves-display-large-screen.png" width="300px">
    <br>
    <figcaption><strong><em>Game: Help button</em></strong></figcaption>
  </figure>

  - **Difficulty mode select** - users can choose to play different modes of difficulty they want to play. They can switch across different modes any time during gameplay.

  - **Remaining moves bar and counts** - The bar show's the remaining move in a life-bar form and the actual count of moves is displayed besides the bar.


- **Game: Game area**

  <figure>
    <img src="docs/site-screenshots/game-area-easy-large-screen.png" width="250px" height="400px">
    <img src="docs/site-screenshots/game-area-medium-large-screen.png" width="250px" height="400px">
    <img src="docs/site-screenshots/game-area-hard-large-screen.png" width="250px" height="400px">
    <br>
    <figcaption><strong><em>Game: Help button</em></strong></figcaption>
  </figure>

  - **Bolts layout and nuts** - number of colors and layout of the bolts will differ according to the difficulty mode the user has selected.
  - **Extra bolt** - Users can click the 'Add Extra bolt' button to activate the small bolt on the bottom right.


- **Game: Win modal**

  <figure>
    <img src="docs/site-screenshots/game-modal-win-large-screen.png" width="300px" height="400px">
    <br>
    <figcaption><strong><em>Game: Win modal</em></strong></figcaption>
  </figure>

  - **Win modal display** - When users successfully stack the nuts in the right colors, the win modal will appear and display points won. 
  - **Continue button** - The 'Continue' button can be clicked to proceed to the next level. 


- **Game: Loss modal**

  <figure>
    <img src="docs/site-screenshots/game-modal-loss-large-screen.png" width="300px" height="400px">
    <br>
    <figcaption><strong><em>Game: Loss modal</em></strong></figcaption>
  </figure>

  - **Loss modal display** - When users run out of moves before they stack the nuts in the right colors, the loss modal will appear. 
  - **Retry button** - The 'Retry' button can be clicked to restart the level with the same layout of nuts.
  - **New Game button** - The 'New Game' button can be clicked to generate a new layout of nuts for the failed level.
  - **Quit button** - The 'Quit' button can be clicked to exit the game and return to the home page.


- **Game: Game Button controls**

  <figure>
    <img src="docs/site-screenshots/game-controls-large-screen.png" width="200px" height="100px">
    <br>
    <figcaption><strong><em>Game: Control buttons</em></strong></figcaption>
  </figure>

  - Description of control buttons (taken for help modal)

  - <img src="docs/site-screenshots/game-controls-description-large-screen.png" width="400px" height="200px">

- **Game: User progress**

- As the user progresses up the levels, their score and level are stored using localStorage on the browser.

- Refreshing/Reloading the page will not result is progress loss. The highest level for each difficulty mode and overall score are saved after each win. 

- Users have the option to clear all the progress and reset the game to default levels and score. The button is under the 'Settings' modal.


### Features Left to Implement
Features that would be good to have in the game and will be reserved for future version releases fo the game.

- **User feedback form** - This would allow users to share their experience about the stacking game with the developers. Comments, complaints and suggestion would all be submitted through this form.

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

  **Story:** 
    - As a player, I want to have enjoyable and easy gameplay which lets me know how and what I should do to play the game.

  **Acceptance Criteria:**
    - The game layout is intuitive and has instructions making it easier for players to understand how to play.
    - The website is fully responsive and accessible on various devices with different screen sizes

  **Tasks:**
    - Implement HTML/CSS code to create an engaging gameplay layout
    - Use the appropirate color contrast that pass the accessibility requirements


- **Intuitive Game Controls (must-have)**

  **Story:** 
  As a player, I want easy-to-use game controls so I can enjoy playing the game without difficulty.

  **Acceptance Criteria:**
   - Users can click (tap) on an item and place it where they desire if permissible to game rules. 
   - Game provide visual feedback to indicate if the move was completed or not.
   - Game control functionality is responsive on mobile and destop devices.

  **Tasks:**
   - Implement JavaScript code to respond to user clicks/taps
   - Add visual indicators to give feedback to user during game play. Include error messages for invalid moves
   - Implement animations to show items when clicked/tapped and or moved


- **Reset Moves (must-have)**

  **Story:** 
  As a player, I want be able to reset the game so that I can try a different strategy to play the game.

  **Acceptance Criteria:**
   - A clickable 'Reset play' button is available on the game controls section. 
   - Users can restore all moves without having to refresh/reload the gameplay page.
   - 'Reset' play button resets the game while maintaining scores, levels and difficulty settings

  **Tasks:**
   - Implement an HTML and css-styled button to reset the game
   - Implement JavaScript code to ensure the game is reset when the button is clicked
   - Ensure other game features are not changed: scores, level, and difficulty setting

- **New Game Button (must-have)**

  **Story:** 
  As a player, I want be able to load a new game so I can play a different configuration of the same level if I do not like the current game.

  **Acceptance Criteria:**
   - A clickable 'New Game' button is available on the game controls section. 
   - Users can load a new game for the same level without having to refresh/reload the gameplay page.
   - 'New Game' button loads a new game for the same level and difficulty setting

  **Tasks:**
   - Implement an HTML and css-styled button to load a new game
   - Implement JavaScript code to ensure a new game loaded with different configurations for the same level & difficulty setting

- **Game Scores and Progress (should-have)**

  **Story:** 
  As a player, I want be see my scores and level progression so I can track my achievements and improve my game play.

  **Acceptance Criteria:**
   - Users earn points for each completed level and progress to the next level upon completion
  After completing a level, a congratulation modal appears and ask user to confirm if the want to continue playing. 
   - Users can see their current level and accumulated points.
   - Users get bonus points for the remaining moves at the end of the game and for not using extra rod

  **Tasks:**
   - Implement an HTML and css-styled container to display points and level.
   - Implement JavaScript code add score and update the display element as user progresses through levels
   - Ensure the bonuses are included for completed levels with remaining moves and for not using extra rod


- **Undo Last Move (should-have)**

  **Story:** 
  As a player, I want be able to undo my last move so I can play that move differently.

  **Acceptance Criteria:**
   - A clickable 'Undo' button is available on the game controls section. 
   - Users can 'undo' the most-recent move when clicking the 'Undo' button - limited to 1 move.
   - 'Undo' button reverts to the previous step. A nut item is return to its previous position
   - A reverse move animation displays and give user feedback when it has completed the move

  **Tasks:**
   - Implement an HTML and css-styled button to revert a move.
   - Implement JavaScript code to ensure the most recent move is reversed
   - Ensure the 'undo' button becomes inactive after being used until a new move is made


- **Add Extra Slot/Rod (should-have)**

  **Story:** 
  As a player, I want be able to add an additional slot to a rod so I can have more slots to place nut items.

  **Acceptance Criteria:**
   - A clickable 'Add slot' button is available on the game controls section. 
   - Users can add an extra rod by clicking 'Add slot' button - limited to 1 nut item height per level.
   - A animation displays and give user feedback when an extra rod has been added

  **Tasks:**
   - Implement an HTML and css-styled button to add an extra rod.
   - Implement JavaScript code to ensure the rod has same functionality as other rods
   - Ensure the 'Add slot' button becomes inactive after being used level is completed or reset


- **Difficulty type (could-have)**

  **Story:** 
  As a player, I want the option to choose the difficulty type (Easy, Medium, Hard) so I play the game type that suit my skill.

  **Acceptance Criteria:**
   - A drop down element with difficulty types (Easy, Medium, Hard) is available for users to select their preferred difficulty type. 
   - Each difficulty type has a different layout and stacking that gets more complex at Medium and Hard levels.
   - The selected difficulty type is always in display for different levels.
   - Change is difficulty type resets the levels while maintaining accumulated points.
   - Users get more points for completing higher difficulty games. 

  **Tasks:**
   - Implement an HTML and css-styled dropdown menu with Easy, Medium, Hard as options (default= Easy).
   - Implement JavaScript code to ensure appropriate scoring for difficulty type (limit undo's/moves)
   - Ensure there is a clear visual feedback for the user to know the current difficulty selection


- **Keyboard Shortcuts For Desktop Users (could-have)**

  **Story:** 
  As a Desktop player, I want to use simple and intuitive keyboard shortcuts to perform game actions easily so I can be more efficient in my gameplay.

  **Acceptance Criteria:**
   - Users can use keyboard shortcuts for game actions such as numbers for numbered rods, Undo, Reset, New game 
   - Help section contains 'shortcuts' to be displayed for desktop screens and lists all available shortcuts
   - Game is responsive to keyboard input for the defined shortcuts

  **Tasks:**
   - Implement JavaScript code to listen for keyboard inputs and action the relevant code/functions
   - Ensure there is a clear visual feedback for the user to know the current difficulty selection
   - Ensure default browser shortcuts do not conflict the game-defined shortcuts
   - Add Help section to display shortcuts for desktop screens


- **Submit Feedback and Report Bugs (could-have)**

  **Story:** 
  As a player, I want the ability to submit feedback related to my gaming experience or report issues so that it can be improved, and problems are fixed.

  **Acceptance Criteria:**
   - Users can submit a feedback form to share their experience, report bugs or offer suggestions.
   - Form fields are validated and users get error messages to inform them about invalid inputs or missing fields
   - Users receive feedback to thank and confirm their submission was successful.

  **Tasks:**
   - Implement HTML/CSS code to style a form modal
   - Implement JavaScript code to listen for keyboard inputs and validate user's inputs.
   - Show players a thank you message after feedback submission is completed.


- **Suitable Game Sound Effects (could-have)**

  **Story:** 
  As a player, I want the option to play the game with satisfying sound effects when I do certain moves, win or lose.

  **Acceptance Criteria:**
   - There are suitable and satisfying sound effects for different actions during the game gameplay
     - Raising or lowering a nut
     - Completing a rod
     - Winning a level
     - Losing a level
   - Users can toggle the sound element to turn sound effect on/off with ease

  **Tasks:**
  - Implement HTML/CSS code for the sound toggle
  - Define and declare sound effect for specific actions
   - Implement JavaScript code to play sounds when sound effect setting is set to on (default is off)
   - Ensure the file types for the sound effect are compatible with commonly used browsers


### Wireframes

**Changes to the initial wireframes:**
- Home page: Additional text below the logo was removed, only one appealing sentence remains.
- Game page: A 'new game' button was included in the game controls at the bottom to the viewport.
- Game page: How to play icon on the top left which launched play instructions, was revised to 'help' modal to show other help information to the player.

**Notes:** 
- Only the 'easy' difficulty mode is shown, the general outlook is the same across the modes but the rod layout will be different.
- Modals (Settings, Help, Win and loss) are not shown in these wireframes.

<figure>
  <img src="docs/wireframes/wireframe-index.png" width="600px">
  <br>
  <figcaption><strong><em>Wireframe: Index page</em></strong></figcaption>
</figure>

<br>
<br>
<figure>
  <img src="docs/wireframes/wireframe-game.png" width="600px">
  <br>
  <figcaption><strong><em>Wireframe: Game page</em></strong></figcaption>
</figure>

## Technologies

- **HTML/CSS validation**
  - <a href="https://validator.w3.org/" target="_blank" rel="noopener">W3C HTML validator</a> used to validate the website's HTML code
  - <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener">W3C CSS validator</a> used to validate the website's CSS style code.
  - **Autoprefixer** - To ensure compatibility across different browsers, <a href="https://autoprefixer.github.io/" target="_blank" rel="noopener">Autoprefixer CSS online</a> was used to add vendor prefixes to CSS properties.
## Testing 

### Feature Testing
For each interactive feature, a testing was conducted and the results are outlined in a table below

| Feature       | Testing | Outcome  |
| --------      | ------- |-------   |
| feature item  | ------- |------    |

### Browser Compatibility
The website's layout, responsiveness and sound effects were tested on the commonly used browsers. The test is based on the quality of browser rendering of the website as intended, its responsiveness to screen width variations and whether sound effects are supported for the browser. 

| Browser        | Intended Appearance| Intended Responsiveness | Sound Effects | Vibration Effects|  
|--------------- |--------------------|-------------------------|---------------|---------------|  
| Google Chrome  |  Good              |   Good                  |   Good        |   Good        |  
| Mozilla Firefox|  Good              |   Good                  |   Good        |   Not supported        | 
| Microsoft Edge |  Good              |   Good                  |   Good        |   Good        | 

  - **Note** - Vibration API is not supported and therefore not available for Firefox and Safari browsers, see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API" target="_blank" rel="noopener">Vibration API - Supported browsers</a> 

### Responsive Testing 
- Screenshots of responsiveness test

- | Page Tested | 320px   | 425px   | 768px   |  1024px |  
  |------------ |------   |-------  |-------  |-------  |
  | index.html  |<img src="docs/responsiveness-screenshots/index-fullview-320px-screen.png" width="200px" height="400px">  |<img src="docs/responsiveness-screenshots/index-fullview-425px-screen.png" width="200px" height="400px">   |<img src="docs/responsiveness-screenshots/index-fullview-768px-screen.png" width="300px" height="400px">   |<img src="docs/responsiveness-screenshots/index-fullview-1024px-screen.png" width="300px" height="400px">   |  
  | game.html  |<img src="docs/responsiveness-screenshots/game-fullview-320px-screen.png" width="200px" height="400px">  |<img src="docs/responsiveness-screenshots/game-fullview-425px-screen.png" width="200px" height="400px">   |<img src="docs/responsiveness-screenshots/game-fullview-768px-screen.png" width="300px" height="400px">   |<img src="docs/responsiveness-screenshots/game-fullview-1024px-screen.png" width="300px" height="400px">   | 

### Code validation

| Page Tested | Screenshot of Errors | Solution Applied   | Screenshot of Clear Validator Output |  
|------------ |------------          |------------        |------------                          |
| index.html  |<img src="docs/validation-screenshots/index-initial-validator-results.png" width="800px" height="600px">          | No further changes required  | N/A      |    

| game.html  |<img src="docs/validation-screenshots/game-initial-validator-results.png" width="800px" height="600px">          |**error:** Stray closing 'i' tags were removed <br><br>**info:** redundant forward slashes in self closing elements were removed |<img src="docs/validation-screenshots/game-final-validator-results.png" width="800px" height="500px">                         |  

| style.css  |<img src="docs/validation-screenshots/styles-css-initial-validator-results.png" width="800px" height="500px">          |**error:** flex-grow property with value of 'auto' was removed <br><br>**warnings:** All warinings are due to the use of external vendors i.e. CSS prefixer       |<img src="docs/validation-screenshots/styles-css-final-validator-results.png" width="800px" height="500px">                      |    

| index.js  |<img src="docs/validation-screenshots/index-js-initial-validator-results.png">         |**warnings:** Missing semicolon added        |<img src="docs/validation-screenshots/index-js-final-validator-results.png">                          |   

| game.js  |<img src="docs/validation-screenshots/game-js-initial-validator-results.png"> <br> <img src="docs/validation-screenshots/game-js-initial-validator-results2.png">          |**Warnings:** <br> 1) Missing semicolons were added <br><br> 2) "Do not use 'new' for side effects" warning remains unresolved <br><br> **Undefined variables:** <br> 1) Undeclared variables 'userScore', 'rodYDifference' and 'rodXDifference' were declared <br><br> 2) Variables from external libraries were defined at the top script using the format: /*globals externalVar1, externalVa2 */        |<img src="docs/validation-screenshots/game-js-final-validator-results.png">                          |    

### Bugs

### Lighthouse Testing

### Accessibility Testing

**Lighthouse - Accessibility**

**WebAIM - Contrast Checker**

## Deployment

This section provides the steps to follow when deploying the project.

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository (https://github.com/tumelo-maja/color-sort-game), navigate to the Settings tab 
  - Scroll to and select 'GitHub pages'
  - Under the 'Source' drop-down menu, select the 'main'(master) as the branch.
  - Once the master branch has been selected, the page will be automatically refreshed. There should be a ribbon displayed at the top of the page indicating successful deployment.
  - The website is now live and can be accessed from repository home page by clicking 'github-pages' under 'Deployments' on the right-side.
  - The link to the website should be displayed at the top showing the latest deployed version.   

Alternatively the site's live link can be found here - (https://tumelo-maja.github.io/color-sort-game/)

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

Doc strings for eventlisteners (https://stackoverflow.com/questions/62576757/jsdoc-documenting-event-listeners-properly)

Write your own Javascript contracts and docstrings: (https://dev.to/stephencweiss/write-your-own-javascript-contracts-and-docstrings-42ho)

Docstrings for Function return objects: (https://stackoverflow.com/questions/28763257/jsdoc-return-object-structure)

Fix 'undefine variable' js-hint error:  (https://stackoverflow.com/questions/17359232/how-to-tell-jshint-to-ignore-all-undefined-variables-in-one-file)

Website mockup generator : (https://ui.dev/amiresponsive)