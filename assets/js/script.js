// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Global variables.
    const maxNutsPerRod = 4;
    const verticalStep = 25;
    const horizontalStep = 42;

    let maximumMoves = 10;
    const widthIncrements = Math.round(100 / maximumMoves, 2);

    let completedRods = 0; // initialize as 0
    const totalRodsToWin = 3; // Rods completed to win
    const pointsPerRod = 10; //point factor for each completed rod


    const nutColors = {
        'orange': '#f25029',
        'yellow': '#f9b723',
        'blue': '#26a1ee',
        'whitesilver': '#c2b3d4',
    }

    let lastMoveHistory = {}; // use object to store last move inputs to moveNuts

    // Get CSS style object for nut element - calculate height of each nut
    const anyNut = document.querySelectorAll('.nut')[0];
    const nutStyle = window.getComputedStyle(anyNut);

    // handle modal elements - Game Loss
    const gameRetryButton = document.getElementById("game-retry");
    const gameNewButton = document.getElementById("modal-new-game");
    const gameQuitButton = document.getElementById("game-quit");
    const modalLossContainer = document.getElementById("gameOverLossModal");

    // handle modal elements - Game Win
    const continueButton = document.getElementById("modal-continue-game");
    const modalWinContainer = document.getElementById("gameOverWinModal");

    //Undo move button
    const undoMoveButton = document.getElementById("undo-move");


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
        gameRetryButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            location.reload();
            console.log("I'm not giving up!");
        });

        gameNewButton.addEventListener('click', function () {
            modalLossContainer.style.display = 'none';
            console.log("Time for new game");
        });

        gameQuitButton.addEventListener('click', function () {
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
            }, 500); // Delay increases by 500ms per item
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
            // let neighbourNutWrapper = raisedNutWrapper.nextElementSibling;
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

                //appemd wrapper to array
                nutWrappersToMove.unshift(neighbourNutWrapper);
                nutsToMove.unshift(neighbourNutWrapper.firstElementChild);

                //upoadte current and neighbour colors
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
            // Shouldn't undo - completed rod

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
    }

    /**
     * Set the transformY value for the raise-nut class.
     * The nut must always be raised slightly above the clicked rod
     */
    function setRaiseNutTransformY(nutObject, rodChildrenCount) {

        const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
        const availableSpace = (maxNutsPerRod - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);

        const raiseValue = -availableSpace - verticalStep;


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
     * This will be the final position before 'appendChild' is appled 
     */
    function calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount) {

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        const nutSize = anyNut.offsetHeight;
        // let currentBarwidth = (getCssStyleValue(movesBar, 'width')

        // anyNut is global to avoud redefining 
        const nutFinalPosition = {
            xValue: rodXDifference,
            yValue: rodYDifference
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

        // nutsToMove = nutsToMove.slice(0, 3);

        for (let nut of nutsToMove) {

            // height offset
            let heightOffset = parseFloat(nutStyle.height) - heighExistingChildren;
            // console.log(`Target children: ${targetChildrenCount}`);

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

        // // Add animation class
        const animationName = "success-move";

        // Allwrappers.forEach((wrapper, index) => {
        nutsToMove.forEach((nut, index) => {
            setTimeout(() => {

                //   nut.classList.add('animate');
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
            }, index * 100); // Delay increases by 500ms per item
        });
    }
    // }

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
            const targetNutColor = targetNut.getAttribute("data-color"); //last child color (target)
            const raisedNutColor = raisedNut.getAttribute("data-color"); //raised nut color

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

        // const targetRodRect = targetRod.getBoundingClientRect();
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
        }, 2000); // Delay increases by 500ms per item

        
        // });

    }

    /**
     * Increase the level after win
     */
    function gameLevelUp() {
        // level-value"
        const levelValueElement = document.getElementById('level-value');
        let levelValue = parseInt(levelValueElement.innerText);
        ++levelValue;

        // update level value
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
                // remov event listener for completed rods
                targetRod.removeEventListener("click", rodClick);

                const targetRodRect = targetRod.getBoundingClientRect();
                // calcluate relative positon of the rod - center / convert ro ratio
                const startX = (targetRodRect.left + targetRodRect.width / 2) / window.innerWidth;
                const startY = (targetRodRect.top - 10) / window.innerHeight;

                const nutColorHex = [nutColors[firstNutColor]];

                confettiAnimation(startX, startY, [nutColorHex], 0.5);

                undoMoveButton.classList.add('disable');

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
    function generateNewGame() {

        // repeate colors in an array
        Array(3).fill(['a','b','c']).flat() 

        // Shuffle colors
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // separate shuffled array into rod containers
        const rodContainers = [];
        for (let i = 0; i < 3; i++) {

            rodContainers.push({
            name: "rod" + (i + 1),
            nuts: nuts.slice(i * 4, i * 4 + 4)
            });
        }

        return { containers: containers };

      

    }

})