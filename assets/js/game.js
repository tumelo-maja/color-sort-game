/**
 * Add Event Listener to run only after HTML document has completely loaded
 * All code within this eventlistener will be accessible to the browser once the page has loaded.
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
     * --Game modes--: 'easy', 'medium' and 'hard'. For each mode:
     * --containers--: number of rod-container elements i.e. rows
     * --rodsInContainers--: number of .rod elements in each .rod-container.
     * --rodCapacity--: maximum number of nut allowed to be stacked in a single .rod element.
     * --nutColors--: object of colors to be used for the specific game mode. keys() used as css classes and values for confetti.
     * --nutCount--: total number of .nut elements to be created for the game mode.
     * --maximumMoves--: Number of moves that user has to complete stacking for the game mode.
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

    // Sound effects Obj
    /**
     * Declare soundEffects to types of sound clips using 'Howler.js' audio library to play when sound in set to 'on' 
     * For each key: 
     * --src--: path to the clip
     * --volume--: volume of the clip
     * --sprite--: create a subset of to play sound between two specified timestamps
     * --onplay--: function to run simultaneously as SFX e.g. vibrate
     * Keys():
     * --startMove--: SFX to play at the start/end of .nut movement
     * --raise--: SFX to play when a .nut is raised (socket wrench sound)
     * --completeRod--: SFX to play when a rod has been completed.
     * --gameWin--: SFX to play when a level is won.
     * --gameLoss--: SFX to play when a level is lost.
     * --collectPoints--: SFX to play to indicate points won.
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
    const modalQuitGameButton = document.getElementById("game-quit");
    const modalLossContainer = document.getElementById("gameOverLossModal");

    // 7) Declare game win modal, child buttons and points display elements
    const continueButton = document.getElementById("modal-continue-game");
    const modalWinContainer = document.getElementById("gameOverWinModal");
    let pointsDisplayElement = document.getElementById("pointsDisplay");

    let scoreOdometer = new Odometer({
        el: userScoreElement,
        duration: 5000,
    });

    runGame();

    /**
     * initialize the game play
     */
    function runGame() {
        addRodEventListeners();

        modalRetryGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            resetGame();
        });

        modalNewGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            generateNewGame();
        });

        modalQuitGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            window.location.href = "index.html";
        })

        // Game control buttons
        undoMoveButton.addEventListener('click', undoLastMove);
        extraRodButton.addEventListener('click', addExtraRod);
        newGameButton.addEventListener('click', generateNewGame);
        resetGameButton.addEventListener('click', resetGame);

        // keyboard events
        window.addEventListener('keydown', handleKeyboardPress);

        // Win button -continue
        continueButton.addEventListener('click', function () {

            modalWinContainer.style.display = 'none';
            gameLevelUp();

            //Get current score and earned points
            currentScore = getOdometerValue(userScoreElement);
            let pointsEarned = parseInt(pointsDisplayElement.textContent);
            let newScore = currentScore + pointsEarned;

            setTimeout(() => {
                userScoreElement.innerHTML = newScore;
                soundEffects.startMove.play('scoreCount');

                saveUserProgress(difficultyMode, newScore);
            }, 1000);

            generateNewGame();
        });

        helpModalElements.forEach(head => {
            head.addEventListener('click', toggleDisplayHelpModal);
        })

        // difficultyModeSelect
        difficultyModeSelect.addEventListener('change', function () {

            difficultyMode = this.value;
            gameMode = gameModeObject[difficultyMode];
            levelValueElement.innerText = userProgress[difficultyMode];
            generateNewGame();
        })

        // close settings modal
        closeModalSettings.addEventListener('click', function () {
            modalSettingsContainer.style.display = 'none';
        })

        // open settings modal
        openModalSettings.addEventListener('click', function () {
            modalSettingsContainer.style.display = 'flex';
        })

        // close help modal
        closeModalHelp.addEventListener('click', function () {
            helpOptionsContainer.style.display = 'none';
        })

        // open help modal
        openModalHelp.addEventListener('click', function () {
            helpOptionsContainer.style.display = 'flex';
        })

        toggleElements.forEach(bucket => {
            bucket.addEventListener('click', changeToggleSettings)
        })

        removeAllProgress.addEventListener('click', function () {
            localStorage.removeItem('userProgress');
            userProgress = createUserProgress();
            initializeUserProgress();
        });

        // get previous levels and scores
        initializeUserProgress();

        // Run new game
        generateNewGame();
    }

    /**
     * function to handle keyboard press events
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
     * Function to add eventlisteners to rod elements
     */
    function addRodEventListeners() {
        const rods = document.querySelectorAll(".rod");
        for (let rod of rods) {
            rod.addEventListener('click', rodClick);
        }
    }

    /**
     * Toggle display of sibling elements of the head <p> elements in the Help Modal
     */
    function toggleDisplayHelpModal(e) {
        const headElement = e.currentTarget;
        headElement.nextElementSibling.classList.toggle('hidden-item');
        const arrowElement = headElement.querySelector(".bi-chevron-double-down");
        arrowElement.classList.toggle('rotate');
    }

    /**
     * Undo last move
     */
    function undoLastMove() {
        if (!undoMoveButton.classList.contains('disable')) {
            let moveType = 'reverse';
            moveNut(lastMoveHistory['targetRod'], lastMoveHistory['raisedNut'], lastMoveHistory['nutsToMove'], lastMoveHistory['rodChildrenCount'], moveType);
            updateMovesRemaining(moveType);
            undoMoveButton.classList.add('disable');
        }
    }

    /**
     * Extract the numerical digits displayed by an element animated using odometer instance
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
     * Toggle the *-on class for on elements in the toggle container, sound and vibration
     */
    function changeToggleSettings() {
        this.querySelector('.toggle-slide').classList.toggle('toggle-slide-on');
        this.querySelector('.toggle-text').classList.toggle('toggle-text-on');
        this.querySelector('.toggle-item').classList.toggle('toggle-item-on');

        if (this.classList.contains('sound')) {
            changeSoundSetting();
        } else {
            isVibrationOn = !isVibrationOn;
            runVibration(300);
        }
    }

    /**
     * Run vibration when this function is called
     */
    function runVibration(vibrationDuration) {
        if (navigator.vibrate && isVibrationOn) {
            navigator.vibrate(vibrationDuration);
        }
    }

    /**
     * Function to change sound setting (on to off/ vice versa)
     */
    function changeSoundSetting() {
        isGameMuted = !isGameMuted;
        Howler.mute(isGameMuted);
        soundEffects.completeRod.play('rodWin');
    }

    /**
     * initialize levels and scores
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
     * Activate the extra rod to be used
     */
    function addExtraRod() {
        if (!extraRodButton.classList.contains('disable')) {

            let extraRodElement = document.querySelector('.rod.extra');
            extraRodElement.classList.remove('disable');
            extraRodButton.classList.add('disable');
        }
    }

    /**
     * hand clicks on the rod element.
     * when clicked, a 'raised' nut is moved to it. 
     * If the move is not allowed, the raised nut is lowered
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

            lastMoveHistory['targetRod'] = sourceRod;
            lastMoveHistory['raisedNut'] = nutsToMove.slice(-1)[0];
            lastMoveHistory['nutsToMove'] = nutsToMove;
            lastMoveHistory['rodChildrenCount'] = sourceRod.querySelectorAll('.nut-wrap').length - nutsToMove.length;

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
     * Raise the top nut &wrapper  above the rod when clicked
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
     * Set the transformY value for the raise-nut class.
     * The nut must always be raised slightly above the clicked rod
     */
    function setRaiseNutTransformY(nutObject, rodChildrenCount) {
        const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
        const rodObject = nutObject.parentElement.parentElement;
        const rodCapacity = parseInt(nutObject.parentElement.parentElement.getAttribute('data-capacity'));
        const availableSpace = (rodCapacity - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);
        const raiseValue = -availableSpace - verticalStep;

        nutObject.style.setProperty("--transform-y", raiseValue + "px");
    }

    /**
     * Lower nut to the base if it cannot be moved
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
     * Function to return the CSS value of a attribute from an object. 
     * Made to clear the code and make it readable
     * Takes 'object' and 'attribute' as arguments
     */
    function getCssStyleValue(object, attribute) {
        const attributeValue = parseFloat(getComputedStyle(object).getPropertyValue(attribute));
        return attributeValue
    }

    /**
     * Calculate the 'lid' position - entry/exit points for all nuts
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
     * Calculate the final position of the nut at the end of the move animation.
     * This will be the final position before 'appendChild' is applied 
     */
    function calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount) {

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
     * Calculate the position of the nut at the start of the move animation.
     * The position after being 'raised' 
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
     * Calculate the mid-point position of the source and target rods for the animation.
     * The value is used at
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
     * Calculate and set the CSS values for the animation motion of the nut
     * @param {The parent rod of the raised nut} sourceRod 
     * @param {The final rod for the nut} targetRod 
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
     * Run the animation for the input move
     * Specify the animation class name
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
                            if (userMoves === 0) {
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
     * Move raised nut to another rod
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
     * Update number of moves remaining 
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
     * Display modal for game loss and give user option to retry or start a new game
     */
    function gameOverLoss() {
        modalLossContainer.style.display = 'flex';
        soundEffects.gameLoss.play();
    }

    /**
     * Display game over modal for Win case
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
     * Increase the level after win
     */
    function gameLevelUp() {
        // level-value"
        let levelValueElement = document.getElementById('level-value');
        let levelValue = parseInt(levelValueElement.innerText);
        ++levelValue;
        levelValueElement.innerText = levelValue;
    }

    /**
     * Calculate total points won
     */
    function calculatePointsWon() {
        const pointsPerRod = 10; //point factor for each completed rod
        const movesRemainingBonus = parseInt(movesNumberElement.textContent) * 5;
        const extraRodBonus = extraRodButton.classList.contains('disable') ? 0 : 10;

        return (gameMode.rodCapacity * totalRodsToWin * pointsPerRod) + movesRemainingBonus + extraRodBonus;
    }

    /**
     * Check if the rod has been completed by checking the count and colors of the child nuts
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
     * Check if all rods are completed
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
     * Show animation after a rod has been completed corectly 
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
     * Generate a new game based on random inputs  
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
     * Shuffle the nut colors to get a random mix for the game
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
     * Check if the shuffled nut colors have more than 2 like colors as immediate siblings within a rod
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
     * Place shuffled nuts into rod containers
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
     * Create nut elements based on color arrays including the wrapper
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
     * Generate new game and clear previous nuts
     */
    function generateNewGame() {
        gameInitialState['gameRodContainers'] = generateNutsWithColors();
        let nutsAndWrappers = [];
        for (let rodItem of gameInitialState.gameRodContainers) {
            let nutsAndWrapper = createNutsAndWrappers(rodItem.nuts);
            nutsAndWrappers.push(nutsAndWrapper);
        }
        gameInitialState['nutsAndWrappers'] = nutsAndWrappers;
        addNutsToRods();

        if (extraRodButton.classList.contains('disable')) {
            extraRodButton.classList.remove('disable');
        }

        anyNut = document.querySelectorAll('.nut')[0];
        nutStyle = window.getComputedStyle(anyNut);
    }

    /**
     * Generate and place containers and rods into game area
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