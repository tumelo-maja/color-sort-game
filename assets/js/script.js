// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    // let lowerButton = document.getElementById('test');
    // lowerButton.addEventListener('click', lowerNut);

    // end of variables

    // Global variables.
    const maxNutsPerRod = 4;
    const verticalStep =25;
    const horizontalStep =42;


    // Get CSS style object for nut element - calculate height of each nut
    const anyNut = document.querySelectorAll('.nut')[0];
    const nutStyle = window.getComputedStyle(anyNut);

    const playInstructionElement = document.querySelector('.play-instructions');
    console.log(playInstructionElement);

    if (playInstructionElement) {
        playInstructionElement.addEventListener('click', toggleHiddenItem);
    }

    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")

        const rods = document.querySelectorAll(".rod");
        for (let rod of rods) {
            rod.addEventListener('click', rodClick);
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
     * hand clicks on the rod element.
     * when clicked, a 'raised' nut is moved to it. 
     * If the move is not allowed, the raised nut is lowered
     */
    function rodClick(e) {
        // handle click to move raised nut or lower raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const rodElement = e.currentTarget;
        // const nutObjectTop = e.target.lastElementChild.firstElementChild;
        const nutObjectTop = rodElement.lastElementChild.firstElementChild;
        let rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;

        // console.log(e.target);
        // console.log(rodChildrenCount);
        // console.log(raisedNut);

        if (raisedNut) {
            // if (rodChildrenCount === 0) {
            //     // moveNut(raisedNut, 'rod');
            //     console.log("Rod empty, lets move nuts");
            // } else {
            //     console.log('Not allowed, lowering the nut')
            //     lowerNut(raisedNut);
            // }

            let currentNut = raisedNut;

            let currentNutWrapper = currentNut.parentElement;
            let sourceRod = currentNutWrapper.parentElement;
            // let currentNutWrapper = currentNut.parentElement;
            console.log(currentNutWrapper);

            const allNuts = sourceRod.querySelectorAll('.nut-wrap');
            console.log(allNuts)


            // Check if colors of neext match the nut to move - append to nutsToMove.
            let neighbourNutWrapper = currentNutWrapper.previousElementSibling;
            // let neighbourNutWrapper = raisedNutWrapper.nextElementSibling;

            let neighbourNutColor = neighbourNutWrapper.firstElementChild.getAttribute("data-color"); //colro of sibling 
            let currentNutColor = currentNut.getAttribute("data-color");
            // console.log("Before While: ......")
            // console.log(`neighbourNutColor: ${neighbourNutColor}`);
            // console.log(`currentNutColor: ${currentNutColor}`);


            let nutWrappersToMove = [currentNutWrapper];
            // let nutsToMove = [currentNut];

            // console.log(`neighbourNutColor: ${neighbourNutColor}`);
            // console.log(`currentNutColor: ${currentNutColor}`);
            // while (currentNutColor === neighbourNutColor) {



            //     //upoadte current and neighbour colors
            //     currentNut = neighbourNutWrapper.firstElementChild;

            //     // nut wrappers
            //     currentNutWrapper = neighbourNutWrapper;
            //     neighbourNutWrapper = currentNutWrapper.previousElementSibling;


            //     neighbourNutColor = neighbourNutWrapper.firstElementChild.getAttribute("data-color");
            //     currentNutColor = currentNut.getAttribute("data-color");
            //     console.log(`neighbourNutColor: ${neighbourNutColor}`);
            //     console.log(`currentNutColor: ${currentNutColor}`);


            //     currentNut = currentNut.previousElementSibling;

            //     console.log(currentNut);
            //     // raiseNut(currentNut, rodChildrenCount);
            //     // moveNut(rodElement ,currentNut , rodChildrenCount);

            //     //appemd wrapper to array
            //     nutWrappersToMove.unshift(neighbourNutWrapper);
            //     nutsToMove.unshift(currentNut);

            // }

            let nutsToMove = [];


            for (let wrapper of allNuts) {
                // nutsToMove
                nutsToMove.unshift(wrapper.firstElementChild);
                // nutsToMove.push(wrapper.firstElementChild);

            }

            nutsToMove = nutsToMove.slice(0, 5);


            moveNut(rodElement, currentNut, nutsToMove, rodChildrenCount);



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
        // const availableSpace = (maxNutsPerRod - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);
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
     * Calculate nut movement in horizontal and vertical steps
     */
    function calculateNutMovement(targetRodColumn, targetRodRow, sourceRodColumn, sourceRodRow) {

        console.log('Lets try another ways');

        // Calc setps from spource to target
        const stepsColumn = sourceRodColumn - targetRodColumn;
        const stepsRow = sourceRodRow - targetRodRow;
      
        // const verticalStep =25;
        // const horizontalStep =42;
    
        const nutTransformValues = {
            xValue: stepsRow * horizontalStep, 
            yValue: stepsColumn * verticalStep,
        };

        return nutTransformValues;
      }

    /**
     * Calculate the 'lid' position - entry/exit points for all nuts
     */
    function calculateLidCenter(targetRod, sourceRod, nutObject) {

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        const nutStartPosition = calculateNutStartPosition(nutObject);
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod, nutObject);

        // output 
        const lidCenterPosition = {
            xValue: rodXDifference, // - (offsetPosition.xValue/2) ,
            yValue: (Math.floor(rodYDifference) - Math.abs(nutStartPosition.yValue - offsetPosition.yValue) - (anyNut.offsetHeight * 2))
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

        const nutSize = anyNut.offsetHeight ;//+ parseFloat(nutStyle.marginBottom);
        // let currentBarwidth = (getCssStyleValue(movesBar, 'width')
        // tumelo

        // anyNut is global to avoud redefining 
        const nutFinalPosition = {
            xValue: rodXDifference,
            yValue: rodYDifference //+((targetChildrenCount ) * parseFloat(nutStyle.height)/2) -parseFloat(nutStyle.height),
            // yValue: (targetRod.offsetHeight -((targetChildrenCount ) * nutSize)) + rodYDifference,
            // yValue: ((maxNutsPerRod * anyNut.offsetHeight) - ((targetChildrenCount +1) * anyNut.offsetHeight)) + rodYDifference -2,
            // yValue: (((targetChildrenCount + 1) * anyNut.offsetHeight)) - anyNut.offsetHeight + rodYDifference,       
        }

        console.log(`nutStyle.marginBottom: ${nutStyle.marginBottom}`);
        console.log(`anyNut.offsetHeight: ${anyNut.offsetHeight}`);
        console.log(`nutStyle.height: ${nutStyle.height}`);

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

        const sourceRow = sourceRod.getAttribute("data-row");
        const targetRow = targetRod.getAttribute("data-row");

        const transY = nut.style.getPropertyValue('--transform-y');

 
      
        // const verticalStep =25;
        // const horizontalStep =42;
        console.log(`verticalStep: ${verticalStep}`);
    
        const offsetPosition = {
            xValue: targetRow >=  sourceRow ? horizontalStep : -horizontalStep, 
            yValue: parseFloat(transY)-verticalStep,
        };


        // let offsetPosition = calculateNutMovement(targetColumn, targetRow, sourceColumn, sourceRow);

        // if (sourceColumn > targetColumn) {
        //     offsetPosition = {
        //         xValue: nutStartPosition.yValue + animationOffsetX,
        //         yValue: nutStartPosition.yValue + animationOffsetY
        //     };
        // } else {
        //     offsetPosition = {
        //         xValue: -(nutStartPosition.yValue + animationOffsetX),
        //         yValue: nutStartPosition.yValue + animationOffsetY
        //     };
        // }

        return offsetPosition;

    }

    /**
     * Calculate and set the CSS values for the animation motion of the nut
     * @param {The parent rod of the raised nut} sourceRod 
     * @param {The final rod for the nut} targetRod 
     */
    function setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount) {

        let tranformIncreaseValue = 0;
        let sourceChildrenCount = sourceRod.querySelectorAll('.nut-wrap').length;
        const heighExistingChildren = (targetChildrenCount*(parseFloat(nutStyle.height)+parseFloat(nutStyle.marginBottom)));

        // nutsToMove = nutsToMove.slice(0, 3);

        for (let nut of nutsToMove) {

            // height offset
            let heightOffset = parseFloat(nutStyle.height) -heighExistingChildren;
            console.log(`Target children: ${targetChildrenCount}`);

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

            // tranformIncreaseValue = tranformIncreaseValue +26;

            console.log(`tranformIncreaseValue: ${tranformIncreaseValue}`);



            // const transY = nut.getAttribute("--transform-y");
            const transY = nut.style.getPropertyValue('--transform-y');

            console.log(`target-position-y: ${nut.style.getPropertyValue('--target-position-y')}`);


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

                // wrapper.firstElementChild.classList.add(animationName); // nutWrapper
                // wrapper.classList.add(animationName); // nut element
                // sourceChildrenCount--;
                // nut.parentElement.appendChild(nut);
                // targetRod.appendChild(nut.parentElement);

                // nut.parentElement.addEventListener("animationend", function handler() {

                //     nut.parentElement.style.animation = "";
                //     nut.style.animation = "";


                //     nut.parentElement.appendChild(nut);
                //     targetRod.appendChild(nut.parentElement);

                //     nut.classList.remove(animationName, "raise-nut");
                //     nut.parentElement.classList.remove(animationName);

                //     nut.parentElement.removeEventListener("animationend", handler);
                // });


            }, index * 500); // Delay increases by 500ms per item
        });

    }
    // }

    /** Test
     * All ball movements
     */
    function moveWrapper(wrapper, destination, delay) {
        setTimeout(() => {
            // Get the wrapper's current viewport position.
            const wrapperRect = wrapper.getBoundingClientRect();
            // Remove the wrapper from its container and append it to the body.
            document.body.appendChild(wrapper);
            // Set fixed positioning so it animates above all containers.
            wrapper.style.position = 'fixed';
            wrapper.style.left = wrapperRect.left + 'px';
            wrapper.style.top = wrapperRect.top + 'px';

            // Get destination container's bounding rectangle.
            const destRect = destination.getBoundingClientRect();
            // Calculate horizontal center for the destination.
            const targetX = destRect.left + (destRect.width - wrapperRect.width) / 2;
            // Define two target Y positions:
            // topEntryY: at the top edge of the destination container.
            // finalY: at the bottom edge of the destination container (minus the wrapper's height).
            const topEntryY = destRect.top;
            const finalY = destRect.top + destRect.height - wrapperRect.height;

            // Calculate translation deltas.
            const deltaX = targetX - wrapperRect.left;
            // For vertical movement, we calculate two separate deltas:
            const deltaYTop = topEntryY - wrapperRect.top;
            const deltaYFinal = finalY - wrapperRect.top;

            // Set custom properties for the keyframes.
            wrapper.style.setProperty('--deltaX-top', deltaX + 'px');   // Horizontal movement remains constant.
            wrapper.style.setProperty('--deltaY-top', deltaYTop + 'px');
            wrapper.style.setProperty('--deltaX-final', deltaX + 'px');
            wrapper.style.setProperty('--deltaY-final', deltaYFinal + 'px');

            // Start the animation (duration set to 2 seconds).
            wrapper.style.animation = 'moveBallFall 2s ease forwards';

            wrapper.addEventListener("animationend", function handler() {
                // Clear inline animation and positioning styles.
                wrapper.style.animation = "";
                wrapper.style.transform = "";
                wrapper.style.position = "";
                wrapper.style.left = "";
                wrapper.style.top = "";
                // Reparent the wrapper into the destination container using prepend so the newest is at the top.
                destination.prepend(wrapper);
                wrapper.removeEventListener("animationend", handler);
            });
        }, delay);
    }



    /**
     * Move raised nut to another rod
     */
    function moveNut(targetRod, raisedNut, nutsToMove, rodChildrenCount) {
        // Get raised nut
        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;

        // Move nut right away if target rod is empty
        if (rodChildrenCount) {

            const targetNut = targetRod.lastElementChild.firstElementChild;
            // const nutObjectTop = rodElement.lastElementChild;
            // void targetNut.offsetWidth;

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
    }

    /**
     * Update number of moves remaining 
     */
    function updateMovesRemaining() {
        const movesNumber = document.getElementById('move-value');
        const gameMoves = document.getElementById('game-moves');
        const movesBar = document.querySelector('.move-fill');

        const maximumMoves = 20;
        let widthIncrements = Math.round(100 / maximumMoves, 2);


        console.log("Moves must update!");

        let currentBarwidth = (getCssStyleValue(movesBar, 'width') / getCssStyleValue(gameMoves, 'width')) * 100;
        let newBarwidth = currentBarwidth - widthIncrements;
        console.log(`Current width is ${currentBarwidth}`);
        console.log(`New width is ${newBarwidth}`);

        let currentMovesValue = parseInt(movesNumber.innerText);
        let newMovesValue = currentMovesValue - 1;
        console.log(`Current move is ${currentMovesValue}`);
        console.log(`New move is ${newMovesValue}`);
        movesNumber.textContent = newMovesValue;
        movesBar.style.width = newBarwidth + '%';
    }

})