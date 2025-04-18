# Nut Stacker Game

**Authors:** Tumelo Maja (GitHub username: tumelo-maja)

Nut Stacker is a fun and exciting color-stacking game where the player is challenged to stack colorful nuts onto bolts. The nuts are stacked following rules in the game. The game is easy to learn and play while still giving players a challenge at each level.  

**The website is aimed at helping users to:** 
  - Enjoy a fun and relaxing game experience
  - Get a sense of satisfaction when they win a level and earn game points.
  - Challenge and test their coordination/strategy skills in a playful setting.
  - Improve their strategy and scores as they play the game frequently.

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

  - **Score display** - the user's earned points are displayed here. After the each level has been completed, the score number is animated using odometer counter to increase the score by earned points.

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
    - Use the appropriate color contrast that pass the accessibility requirements

- **Intuitive Game Controls (must-have)**

  **Story:** 
  As a player, I want easy-to-use game controls so I can enjoy playing the game without difficulty.

  **Acceptance Criteria:**
   - Users can click (tap) on an item and place it where they desire if permissible to game rules. 
   - Game provide visual feedback to indicate if the move was completed or not.
   - Game control functionality is responsive on mobile and desktop devices.

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

- **HTML** - The structure of the Website was developed using HTML as the main language.
- **CSS** - The Website was styled using custom CSS in an external file.
- **Bootstrap** - The website layout used some Bootstrap code and styled with custom CSS.
- **JavaScript** - JavaScript was used for the core interactivity of the game project
- **Visual Studio Code** - The website was developed using Visual Studio Code IDE
- **GitHub Projects** - Development tasks and progress monitoring was done through GitHub projects, see <a href="https://github.com/users/tumelo-maja/projects/4" target="_blank" rel="noopener">PP2: Nut Stacker Game</a>
- **GitHub** - Source code is hosted on GitHub and deployed using Git Pages.
- **Git** - Used to commit and push code during the development opf the Website
- **CSS filter generator** - <a href="https://codepen.io/sosuke/pen/Pjoqqp" target="_blank" rel="noopener">CSS filter generator</a> tool was utilized to create custom-colored PNG icons used in the services section and contact page
- **Derivv** - <a href="https://derivv.com/" target="_blank" rel="noopener">Derivv</a> tool was utilized to resize images to the optimal dimensions for web display, to improve the loading time and performance of the website.
- **Favicon.io** - favicon files were created using <a href="https://favicon.io/favicon-converter/" target="_blank" rel="noopener">favicon-converter</a>
- **balsamiq** - Wireframes were created using <a href="https://balsamiq.com/wireframes/desktop/" target="_blank" rel="noopener">Balsamiq Wireframes</a>
- **Lighthouse (Chrome DevTools)** - This feature of DevTools was used to assess the website performance and overall loading time. 
- **HTML, CSS and Javascript validation**
  - **<a href="https://validator.w3.org/" target="_blank" rel="noopener">W3C HTML validator</a>** used to validate the website's HTML code
  - **<a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener">W3C CSS validator</a>** used to validate the website's CSS style code.
  - **<a href="https://autoprefixer.github.io/" target="_blank" rel="noopener">Autoprefixer CSS</a>** - used to add vendor prefixes to CSS properties for compatibility with more browsers.
  - **<a href="https://validator.w3.org/" target="_blank" rel="noopener">JS Hint</a>** used to validate the website's Javascript code
- **Compatibility** - To ensure compatibility across different browsers, <a href="https://autoprefixer.github.io/" target="_blank" rel="noopener">Autoprefixer CSS online</a> was used to add vendor prefixes to CSS properties.
- **Accessibility** - <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener">WebAIM Contrast Checker</a> was used to test and ensure that background and foreground color contrast allows text to be readable against its background. The test was applied for both text and UI (buttons/icons) elements
- **Python tutor** - <a href="https://pythontutor.com/render.html#mode=edit" target="_blank" rel="noopener">Tool</a> was used to test and debug small javascript functions. 

