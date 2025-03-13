// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    // let lowerButton = document.getElementById('test');
    // lowerButton.addEventListener('click', lowerNut);

    // let moveButton = document.getElementById('rod4');
    // moveButton.addEventListener('click', moveNut);

    // Set values passed in keyframes (positions) * should be in separate function

    const rootSelector = document.querySelector(':root');


    // end of variables

    // Global variables.
    const maxNutsPerRod = 8;

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

        console.log("Its has wrap")
        const nutObject = e.target;

        if (isNutRaised) {
            moveNut(nutObject);
            console.log("Time to move");
        } else {
            console.log('Lets raise it')
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
            // currentNutWrap.classList.add("raise-nut");
            console.log("Definitely last born!");
        } else {
            console.log("Not the last child");
        }
    }


    /**
     * Lower nut to the base if it cannot be moved
     */
    function lowerNut(nutObject) {
        // remove the .raise-nut class if it exist
        // const nutObject = document.querySelector(".raise-nut");
        console.log(nutObject)

        if (nutObject) {
            console.log("There is a raised nut!");
            nutObject.classList.remove("raise-nut");
        } else {
            console.log("all nuts are lowered");
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
    function calculateLidCenter(targetRod) {

        // target the lid circle element
        console.log("Look below");
        console.log(targetRod);
        const lidElement = targetRod.querySelector('.rod-lid');
        console.log(lidElement);

        // const lidElementRect = window.getComputedStyle(targetRod, '::after');
        const lidElementRect = lidElement.getBoundingClientRect();
        // console.log(lidElementRect);

        const targetRodRect = targetRod.getBoundingClientRect();

        const lidCenterPosition = {
            xValue: lidElementRect.left - targetRodRect.left + lidElementRect.width / 2,
            yValue: lidElementRect.top - targetRodRect.top + lidElementRect.height / 2
        };

        return lidCenterPosition;
    }

    /**
     * Calculate the final position of the nut at the end of the move animation.
     * This will be the final position before 'appendChild' is appled 
     */
    function calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount) {

        const raisedNutWrapper = sourceRod.lastElementChild;
        // console.log(raisedNutWrapper);
        const raisedNut = raisedNutWrapper.firstElementChild;
        // anyNut is global to avoud redefining 
        const nutFinalPosition = {
            xValue: (targetRod.clientWidth - anyNut.offsetWidth)/2,
            yValue: (targetRod.clientHeight - anyNut.offsetHeight) - (targetChildrenCount * anyNut.offsetHeight),
        }

        return nutFinalPosition;

    }

    /**
     * Set the CSS values for the animation motion of the nut
     * @param {The parent rod of the raised nut} sourceRod 
     * @param {The final rod for the nut} targetRod 
     */
    function setPositionalValues(sourceRod, targetRod, targetChildrenCount) {

        const sourceRodRect = sourceRod.getBoundingClientRect(); // Object position w.r.t viewport
        const targetRodRect = targetRod.getBoundingClientRect();

        const raisedNutWrapper = sourceRod.firstElementChild;
        console.log(raisedNutWrapper);
        const raisedNut = raisedNutWrapper.firstElementChild;

        // ---(raisedNut)--- retrieve the position setting for .raise-nut class
        // const raiseNutOffsetX = parseFloat(getCssStyleValue(raisedNut, 'left'));
        // const raiseNutOffsetY = parseFloat(getCssStyleValue(raisedNut, 'top'));

        // ---(targetRod / sourceRod)--- Final position of the nut = Account for existing nuts
        // const rodPositionX = Math.round(targetRodRect.left - sourceRodRect.left + raiseNutOffsetX);
        // const rodPositionY = Math.round(((maxNutsPerRod * nutSize) - (targetChildrenCount * nutSize)) + raiseNutOffsetY) + lidElementHeight;
        const nutFinalPosition =calculateNutFinalPosition(sourceRod, targetRod, targetChildrenCount);
        console.log(nutFinalPosition.xValue);
        console.log(nutFinalPosition.yValue);


        // ---(targetRod / sourceRod)--- Position on 'lid' above target rod (assumes same hor line)
        // const lidPositionY = raiseNutOffsetY;
        // const lidPositionX = rodPositionX;
        const lidCenterPosition = calculateLidCenter(targetRod);
        console.log(lidCenterPosition.xValue);

        // ---(targetRod / sourceRod)--- Mid-way position in transit from raise position to target rod
        const raiseMaxY = lidPositionY - (lidPositionY / 2);
        const raiseMaxX = (rodPositionX + lidPositionX) / 2 - parseFloat(getCssStyleValue(raisedNut, 'width')) / 2;

        // Set CSS variables for the keyframe animations
        raisedNut.style.setProperty("--raise-max-left", raiseMaxX + "px");
        raisedNut.style.setProperty("--raise-max-top", raiseMaxY + "px");
        rootSelector.style.setProperty('--lid-position-top', lidCenterPosition.yValue + 'px');
        rootSelector.style.setProperty('--lid-position-left', lidCenterPosition.xValue + 'px');
        raisedNut.style.setProperty("--target-position-left", nutFinalPosition.xValue + "px");
        raisedNut.style.setProperty("--target-position-top", nutFinalPosition.xValue + "px");

    }

    /**
     * Run the animation for the input move
     * Specify the animation class name
     */
    function runAnimation(sourceRod, targetRod, targetChildrenCount) {

        setPositionalValues(sourceRod, targetRod, targetChildrenCount); // Set the relative positions for the animation motion

        const raisedNutWrapper = sourceRod.lastElementChild;
        const raisedNut = raisedNutWrapper.firstElementChild;

        // Add animation class
        const animationName = "success-move";
        raisedNutWrapper.classList.add(animationName); // nutWrapper
        raisedNut.classList.add(animationName); // nut element

        let animateStages = 0;

        raisedNutWrapper.addEventListener('animationend', () => {
            animateStages++;
            if (animateStages === 2) {

                if (animationName === "success-move") {
                    raisedNutWrapper.appendChild(raisedNut);
                    targetRod.appendChild(raisedNutWrapper);
                }

                raisedNut.classList.remove(animationName, "raise-nut");
                raisedNutWrapper.classList.remove(animationName);
            }
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
        runAnimation(sourceRod, targetRod, targetChildrenCount);

    }

})