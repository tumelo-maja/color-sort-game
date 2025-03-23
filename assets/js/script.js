// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Global variables.
    // const maxNutsPerRod = 4;
    const verticalStep = 25;
    const horizontalStep = 42

    const maximumMoves = 10;
    const widthIncrements = Math.round(100 / maximumMoves, 2);
    let movesNumberElement = document.getElementById('move-value');
    movesNumberElement.textContent = maximumMoves;
    let userMoves = maximumMoves;
    let userScore = 0;
    let userLevel = 1;
    let movesBar = document.querySelector('.move-fill');

    let pointsEarned = 0;
    let completedRods = 0; // initialize as 0
    const totalRodsToWin = 3; // Rods completed to win
    const pointsPerRod = 10; //point factor for each completed rod
    let gameInitialState = {}; // Var to store game state

    // nut colors
    const nutColors = {
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
            maximumMoves: 10,
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
            maximumMoves: 16,
        },
    };

    // Set game mode
    // let gameMode = gameModeObject.easy;
    let gameMode = gameModeObject.medium;

    let lastMoveHistory = {}; // use object to store last move inputs to moveNuts

    // Intialize Get CSS style object for nut element 
    let anyNut = null;
    let nutStyle = null;


    const testButton = document.getElementById("test-button");
    testButton.addEventListener('click', generateGameLayout);

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


    // const startGameButton = document.getElementById("start-button"); // start game

    const extraRodButton = document.getElementById("add-rod"); // add extra rod

    const pointDescriptionElement = document.getElementById("points-head"); // points calculations


    // Run game to load default game setup with level=1 and score=0
    runGame();

    /**
     * Create an Odometer instance to create number counter animations
     */
    function createOdometer(object, startValue) {

        object.innerHTML = `${startValue}`;

        let odometerInstance = new Odometer({
            el: object,
            value: startValue,
            duration: 5000,
        });

        return odometerInstance;
    }

    /**
     * Run an update on the Odometer instance to animate number counting
     */
    function runOdometer(odometerInstance, finalValue) {
        setTimeout(() => {
            odometerInstance.update(finalValue);
        }, 50);
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
        const rods = document.querySelectorAll(".rod");
        for (let rod of rods) {
            rod.addEventListener('click', rodClick);
        }

        const playInstructionElement = document.querySelector('.play-instructions');
        console.log(playInstructionElement);

        if (playInstructionElement) {
            playInstructionElement.addEventListener('click', toggleHiddenItem);
        }

        // modal eventlisteners - Game Loss
        modalRetryGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            // location.reload();
            resetGame();
            console.log("I'm not giving up!");
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

            // Get current Score
            const userScoreElement = document.getElementById('scoreValue');
            const currentScore = parseInt(userScoreElement.innerText);
            console.log(`currentScore {currentScore}`)

            // Get earned points
            pointsEarned = calculatePointsWon();

            setTimeout(() => {
                let scoreOdometer = createOdometer(userScoreElement, userScore);
                userScore = userScore + pointsEarned;
                runOdometer(scoreOdometer, userScore);
            }, 1000);

            let pointsDisplayElements = document.getElementById('pointsDisplay');
            pointsDisplayElements.innerText = 0;

            // save user progress
            saveUserProgress();

            generateNewGame();
        });

        pointDescriptionElement.addEventListener('click', function (e) {

            const pointDescriptionExpanded = document.querySelector('.points-expanded');
            pointDescriptionExpanded.classList.toggle('hidden-item');

            // points calculations

        });

        // start game button
        // startGameButton.addEventListener('click', generateNewGame);

        // Add extra rod
        extraRodButton.addEventListener('click', addExtraRod);

        // //m get previous levels and scores
        initializeUserProgress();

        //Run new game
        generateNewGame();
    }

    /**
     * initialize levels and scores
     */
    function initializeUserProgress() {
        let levelValueElement = document.getElementById('level-value');
        let userScoreElement = document.getElementById('scoreValue');

        let userProgress = getUserProgress();
        if (userProgress) {
            userScoreElement.innerText = userProgress.userScore;
            levelValueElement.innerText = userProgress.userLevel;

        } else {
            userScoreElement.innerText = userScore;
            levelValueElement.innerText = userLevel;

            //save to local storage
            saveUserProgress();

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
            console.log(currentNutWrapper);

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
            console.log(`This rod only space for ${availableSpace} nuts`);

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
            // console.log(nutObjectTop);
            // console.log(`neighbourNut: ${nutObjectTop.nextElementSibling}`);

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
        nutObject.classList.add("raise-nut");
        // console.log(`raiseNut: ${anyNut.offsetHeight}`)
        // console.log(anyNut);

    }

    /**
     * Set the transformY value for the raise-nut class.
     * The nut must always be raised slightly above the clicked rod
     */
    function setRaiseNutTransformY(nutObject, rodChildrenCount) {

        const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
        const availableSpace = (maxNutsPerRod - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);
        const raiseValue = -availableSpace - verticalStep;

        console.log(`anyNut.offsetHeight: ${anyNut.offsetHeight}`)

        nutObject.style.setProperty("--transform-y", raiseValue + "px");
    }

    /**
     * Lower nut to the base if it cannot be moved
     */
    function lowerNut(nutObject) {

        if (nutObject) {
            nutObject.classList.remove("raise-nut");
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

                console.log(`Nut number ${index + 1} Moved! - ${(nut.innerText)}`)

                nut.parentElement.addEventListener("animationend", function handler() {

                    nut.parentElement.style.animation = "";
                    nut.style.animation = "";

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
                                gameOverLoss();
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

        if (moveType === 'reverse') {
            runAnimation(sourceRod, targetRod, nutsToMove, rodChildrenCount);
        }

        // Move nut right away if target rod is empty
        if (rodChildrenCount) {

            const targetNut = targetRod.lastElementChild.firstElementChild;

            // 1) Check the destination rod is not the same as origin rod
            if (targetRod === sourceRod) {
                console.log('Cannot move into self; Lowering Nut')
                lowerNut(raisedNut);
                return
            }

            // 2) Check if the target rod has space
            const isSpaceAvailable = rodChildrenCount < maxNutsPerRod;
            if (!isSpaceAvailable) {
                console.log("There's no space in target; Lowering Nut")
                lowerNut(raisedNut);
                return
            }

            // 3) Check if the raised nut and topChild of target rod have same colors
            const targetNutColor = targetNut.getAttribute("data-color");
            const raisedNutColor = raisedNut.getAttribute("data-color");

            const isColorMatch = raisedNutColor === targetNutColor;
            if (!isColorMatch) {
                console.log("Colors don't match; Lowering Nut")
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
            console.log('Take it back');
        }

        console.log(`newMovesValue ${newMovesValue}`);
        movesNumberElement.textContent = userMoves;
        movesBar.style.width = newBarwidth + '%';
    }

    /**
     * Display modal for game loss and give user option to retry or start a new game
     */
    function gameOverLoss() {
        modalLossContainer.style.display = 'flex';
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
            confettiAnimation(leftStartX, startY, Object.values(nutColors), particleSize, angle = 45, spread = spread, startVelocity = startVelocity, ticks = ticks);
            confettiAnimation(rightStartX, startY, nutColors[0], particleSize, angle = 120, spread = spread, startVelocity = startVelocity, ticks = ticks);
        }, 500);

        pointsEarned = calculatePointsWon();
        let pointsDisplayElements = document.getElementById('pointsDisplay');

        setTimeout(() => {
            let pointsOdometer = createOdometer(pointsDisplayElements, 0);
            runOdometer(pointsOdometer, pointsEarned);
        }, 2000);

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

        const movesRemainingBonus = parseInt(movesNumberElement.textContent) * 5;
        const extraRodBonus = extraRodButton.classList.contains('disable') ? 0 : 10;
        console.log(`movesRemainingBonus: ${movesRemainingBonus}`);
        console.log(`extraRodBonus: ${extraRodBonus}`);

        return (maxNutsPerRod * totalRodsToWin * pointsPerRod) + movesRemainingBonus + extraRodBonus;
    }

    /**
     * Check if the rod has been completed by checking the count and colors of the child nuts
     */
    function checkRodCompletion(targetRod) {

        const allNuts = targetRod.querySelectorAll('.nut');
        const rodCapacity = parseInt(targetRod.getAttribute('data-capacity'));

        console.log(allNuts)

        if (allNuts.length === rodCapacity) { //confirm if it has the max nuts possible
            const firstNutColor = allNuts[0].getAttribute('data-color');
            const nutSameColor = Array.from(allNuts).every(nut => nut.getAttribute('data-color') === firstNutColor);

            if (nutSameColor) {

                targetRod.removeEventListener("click", rodClick);

                const targetRodRect = targetRod.getBoundingClientRect();
                // calcluate relative positon of the rod - center / convert ro ratio
                const startX = (targetRodRect.left + targetRodRect.width / 2) / window.innerWidth;
                const startY = (targetRodRect.top - 10) / window.innerHeight;
                const nutColorHex = [nutColors[firstNutColor]];

                confettiAnimation(startX, startY, [nutColorHex], 0.5);

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
            gameOverWin();
            console.log("You've done! Well done :-)");
        } else {
            gameWon = false;
            console.log("Not there yet")
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
        console.log(`nutsColorArray ${nutsColorArray.length}`);
        console.log(nutsColorArray);

        // Shuffle colors
        for (let i = nutsColorArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = nutsColorArray[i];
            nutsColorArray[i] = nutsColorArray[j];
            nutsColorArray[j] = temp;
        }

        // separate shuffled colors into rod containers
        let containers = [];

        // for (let i = 0; i < maxNutsPerRod - 1; i++) {
        // for (let i = 0; i < gameMode.rodCapacity - 1; i++) {
        for (let i = 0; i < Object.keys(gameMode.nutColors).length; i++) {

            containers.push({
                name: "rod" + (i + 1),
                nuts: nutsColorArray.slice(i * gameMode.rodCapacity, (i * gameMode.rodCapacity) + gameMode.rodCapacity)
                // nuts: nutsColorArray.slice(i * maxNutsPerRod, (i * maxNutsPerRod) + maxNutsPerRod)
            });
        }
        return containers;
    }

    /**
     * Place shuffled nuts into rod containers
     */
    function addNutsToRods() {

        //clear current nuts 
        clearNuts();
        gameInitialState.gameRodContainers.forEach((rodItem, rodIndex) => {

            let currentRod = document.getElementById(rodItem.name);
            gameInitialState.nutsAndWrappers[rodIndex].forEach((wrapper, wrapperIndex) => {
                currentRod.appendChild(wrapper.wrapper);
            });
        });

    }

    /** 
     * Create nut elements based on color arrays including the wrapper
     */
    function createNutsAndWrappers(nutsArray) {

        let nutsAndWrappers = [];
        //Loop throught nuts arayy
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

        //generate game Layout
        generateGameLayout();

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
        console.log("anyNut has been reset")

    }

    /**
     * Generate and place containers and rods into game area
     */
    function generateGameLayout() {
        const gameArea = document.querySelector('.game-area');
        console.log("gameArea");
        console.log(gameArea);


        //Loop to create containers
        // tumelo

        gameModeObject
        // const totalRods = gameMode.containers * gameMode.rodsInContainers;
        const totalRods = gameMode.rodsInContainers.reduce((a, b) => a + b, 0);

        let rodNumber = 0;
        for (let i = 0; i < gameMode.containers; i++) {

            let containerElement = document.createElement("div");
            containerElement.setAttribute("class", 'rod-container');

            // console.log(containerElement);
            // console.log(`Container: ${i} created!`);
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
            console.log(containerElement);

            //append each container to game-area div
            gameArea.appendChild(containerElement);


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
    function clearNuts() {
        let allRods = document.querySelectorAll('.rod');
        console.log("allRods:");
        console.log(allRods);

        // Reset moves/ bar
        movesNumberElement.textContent = maximumMoves;
        movesBar.style = "";

        //reset ompleted rods
        completedRods = 0;




        for (let rod of allRods) {
            //Remove .complete if any
            let rodLid = rod.querySelector('.rod-lid');
            rodLid.classList.remove('complete');
            rod.addEventListener("click", rodClick);

            let nutWrappers = rod.querySelectorAll('.nut-wrap');
            for (let nutWrapper of nutWrappers) {
                rod.removeChild(nutWrapper);
            }
        }
    }

    /**
     * Save user level and score to localStorage
     */
    function saveUserProgress() {

        setTimeout(() => {

            let levelValueElement = document.getElementById('level-value');
            // let userScoreElement = document.getElementById('scoreValue');

            let userProgress = {
                userLevel: levelValueElement.textContent,
                userScore: userScore,
            };
            // console.log(userProgress);
            // console.log(`This is my score: ${userScore}`);
            // console.log(userScore);

            // let userProgressStringified = JSON.stringify(userProgress);
            // console.log(userProgressStringified);

            localStorage.setItem("userProgress", JSON.stringify(userProgress));

            console.log("Your progress is saved!!");
        }, 3000);

    }

    /**
     * Retrieve 'userProgress' if available on localStorage
     */
    function getUserProgress() {

        //check if there's anything there
        if (localStorage) {
            console.log("There's something there");
            let userProgress = localStorage.getItem('userProgress');
            console.log(userProgress);

            return JSON.parse(userProgress);

        } else {
            console.log("Its empty! nothing saved")
            return null
        }

    }
})