## Testing 

### Feature Testing
For each interactive feature, a testing was conducted and the results are outlined in a table below

| Feature       | Testing | Outcome  |
| --------      | ------- |-------   |
| "PLAY GAME" button   | Click on the button | User is directed to the game page  |
| "HOW TO PLAY" heading   | Click on the heading | 'How to play' instructions are displayed below the heading - Clicks toggle between displaying and hiding the instructions element  |
| Settings (hamburger) icon   | Click on the icon | settings modal pop's up  |
| Settings: sound toggle   | any click on sound icon, 'sound' text or toggle element | the sound is toggled and changes to a yellow color. A sound clip is played to confirm the setting has changed.    |
| Settings: vibration toggle <br> (mobile devices only)  | any click on vibration icon, 'vibration' text or toggle element | the vibration is toggled and changes to a yellow color. A vibration effect triggered to confirm the setting has changed. <br>Feature not support on Firefox and Safari browsers, for these or any unsupported browser, a text "Not supported on your browser" is displayed and the toggle is disabled  |
| Settings: "Clear All Progress" button   | Click on the button | User score is reset to 0, difficulty mode is reset to a default value ('easy'), game level is restored to 1. These default values are saved under the userProgress stored on localStorage of the browser.  |
| Settings: "Home" button    | Click on the button | User is directed to the home page   |
| Settings: "X" close icon  | Click on the icon | the settings modal is closed  |
| Help ("?") icon   | Click on the icon | Help modal pop's up showing showing 3 headings "How to play", "Score calculation" and "Keyboard shortcuts"  |
| Help: Headings   | click on any heading in the modal | Content is expanded below the clicked heading - clicks on the toggle expand and collapse the heading's body text |
| Help: "X" close icon  | Click on the icon | the help modal is closed and any expanded headings are collapsed  |
| Game: Difficulty mode select element | Click on select element | A drop down is shown displaying the three difficulty options for the user to choose. If a different mode is selected, a game layout for the selected mode is loaded. On mobile devices, a click might show a select modal    |
| Game: Rod click (raise)   | click anywhere on a specific bolt | if there is no raised nut in the game area, the top nut of the clicked rod will be raised. May have sound and or vibration effects if enabled  |
| Game: Rod click (move)   | click anywhere on a specific bolt | if there is a raised nut in the game area, the raised nut will be moved to the clicked rod if the move is permissible (ie. like-colors, space available or empty rod). May have sound and or vibration effects if enabled  |
| Game: Rod completion   | Stack all matching colors on a specific rod to its capacity | small single-color confetti display is triggered, lod lid becomes enlarged and cover the rod top, rod becomes inactive and undo move button is disabled to prevent undoing a completed rod   |
| Game: Game completion   | Stack all matching colors on all rods in the game | multi-colored confetti display is triggered, a win modal is displayed showing points earned and congratulatory text. 'Continue' and 'Quit' buttons are displayed as options to select  |
| Game: Win modal 'Continue' button  | Click on the button | a new game is loaded, scores value is increased with earned points, level is increased by 1   |
| Game: Win modal 'Quit' button  | Click on the button | scores value is increased with earned points, level is increased by 1 and user is directed to the home page  |
| Game: Game loss   | fail to stack all matching colors on all rods in the game before the moves get to 0 | a game loss modal is displayed. "Retry", "New game" and "Quit" buttons are displayed in the modal  |
| Game: Loss modal 'Retry' button  | Click on the button | the game layout and nuts are restored to the initial state at the beginning of the level (like reset button)  |
| Game: Loss modal 'New game' button  | Click on the button | a new game is generated for the same level and difficulty mode.  |
| Game: Loss modal 'Quit' button  | Click on the button | user is directed to the home page  |
| Game controls: undo move button    | Click on the button | most recent move is reversed, the undo button becomes disabled, number of moves and the bars are reversed to the previous states. This cannot be use immediately after completing a rod  |
| Game controls: extra rod button   | Click on the button | the small  extra rod is enable and only 1 nut can be stacked on it. The extra rod button becomes disabled; only one use per level.  |
| Game controls: reset button    | Click on the button  | the game layout and nuts are restored to the initial state at the beginning of the level  |
| Game controls: new game button    | Click on the button | a new game is generated for the same level and difficulty mode.    |
| Keyboard shortcuts   | Press any short  combination | All shortcuts have been tested and work correctly   |

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
| style.css  |<img src="docs/validation-screenshots/styles-css-initial-validator-results.png" width="800px" height="500px">          |**error:** flex-grow property with value of 'auto' was removed <br><br>**warnings:** All warnings are due to the use of external vendors i.e. CSS prefixer       |<img src="docs/validation-screenshots/styles-css-final-validator-results.png" width="800px" height="500px">                      |    
| index.js  |<img src="docs/validation-screenshots/index-js-initial-validator-results.png">         |**warnings:** Missing semicolon added        |<img src="docs/validation-screenshots/index-js-final-validator-results.png">                          |   
| game.js  |<img src="docs/validation-screenshots/game-js-initial-validator-results.png"> <br> <img src="docs/validation-screenshots/game-js-initial-validator-results2.png">          |**Warnings:** <br> 1) Missing semicolons were added <br><br> 2) "Do not use 'new' for side effects" warning remains unresolved <br><br> **Undefined variables:** <br> 1) Undeclared variables 'userScore', 'rodYDifference' and 'rodXDifference' were declared <br><br> 2) Variables from external libraries were defined at the top script using the format: /*globals externalVar1, externalVa2 */        |<img src="docs/validation-screenshots/game-js-final-validator-results.png">                          |    

