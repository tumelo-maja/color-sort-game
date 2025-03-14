// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    // let lowerButton = document.getElementById('test');
    // lowerButton.addEventListener('click', lowerNut);

    // let moveButton = document.getElementById('rod4');
    // moveButton.addEventListener('click', moveNut);

    // const testNut = document.getElementById("testNut");
    // console.log(testNut);
    // testNut.addEventListener('click', testKeyframes);
    // nut.addEventListener('click', nutClick);


    // Set values passed in keyframes (positions) * should be in separate function

    const rootSelector = document.querySelector(':root');


    // end of variables

    // Global variables.
    const maxNutsPerRod = 8;
    // const animationOffsetX = 0;
    // const animationOffsetY = -45; //px

    // Get CSS style object for nut element - calculate height of each nut
    const anyNut = document.querySelectorAll('.nut')[0];
    const anyNutWrapper = document.querySelectorAll('.nut-wrap')[0];
    const nutStyle = window.getComputedStyle(anyNut);
    const nutSize = parseFloat(nutStyle.height) + parseFloat(nutStyle.marginBottom);



    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")

        const nuts = document.querySelectorAll(".nut");
        for (let nut of nuts) {
            nut.addEventListener('click', nutClick);
        }

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
        // let nutObject =null;

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
        const rodChildrenCount = e.target.querySelectorAll('.nut-wrap').length;

        if (raisedNut) {
            if (rodChildrenCount === 0) {
                // moveNut(raisedNut, 'rod');
                console.log("Rod empty, lets move nuts");
            } else {
                console.log('Not allowed, lowering the nut')
                lowerNut(raisedNut);
            }
        }

    }

    /**
     * Raise the top nut &wrapper  above the rod when clicked
     */
    function raiseNut(nutObject) {
        let selectedNut = nutObject;
        let currentNutWrap = selectedNut.parentElement;
        let targetRod = currentNutWrap.parentElement;

        // only raise the top nut
        if (targetRod.lastElementChild === currentNutWrap) {
            selectedNut.classList.add("raise-nut");
        }
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

        const sourceLidElement = sourceRod.querySelector('.rod-lid');
        const targetLidElement = targetRod.querySelector('.rod-lid');

        // const targetLidElementRect = targetLidElement.getBoundingClientRect();
        // const sourceLidElementRect = sourceLidElement.getBoundingClientRect();

        // rodYDifference = targetLidElementRect.top - sourceLidElementRect.top;
        // rodXDifference = targetLidElementRect.left - sourceLidElementRect.left;

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        console.log(`rodYDifference: ${Math.floor(rodYDifference )}`);
        console.log(`rodXDifference: ${rodXDifference}`);

        const nutStartPosition = calculateNutStartPosition(sourceRod);
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod);

        // output 
        const lidCenterPosition = {
            xValue: rodXDifference, // - (offsetPosition.xValue/2) ,
            yValue: (Math.floor(rodYDifference ) - Math.abs(nutStartPosition.yValue - offsetPosition.yValue) - (anyNut.offsetHeight*2) )  // Math.ceil(rodYDifference -  nutStartPosition.yValue)
        };

        return lidCenterPosition;
    }

    /**
     * Calculate the final position of the nut at the end of the move animation.
     * This will be the final position before 'appendChild' is appled 
     */
    function calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount) {

        const lidCenterPosition = calculateLidCenter(targetRod, sourceRod);

        const nutStartPosition = calculateNutStartPosition(sourceRod);
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod);

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        // anyNut is global to avoud redefining 
        const nutFinalPosition = {
            xValue: rodXDifference ,
            // yValue: (maxNutsPerRod*anyNut.offsetHeight -((targetChildrenCount+1) * anyNut.offsetHeight)) -anyNut.offsetHeight +rodYDifference//- (),
            yValue: (maxNutsPerRod*anyNut.offsetHeight -((targetChildrenCount+1) * anyNut.offsetHeight)) -anyNut.offsetHeight +rodYDifference//- (),
            // yValue: -100,
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

        console.log(`targetRodRect.left: ${targetRodRect.left}`);
        console.log(`sourceRodRect.left: ${sourceRodRect.left}`);

        if (sourceRodRect.left > targetRodRect.left) {
            console.log("Slide Right")
            offsetPosition = {
                xValue: nutStartPosition.yValue + animationOffsetX,
                yValue: nutStartPosition.yValue + animationOffsetY
            };
            console.log(`offsetPosition.xValue: ${offsetPosition.xValue}`);

        } else {
            console.log("Slide Left")
            offsetPosition = {
                xValue: -(nutStartPosition.yValue + animationOffsetX),
                yValue: nutStartPosition.yValue + animationOffsetY
            };
            console.log(`offsetPosition.xValue: ${offsetPosition.xValue}`);

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
        // console.log(raisedNutWrapper);
        const raisedNut = raisedNutWrapper.firstElementChild;

        const nutFinalPosition = calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount);

        // --- Calculate center of lid element --- //
        const lidCenterPosition = calculateLidCenter(targetRod, sourceRod);

        // --- Calculate start position for animation --- //
        const nutStartPosition = calculateNutStartPosition(sourceRod);

        // --- Calculate mid-way position through animation --- //
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod);
        // console.log(`Offset position: (X): ${offsetPosition.xValue} (Y): ${offsetPosition.yValue}`);


        console.log(`Start (X): ${nutStartPosition.xValue} (Y): ${nutStartPosition.yValue}`)
        console.log(`Max (X): ${offsetPosition.xValue} (Y): ${offsetPosition.yValue}`)
        console.log(`Lid (X): ${lidCenterPosition.xValue} (Y): ${lidCenterPosition.yValue}`)
        console.log(`Target (X): ${nutFinalPosition.xValue} (Y): ${nutFinalPosition.yValue}`)

        // --- Set CSS variables for the keyframe animations --- //
        raisedNut.style.setProperty("--raise-start-x", nutStartPosition.xValue + "px");
        raisedNut.style.setProperty("--raise-start-y", nutStartPosition.yValue + "px");
        raisedNut.style.setProperty("--raise-max-x", offsetPosition.xValue + "px");
        raisedNut.style.setProperty("--raise-max-y", offsetPosition.yValue + "px");
        raisedNut.style.setProperty('--lid-position-y', lidCenterPosition.yValue + 'px');
        raisedNut.style.setProperty('--lid-position-x', lidCenterPosition.xValue + 'px');
        raisedNut.style.setProperty("--target-position-x", nutFinalPosition.xValue + "px");
        raisedNut.style.setProperty("--target-position-y", nutFinalPosition.yValue + "px");

        // 0% { transform: translate(var(--raise-start-x), var(--raise-start-y));   }
        // 33% { transform: translate(var(--raise-max-x), var(--raise-max-y));   }
        // 66% { transform: translate(var(--lid-position-x), var(--lid-position-y));   }
        // 100% { transform: translate(var(--target-position-x), var(--target-position-y));   }

        return nutFinalPosition;
    }

    /**
     * Run the animation for the input move
     * Specify the animation class name
     */
    function prepareAnimation(sourceRod, targetRod, targetChildrenCount) {

        const nutFinalPosition = setPositionalValues(sourceRod, targetRod, targetChildrenCount); // Set the relative positions for the animation motion

        const raisedNutWrapper = sourceRod.lastElementChild;
        const raisedNut = raisedNutWrapper.firstElementChild;

        // runAnimation(raisedNut, animationName, callback);

        // animation: moveNutToLid 1s linear forwards,
        // moveNutDownRod 1.5s linear 0.5s forwards;

        // Add animation settings same as success-move class
        // const animationDuration = ['0.25s', '0.5s'];
        const animationDuration = ['3s', '0.5s'];
        const animationTiming = 'linear';

        console.log("we are ready");

        // moveNutToLid moveNutDownRod
        // runAnimation(raisedNut, "moveNutToLid", animationDuration[0], animationTiming, function () {
        //     runAnimation(raisedNut, "moveNutDownRod", animationDuration[1], animationTiming, function () {

        //         // remove raise class
        //         raisedNutWrapper.classList.remove("raise-nut");
        //         raisedNut.classList.remove("raise-nut");

        //         // froce final position 
        //         raisedNut.style.left = nutFinalPosition.xValue + "px";
        //         raisedNut.style.top = nutFinalPosition.yValue + "px";

        //         //  add child to wrapper and wrapper to target rod
        //         raisedNutWrapper.appendChild(raisedNut);
        //         targetRod.appendChild(raisedNutWrapper);
        //     });
        //     // setTimeout(runAnimation, 5000);
        // });

        // Add animation class
        const animationName = "success-move";
        raisedNutWrapper.classList.add(animationName); // nutWrapper
        raisedNut.classList.add(animationName); // nut element

        // raisedNutWrapper.addEventListener('animationend', () => {

        //     raisedNutWrapper.appendChild(raisedNut);
        //     targetRod.appendChild(raisedNutWrapper);

        //     raisedNut.classList.remove(animationName, "raise-nut");
        //     raisedNutWrapper.classList.remove(animationName);
        // });


    }

    /**
     * Test keyframes
     */
    // function testKeyframes(e) {
    //     const raisedNut = e.target;
    //     const animationName = "success-move";

    //     console.log(raisedNut);
    //     console.log("Hello world");
    //     // raisedNutWrapper.classList.add(animationName); // nutWrapper
    //     raisedNut.classList.add(animationName); // nut element
    // }

    /**
     * Run the move animation in two steps and append child. 
     * 1) Move nut from raised position to lid of target rod
     * 2) Move nut from target rod lid position to base
     * 3) appendchild 'nut' to target rod
     * Takes, a) raisedNut, animationName, duration, timing, delay and callback
     */
    function runAnimation(raisedNut, animationName, animationDuration, animationTiming, callback) {

        raisedNut.offsetWidth;
        raisedNut.style.animation = "none";
        raisedNut.style.animation = `${animationName} ${animationDuration} ${animationTiming} forwards`;
        raisedNut.addEventListener("animationend", function handler(e) {
            raisedNut.style.animation = "none";
            raisedNut.removeEventListener("animationend", handler);

            // set callbakc to run next animation after removing the first
            if (callback) callback();
        });
    }

    /**
     * Move raised nut to another rod
     */
    function moveNut(nutObject) {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;

        const targetNut = nutObject;
        const targetRod = targetNut.parentElement.parentElement;


        // 1) Check the destination rod is not the same as origin rod
        if (targetRod === sourceRod) {
            console.log('Cannot move into self; Lowering Nut')
            lowerNut(raisedNut);
            return
        }

        // 2) Check if the target rod has space
        const targetChildrenCount = targetRod.querySelectorAll('.nut-wrap').length; // get number of existing nuts
        const isSpaceAvailable = targetChildrenCount < maxNutsPerRod;
        if (!isSpaceAvailable) {
            console.log("There's no space in target; Lowering Nut")
            lowerNut(raisedNut);
            return
        }

        // 3) Check if the riased nut and topChild of target rod have same colors
        const targetNutColor = targetNut.getAttribute("data-color"); //last child color (target)
        const raisedNutColor = raisedNut.getAttribute("data-color"); //raised nut color
        const isColorMatch = raisedNutColor === targetNutColor;
        if (!isColorMatch) {
            console.log("Colors don't match; Lowering Nut")
            lowerNut(raisedNut);
            return
        }

        // initiate the move
        prepareAnimation(sourceRod, targetRod, targetChildrenCount);

    }

})