// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Global variables.
    // const maxNutsPerRod = 4;
    const verticalStep = 25;
    const horizontalStep = 42

    // let userScore = 0;
    // let userLevel = 1;
    let movesBar = document.querySelector('.move-fill');

    let completedRods = 0; // initialize as 0
    let gameInitialState = {}; // Var to store game state

    // nut colors
    const nutColorsAll = {
        'yellow': '#f9b723',
        'blue': '#26a1ee',
        'whitesilver': '#c2b3d4',
        'orange': '#f25029',
        'green': '#8DCD3B',
        'purple': '#911899',
        'beige': '#FFCFC1',
        'pink': '#FF90C8',
        'red': '#FF0C15',
    }

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
            maximumMoves: 15,
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
            maximumMoves: 25,
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
                'red': '#FF0C15',
            },
            nutCount: 20,
            maximumMoves: 42,
        },
    };

    // Sound effects Obj
    let soundEffects = {
        raise: new Howl({
            src: ['assets/sounds/start-move-nut-sfx.mp3',],
            volume: 0.15,
            sprite: { kickStart: [50, 300] },
        }),

        startMove: new Howl({
            src: ['assets/sounds/move-nut-sfx.mp3',],
            volume: 0.15,
            sprite: {
                onRodMove: [0, 300],
                scoreCount: [0, 4500]
            },
        }),

        gameWin: new Howl({
            src: ['assets/sounds/game-win-sfx.mp3',],
            volume: 0.9,
            // sprite: { onRodMove: [0, 300] },
        }),

        completeRod: new Howl({
            src: ['assets/sounds/complete-rod3-sfx.mp3',],
            volume: 0.15,
            sprite: { rodWin: [1000, 1000] },
        }),

        collectPoints: new Howl({
            src: ['assets/sounds/collect-points-sfx.mp3',],
            volume: 0.15,
            // sprite: { rodWin: [0, 1000] },
        }),

        gameLoss: new Howl({
            src: ['assets/sounds/game-fail1-sfx.mp3',],
            volume: 0.15,
            // sprite: { rodWin: [0, 1000] },
        }),
    };


    // soundEffects.gameLoss.play();
    // soundEffects.completeRod.play('rodWin');
    // soundEffects.raise.play('kickStart');
    // setTimeout(() => {
    //     soundEffects.startMove.play('onRodMove');
    // },400)


    // let difficultyMode = 'medium';
    // Set game mode
    const defaultDifficulty = 'easy';
    let difficultyMode = '';//defaultDifficulty;
    let gameMode = '';//gameModeObject[defaultDifficulty];
    // let gameMode = gameModeObject.medium;
    // let gameMode = gameModeObject.hard;

    // localStorage.removeItem('userProgress');
    let isGameMuted = true; //default is without sound;


    // game area
    const gameAreaElement = document.querySelector('.game-area');
    let movesNumberElement = document.getElementById('move-value');
    let levelValueElement = document.getElementById('level-value');


    // Intialize variables
    let userMoves = 0;
    let totalRodsToWin = 0;
    let lastMoveHistory = {};
    let anyNut = null;
    let nutStyle = null;
    let userProgress = {};
    currentScore = 0;

    // handle modal elements - Game Loss
    const modalRetryGameButton = document.getElementById("game-retry");
    const modalNewGameButton = document.getElementById("modal-new-game");
    const modalQuitGameButton = document.getElementById("game-quit");
    const modalLossContainer = document.getElementById("gameOverLossModal");

    // handle modal elements - Game Win
    const continueButton = document.getElementById("modal-continue-game");
    const modalWinContainer = document.getElementById("gameOverWinModal");

    //game control  buttons
    const newGameButton = document.getElementById("new-game"); // new-game
    newGameButton.addEventListener('click', generateNewGame);
    const undoMoveButton = document.getElementById("undo-move"); //undo move

    // difficultyMode
    const difficultyModeSelect = document.getElementById("difficultyMode");

    // settings modal
    const modalSettingsContainer = document.getElementById("settingsModalContainer");
    const openModalSettings = document.querySelector(".settings-open");
    const closeModalSettings = document.querySelector(".settings-close");

    //get toggle sound and vibration elements
    const toggleElements = document.querySelectorAll(".toggle-container");

    const removeAllProgress = document.querySelector(".remove-progress");

    // const startGameButton = document.getElementById("start-button"); // start game

    const extraRodButton = document.getElementById("add-rod"); // add extra rod

    const pointDescriptionElement = document.getElementById("points-head"); // points calculations

    let pointsDisplayElement = document.getElementById("pointsDisplay"); // points display
    // let pointsOdometer = new Odometer({
    //     el: pointsDisplayElement,
    //     duration: 5000,
    // });

    let userScoreElement = document.getElementById('scoreValue');
    let scoreOdometer = new Odometer({
        el: userScoreElement,
        duration: 5000,
    });

    // Run game to load default game setup with level=1 and score=0
    runGame();

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
     * Undo last move
     */
    function undoLastMove() {
        let moveType = 'reverse';
        moveNut(lastMoveHistory['targetRod'], lastMoveHistory['raisedNut'], lastMoveHistory['nutsToMove'], lastMoveHistory['rodChildrenCount'], moveType);
        updateMovesRemaining(moveType);
        undoMoveButton.classList.add('disable');
    }

    /**
     * initialize the game play
     */
    function runGame() {
        addRodEventListeners();

        const playInstructionElement = document.querySelector('.play-instructions');

        if (playInstructionElement) {
            playInstructionElement.addEventListener('click', toggleHiddenItem);
        }

        // modal eventlisteners - Game Loss
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

        // undo move button listener
        undoMoveButton.addEventListener('click', undoLastMove);

        // Win button -continue
        continueButton.addEventListener('click', function () {

            modalWinContainer.style.display = 'none';
            gameLevelUp(); // Progress user level up

            //Get current score and earned points
            currentScore = getOdometerValue(userScoreElement);
            let pointsEarned = parseInt(pointsDisplayElement.textContent);
            let newScore = currentScore + pointsEarned;

            setTimeout(() => {
                userScoreElement.innerHTML = newScore;
                soundEffects.startMove.play('scoreCount');

                // save user progress
                saveUserProgress(difficultyMode, newScore);
            }, 1000);

            // console.log("userScoreElement After continue")
            // console.log(newScore)
            // console.log(userScoreElement.innerHTML)

            generateNewGame();
        });

        pointDescriptionElement.addEventListener('click', function (e) {

            const pointDescriptionExpanded = document.querySelector('.points-expanded');
            pointDescriptionExpanded.classList.toggle('hidden-item');
        });

        // start game button
        // startGameButton.addEventListener('click', generateNewGame);

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

        // Sound toggle
        // soundToggleElement.addEventListener('click', setToggleOn);
        // vibrationToggleElement.addEventListener('click', setToggleOn);

        toggleElements.forEach(bucket => {
            bucket.addEventListener('click', changeToggleSettings)
        })

        removeAllProgress.addEventListener('click', function () {
            localStorage.removeItem('userProgress');
            userProgress = createUserProgress();
            initializeUserProgress();
        });
        // console.log(soundToggleElement)
        // console.log(vibrationToggleElement)

        // Add extra rod
        extraRodButton.addEventListener('click', addExtraRod);

        // get previous levels and scores
        initializeUserProgress();

        // Run new game
        generateNewGame();
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
            console.log("Code to change soound  settings");
            isGameMuted = !isGameMuted;
            Howler.mute(isGameMuted);
            soundEffects.completeRod.play('rodWin');

        } else {
            console.log("Code to change vibration settings")
        }
    }

    /**
     * initialize levels and scores
     */
    function initializeUserProgress() {

        // userProgress = getUserProgress();
        if (Object.keys(localStorage).length) {
            userProgress = getUserProgress();
            // console.log(userProgress)

            userScoreElement.innerText = userProgress.userScore;
            difficultyMode = userProgress.currentDifficulty;
            levelValueElement.innerText = userProgress[difficultyMode];
            gameMode = gameModeObject[difficultyMode];

        } else {
            userProgress = createUserProgress();
            userScoreElement.innerText = 0;
            levelValueElement.innerText = 1;
            difficultyMode = defaultDifficulty;
            gameMode = gameModeObject[defaultDifficulty];

            //save to local storage
            createUserProgress();
        }

    }

    /**
     * Function to display/hide items
     */
    function toggleHiddenItem() {
        const targetElement = document.querySelector('.game-instructions');
        targetElement.classList.toggle('hidden-item');
    }

    /**
     * Activate the extra rod to be used
     */
    function addExtraRod() {
        let extraRodElement = document.querySelector('.rod.extra');
        extraRodElement.classList.remove('disable');
        extraRodButton.classList.add('disable');
    }

    /**
     * hand clicks on the rod element.
     * when clicked, a 'raised' nut is moved to it. 
     * If the move is not allowed, the raised nut is lowered
     */
    function rodClick(e) {
        // handle click to move raised nut or lower raised nut
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

                //append wrapper to array
                nutWrappersToMove.unshift(neighbourNutWrapper);
                nutsToMove.unshift(neighbourNutWrapper.firstElementChild);

                //update current and neighbour colors
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

            // Remove 'disable class after successful move
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
        // soundEffects.moveNut.play('onRodMove');
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
            // soundEffects.moveNut.play('onRodMove');
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

        const stepsColumn = sourceColumn - targetColumn;
        const stepsRow = sourceRow - targetRow;

        const transY = nut.style.getPropertyValue('--transform-y');

        const lidCenterPosition = {
            xValue: -(horizontalStep * (stepsColumn)) - 6,
            yValue: targetRow == sourceRow ? parseFloat(transY) + (verticalStep * (stepsRow)) : (parseFloat(transY) - (verticalStep * (stepsRow) * 7)),
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

        // anyNut is global to avoud redefining 
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
            yValue: parseFloat(transY) - verticalStep,
        };

        return offsetPosition;
    }

    /**
     * Calculate and set the CSS values for the animation motion of the nut
     * @param {The parent rod of the raised nut} sourceRod 
     * @param {The final rod for the nut} targetRod 
     */
    function setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount) {

        // let tranformIncreaseValue = 0;
        let sourceChildrenCount = sourceRod.querySelectorAll('.nut-wrap').length;
        const heighExistingChildren = (targetChildrenCount * (parseFloat(nutStyle.height) + parseFloat(nutStyle.marginBottom)));

        for (let nut of nutsToMove) {

            // height offset
            let heightOffset = parseFloat(nutStyle.height) - heighExistingChildren;

            //set raise values first
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

            targetChildrenCount++; // increase after each loop
            sourceChildrenCount--; //remove 1 child eacj loop

        }
    }

    /**
     * Run the animation for the input move
     * Specify the animation class name
     */
    function runAnimation(sourceRod, targetRod, nutsToMove, targetChildrenCount) {

        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));
        setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount); // Set the transform positions for the animation motion

        //Add animation class
        const animationName = "success-move";

        nutsToMove.forEach((nut, index) => {
            setTimeout(() => {

                nut.classList.add(animationName); // nutWrapper
                nut.parentElement.classList.add(animationName); // nut element

                setRaiseNutTransformY(nut, targetChildrenCount + 1);

                nut.parentElement.addEventListener("animationend", function handler() {

                    nut.parentElement.style.animation = "";
                    nut.style.animation = "";
                    // soundEffects.moveNut.play('onRodMove');
                    // soundEffects.raise.play('kickStart');
                    soundEffects.startMove.play('onRodMove');
                    setTimeout(() => {
                        // soundEffects.startMove.play('onRodMove');
                        soundEffects.raise.play('kickStart');
                    }, 200)


                    nut.parentElement.appendChild(nut);
                    targetRod.appendChild(nut.parentElement);

                    nut.classList.remove(animationName, "raise-nut");
                    nut.parentElement.classList.remove(animationName);

                    nut.parentElement.removeEventListener("animationend", handler);

                    // only check for full rods
                    if (rodCapacity !== 1) {
                        // check the rod completion
                        checkRodCompletion(targetRod);

                        //check game completion
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
        // Get raised nut
        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;
        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));


        if (moveType === 'reverse') {
            runAnimation(sourceRod, targetRod, nutsToMove, rodChildrenCount);
        }

        // Move nut right away if target rod is empty
        if (rodChildrenCount) {

            const targetNut = targetRod.lastElementChild.firstElementChild;

            // 1) Check the destination rod is not the same as origin rod
            if (targetRod === sourceRod) {
                lowerNut(raisedNut);
                return
            }

            // 2) Check if the target rod has space
            const isSpaceAvailable = rodChildrenCount < rodCapacity;
            if (!isSpaceAvailable) {
                lowerNut(raisedNut);
                return
            }

            // 3) Check if the raised nut and topChild of target rod have same colors
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

        // Decreament moves after completed move
        updateMovesRemaining(moveType);
    }

    /**
     * Update number of moves remaining 
     */
    function updateMovesRemaining(moveType) {
        const gameMoves = document.getElementById('game-moves');
        // const maximumMoves = 10;
        const widthIncrements = Math.round(100 / gameMode.maximumMoves, 2);

        userMoves = movesNumberElement.textContent;

        let currentBarwidth = (getCssStyleValue(movesBar, 'width') / getCssStyleValue(gameMoves, 'width')) * 100;

        let newBarwidth = 0;
        let newMovesValue = 0;

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
        // point perRod 10
        // Maxnuts per rod 4
        // totalRodsToWin 3
        // movesRemainingBonus 5 per move
        // extraRodBonus 10 if not used
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

        if (allNuts.length === rodCapacity) { //confirm if it has the max nuts possible
            const firstNutColor = allNuts[0].getAttribute('data-color');
            const nutSameColor = Array.from(allNuts).every(nut => nut.getAttribute('data-color') === firstNutColor);

            if (nutSameColor) {

                targetRod.removeEventListener("click", rodClick);

                const targetRodRect = targetRod.getBoundingClientRect();
                // calcluate relative positon of the rod - center / convert ro ratio
                const startX = (targetRodRect.left + targetRodRect.width / 2) / window.innerWidth;
                const startY = (targetRodRect.top - 10) / window.innerHeight;
                const nutColorHex = [gameMode.nutColors[firstNutColor]];

                confettiAnimation(startX, startY, [nutColorHex], 0.5);
                soundEffects.completeRod.play('rodWin');

                undoMoveButton.classList.add('disable');
                let rodLid = targetRod.querySelector('.rod-lid');
                rodLid.classList.add('complete');

                // update total rods
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
            startVelocity: startVelocity,

        });

    }

    /**
     * Generate a new game based on random inputs  
     */
    function generateNutsWithColors() {

        // repeated nut colors for total nuts
        // let nutsColorArray = Array(maxNutsPerRod).fill(Object.keys(nutColors)).flat();
        let nutsColorArray = Array(gameMode.rodCapacity).fill(Object.keys(gameMode.nutColors)).flat();

        // Shuffle colors
        shuffleColors(nutsColorArray);

        while (!checkColorTriplicates(nutsColorArray)) {
            shuffleColors(nutsColorArray);
        }

        // separate shuffled colors into rod containers
        let containers = [];

        // for (let i = 0; i < maxNutsPerRod - 1; i++) {
        // for (let i = 0; i < gameMode.rodCapacity - 1; i++) {
        for (let i = 0; i < Object.keys(gameMode.nutColors).length; i++) {

            let startIndex = i * gameMode.rodCapacity;

            containers.push({
                name: "rod" + (i + 1),
                nuts: nutsColorArray.slice(startIndex, startIndex + gameMode.rodCapacity)
                // nuts: nutsColorArray.slice(i * maxNutsPerRod, (i * maxNutsPerRod) + maxNutsPerRod)
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

        //clear and containers 
        clearGameLayout();

        //generate game Layout
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
        //Loop througth nuts arayy
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



        // Save game sate for use in reset
        gameInitialState['gameRodContainers'] = generateNutsWithColors();
        let nutsAndWrappers = [];
        for (let rodItem of gameInitialState.gameRodContainers) {
            let nutsAndWrapper = createNutsAndWrappers(rodItem.nuts);
            nutsAndWrappers.push(nutsAndWrapper);
        }

        gameInitialState['nutsAndWrappers'] = nutsAndWrappers;
        addNutsToRods();

        // Update nut Element global style
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

            // Cerate rod elements in each container
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

                // Create lid element for each rod
                let lidElement = document.createElement("div");
                lidElement.setAttribute("class", 'rod-lid');

                //append lid to rod
                rodElement.appendChild(lidElement);

                //append rod to container;
                containerElement.appendChild(rodElement);

            }

            //append each container to game-area div
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

        // Reset moves/ bar
        movesNumberElement.textContent = gameMode.maximumMoves;
        movesBar.style = "";

        //reset ompleted rods
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

            // let currentScore = getOdometerValue(userScoreElement);

            // console.log("currentScore Before save")
            // console.log(newScore)

            if (Object.keys(localStorage).length) {
                userProgress = getUserProgress();
            } else {
                userProgress = createUserProgress();
            }

            userProgress.userScore = newScore;

            userProgress[difficultyMode] = parseInt(levelValueElement.textContent);
            userProgress.currentDifficulty = difficultyMode;
            userProgress.currentLevel = parseInt(levelValueElement.textContent);


            // console.log(userProgress);

            localStorage.setItem("userProgress", JSON.stringify(userProgress));

        }, 3000);

    }

    /**
     * Retrieve 'userProgress' if available on localStorage
     */
    function getUserProgress() {

        if (localStorage) {

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