### Bugs

- **JS hint warning:** "Do not use 'new' for side effects" warning remains unresolved.
- **Final nut position (extra rod):** For the small rod, the placement on the nut always overshoots below the nut. This is due to the relative position i.e top value from the getBoundingClientRect between the rods. This is more of an UX bug than functionality/UI and can be resolved in future releases. 
- **Scroll on mobile device:** On an actual mobile device, the view port width and height has some scroll, i.e. the user has to scroll slightly up to have a full view of the control buttons. On devTools this is not occurring (tested on device: iPhone SE). This bug occurs despite the width of the body, main and game container being set to 100vw (width) and 100vh (height).

### Lighthouse Testing

Lighthouse testing was performed for all pages (desktop and mobile views)

| Screen Type   | Initial audit  | Solution | Screenshots of Clear Validation  |
| ------------  | ------------   | -------  | ------------------------------   | 
| Mobile - index.html       | <img src="docs/lighthouse-screenshots/index-lighthouse-initial-output-mobile.png" >    | No further actions           |    |
| Desktop - index.html      | <img src="docs/lighthouse-screenshots/index-lighthouse-initial-output-desktop.png" >   | No further actions           |    |
| Mobile - game.html       | <img src="docs/lighthouse-screenshots/game-lighthouse-initial-output-mobile.png" >    | - Low performance score due to render blocking elements. <br>- There were too many external javascript and css link tags for icons. <br>- svg format of the google font icons, fontawesome and bootstrap icons were downloaded. <br>- 'i' tags got icons where replaced by 'img' tags. <br>- Removing the need to load entire libraries improved the performance score greatly.            |  <img src="docs/lighthouse-screenshots/game-lighthouse-final-output-mobile.png" >  |
| Desktop - game.html      | <img src="docs/lighthouse-screenshots/game-lighthouse-initial-output-desktop.png" >   |  - Low performance score due to render blocking elements. <br>- There were too many external javascript and css link tags for icons. <br>- svg format of the google font icons, fontawesome and bootstrap icons were downloaded. <br>- 'i' tags got icons where replaced by 'img' tags. <br>- Removing the need to load entire libraries improved the performance score greatly.          | <img src="docs/lighthouse-screenshots/game-lighthouse-final-output-desktop.png" >   |

