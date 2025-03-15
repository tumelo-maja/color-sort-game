// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    // let lowerButton = document.getElementById('test');
    // lowerButton.addEventListener('click', lowerNut);

    // end of variables

    // Global variables.
    const maxNutsPerRod = 8;

    // Get CSS style object for nut element - calculate height of each nut
    const anyNut = document.querySelectorAll('.nut')[0];
    const nutStyle = window.getComputedStyle(anyNut);


    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")

        // const nuts = document.querySelectorAll(".nut");
        // for (let nut of nuts) {
        //     nut.addEventListener('click', nutClick);
        // }

        const rods = document.querySelectorAll(".rod");
        for (let rod of rods) {
            rod.addEventListener('click', rodClick);
        }


    }

    /**
     * hand clicks on the nut element.
     * Depending on the status of other nuts, the click nut can be 'raised'
     * or it become the child element of the target rod and 'raised' nut moves above it
     */
    function nutClick(e) {
        // handle click to raise and click to move
        const isNutRaised = document.querySelector(".raise-nut");

        const nutObject = e.target;

        if (isNutRaised) {
            moveNut(nutObject);
        } else {
            raiseNut(nutObject);
        }
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
        const rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;

        console.log(e.target);
        console.log(rodChildrenCount);
        console.log(raisedNut);

        if (raisedNut) {
            // if (rodChildrenCount === 0) {
            //     // moveNut(raisedNut, 'rod');
            //     console.log("Rod empty, lets move nuts");
            // } else {
            //     console.log('Not allowed, lowering the nut')
            //     lowerNut(raisedNut);
            // }
            moveNut(rodElement, rodChildrenCount);

        } else {
            if (rodChildrenCount) {
                raiseNut(nutObjectTop);
            }
        }

    }

    /**
     * Raise the top nut &wrapper  above the rod when clicked
     */
    function raiseNut(nutObject) {
        // let selectedNut = nutObject;
        // let currentNutWrap = selectedNut.parentElement;
        // let targetRod = currentNutWrap.parentElement;

        // // only raise the top nut
        // if (targetRod.lastElementChild === currentNutWrap) {
        //     selectedNut.classList.add("raise-nut");
        // }
        nutObject.classList.add("raise-nut");
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
    function calculateLidCenter(targetRod, sourceRod) {

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        const nutStartPosition = calculateNutStartPosition(sourceRod);
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod);

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

        // anyNut is global to avoud redefining 
        const nutFinalPosition = {
            xValue: rodXDifference,
            yValue: (maxNutsPerRod * anyNut.offsetHeight - ((targetChildrenCount + 1) * anyNut.offsetHeight)) - anyNut.offsetHeight + rodYDifference,
        }

        console.log(`targetChildrenCount: ${targetChildrenCount}`);
        return nutFinalPosition;

    }

    /**
     * Calculate the position of the nut at the start of the move animation.
     * The position after being 'raised' 
     */
    function calculateNutStartPosition() {
        const nutStartPosition = {
            xValue: 0,
            yValue: -45,
        }
        return nutStartPosition;
    }

    /**
     * Calculate the mid-point position of the source and target rods for the animation.
     * The value is used at
     */
    function calculateNutMidOffset(sourceRod, targetRod) {

        const nutStartPosition = calculateNutStartPosition(sourceRod);
        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        let offsetPosition = {};

        const animationOffsetX = 25;
        const animationOffsetY = -10;

        if (sourceRodRect.left > targetRodRect.left) {
            offsetPosition = {
                xValue: nutStartPosition.yValue + animationOffsetX,
                yValue: nutStartPosition.yValue + animationOffsetY
            };

        } else {
            offsetPosition = {
                xValue: -(nutStartPosition.yValue + animationOffsetX),
                yValue: nutStartPosition.yValue + animationOffsetY
            };

        }

        return offsetPosition;

    }

    /**
     * Calculate and set the CSS values for the animation motion of the nut
     * @param {The parent rod of the raised nut} sourceRod 
     * @param {The final rod for the nut} targetRod 
     */
    function setPositionalValues(sourceRod, targetRod, targetChildrenCount) {

        const raisedNutWrapper = sourceRod.lastElementChild;
        const raisedNut = raisedNutWrapper.firstElementChild;

        // --- Calculate final position of nut movement --- //
        const nutFinalPosition = calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount);

        // --- Calculate center of lid element --- //
        const lidCenterPosition = calculateLidCenter(targetRod, sourceRod);

        // --- Calculate start position for animation --- //
        const nutStartPosition = calculateNutStartPosition(sourceRod);

        // --- Calculate mid-way position through animation --- //
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod);

        // console.log(`Start (X): ${nutStartPosition.xValue} (Y): ${nutStartPosition.yValue}`)
        // console.log(`Max (X): ${offsetPosition.xValue} (Y): ${offsetPosition.yValue}`)
        // console.log(`Lid (X): ${lidCenterPosition.xValue} (Y): ${lidCenterPosition.yValue}`)
        // console.log(`Target (X): ${nutFinalPosition.xValue} (Y): ${nutFinalPosition.yValue}`)

        // --- Set CSS variables for the keyframe animations --- //
        raisedNut.style.setProperty("--raise-start-x", nutStartPosition.xValue + "px");
        raisedNut.style.setProperty("--raise-start-y", nutStartPosition.yValue + "px");
        raisedNut.style.setProperty("--raise-max-x", offsetPosition.xValue + "px");
        raisedNut.style.setProperty("--raise-max-y", offsetPosition.yValue + "px");
        raisedNut.style.setProperty('--lid-position-y', lidCenterPosition.yValue + 'px');
        raisedNut.style.setProperty('--lid-position-x', lidCenterPosition.xValue + 'px');
        raisedNut.style.setProperty("--target-position-x", nutFinalPosition.xValue + "px");
        raisedNut.style.setProperty("--target-position-y", nutFinalPosition.yValue + "px");

    }

    /**
     * Run the animation for the input move
     * Specify the animation class name
     */
    function runAnimation(sourceRod, targetRod, targetChildrenCount) {

        setPositionalValues(sourceRod, targetRod, targetChildrenCount); // Set the transform positions for the animation motion

        const raisedNutWrapper = sourceRod.lastElementChild;
        const raisedNut = raisedNutWrapper.firstElementChild;

        // Add animation class
        const animationName = "success-move";
        raisedNutWrapper.classList.add(animationName); // nutWrapper
        raisedNut.classList.add(animationName); // nut element

        raisedNutWrapper.addEventListener('animationend', () => {

            raisedNutWrapper.appendChild(raisedNut);
            targetRod.appendChild(raisedNutWrapper);

            raisedNut.classList.remove(animationName, "raise-nut");
            raisedNutWrapper.classList.remove(animationName);
        });

    }


    /**
     * Move raised nut to another rod
     */
    function moveNut(targetRod, rodChildrenCount) {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;

        console.log("This is the raisedNut nut:")
        console.log(raisedNut);

        // Move nut right away if target rod is empty
        if (rodChildrenCount) {
            // const targetNut = nutObject;
            // const targetRod = targetNut.parentElement.parentElement;

            const targetNut = targetRod.lastElementChild.firstElementChild;
            // const nutObjectTop = rodElement.lastElementChild;

            console.log("This is the target nut:")
            console.log(targetNut);

            // 1) Check the destination rod is not the same as origin rod
            if (targetRod === sourceRod) {
                console.log('Cannot move into self; Lowering Nut')
                lowerNut(raisedNut);
                return
            }

            // 2) Check if the target rod has space
            // const targetChildrenCount = targetRod.querySelectorAll('.nut-wrap').length; // get number of existing nuts
            const isSpaceAvailable = rodChildrenCount < maxNutsPerRod;
            if (!isSpaceAvailable) {
                console.log("There's no space in target; Lowering Nut")
                lowerNut(raisedNut);
                return
            }

            // 3) Check if the raised nut and topChild of target rod have same colors
            const targetNutColor = targetNut.getAttribute("data-color"); //last child color (target)
            const raisedNutColor = raisedNut.getAttribute("data-color"); //raised nut color

            console.log(`targetNutColor: ${targetNutColor}`);
            console.log(`raisedNutColor: ${raisedNutColor}`);

            const isColorMatch = raisedNutColor === targetNutColor;
            if (!isColorMatch) {
                console.log("Colors don't match; Lowering Nut")
                lowerNut(raisedNut);
                return
            }

            runAnimation(sourceRod, targetRod, rodChildrenCount);

        } else {
            runAnimation(sourceRod, targetRod, rodChildrenCount);
        }



        // initiate the move
        // runAnimation(sourceRod, targetRod, targetChildrenCount);

    }

})