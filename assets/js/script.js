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
    // function nutClick(e) {
    //     // handle click to raise and click to move
    //     const isNutRaised = document.querySelector(".raise-nut");

    //     const nutObject = e.target;

    //     if (isNutRaised) {
    //         moveNut(nutObject);
    //     } else {
    //         raiseNut(nutObject);
    //     }
    // }

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



            moveNut(rodElement, currentNut, nutsToMove, rodChildrenCount);


            // nutWrappersToMove.forEach((nut, index) => {
            //     // moveWrapper(wrapper, this, index * 500);
            //     let rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;
            //     let nutColor = nut.getAttribute("data-color");

            //     console.log("Move in a loop")
            //     console.log(`nutColor: ${nutColor}`);
            //     moveNut(rodElement, nut, rodChildrenCount);
            // });
            // // activeWrapper = null;

            // console.log(`nutWrappersToMove: `);
            // console.log(nutWrappersToMove);
            // console.log(`nutsToMove: `);
            // console.log(nutsToMove);

            // let wrapperCount = 0;
            // for (let wrapper of nutWrappersToMove) {
            //     wrapperCount++
            //     console.log(`Wrapper Number: ${wrapperCount}`)
            //     // console.log(wrapper)

            //     //raise nut first, then move

            //     // rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;
            //     rodChildrenCount = rodElement.childElementCount;
            //     // console.log(`Before move: ${rodChildrenCount}`)

            //     let wrapperNut = wrapper.firstElementChild;
            //     console.log(wrapperNut);


            //     raiseNut(wrapperNut, wrapperNut, rodChildrenCount, wrapperNut);
            //     moveNut(rodElement, wrapperNut, rodChildrenCount, wrapperNut);

            //     // setTimeout(() => {
            //     //     raiseNut(wrapperNut, rodChildrenCount);
            //     //     setTimeout(() => {
            //     //         console.log(`Before move: ${rodElement.childElementCount}`);
            //     //         moveNut(rodElement, wrapperNut, rodChildrenCount, function () {
            //     //         });
            //     //         console.log(`After move: ${rodElement.childElementCount}`)

            //     //     }, 500);

            //     // }, 1);

            //     // lowerNut(wrapperNut);



            // }
            // rodChildrenCount = rodElement.querySelectorAll('.nut-wrap').length;
            // rodChildrenCount = rodElement.childElementCount;
            // console.log(`After move: ${rodChildrenCount}`)

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
        // let selectedNut = nutObject;
        // let currentNutWrap = selectedNut.parentElement;
        // let targetRod = currentNutWrap.parentElement;

        // // only raise the top nut
        // if (targetRod.lastElementChild === currentNutWrap) {
        //     selectedNut.classList.add("raise-nut");
        // }
        setRaiseNutTransformY(nutObject, rodChildrenCount,-30);
        nutObject.classList.add("raise-nut");
    }

    /**
     * Set the transformY value for the raise-nut class.
     * The nut must always be raised slightly above the clicked rod
     */
    function setRaiseNutTransformY(nutObject, rodChildrenCount,raiseAboveTop) {
        // raisedNut.style.setProperty("--raise-start-y", nutStartPosition.yValue + "px");

        // const raiseAboveTop = -30;
        // const availableSpace = (maxNutsPerRod-rodChildrenCount) * anyNut.offsetHeight;
        // const anyNutHeight =getCssStyleValue(anyNut,'height');
        const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
        const availableSpace = (maxNutsPerRod - rodChildrenCount) * (anyNut.offsetHeight + anyNutMargin);

        // console.log(`anyNutHeight: ${anyNutHeight}`);
        // console.log(`anyNut.offsetHeight: ${anyNut.offsetHeight}`);

        const raiseValue = -availableSpace + raiseAboveTop;

        // console.log(`availableSpace: ${availableSpace}`);
        // console.log(`raiseValue: ${raiseValue}`);

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
    function calculateLidCenter(targetRod, sourceRod,nutObject) {

        const targetRodRect = targetRod.getBoundingClientRect();
        const sourceRodRect = sourceRod.getBoundingClientRect();

        rodYDifference = targetRodRect.top - sourceRodRect.top;
        rodXDifference = targetRodRect.left - sourceRodRect.left;

        const nutStartPosition = calculateNutStartPosition(nutObject);
        const offsetPosition = calculateNutMidOffset(sourceRod, targetRod,nutObject);

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
    function calculateNutStartPosition(nutObject) {

        console.log('calculateNutStartPosition:')
        console.log(nutObject)
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
    function calculateNutMidOffset(sourceRod, targetRod,nutObject) {

        const nutStartPosition = calculateNutStartPosition(nutObject);
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
    function setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount) {

        let tranformIncreaseValue = 0;
        let sourceChildrenCount = sourceRod.querySelectorAll('.nut-wrap').length;

        nutsToMove = nutsToMove.slice(0, 1);

        for (let nut of nutsToMove) {

            

            // const raisedNutWrapper = sourceRod.lastElementChild;
            // const raisedNut = raisedNutWrapper.firstElementChild;

            //set raise values first
            setRaiseNutTransformY(nut, sourceChildrenCount, -30);


            // --- Calculate start position for animation --- //
            const nutStartPosition = calculateNutStartPosition(nut);

            // --- Calculate mid-way position through animation --- //
            const offsetPosition = calculateNutMidOffset(sourceRod, targetRod, nut);

            // --- Calculate center of lid element --- //
            const lidCenterPosition = calculateLidCenter(targetRod, sourceRod,nut);

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
            nut.style.setProperty("--target-position-y", nutFinalPosition.yValue + "px");



            // const transY = nut.getAttribute("--transform-y");
            const transY = nut.style.getPropertyValue('--transform-y');

            // nut.style.setProperty("--raise-start-y", transY + "px");

            console.log(`transform-y: ${nut.style.getPropertyValue('--transform-y')}`);
            console.log(`raise-start-y: ${nut.style.getPropertyValue('--raise-start-y')}`);
            console.log(`raise-max-y: ${nut.style.getPropertyValue('--raise-max-y')}`);
            console.log(`lid-position-y: ${nut.style.getPropertyValue('--lid-position-y')}`);
            console.log(`target-position-y: ${nut.style.getPropertyValue('--target-position-y')}`);

            // const newRaiseHeight = nut.getAttribute("--transform-y"); //last child color (target)
            // console.log(`newRaiseHeight: ${newRaiseHeight}`);
            // nut.style.setProperty("--raise-start-y", newRaiseHeight + "px");

            // const raiseAboveTop = -60;
            // const anyNutMargin = getCssStyleValue(anyNut, 'margin-bottom');
            // const availableSpace = (maxNutsPerRod - sourceChildrenCount) * (anyNut.offsetHeight + anyNutMargin);

            // const raiseValue = -availableSpace + raiseAboveTop;
            // nut.style.setProperty("--raise-start-y", raiseValue + "px");

            // console.log(`maxNutsPerRod: ${maxNutsPerRod}`);
            // console.log(`sourceChildrenCount: ${sourceChildrenCount}`);
            // console.log(`sourceChildrenCount: ${sourceChildrenCount}`);
            // console.log(`availableSpace: ${availableSpace}`);
            // console.log(`raiseValue: ${raiseValue}`);

            targetChildrenCount++; // increase after each loop
            sourceChildrenCount--; //remove 1 child eacj loop



            // nut.classList.add("raise-nut");


        }
    }

    /**
     * Run the animation for the input move
     * Specify the animation class name
     */
    function runAnimation(sourceRod, targetRod, nutsToMove, targetChildrenCount) {



        setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount); // Set the transform positions for the animation motion

        // const raisedNutWrapper = sourceRod.lastElementChild;
        // const raisedNut = raisedNutWrapper.firstElementChild;
        // const raisedNutWrapper = raisedNut.parentElement;

        // // Add animation class
        const animationName = "success-move";
        // const animationName = "test-move";
        // raisedNutWrapper.classList.add(animationName); // nutWrapper
        // raisedNut.classList.add(animationName); // nut element

        // raisedNutWrapper.addEventListener('animationend', () => {
        //     raisedNutWrapper.style.animation = "";

        //     raisedNutWrapper.appendChild(raisedNut);
        //     targetRod.appendChild(raisedNutWrapper);

        //     raisedNut.classList.remove(animationName, "raise-nut");
        //     raisedNutWrapper.classList.remove(animationName);
        // });

        // New method

        // let Allwrappers = sourceRod.querySelectorAll('.nut-wrap');
        // setPositionalValues(sourceRod, targetRod, nutsToMove, targetChildrenCount); // Set the transform positions for the animation motion

        // let rodChildrenCountLocal = rodChildrenCount;
        let sourceChildrenCount = sourceRod.querySelectorAll('.nut-wrap');

        // Allwrappers.forEach((wrapper, index) => {
        nutsToMove.forEach((nut, index) => {
            setTimeout(() => {

                // raiseNut(nut, sourceChildrenCount);

                //   nut.classList.add('animate');
                nut.classList.add(animationName); // nutWrapper
                nut.parentElement.classList.add(animationName); // nut element

                // wrapper.firstElementChild.classList.add(animationName); // nutWrapper
                // wrapper.classList.add(animationName); // nut element
                sourceChildrenCount--;

            }, index * 500); // Delay increases by 500ms per item
        });

        // test - all balls

        // if (this.children.length === 0 && activeWrapper) {
        //     const sourceContainer = raisedNutWrapper.parentElement;
        //     // Get all wrappers in the source container.
        //     const wrappersToMove = Array.from(sourceContainer.querySelectorAll('.nut-wrap'));
        //     // Animate each wrapper sequentially (500ms delay between each).
        //     wrappersToMove.forEach((wrapper, index) => {
        //       moveWrapper(wrapper, targetRod, index * 500);
        //     });
        //     activeWrapper = null;
        // //   }

        // wrapper.style.animation = 'moveBallFall 2s ease forwards';
        // raisedNutWrapper.style.animation = 'moveNutToTarget 2s ease forwards';
        // raisedNut.style.animation = 'moveNutToTarget 2s ease forwards';

        // raisedNutWrapper.addEventListener("animationend", function handler() {

        //     raisedNutWrapper.style.animation = "";
        //     raisedNut.style.animation = "";


        //     raisedNutWrapper.appendChild(raisedNut);
        //     targetRod.appendChild(raisedNutWrapper);

        //     raisedNut.classList.remove(animationName, "raise-nut");
        //     raisedNutWrapper.classList.remove(animationName);

        //     raisedNutWrapper.removeEventListener("animationend", handler);
        // });




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
        // const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const sourceRod = raisedNutWrapper.parentElement;

        // console.log("This is the raisedNut nut:")
        // console.log(raisedNut);

        // Move nut right away if target rod is empty
        if (rodChildrenCount) {
            // const targetNut = nutObject;
            // const targetRod = targetNut.parentElement.parentElement;

            const targetNut = targetRod.lastElementChild.firstElementChild;
            // const nutObjectTop = rodElement.lastElementChild;
            void targetNut.offsetWidth;


            // console.log("This is the target nut:")
            // console.log(targetNut);

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

            // console.log(`targetNutColor: ${targetNutColor}`);
            // console.log(`raisedNutColor: ${raisedNutColor}`);

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

})