### Accessibility Testing

To ensure our site is accessible to assistive technology like screen readers and for people with visual impairment, accessibility tests were conducted.

**Lighthouse - Accessibility**

| Page tested  | Initial audit  | Solution |
| ------------ | ------------   | -------  | 
| index.html   | <img src="docs/lighthouse-screenshots/index-lighthouse-accessibility-initial.png" > | Additional manual checks and no further actions were necessary    | 
| game.html    | <img src="docs/lighthouse-screenshots/game-lighthouse-accessibility-initial.png" > | Added a hover effect to make the nut elements glow when hovered over. | 

**WebAIM - Contrast Checker**

Color contrast between foreground and background in elements was check using <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAIM tool</a>. The test was applied for both text and UI (buttons/icons) elements. 

| Element Tested | Initial validator output  | Final validator Output  |
| -------------- | ------------------------- | ----------------------- |
| darkest blue shade (body element background) against lightcyan colored text  | <img src="docs/contrast-checker/darkestblue-vs-lightcyan-initial-contrast-check-output.png" width="250px" height="350px"> | No further actions |
| lightest blue shade (body element background) against lightcyan colored text  | <img src="docs/contrast-checker/lightestblue-vs-lightcyan-initial-contrast-check-output.png" width="250px" height="350px"> | No further actions |
| blue shade (body element background) against yellow colored text  | <img src="docs/contrast-checker/blueshade-vs-yellow-initial-contrast-check-output.png" width="250px" height="350px"> | No further actions |
| blue shade (button element background) against lightcyan colored icons  | <img src="docs/contrast-checker/control-buttons-initial-contrast-check-output.png" width="250px" height="350px"> | Although WCAG: AAA fails the check, this colors are used in a UI component, which has passed the rest |
| blue shade (body element background) against green colored icons  | <img src="docs/contrast-checker/modal-icons-initial-contrast-check-output.png" width="250px" height="350px"> | No further actions |
| red shade (button element background) against lightcyan colored text  | <img src="docs/contrast-checker/modal-quit-button-initial-contrast-check-output.png" width="250px" height="350px"> | <img src="docs/contrast-checker/modal-quit-button-final-contrast-check-output.png" width="250px" height="350px"> |

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

### Game inspiration

This Nut Stacker project was inspired by similar games including 'Nut sort' by <a href="https://tripledotstudios.com/" target="_blank" rel="noopener">Tripledot Studios Limited</a>. 

### Icons

- **<a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome Icons</a>** - used for help modal and the game-head section.
- **<a href="https://fonts.google.com/icons/" target="_blank" rel="noopener">Google Fonts Icons</a>** - used for game control buttons.
- **<a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap Icons</a>** - used in the settings modal, emojis for win/loss modals and play instructions.

### Tutorials and other resources

