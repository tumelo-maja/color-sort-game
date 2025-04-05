/**
 * Add Event Listener to run only after HTML document has completely loaded
 * - All code within this eventlistener will be accessible to the browser once the page has loaded.
 * 
 * @listens document#DOMContentLoaded - the namespace and name of the event
 */
document.addEventListener("DOMContentLoaded", function () {

    // Global variables for nut movements (px)
    const verticalStep = 35;
    const verticalRaiseValue = 15;
    const horizontalStep = 40;

    // Declare movesbar element for displaying remaining moves as a 'life-bar'
    let movesBar = document.querySelector('.move-fill');

    // Initilize variables when game page loads/ is reloaded.
    let completedRods = 0; // initialize as 0
    let gameInitialState = {}; // Var to store game state
    const defaultVolume = 0.15; // volume of sounds effects
    const defaultDifficulty = 'easy';
    let difficultyMode = '';
    let gameMode = '';

    let isGameMuted = true;
    let isVibrationOn = false;

    let userMoves = 0;
    let totalRodsToWin = 0;
    let lastMoveHistory = {};
    let anyNut = null;
    let nutStyle = null;
    let userProgress = {};


    // Declare nutColorsAll to store all color names and hex codes
    const nutColorsAll = {
        'yellow': '#f9b723',
        'blue': '#26a1ee',
        'whitesilver': '#dadbdd',
        'orange': '#f25029',
        'green': '#8DCD3B',
        'purple': '#911899',
        'beige': '#FFCFC1',
        'pink': '#FF90C8',
        'darkgrey': '#656469'
    }

    /**
     * Declare gameModeObject to store game mode settings/configurations
     * - Game modes: 'easy', 'medium' and 'hard'. For each mode:
     * - containers: number of rod-container elements i.e. rows
     * - rodsInContainers: number of .rod elements in each .rod-container.
     * - rodCapacity: maximum number of nut allowed to be stacked in a single .rod element.
     * - nutColors: object of colors to be used for the specific game mode. keys() used as css classes and values for confetti.
     * - nutCount: total number of .nut elements to be created for the game mode.
     * - maximumMoves: Number of moves that user has to complete stacking for the game mode.
     */
    const gameModeObject = {
        easy: {
            containers: 2,
            rodsInContainers: [3, 3],
            rodCapacity: 4,
            nutColors: {
                'yellow': '#f9b723',
                'blue': '#26a1ee',
                'whitesilver': '#c2b3d4',
            },
            nutCount: 12,
            maximumMoves: 12,
        },
        medium: {
            containers: 2,
            rodsInContainers: [4, 4],
            rodCapacity: 4,
            nutColors: {
                'yellow': '#f9b723',
                'blue': '#26a1ee',
                'whitesilver': '#c2b3d4',
                'green': '#8DCD3B',
                'orange': '#f25029',
            },
            nutCount: 20,
            maximumMoves: 20,
        },
        hard: {
            containers: 3,
            rodsInContainers: [4, 4, 4],
            rodCapacity: 4,
            nutColors: {
                'yellow': '#f9b723',
                'blue': '#26a1ee',
                'whitesilver': '#c2b3d4',
                'orange': '#f25029',
                'green': '#8DCD3B',
                'purple': '#911899',
                'beige': '#FFCFC1',
                'pink': '#FF90C8',
                'darkgrey': '#656469'
            },
            nutCount: 20,
            maximumMoves: 36,
        },
    };

    /**
     * Declare soundEffects to types of sound clips using 'Howler.js' audio library to play when sound in set to 'on'
     *  
     * For each key: 
     * - src: path to the clip
     * - volume: volume of the clip
     * - sprite: create a subset of to play sound between two specified timestamps
     * - onplay: function to run simultaneously as SFX e.g. vibrate
     * 
     * Keys():
     * - startMove: SFX to play at the start/end of .nut movement
     * - raise: SFX to play when a .nut is raised (socket wrench sound)
     * - completeRod: SFX to play when a rod has been completed.
     * - gameWin: SFX to play when a level is won.
     * - gameLoss: SFX to play when a level is lost.
     * - collectPoints: SFX to play to indicate points won.
     */
    let soundEffects = {
        startMove: new Howl({
            src: ['assets/sounds/move-nut-sfx.mp3',],
            volume: defaultVolume,
            sprite: {
                onRodMove: [0, 300],
                scoreCount: [0, 4500]
            },
            onplay: function () {
                runVibration(50);
            }
        }),

        raise: new Howl({
            src: ['assets/sounds/start-move-nut-sfx.mp3',],
            volume: defaultVolume,
            sprite: { kickStart: [50, 300] },
        }),

        completeRod: new Howl({
            src: ['assets/sounds/complete-rod3-sfx.mp3',],
            volume: defaultVolume,
            sprite: { rodWin: [1000, 1000] },
        }),

        gameWin: new Howl({
            src: ['assets/sounds/game-win-sfx.mp3',],
            volume: defaultVolume,
            onplay: function () {
                runVibration(400);
            }
        }),

        gameLoss: new Howl({
            src: ['assets/sounds/game-fail1-sfx.mp3',],
            volume: defaultVolume,
            onplay: function () {
                runVibration(100);
            }
        }),

        collectPoints: new Howl({
            src: ['assets/sounds/collect-points-sfx.mp3',],
            volume: defaultVolume,
        }),
    };

    // Set the howler to default setting i.e. muted
    Howler.mute(isGameMuted);

    // 1) Declare settings modal and child buttons
    const modalSettingsContainer = document.getElementById("settingsModalContainer");
    const openModalSettings = document.querySelector(".settings-open");
    const closeModalSettings = document.querySelector(".settings-close");
    const toggleElements = document.querySelectorAll(".toggle-container");
    const removeAllProgress = document.querySelector(".remove-progress");

    // 2) Declare user score display element
    let userScoreElement = document.getElementById('scoreValue');

    // 3) Declare settings modal and child headings
    const helpOptionsContainer = document.getElementById("helpOptionsModal");
    const openModalHelp = document.querySelector(".help-open");
    const closeModalHelp = document.querySelector(".help-close");
    const helpModalElements = document.querySelectorAll(".help-head");

    // 4) Declare game-area, moves, level and game mode elements 
    const gameAreaElement = document.querySelector('.game-area');
    let movesNumberElement = document.getElementById('move-value');
    let levelValueElement = document.getElementById('level-value');
    const difficultyModeSelect = document.getElementById("difficultyMode");

    // 5) Declare game control buttons
    const undoMoveButton = document.getElementById("undo-move");
    const extraRodButton = document.getElementById("add-rod");
    const resetGameButton = document.getElementById("game-reset");
    const newGameButton = document.getElementById("new-game");

    // 6) Declare game loss modal and child buttons
    const modalRetryGameButton = document.getElementById("game-retry");
    const modalNewGameButton = document.getElementById("modal-new-game");
    const modalQuitLossGameButton = document.querySelector(".game-quit.loss");
    const modalLossContainer = document.getElementById("gameOverLossModal");

    // 7) Declare game win modal, child buttons and points display elements
    const continueButton = document.getElementById("modal-continue-game");
    const modalQuitWinGameButton = document.querySelector(".game-quit.win");
    const modalWinContainer = document.getElementById("gameOverWinModal");
    let pointsDisplayElement = document.getElementById("pointsDisplay");



    runGame();

    /**
     * runGame() initializes the game play by:
     * - setting up event listeners for .rod elements (used during gameplay)
     * - setting up event listeners for all other page elements (used onload only)
     * - Initializing odometer instance for score display
     * - Loads and applies the user's stored score and level progress or creates one.
     * - Generates a new game layout based on the last played mode or default game mode.
     */
    function runGame() {

        // function to add eventListeners to .rod elements
        addRodEventListeners();

        // function to add eventListeners to other page elements except .rod
        addNonRodEventListener();

        // initialize odometer for the score element
        new Odometer({
            el: userScoreElement,
            duration: 5000,
        });

        // check browser support for vibration on mobile devices
        checkVibrationSupport();

        // function to set/update user scores and levels on load
        initializeUserProgress();

        // function to create a game layout based on last played mode/ default setup
        generateNewGame();
    }

    /**
     * addNonRodEventListener() adds event listener to non-rod elements:
     * - Settings modal elements: (1) open modal, (2) close modal, (3) toggle setting, (4) clearProgress 
     * - help modal elements: (1) open modal, (2) close modal, (3) toggle display,
     * - difficultyModeSelect element: (1) change game mode 
     * - Game control elements: (1) undo move, (2) Add extra rod, (3) reset game, (4) new game 
     * - Keyboard listeners: (1) keypress - listens for combination keypress  
     * - Game win modal elements: (1)continue 
     * - Game loss modal elements:  (1) retry, (2) new game, (3) quit
     */
    function addNonRodEventListener() {

        // Settings modal elements (1) - open
        openModalSettings.addEventListener('click', function () {
            modalSettingsContainer.style.display = 'flex';
        })

        // Settings modal elements (2) - close
        closeModalSettings.addEventListener('click', function () {
            modalSettingsContainer.style.display = 'none';
        })

        // Settings modal elements (3) - toggles
        toggleElements.forEach(bucket => {
            bucket.addEventListener('click', changeToggleSettings)
        })

        // Settings modal elements (4) - clearProgress
        removeAllProgress.addEventListener('click', function () {
            localStorage.removeItem('userProgress');
            userProgress = createUserProgress();
            initializeUserProgress();
        });

        // Help modal elements (1) - open
        openModalHelp.addEventListener('click', function () {
            helpOptionsContainer.style.display = 'flex';
        });

        // Help modal elements (2) - close and collapse expanded child elements
        closeModalHelp.addEventListener('click', function () {
            helpOptionsContainer.style.display = 'none';
            let arrowElements = document.querySelectorAll(".bi-chevron-double-down");
            let expandedElements = document.querySelectorAll(".help-expanded");

            for (let i = 0; i < arrowElements.length; i++) {
                expandedElements[i].classList.add('hidden-item');
                arrowElements[i].classList.remove('rotate');
            }
        });

        // Help modal elements (3) - toggle display
        helpModalElements.forEach(head => {
            head.addEventListener('click', toggleDisplayHelpModal);
        })

        // difficultyModeSelect (1)
        difficultyModeSelect.addEventListener('change', function () {

            difficultyMode = this.value;
            gameMode = gameModeObject[difficultyMode];
            levelValueElement.innerText = userProgress[difficultyMode];
            generateNewGame();
        })

        // Game control buttons (1) undo move
        undoMoveButton.addEventListener('click', undoLastMove);
        // Game control buttons (2) add extra rod
        extraRodButton.addEventListener('click', addExtraRod);
        // Game control buttons (3) reset
        resetGameButton.addEventListener('click', resetGame);
        // Game control buttons (4) new game
        newGameButton.addEventListener('click', generateNewGame);

        // keyboard events (1)
        window.addEventListener('keydown', handleKeyboardPress);

        //Game win modal buttons (1) continue
        continueButton.addEventListener('click', function () {
            modalWinContainer.style.display = 'none';
            gameLevelScoreUpdate(1000);
            generateNewGame();
        });

        modalQuitWinGameButton.addEventListener('click', function () {
            modalWinContainer.style.display = 'none';
            gameLevelScoreUpdate(0);
            window.location.href = "index.html";
        });

        //Game Loss modal buttons (1) retry
        modalRetryGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            resetGame();
        });

        //Game Loss modal buttons (2) new game
        modalNewGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            generateNewGame();
        });

        //Game Loss modal buttons (3) quit
        modalQuitLossGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            window.location.href = "index.html";
        });

    }

    /**
     * function to handle keyboard press events for game control
     * 
     * Specific key press combinations have different uses:
     * - Shift + M: Toggle sound settings
     * - Ctrl + Z: Undo last move
     * - Shift + X: Add an extra rod
     * - Shift + R: Reset the game
     * - Shift + N: Start a new game
     * 
     *  @param {KeyboardEvent} e - keyboard event triggered by a key press.
     */
    function handleKeyboardPress(e) {
        let pressedKey = e.key.toLowerCase();
        if (pressedKey === 'm' && e.shiftKey) {
            changeSoundSetting();
        } else if (pressedKey === 'z' && e.ctrlKey) {
            undoLastMove();
        } else if (pressedKey === 'x' && e.shiftKey) {
            addExtraRod();
        } else if (pressedKey === 'r' && e.shiftKey) {
            resetGame();
        } else if (pressedKey === 'n' && e.shiftKey) {
            generateNewGame();
        } else {
            return
        }
    }

    /**
     * Function to add event listeners to .rod elements
     * - rodClick callback function is passed for to handle 'click' events on any .rod element 
     */
    function addRodEventListeners() {
        const rods = document.querySelectorAll(".rod");
        for (let rod of rods) {
            rod.addEventListener('click', rodClick);
        }
    }

    /**
     * Toggles display of sibling elements of the head <p> elements in the Help Modal
     * 
     * when clicked: 
     * - the 'hidden-item' class of immediate sibling will be toggle to display/hide
     * - the arrow element's rotate class will be toggled.
     */
    function toggleDisplayHelpModal(e) {
        const headElement = e.currentTarget;
        headElement.nextElementSibling.classList.toggle('hidden-item');
        const arrowElement = headElement.querySelector(".bi-chevron-double-down");
        arrowElement.classList.toggle('rotate');
    }

    /**
     * Reverses the most recent move made by the user.
     * - Checks if button is enabled (for shortcuts calls)
     * - uses moves details for 'lastMoveHistory' object to call 'moveNut() to reverse the nut move'
     * - Revert the moves by calling updateMovesRemaining()
     * - disables the undo move button - single use per move
     */
    function undoLastMove() {
        if (!undoMoveButton.classList.contains('disable')) {
            let moveType = 'reverse';
            moveNut(lastMoveHistory.targetRod, lastMoveHistory.raisedNut, lastMoveHistory.nutsToMove, lastMoveHistory.rodChildrenCount, moveType);
            updateMovesRemaining(moveType);
            undoMoveButton.classList.add('disable');
        }
    }

    /**
     * Extract the numerical digits displayed by an element animated using odometer instance
     * - combines individual digits wrapped in '.odometer-value' spans into a complete number (user score). 
     * 
     * @param {HTMLElement} element - userScoreElement element containing Odometer digit spans.
     * @returns {number} the numeric value currently displayed by the Odometer.
     */
    function getOdometerValue(element) {
        let elementChildren = element.querySelectorAll('.odometer-value');
        let stringDigits = '';
        elementChildren.forEach(odometerSpan => {
            stringDigits += odometerSpan.innerText;
        });

        return parseInt(stringDigits);
    }

    /**
     * Toggles classes in child elements of the .toggle-container element (sound / vibration)
     * 
     * For the clicked container:
     * - 'toggle-slide-on' class is toggled for the slider element 
     * - 'toggle-item-on' class is toggled for the slider's parent element 
     * - 'toggle-text-on' class is toggled for the text and icon elements 
     * 
     * - The corresponding setting setting is triggered depending on the class contained in the .toggle-container element
     * - If it contains '.sound' class changeSoundSetting() is called;
     * - else the function checks if vibration is supported on the current browser.
     * - If vibration is not supported an alert will pop up to inform the user.
     * - If vibration is supported, runVibration() is called and 'isVibrationOn' variable is reversed .
     */
    function changeToggleSettings() {
        this.querySelector('.toggle-slide').classList.toggle('toggle-slide-on');
        this.querySelector('.toggle-item').classList.toggle('toggle-item-on');
        this.querySelector('.toggle-text').classList.toggle('toggle-text-on');

        if (this.classList.contains('sound')) {
            changeSoundSetting();
        } else {
            if (navigator.vibrate) {
                isVibrationOn = !isVibrationOn;
                runVibration(300);
                console.log('Supported');
            } else {
                alert('Vibration is not supported for your current browser');
                console.log('Not supported');
                this.querySelector('.toggle-slide').classList.remove('toggle-slide-on');
                this.querySelector('.toggle-item').classList.remove('toggle-item-on');
                this.querySelector('.toggle-text').classList.remove('toggle-text-on');
            }

        }
    }

    /**
     * Checks if vibration is supported by the current browser.
     * - If not supported, the vibration toggle will b disabled
     */
    function checkVibrationSupport() {
        // .vibration-note
        if (!('vibrate' in navigator)) {
            console.log("It cannot vibrate");

            let vibrationToggle = document.querySelector(".toggle-container.vibration");
            vibrationToggle.classList.add('disable');
            let vibrationNote = document.querySelector('.vibration-note');
            vibrationNote.style.display = 'inline-block';

        }
    }

    /**
     * Triggers vibration effect on mobile devices if enable and supported by the browser
     */
    function runVibration(vibrationDuration) {
        if (navigator.vibrate && isVibrationOn) {
            navigator.vibrate(vibrationDuration);
        }
    }

    /**
     * Function to toggle sound settings
     * - Changes to the 'isGameMuted' to the opposite boolean
     * - Passes the 'isGameMuted' variable to Howler.mute
     * - Plays a short SFX clip to alert user sound settings have changed
     */
    function changeSoundSetting() {
        isGameMuted = !isGameMuted;
        Howler.mute(isGameMuted);
        soundEffects.completeRod.play('rodWin');
    }

    /**
     * Initialize levels and scores using 'userPorgress' object stored on localStorage
     * 
     * If 'userStorage' exist in localStorage the function will:
     * - retrieve the last played level, user score and difficulty mode
     * - Update the UI elements with the correct values (score/level/game mode)
     * 
     * If 'userStorage' does not exist/has been removed:
     * - Fn will create one using default values (score=0, level=1 and mode= 'easy')
     * - UI elements will be updated accordingly
     */
    function initializeUserProgress() {
        if (Object.keys(localStorage).length) {
            userProgress = getUserProgress();

            userScoreElement.innerText = userProgress.userScore;
            difficultyMode = userProgress.currentDifficulty;
            levelValueElement.innerText = userProgress[difficultyMode];
            gameMode = gameModeObject[difficultyMode];
            difficultyModeSelect.value = difficultyMode;

        } else {
            userProgress = createUserProgress();
            userScoreElement.innerText = 0;
            levelValueElement.innerText = 1;
            difficultyMode = defaultDifficulty;
            gameMode = gameModeObject[defaultDifficulty];

            createUserProgress();
        }
    }

    /**
     * Activates the extra rod to be used if it is still inactive
     * - This function runs once per level. 
     * - After the rod becomes active, the 'extraRodButton' button will be disabled
     */
    function addExtraRod() {
        if (!extraRodButton.classList.contains('disable')) {

            let extraRodElement = document.querySelector('.rod.extra');
            extraRodElement.classList.remove('disable');
            extraRodButton.classList.add('disable');
        }
    }

    /**
     * Handles click events on the rod elements.
     * - If there is no 'raised' nut, the top nut of the clicked rod will be raised by calling raiseNut().
     * - If there is a 'rasied' nut:
     * 
     * - Checks if immediate siblings of the raised nut have the same color
     * - Checks how much space there is in the target rod
     * - Appends all imediate siblings of the same color to 'nutsToMove' array but not exceeding availableSpace in the target rod.
     * - the 'nutsToMove' array and other input arguments are passed to moveNut() which initiate the nut movement
     * - The position details of the move is added to lastMoveHistory object (global scope) to be access if undoLastMove() is called.
     *  
     */
    function rodClick(e) {
        const raisedNut = document.querySelector(".raise-nut");
        const rodElement = e.currentTarget;
        const nutObjectTop = rodElement.lastElementChild.firstElementChild;
        let rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;

        if (raisedNut) {
            let currentNut = raisedNut;
            let currentNutWrapper = currentNut.parentElement;
            let sourceRod = currentNutWrapper.parentElement;

            // Check if colors of neext match the nut to move - append to nutsToMove.
            let neighbourNutWrapper = currentNutWrapper.previousElementSibling;
            let neighbourNutColor = "";

            if (!neighbourNutWrapper.classList.contains('nut-wrap')) {
                neighbourNutColor = null;
            } else {
                neighbourNutColor = neighbourNutWrapper.firstElementChild.getAttribute("data-color");
            }

            let currentNutColor = currentNut.getAttribute("data-color");

            let nutWrappersToMove = [currentNutWrapper];
            let nutsToMove = [currentNut];

            const rodCapacity = parseInt(rodElement.getAttribute('data-capacity'));
            let availableSpace = rodCapacity - rodChildrenCount;

            while ((currentNutColor === neighbourNutColor) && (nutsToMove.length < availableSpace)) {

                nutWrappersToMove.unshift(neighbourNutWrapper);
                nutsToMove.unshift(neighbourNutWrapper.firstElementChild);

                currentNut = neighbourNutWrapper.firstElementChild;
                currentNutWrapper = neighbourNutWrapper;

                neighbourNutWrapper = currentNutWrapper.previousElementSibling;
                if (!neighbourNutWrapper.classList.contains('nut-wrap')) {
                    break
                }

                neighbourNutColor = neighbourNutWrapper.firstElementChild.getAttribute("data-color");
                currentNutColor = currentNut.getAttribute("data-color");
            }

            let moveType = 'forward';
            moveNut(rodElement, raisedNut, nutsToMove, rodChildrenCount, moveType);

            lastMoveHistory.targetRod = sourceRod;
            lastMoveHistory.raisedNut = nutsToMove.slice(-1)[0];
            lastMoveHistory.nutsToMove = nutsToMove;
            lastMoveHistory.rodChildrenCount = sourceRod.querySelectorAll('.nut-wrap').length - nutsToMove.length;

            if (undoMoveButton.classList.contains('disable')) {
                undoMoveButton.classList.remove('disable');
            }

        } else {

            if (rodChildrenCount) {
                raiseNut(nutObjectTop, rodChildrenCount);
            }
        }
    }

    /**
     * Raises the top nut above the rod when clicked
     * - calls setRaiseNutTransformY() which calculate the transformY values to ensure the nut rises to the top of the rod
     * - Could include sound effects in enabled
     * - adds class 'raise-nut' to initiate the transform-y animation
     *
     * @param {HTMLElement} nutObject - The nut element being raised.
     * @param {number} rodChildrenCount - Number of nuts on the rod (used to calculate relative lift distance in transform-y).     
     */
    function raiseNut(nutObject, rodChildrenCount) {
        setRaiseNutTransformY(nutObject, rodChildrenCount);
        soundEffects.raise.play('kickStart');
        setTimeout(() => {
            soundEffects.startMove.play('onRodMove');
        }, 100)
        nutObject.classList.add("raise-nut");
    }

    /**
     * Calculates and sets the transformY value for the nut to be raised.
     * - transform-y value ensures nut will always be raised slightly above the clicked rod
     * - transform-y value is then set as a custom property on the nut element to be accessed by 'raise-nut' class.
     * 
     * @param {HTMLElement} nutObject - The nut element to raise.
     * @param {number} rodChildrenCount - Number of nuts currently on the rod.
     */
    function setRaiseNutTransformY(nutObject, rodChildrenCount) {
        const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
        const rodCapacity = parseInt(nutObject.parentElement.parentElement.getAttribute('data-capacity'));
        const availableSpace = (rodCapacity - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);
        const raiseValue = -availableSpace - verticalStep;

        nutObject.style.setProperty("--transform-y", raiseValue + "px");
    }

    /**
     * Opposite of raiseNut()
     * - Lowers a raised nut back to its original place if it cannot be moved (e.g. non-matching colors or no space)
     * - 'raise-nut' class is remove from the raised nut to remove the transform-y.
     * - may have sound effects if enabled.
     * 
     * @param {HTMLElement} nutObject - The nut element to be lowered.
     */
    function lowerNut(nutObject) {
        if (nutObject) {
            nutObject.classList.remove("raise-nut");
            soundEffects.raise.play('kickStart');
            setTimeout(() => {
                soundEffects.startMove.play('onRodMove');
            }, 100)
        }
    }

    /**
     * Function to return the CSS value of a attribute from a UI element with CSS attributes. 
     * - Made to clear the code and make it readable
     * 
     * @param {HTMLElement} object - The element from which to get the css style (e.g div).
     * @param {string} attribute - The CSS property name (e.g. 'height').
     * @returns {number} The numeric value of the requested CSS property (units not included).
     */
    function getCssStyleValue(object, attribute) {
        const attributeValue = parseFloat(getComputedStyle(object).getPropertyValue(attribute));
        return attributeValue
    }

    /**
     * Calculates the starting position of the nut as the move animation begins (first position in nut movement).
     * - The position has the same transform-y value as the 'raised-nut' calculated by setRaiseNutTransformY().
     * - This function is made for the purpose of consistency with other 'calculate position' functions for nut animation
     *
     * @param {HTMLElement} nutObject - The nut element whose starting position is being calculated.
     * @returns {{xValue: number, yValue: number}} - The initial x/y transform values for the animation (y = 0, y is 'raised position').
     */
    function calculateNutStartPosition(nutObject) {
        const transY = nutObject.style.getPropertyValue('--transform-y');
        const nutStartPosition = {
            xValue: 0,
            yValue: parseFloat(transY),
        }
        return nutStartPosition;
    }

    /**
     * Calculates a position slightly between the neighbor rod of the source (second position in nut movement).
     * - The value is used to create a smooth curved path when moving a nut from one rod to another.
     * - y transform value uses the raised position value and raises it slightly more
     * - x transform value is 1 x the width of the nuts, stored as 'horizontalStep'
     *
     * @param {HTMLElement} sourceRod - The rod the nut is moving from.
     * @param {HTMLElement} targetRod - The rod the nut is moving to.
     * @param {HTMLElement} nut - The nut element being animated.
     * @returns {{xValue: number, yValue: number}} - The x/y transform values for the 'midpoint' of the move animation. 
     */
    function calculateNutMidOffset(sourceRod, targetRod, nut) {
        const sourceColumn = sourceRod.getAttribute("data-column");
        const targetColumn = targetRod.getAttribute("data-column");
        const transY = nut.style.getPropertyValue('--transform-y');
        const offsetPosition = {
            xValue: targetColumn >= sourceColumn ? horizontalStep : -horizontalStep + 10,
            yValue: parseFloat(transY) - verticalRaiseValue,
        };
        return offsetPosition;
    }

    /**
     * Calculates the horizontal center of the '.lid' element on the rod (third position in nut movement)
     * - This position is used in the nut movement animation to ensure nut 'enter' and 'leave' through the top of the rod
     * - Uses relative positions between the source and target rods
     * - Adjust horizontal direction of the nut movement depending on the relative position of source &target rods
     * - position value is calculated relative to the previous position of the nut ie. second position in nut movement set by calculateNutMidOffset()
     *
     * @param {HTMLElement} targetRod - The rod element the nut is moving to.
     * @param {HTMLElement} sourceRod - The rod element the nut is moving from.
     * @param {HTMLElement} nut - The nut element being moved.
     * @returns {{xValue: number, yValue: number}} - The calculated x/y transform values to reach the lid center (floats - no units).
     */
    function calculateLidCenter(targetRod, sourceRod, nut) {
        const sourceRow = sourceRod.getAttribute("data-row");
        const sourceColumn = sourceRod.getAttribute("data-column");
        const targetRow = targetRod.getAttribute("data-row");
        const targetColumn = targetRod.getAttribute("data-column");
        const stepsColumn = targetColumn - sourceColumn;
        const stepsRow = sourceRow - targetRow;
        const rowDirection = Math.sign(stepsColumn);

        const adjustSameColum = stepsColumn == 0 ? 0 : 1;

        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod, nut);

        const lidCenterPosition = {
            xValue: rowDirection * ((2 * Math.abs(stepsColumn) - 1) * horizontalStep) + (offsetPosition.xValue * adjustSameColum),
            yValue: offsetPosition.yValue - (verticalStep * (stepsRow * 4)),
        };
        return lidCenterPosition;
    }

    /**
    * Calculates the final position of the nut at the end of the move animation (fourth/last position in nut movement).
    * - This position is bottom position where the nut 'settles' on the target rod
    * - This will be the final position before 'appendChild' is applied
    *  
    * @param {HTMLElement} sourceRod - The rod element the nut is being moving from.
    * @param {HTMLElement} targetRod - The rod element the nut is being moving to.
    * @returns {{xValue: number, yValue: number}} - The calculated x/y transform values to reach the bottom on the target rod.
    */
    function calculateNutFinalPosition(sourceRod, targetRod) {

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();
        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        const nutFinalPosition = {
            xValue: rodXDifference,
            yValue: rodYDifference,
        }
        return nutFinalPosition;
    }

    /**
     * Calculates and sets the CSS custom properties to animate motion of the nut(s) from source rod to target rod.
     * - calculates the four animation positions for each nut i.e. starting, 'midpoint', lid-center and final positions
     * - Use a loop to iterate and apply position property ensuring nut do not overlaps in their relative positions
     * - target/source children variables are updated and used to offset the trailing nuts (if more than 1 nut is being moved)
     *
     * @param {HTMLElement} sourceRod - The rod element the nut(s) are being moved from.
     * @param {HTMLElement} targetRod - The rod element the nut(s) are being moved to.
     * @param {HTMLElement[]} nutsToMove - Array of nut elements to be animated.
     * @param {number} targetChildrenCount - Number of nuts currently in the target rod (used to determine final Y offset).
     */
    function setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount) {
        let sourceChildrenCount = sourceRod.querySelectorAll('.nut-wrap').length;
        const heighExistingChildren = (targetChildrenCount * (parseFloat(nutStyle.height) + parseFloat(nutStyle.marginBottom)));
        for (let nut of nutsToMove) {

            let heightOffset = parseFloat(nutStyle.height) - heighExistingChildren;
            setRaiseNutTransformY(nut, sourceChildrenCount);

            // --- Calculate start position for animation --- //
            const nutStartPosition = calculateNutStartPosition(nut);

            // --- Calculate mid-way position through animation --- //
            const offsetPosition = calculateNutMidOffset(sourceRod, targetRod, nut);

            // --- Calculate center of lid element --- //
            const lidCenterPosition = calculateLidCenter(targetRod, sourceRod, nut);

            // --- Calculate final position of nut movement --- //
            const nutFinalPosition = calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount);

            // --- Set CSS variables for the keyframe animations --- //
            nut.style.setProperty("--raise-start-x", nutStartPosition.xValue + "px");
            nut.style.setProperty("--raise-start-y", nutStartPosition.yValue + "px");
            nut.style.setProperty("--raise-max-x", offsetPosition.xValue + "px");
            nut.style.setProperty("--raise-max-y", offsetPosition.yValue + "px");
            nut.style.setProperty('--lid-position-y', lidCenterPosition.yValue + 'px');
            nut.style.setProperty('--lid-position-x', lidCenterPosition.xValue + 'px');
            nut.style.setProperty("--target-position-x", nutFinalPosition.xValue + "px");
            nut.style.setProperty("--target-position-y", Math.ceil(nutFinalPosition.yValue + heightOffset) + "px");

            targetChildrenCount++;
            sourceChildrenCount--;
        }
    }

    /**
     * Runs the animation move the nut and check if rod(s) are completed
     * - calls 'setPositionalValues()' to calculate and set all required transform positions.
     * - Adds the 'success-move' to each nut and wrapper elements
     * - Has an event listener for 'animationend' to remove the 'success-move' class and append the nut and wrapper in the target rod
     * - Checks if the target rod has been completed ie. has all nuts of the same color by calling 'checkRodCompletion()'
     * - Checks if all rods have been completed by calling checkGameCompletion()
     * - Checks if the remaining moves have not reached 0 before the game is won, if so then the game is lost, 'gameOverLoss()' is called
     * - For aesthetic purposes, there is a delay in the animation between each nut and subsequent sibling nuts 
     *
     * @param {HTMLElement} sourceRod - The rod element the nut(s) are being moved from.
     * @param {HTMLElement} targetRod - The rod element the nut(s) are being moved to.
     * @param {HTMLElement[]} nutsToMove - An array of nut elements to move.
     * @param {number} targetChildrenCount - The number of nuts currently in the target rod (used for positioning).
     */
    function runAnimation(sourceRod, targetRod, nutsToMove, targetChildrenCount) {

        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));
        setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount); // Set the transform positions for the animation motion

        const animationName = "success-move";
        nutsToMove.forEach((nut, index) => {
            setTimeout(() => {

                nut.classList.add(animationName);
                nut.parentElement.classList.add(animationName);

                setRaiseNutTransformY(nut, targetChildrenCount + 1);
                nut.parentElement.addEventListener("animationend", function handler() {
                    nut.parentElement.style.animation = "";
                    nut.style.animation = "";
                    soundEffects.startMove.play('onRodMove');
                    setTimeout(() => {
                        soundEffects.raise.play('kickStart');
                    }, 200)

                    nut.parentElement.appendChild(nut);
                    targetRod.appendChild(nut.parentElement);

                    nut.classList.remove(animationName, "raise-nut");
                    nut.parentElement.classList.remove(animationName);
                    nut.parentElement.removeEventListener("animationend", handler);

                    if (rodCapacity !== 1) {
                        checkRodCompletion(targetRod);
                        let isGameComplete = checkGameCompletion();

                        if (!isGameComplete) {
                            if (userMoves < 1) {
                                setTimeout(() => {
                                    gameOverLoss();
                                }, 800);
                            }
                        }
                    }
                });
            }, index * 100);
        });
    }

    /**
    * Moves raised nut element from source rod to target rod if given conditions are met, else the raised nut is lowered by calling lowerNut()
    * - If the target rod is empty (not nuts), the raised nut(s) are moved without further checks 
    * - If target and source rods are the same, move fails.
    * - If the target rod has no more space to accommodate the nut(s) being moved, move fails.
    * - If the top nut in the target and raised nut to not have the same color, move fails.
    * - If all conditions are met, the move passes and the animation is rub by calling runAnimation().
    * - After the animation has been completed, updateMovesRemaining() is called passing the 'moveType' arguments.
    * - If the moveType='reverse' (ie. called by undoLastMove()), the move runs without checks
    * 
    * @param {HTMLElement} targetRod - The rod element the nut(s) are being moved to.
    * @param {HTMLElement} raisedNut - The nut element that is currently raised.
    * @param {HTMLElement[]} nutsToMove - An array of nut elements to move.
    * @param {number} targetChildrenCount - The number of nuts currently in the rod.
    * @param {number} rodChildrenCount - Number of nuts currently in the target rod.
    * @param {string} moveType - The type of move, can be 'forward'(normal) or 'reverse'(undoLastMove).
    */
    function moveNut(targetRod, raisedNut, nutsToMove, rodChildrenCount, moveType) {

        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;
        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));

        if (moveType === 'reverse') {
            runAnimation(sourceRod, targetRod, nutsToMove, rodChildrenCount);
        }

        if (rodChildrenCount) {
            const targetNut = targetRod.lastElementChild.firstElementChild;
            if (targetRod === sourceRod) {
                lowerNut(raisedNut);
                return
            }

            const isSpaceAvailable = rodChildrenCount < rodCapacity;
            if (!isSpaceAvailable) {
                lowerNut(raisedNut);
                return
            }

            const targetNutColor = targetNut.getAttribute("data-color");
            const raisedNutColor = raisedNut.getAttribute("data-color");
            const isColorMatch = raisedNutColor === targetNutColor;
            if (!isColorMatch) {
                lowerNut(raisedNut);
                return
            }
            runAnimation(sourceRod, targetRod, nutsToMove, rodChildrenCount);
        } else {
            runAnimation(sourceRod, targetRod, nutsToMove, rodChildrenCount);
        }
        updateMovesRemaining(moveType);
    }

    /**
     * Updates the number of moves remaining and adjust the width of the movesBar element
     * - derives width increments based on number of moves for the given game mode
     * - If moveType= 'forward', moves and bard width are decreased
     * - If moveType= 'reverse', moves and bard width are increased/ restored to previous value.
     * - updates the 'userMoves' element with the new value. 
     * - updated the bar width with the new bar width. 
     * 
     * @param {string} moveType - The type of move, can be 'forward'(normal) or 'reverse'(undoLastMove).
     */
    function updateMovesRemaining(moveType) {
        const gameMoves = document.getElementById('game-moves');
        const widthIncrements = Math.round(100 / gameMode.maximumMoves, 2);
        userMoves = movesNumberElement.textContent;

        let currentBarwidth = (getCssStyleValue(movesBar, 'width') / getCssStyleValue(gameMoves, 'width')) * 100;
        let newBarwidth = 0;
        if (moveType === 'forward') {
            newBarwidth = currentBarwidth - widthIncrements;
            --userMoves;
        } else {
            newBarwidth = currentBarwidth + widthIncrements;
            ++userMoves;
        }

        movesNumberElement.textContent = userMoves;
        movesBar.style.width = newBarwidth + '%';
    }

    /**
     * Displays the modal for game loss 
     * - May include sound effects if they are enabled
     */
    function gameOverLoss() {
        modalLossContainer.style.display = 'flex';
        soundEffects.gameLoss.play();
    }

    /**
     * Displays the modal for game win
     * 
     * - calculate position to display confetti animations
     * - calls confettiAnimation() for confetti animations
     * - May include sound effects if they are enabled
     * - Displays earned points calculated by calculatePointsWon()
     */
    function gameOverWin() {

        modalWinContainer.style.display = 'flex';
        const winModalRect = modalWinContainer.querySelector('.game-modal').getBoundingClientRect();
        const leftStartX = (winModalRect.left) / window.innerWidth;
        const rightStartX = (winModalRect.left + winModalRect.width) / window.innerWidth;
        const startY = (winModalRect.top + winModalRect.height / 2) / window.innerHeight;

        let startVelocity = 50;
        let spread = 90;
        let particleSize = 1;
        let ticks = 150;

        setTimeout(() => {
            confettiAnimation(leftStartX, startY, Object.values(nutColorsAll), particleSize, angle = 45, spread = spread, startVelocity = startVelocity, ticks = ticks);
            confettiAnimation(rightStartX, startY, Object.values(nutColorsAll), particleSize, angle = 120, spread = spread, startVelocity = startVelocity, ticks = ticks);
        }, 500);

        setTimeout(() => {
            soundEffects.gameWin.play();
        }, 200)

        setTimeout(() => {
            soundEffects.collectPoints.play();
        }, 2500)

        pointsDisplayElement.innerHTML = calculatePointsWon();
    }

    /**
     * Increases the user's level and update the score after a level is won.
     * 
     * - current level value is retrieved and increase by 1. 
     * - current score values is retrieved using getOdometerValue()
     * - the score is updated with a delay value specified by 'waitDuration'
     * 
     * @param {number} waitDuration - duration (in ms) to delay score update.
     */
    function gameLevelScoreUpdate(waitDuration) {
        // level-value"
        let levelValueElement = document.getElementById('level-value');
        let levelValue = parseInt(levelValueElement.innerText);
        ++levelValue;
        levelValueElement.innerText = levelValue;

        //Get current score and earned points
        currentScore = getOdometerValue(userScoreElement);
        let pointsEarned = parseInt(pointsDisplayElement.textContent);
        let newScore = currentScore + pointsEarned;

        setTimeout(() => {
            userScoreElement.innerHTML = newScore;
            soundEffects.startMove.play('scoreCount');

            saveUserProgress(difficultyMode, newScore);
        }, waitDuration);
    }

    /**
     * Calculates total number of points won by player after winning the game
     * 
     * - Total rods to win: number of rods to be completed before winning the game.
     * - All nuts in all rods: 1 point for each nut in all the completed rods (gameMode.rodCapacity * totalRodsToWin).
     * - Points per rod: fixed points (10) are awarded for each completed rod. (pointsPerRod).
     * - Remaining moves bonus points: 5 bonus points for each remaining move at the end of the game (movesRemainingBonus).
     * - Extra rod bonus points: 10 bonus points if the extra rod was not used to win the game (extraRodBonus).  
     * 
     * @returns {number} The total number of points earned for the current game level.
     */
    function calculatePointsWon() {
        const pointsPerRod = 10;
        const movesRemainingBonus = parseInt(movesNumberElement.textContent) * 5;
        const extraRodBonus = extraRodButton.classList.contains('disable') ? 0 : 10;

        return (gameMode.rodCapacity * totalRodsToWin * pointsPerRod) + movesRemainingBonus + extraRodBonus;
    }

    /**
     * Checks whether a rod has been completed i.e. is full and has nut of the same color
     * 
     * If a rod is complete:
     * - Removes the eventlistener of the completed rod to prevent further interaction
     * - Prepares and runs the confetti animation with the same color as the nuts
     * - Adds a 'disable' class to the undoMove button to present users from undoing a complete rod.
     * - Adds a 'complete' class to the rod element (enlarges the rod lid to cover the top of the rod)
     * - Increases the 'completedRods' by 1, this is used in 'checkGameCompletion()'
     * - may have sound effects if enabled.
     * 
     * @param {HTMLElement} targetRod - The rod element to check if it has been completed.
     */
    function checkRodCompletion(targetRod) {

        const allNuts = targetRod.querySelectorAll('.nut');
        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));
        if (allNuts.length === rodCapacity) {
            const firstNutColor = allNuts[0].getAttribute('data-color');
            const nutSameColor = Array.from(allNuts).every(nut => nut.getAttribute('data-color') === firstNutColor);

            if (nutSameColor) {

                targetRod.removeEventListener("click", rodClick);
                const targetRodRect = targetRod.getBoundingClientRect();
                const startX = (targetRodRect.left + targetRodRect.width / 2) / window.innerWidth;
                const startY = (targetRodRect.top - 10) / window.innerHeight;
                const nutColorHex = [gameMode.nutColors[firstNutColor]];

                confettiAnimation(startX, startY, [nutColorHex], 0.5);
                soundEffects.completeRod.play('rodWin');

                undoMoveButton.classList.add('disable');
                let rodLid = targetRod.querySelector('.rod-lid');
                rodLid.classList.add('complete');

                ++completedRods;
            }
        }
    }

    /**
     * Checks if the level is won by checking if number of rods completed is equal to total rods required to win
     * 
     * - Compares (strictly) if the 'completedRods' with 'totalRodsToWin'.
     * - If they match, gameOverWin() is called and gameWon is set to 'true'
     * - If they do not match (not equal), gameWon is set to 'false'
     * - the value of 'gameWon' is returned to the function that called 'checkGameCompletion()'
     * 
     * @returns {boolean} `true` if the game is complete (when win conditions are met), otherwise `false`.
     */
    function checkGameCompletion() {
        let gameWon = false;
        if (completedRods === totalRodsToWin) {
            gameWon = true;
            setTimeout(() => {
                gameOverWin();
            }, 1500);
        } else {
            gameWon = false;
        }
        return gameWon
    }

    /**
     * Runs the confetti animation with the specs (location, colors etc.) given by input arguments
     * 
     * - This is used when a rod has been completed or when the game is won.
     * - It uses external library imported in the game.html
     * - The input arguments were added in provide more control on how the animation is run. 
     *
     * @param {number} startX - Horizontal origin for the confetti (0 to 1, relative to screen width).
     * @param {number} startY - Vertical origin for the confetti (0 to 1, relative to screen height).
     * @param {string[]} nutColor - Array of hex colors for the confetti particles.
     * @param {number} particleSize - Scalar value to adjust particle size.
     * @param {number} angle - Direction of the confetti burst in degrees.(default=90)
     * @param {number} spread - Spread angle of the burst (how wide the particles scatter).(default=55)
     * @param {number} startVelocity - Initial speed of the particles.(default=10)
     * @param {number} ticks - How many times the confetti will move before disappearing.(default=50)
     */
    function confettiAnimation(startX, startY, nutColor, particleSize, angle = 90, spread = 55, startVelocity = 10, ticks = 50) {

        confetti({
            particleCount: 50,
            angle: angle,
            spread: spread,
            origin: { x: startX, y: startY },
            ticks: ticks,
            colors: nutColor,
            shapes: ['circle'],
            scalar: particleSize,
            startVelocity: startVelocity
        });
    }

    /**
     * Generates randomized nut colors for a new game layout.
     * 
     * - Uses the gameMode object (for mode type) to get the required colors and total nuts to generate subsets of nuts for each color
     * - Colors in the array are shuffled and checked that no more 2 nuts of the same color are immediate neighbors in the same rod.
     * -  'checkColorTriplicates()' is called to prevent a layout with completed rods at the start of the game.
     * - Nut colors and corresponding rod are appened as objects to an array of 'rods'/containers.
     * 
     * @returns {Array<{ name: string, nuts: string[] }>} An array of rod objects, each containing the name (e.g rod1) and an array of nut colors.    
     */
    function generateNutsWithColors() {

        let nutsColorArray = Array(gameMode.rodCapacity).fill(Object.keys(gameMode.nutColors)).flat();
        shuffleColors(nutsColorArray);
        while (!checkColorTriplicates(nutsColorArray)) {
            shuffleColors(nutsColorArray);
        }

        let containers = [];
        for (let i = 0; i < Object.keys(gameMode.nutColors).length; i++) {

            let startIndex = i * gameMode.rodCapacity;
            containers.push({
                name: "rod" + (i + 1),
                nuts: nutsColorArray.slice(startIndex, startIndex + gameMode.rodCapacity)
            });
        }
        return containers;
    }

    /**
     * Shuffles the array nut colors to get a random mix for the game
     * - Ensure each game is generated with randomly distributed colors
     *
     * @param {string[]} colorArray - An array of nut colors to be shuffled.
     * @returns {string[]} An array of nut colors with its elements shuffled randomly.
     */
    function shuffleColors(colorArray) {
        let shuffledColorArray = colorArray;
        for (let i = shuffledColorArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tempColor = shuffledColorArray[i];
            shuffledColorArray[i] = shuffledColorArray[j];
            shuffledColorArray[j] = tempColor;
        }
        return shuffledColorArray;
    }

    /**
     * Checks if the shuffled nut color array does not have more than 2 like colors as immediate siblings within a rod
     * 
     * - If there are more than 2 adjacent nuts of the same color, it returns `false`
     * - Else it returns `true` if there were no adjacent triplicates found in all rods
     *
     * @param {string[]} shuffledNutsColorArray - The shuffled array of nut colors.
     * @returns {boolean} `true` if all rods pass the validation, else returns `false` if any rod has >2 adjacent nuts of the same color. 
     */
    function checkColorTriplicates(shuffledNutsColorArray) {
        for (let i = 0; i < shuffledNutsColorArray.length; i += 4) {
            const rodGroup = shuffledNutsColorArray.slice(i, i + 4);
            let occurrenceCount = 1;
            for (let j = 1; j < rodGroup.length; j++) {
                if (rodGroup[j] === rodGroup[j - 1]) {
                    occurrenceCount++;
                    if (occurrenceCount > 2) return false;
                } else {
                    occurrenceCount = 1;
                }
            }
        }
        return true;
    }

    /**
     * Places shuffled nuts and rods into their respective rod-containers (rows)
     * 
     * - calls 'clearGameLayout()' to clear/remove the current layout of nuts,rods and rod-containers
     * - Calls 'generateGameLayout()' to generate the new game layout and save configurations in the 'gameInitialState' object
     * - Calls 'addRodEventListeners()' to add event listeners to newly generated rod elements
     * - layout configurations stored in 'gameInitialState' are used to append layout to the game area.
     * - Total moves and total complete rods required to win are updated according to the game-mode specs.
     */
    function addNutsToRods() {

        clearGameLayout();
        generateGameLayout();
        addRodEventListeners();

        gameInitialState.gameRodContainers.forEach((rodItem, rodIndex) => {

            let currentRod = document.getElementById(rodItem.name);
            gameInitialState.nutsAndWrappers[rodIndex].forEach((wrapper, wrapperIndex) => {
                currentRod.appendChild(wrapper.wrapper);
            });
        });

        movesNumberElement.textContent = gameMode.maximumMoves;
        totalRodsToWin = Object.values(gameMode.nutColors).length;
    }

    /** 
     * Creates nut elements and their nut-wrapper containers based on color arrays.
     * 
     * - Adds '.nut' class to div elements and applied custom 'data-color' and specific color class for the nut elements.
     * - Add '.nut-wrapper' class to a div wrapping the nut element.
     * - An array of nut elements in their respective wrappers are returned.
     *
     * @param {string[]} nutsArray - Array of nut color names (strings).
     * @returns {Array<{ name: string, wrapper: HTMLElement }>} An array of nut wrapper objects, each with a name and wrapper element.
     */
    function createNutsAndWrappers(nutsArray) {

        let nutsAndWrappers = [];
        nutsArray.forEach((nutColor, index) => {

            let nutElement = document.createElement("div");
            nutElement.setAttribute("class", `nut ${nutColor}`);
            nutElement.setAttribute("data-color", nutColor);

            let nutWrapperElement = document.createElement("div");
            nutWrapperElement.setAttribute("class", "nut-wrap");

            nutWrapperElement.appendChild(nutElement);
            nutsAndWrappers.push({
                name: `rod${index}`,
                wrapper: nutWrapperElement,
            });
        });
        return nutsAndWrappers;
    }

    /**
     * Generates new game and clear previous nuts
     * 
     * - Generates new nut colors by calling 'generateNutsWithColors()', result update 'gameInitialState' object
     * - Updates 'gameInitialState' with a new array nut wrappers and their child nut elements.
     * - calls 'addNutsToRods()' to place new game layout and nuts in the game area
     * - If the 'add extra rod' was disabled, it get re-enabled.
     * - the global 'nutStyle' variable is updated to be used in other functions
     */
    function generateNewGame() {
        gameInitialState.gameRodContainers = generateNutsWithColors();
        let nutsAndWrappers = [];
        for (let rodItem of gameInitialState.gameRodContainers) {
            let nutsAndWrapper = createNutsAndWrappers(rodItem.nuts);
            nutsAndWrappers.push(nutsAndWrapper);
        }
        gameInitialState.nutsAndWrappers = nutsAndWrappers;
        addNutsToRods();

        if (extraRodButton.classList.contains('disable')) {
            extraRodButton.classList.remove('disable');
        }

        anyNut = document.querySelectorAll('.nut')[0];
        nutStyle = window.getComputedStyle(anyNut);
    }

    /**
     * Generates and places rod-containers and rods elements on the game-area container
     * 
     * - Generates rod-containers according to details in the 'gameMode' object
     * - Adds 'rod-container' class to the rod-container elements
     * - Generate rod elements and adds '.rod' classes 
     * - Sets 'id' and 'data-capacity' attributes on the rod elements
     * - Class of 'extra' is added to the last rods which becomes the extra rod
     * - All elements are appended to the game-area container.
     */
    function generateGameLayout() {

        const totalRods = gameMode.rodsInContainers.reduce((a, b) => a + b, 0);
        let rodNumber = 0;
        for (let i = 0; i < gameMode.containers; i++) {

            let containerElement = document.createElement("div");
            containerElement.setAttribute("class", 'rod-container');

            let rodsInContainer = gameMode.rodsInContainers[i];
            for (let j = 0; j < rodsInContainer; j++) {

                ++rodNumber;
                let rodElement = document.createElement("div");
                rodElement.setAttribute("id", `rod${rodNumber}`);

                if (rodNumber === totalRods) {
                    rodElement.setAttribute("class", 'rod extra disable');
                    rodElement.setAttribute("data-capacity", "1");
                } else {
                    rodElement.setAttribute("class", 'rod');
                    rodElement.setAttribute("data-capacity", `${gameMode.rodCapacity}`);
                }

                rodElement.setAttribute("data-row", `${i + 1}`);
                rodElement.setAttribute("data-column", `${j + 1}`);

                let lidElement = document.createElement("div");
                lidElement.setAttribute("class", 'rod-lid');

                rodElement.appendChild(lidElement);
                containerElement.appendChild(rodElement);
            }
            gameAreaElement.appendChild(containerElement);
        }
    }

    /**
     * Reset game to saved gameInitialState
     */
    function resetGame() {
        addNutsToRods();
    }

    /**
     * Remove existing nuts before resetting or generating new game
     */
    function clearGameLayout() {

        let allContainers = gameAreaElement.querySelectorAll('.rod-container');
        movesNumberElement.textContent = gameMode.maximumMoves;
        movesBar.style = "";

        completedRods = 0;
        for (let container of allContainers) {
            gameAreaElement.removeChild(container);
        }
    }

    /**
     * Save user level and score to localStorage
     */
    function saveUserProgress(difficultyMode, newScore) {

        setTimeout(() => {

            let levelValueElement = document.getElementById('level-value');
            if (Object.keys(localStorage).length) {
                userProgress = getUserProgress();
            } else {
                userProgress = createUserProgress();
            }

            userProgress.userScore = newScore;

            userProgress[difficultyMode] = parseInt(levelValueElement.textContent);
            userProgress.currentDifficulty = difficultyMode;
            userProgress.currentLevel = parseInt(levelValueElement.textContent);

            localStorage.setItem("userProgress", JSON.stringify(userProgress));
        }, 3000);
    }

    /**
     * Retrieve 'userProgress' if available on localStorage
     */
    function getUserProgress() {

        if (Object.keys(localStorage).length) {
            userProgress = localStorage.getItem('userProgress');
            return JSON.parse(userProgress);
        } else {
            return null
        }
    }

    /**
     * Create 'userProgress' with default values and save to localStorage
     */
    function createUserProgress() {
        userProgress = {
            userScore: 0,
            easy: 1,
            medium: 1,
            hard: 1,
            currentDifficulty: defaultDifficulty,
            currentLevel: 1,
        };
        localStorage.setItem("userProgress", JSON.stringify(userProgress));
        return userProgress;
    }
})