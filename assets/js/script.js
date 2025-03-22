// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Global variables.
    const maxNutsPerRod = 4;
    const verticalStep = 25;
    const horizontalStep = 42

    let maximumMoves = 10;
    const widthIncrements = Math.round(100 / maximumMoves, 2);

    let completedRods = 0; // initialize as 0
    const totalRodsToWin = 3; // Rods completed to win
    const pointsPerRod = 10; //point factor for each completed rod
    let gameInitialState = {}; // Var to store game state

    const nutColors = {
        // 'orange': '#f25029',
        'yellow': '#f9b723',
        'blue': '#26a1ee',
        'whitesilver': '#c2b3d4',
    }

    let lastMoveHistory = {}; // use object to store last move inputs to moveNuts

    // Intialize Get CSS style object for nut element 
    let anyNut = null;
    let nutStyle = null;

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

    // Run game to load default game setup with level=1 and score=0
    runGame();

    /**
     * Odometer object to create number counter animations
     */
    function runOdometer(object, startValue, finalValue) {
        const odometer = new Odometer({
            el: object,
            value: startValue,
            duration: 5000,
        });

        odometer.update(finalValue);
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

        let movesNumber = document.getElementById('move-value');
        console.log(movesNumber);
        movesNumber.textContent = maximumMoves;

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
            console.log("Time for new game");
        });

        modalQuitGameButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            console.log("That's it I'm done");
        })

        // undo move button listener
        undoMoveButton.addEventListener('click', undoLastMove);

        // Win button -continue
        continueButton.addEventListener('click', function () {

            modalWinContainer.style.display = 'none';
            gameLevelUp(); // Progress user level up

            // Get current Score
            const userScoreElement = document.getElementById('scoreValue');
            const currentScore = parseInt(userScoreElement.textContent);

            // Get earned points
            let pointsEarned = calculatePointsWon();
            let newScore = currentScore + pointsEarned;

            setTimeout(() => {
                runOdometer(userScoreElement, currentScore, newScore);
            }, 500);
        })
    }

    /**
     * Function to display/hide items
     */
    function toggleHiddenItem() {
        const targetElement = document.querySelector('.game-instructions');
        targetElement.classList.toggle('hidden-item');
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

            while (currentNutColor === neighbourNutColor) {

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
            console.log(nutObjectTop);
            console.log(`neighbourNut: ${nutObjectTop.nextElementSibling}`);

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
        console.log(`raiseNut: ${anyNut.offsetHeight}`)
        console.log(anyNut);

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

                    // check the rod completion
                    checkRodCompletion(targetRod);

                    //check game completion
                    let isGameComplete = checkGameCompletion();

                    if (!isGameComplete) {
                        const movesNumber = parseInt(document.getElementById('move-value').innerText);
                        if (movesNumber === 0) {
                            gameOverLoss();
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
        const movesNumber = document.getElementById('move-value');
        const gameMoves = document.getElementById('game-moves');
        const movesBar = document.querySelector('.move-fill');


        let currentBarwidth = (getCssStyleValue(movesBar, 'width') / getCssStyleValue(gameMoves, 'width')) * 100;
        let currentMovesValue = parseInt(movesNumber.innerText);

        let newBarwidth = 0;
        let newMovesValue = 0;

        if (moveType === 'forward') {
            newBarwidth = currentBarwidth - widthIncrements;
            newMovesValue = currentMovesValue - 1;
        } else {
            newBarwidth = currentBarwidth + widthIncrements;
            newMovesValue = currentMovesValue + 1;
            console.log('Take it back');
        }

        movesNumber.textContent = newMovesValue;
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

        let pointsEarned = calculatePointsWon();
        const pointsDisplayElements = document.getElementById('pointsDisplay');

        setTimeout(() => {
            runOdometer(pointsDisplayElements, 0, pointsEarned);
        }, 2000);

    }

    /**
     * Increase the level after win
     */
    function gameLevelUp() {
        // level-value"
        const levelValueElement = document.getElementById('level-value');
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

        let pointsEarned = maxNutsPerRod * totalRodsToWin * pointsPerRod;
        return pointsEarned;
    }

    /**
     * Check if the rod has been completed by checking the count and colors of the child nuts
     */
    function checkRodCompletion(targetRod) {

        const allNuts = targetRod.querySelectorAll('.nut');
        console.log(allNuts)

        if (allNuts.length === maxNutsPerRod) { //confirm if it has the max nuts possible
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
        let nutsColorArray = Array(maxNutsPerRod).fill(Object.keys(nutColors)).flat();

        // Shuffle colors
        for (let i = nutsColorArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = nutsColorArray[i];
            nutsColorArray[i] = nutsColorArray[j];
            nutsColorArray[j] = temp;
        }

        // separate shuffled colors into rod containers
        let rodContainers = [];
        for (let i = 0; i < maxNutsPerRod - 1; i++) {

            rodContainers.push({
                name: "rod" + (i + 1),
                nuts: nutsColorArray.slice(i * maxNutsPerRod, (i * maxNutsPerRod) + maxNutsPerRod)
            });
        }
        return rodContainers;
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
        if (anyNut === null || nutStyle === null) {
            anyNut = document.querySelectorAll('.nut')[0];
            nutStyle = window.getComputedStyle(anyNut);
            console.log("anyNut has been reset")
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
})