- **<a href="https://www.npmjs.com/package/canvas-confetti/" target="_blank" rel="noopener">Canvas confetti Javascript</a>** - used for confetti animation for rod complete and game wins.
- **<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement" target="_blank" rel="noopener">Create element with attribute</a>** - used in generating game layout elements.
- **<a href="https://www.youtube.com/watch?v=XH5OW46yO8I" target="_blank" rel="noopener">Creating custom modal (youtube)</a>** - used in creating custom modal for settings, help and win/loss modals.
- **<a href="https://www.youtube.com/watch?v=p2rV9tKvjFg" target="_blank" rel="noopener">Odometer Number counter Animation (youtube)</a>** - used as guide for creating animated number counter for user scores. library used: <a href="https://cdnjs.com/libraries/odometer.js/0.4.7" target="_blank" rel="noopener">CDN Odometer</a>.
- **<a href="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array" target="_blank" rel="noopener">Shuffling random array</a>** - used as guide to implementing code to generate and shuffle color array for nuts using Durstenfeld method.
- **<a href="https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times" target="_blank" rel="noopener">Repeat elements in an array</a>** - used to replicate nut color array for different game modes.
- **<a href="https://www.geeksforgeeks.org/check-if-all-duplicate-elements-in-the-array-are-adjacent-or-not" target="_blank" rel="noopener">Checking for duplicates in arrays</a>** - used to implement a check methods to prevent randomly generating too many adjacent colors in a rod, ie. prevents generation of a completed rod and therefore maintain difficulty level for a given game mode.
- **<a href="https://www.youtube.com/watch?v=hn7MhPt24L4" target="_blank" rel="noopener">Sounds and Music in Javascript games (youtube)</a>** - used as a guide to implement sound effect in the game.
- **<a href="https://mixkit.co/free-sound-effects/" target="_blank" rel="noopener">Mixkit Game Sound effects</a>** - used as a source for sound clips implemented for game sound effects.
- **<a href="https://pixabay.com/sound-effects/" target="_blank" rel="noopener">Pixabay Sound effects</a>** - used as a source for other sound clips implemented for game sound effects.
- **<a href="https://www.youtube.com/watch?v=ymuBowcODVU" target="_blank" rel="noopener">Crazy 3D Rotation Effect Using CSS Only (youtube)</a>** - used as a guide to implement nut rotation effect in the game.
- **<a href="https://www.youtube.com/shorts/Yw9xyLJ8tRo" target="_blank" rel="noopener">Setting vibration on mobile devices (youtube)</a>** - used as a guide to implement vibration effects for mobile phones gameplay.
- **<a href="https://classic.derivv.com/" target="_blank" rel="noopener">Derivv</a>** - used resize logo, nut and rod outline images.
- **<a href="https://favicon.io/favicon-converter/" target="_blank" rel="noopener">Favicon converter</a>** - used to create favicon files using the logo image.
- **<a href="https://dev.to/stephencweiss/write-your-own-javascript-contracts-and-docstrings-42ho" target="_blank" rel="noopener">Writing doc strings</a>** - used as guide to writing comprehensive and concise docstrings for javascript functions.
- **<a href="https://stackoverflow.com/questions/62576757/jsdoc-documenting-event-listeners-properly" target="_blank" rel="noopener">Writing doc strings (additional 1)</a>** - used as guide to writing comprehensive and concise docstrings for javascript functions.
- **<a href="https://stackoverflow.com/questions/28763257/jsdoc-return-object-structure" target="_blank" rel="noopener">Writing doc strings (additional 2)</a>** - used as guide to writing comprehensive and concise docstrings for javascript functions.
- **<a href="https://stackoverflow.com/questions/17359232/how-to-tell-jshint-to-ignore-all-undefined-variables-in-one-file" target="_blank" rel="noopener">Fix: JS Hint - undefined variable</a>** - used as to resolve a warning/error from js-hint due to the use of variables/instances from external libraries.
- **<a href="https://ui.dev/amiresponsive" target="_blank" rel="noopener">Website mockup generator</a>** - used as to a mockup for the project site.
- **<a href="https://codepen.io/sosuke/pen/Pjoqqp" target="_blank" rel="noopener">CSS filter generator</a>** - used to create custom-colored SVG icons using 'filter' css property.
- **<a href="https://www.youtube.com/watch?v=MKpZadkuT-0" target="_blank" rel="noopener">using getBoundingClientRect (youtube)</a>** - used as guide to calculating relative distance between DOM elements which was used in nut animation.
- **<a href="https://stackoverflow.com/questions/52129197/how-to-appendchild-with-animation-in-javascript" target="_blank" rel="noopener">Appending elements in animation</a>** - used as guide to append nuts to target rods during animation.
- **<a href="https://stackoverflow.com/questions/59573722/how-can-i-set-a-css-keyframes-in-javascript" target="_blank" rel="noopener">Using keyframes for animation</a>** - used as guide to implementing animation positions when moving nuts.
