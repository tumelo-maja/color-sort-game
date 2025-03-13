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
     * Run the animation for the input move
     * Specify the animation class name
     */
    function runAnimation(nutObject, targetRod, animationName) {

        // ---(targetRod)--- GEt the center of the lid ::after element
        const lidElement = window.getComputedStyle(targetRod, '::after');
        const lidElementHeight = parseFloat(lidElement.getPropertyValue('height'));

        // ---(raisedNut)--- retrieve the position setting for .raise-nut class
        const raiseNutOffsetX = parseFloat(getCssStyleValue(raisedNut, 'left'));
        const raiseNutOffsetY = parseFloat(getCssStyleValue(raisedNut, 'top'));

        // ---(targetRod / sourceRod)--- Final position of the nut = Account for existing nuts
        const rodPositionX = Math.round(targetRodRect.left - sourceRodRect.left + raiseNutOffsetX);
        const rodPositionY = Math.round(((maxNutsPerRod * nutSize) - (rodChildrenCount * nutSize)) + raiseNutOffsetY) + lidElementHeight;

        // ---(targetRod / sourceRod)--- Position on 'lid' above target rod (assumes same hor line)
        const lidPositionY = raiseNutOffsetY;
        const lidPositionX = rodPositionX;

        // ---(targetRod / sourceRod)--- Mid-way position in transit from raise position to target rod
        const raiseMaxY = lidPositionY - (lidPositionY / 2);
        const raiseMaxX = (rodPositionX + lidPositionX) / 2 - parseFloat(getCssStyleValue(raisedNut, 'width')) / 2;

        // Set CSS variables for the keyframe animations
        raisedNut.style.setProperty("--raiseMaxLeft", raiseMaxX + "px");
        raisedNut.style.setProperty("--raiseMaxTop", raiseMaxY + "px");
        rootSelector.style.setProperty('--lidPositionTop', lidPositionY + 'px');
        rootSelector.style.setProperty('--lidPositionLeft', lidPositionX + 'px');
        raisedNut.style.setProperty("--targetPositionLeft", rodPositionX + "px");
        raisedNut.style.setProperty("--targetPositionTop", rodPositionY + "px");


        // Add animation class
        nutObject.classList.add(animationName);
        nutObject.parentElement.classList.add(animationName);

        let animateStages = 0;
        const raisedNutWrapper = nutObject.parentElement;
        nutObject.parentElement.addEventListener('animationend', () => {
            animateStages++;
            if (animateStages === 2) {

                if (animationName === "success-move") {

                    raisedNutWrapper.appendChild(nutObject);
                    targetRod.appendChild(raisedNutWrapper);

                }

                nutObject.classList.remove(animationName, "raise-nut");
                nutObject.parentElement.classList.remove(animationName);
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
        const sourceRodRect = sourceRod.getBoundingClientRect(); // Object position w.r.t viewport

        const targetNut = nutObject;
        const targetRod = targetNut.parentElement.parentElement;
        const targetRodRect = targetRod.getBoundingClientRect();

        // 1) Check the destination rod is not the same as origin rod
        if (targetRod === sourceRod) {
            console.log('Cannot move into self; Lowering Nut')
            lowerNut(raisedNut);
            return
        }

        // 2) Check if the target rod has space
        const rodChildrenCount = targetRod.querySelectorAll('.nut-wrap').length; // get number of existing nuts
        const isSpaceAvailable = rodChildrenCount < maxNutsPerRod;
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
        runAnimation(sourceRod, targetRod, "success-move");

    }

})