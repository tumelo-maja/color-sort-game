// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    let lowerButton = document.getElementById('test');
    lowerButton.addEventListener('click', lowerNut);

    // let moveButton = document.getElementById('rod4');
    // moveButton.addEventListener('click', moveNut);

    // Set values passed in keyframes (positions) * should be in separate function

    const rootSelector = document.querySelector(':root');


    // end of variables

    // Global variables.
    const maxNutsPerRod = 8;



    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")

        let nuts = document.querySelectorAll(".nut");
        for (let nut of nuts) {
            nut.addEventListener('click', nutClick);
        }
    }

    /**
     * 
     */
    function nutClick(e) {
        // handle click to raise and click to move
        const raisedNut = document.querySelector(".raise-nut");

        if (raisedNut) {
            moveNut(e);
            console.log("Time to move");
        } else {
            console.log('Lets raise it')
            raiseNut(e);
        }

    }

    /**
     * Raise the top nut &wrapper  above the rod when clicked
     */
    function raiseNut(e) {
        let selectedNut = e.target;
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
    function lowerNut() {
        // remove the .raise-nut class if it exist
        const raisedNut = document.querySelector(".raise-nut");
        console.log(raisedNut)

        if (raisedNut) {
            console.log("There is a raised nut!");
            raisedNut.classList.remove("raise-nut");
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
    function runAnimation(nutObject, animationName) {

        if (animationName === "success-move") {

            nutObject.classList.add(animationName);
            nutObject.parentElement.classList.add(animationName);
        }

        let animateStages = 0;
        nutObject.parentElement.addEventListener('animationend', () => {
            animateStages++;
            if (animateStages === 2) {
                nutObject.classList.remove(animationName, "raise-nut");
                nutObject.parentElement.classList.remove(animationName);
            }
        });
    }

    /**
     * Move raised nut to another rod
     */
    function moveNut(e) {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const raisedRod = raisedNutWrapper.parentElement;
        const targetNut = e.target;
        const targetRod = targetNut.parentElement.parentElement;
        const nutStyle = window.getComputedStyle(raisedNut);
        const nutSize = parseFloat(nutStyle.height) + parseFloat(nutStyle.marginBottom);
        
        // Check the destination rod is not the same as origin rod
        if (targetRod === raisedRod) {
            console.log('Lets move it')
            lowerNut();
            return
        }

        const targetRodRect = targetRod.getBoundingClientRect();
        const raisedRodRect = raisedRod.getBoundingClientRect();

        // get number of existing nuts
        const rodChildrenCount = targetRod.querySelectorAll('.nut-wrap').length;

        // GEt the center of the lid ::after element
        const lidElement = window.getComputedStyle(targetRod, '::after');
        const lidElementHeight = parseFloat(lidElement.getPropertyValue('height'));

        // retrieve the position setting for .raise-nut class
        const raiseNutOffsetX = parseFloat(getCssStyleValue(raisedNut, 'left'));
        const raiseNutOffsetY = parseFloat(getCssStyleValue(raisedNut, 'top'));

        // Final position of the nut = Account for existing nuts
        const rodPositionX = Math.round(targetRodRect.left - raisedRodRect.left + raiseNutOffsetX);
        const rodPositionY = Math.round(((maxNutsPerRod * nutSize) - (rodChildrenCount * nutSize)) + raiseNutOffsetY) + lidElementHeight;

        // Position on 'lid' above target rod (assumes same hor line)
        const lidPositionY = raiseNutOffsetY;
        const lidPositionX = rodPositionX;

        // Mid-way position in transit from raise position to target rod
        const raiseMaxY = lidPositionY - (lidPositionY / 2);
        const raiseMaxX = (rodPositionX + lidPositionX) / 2 - parseFloat(getCssStyleValue(raisedNut, 'width')) / 2;

        // Set CSS variables for the keyframe animations
        raisedNut.style.setProperty("--raiseMaxLeft", raiseMaxX + "px");
        raisedNut.style.setProperty("--raiseMaxTop", raiseMaxY + "px");
        rootSelector.style.setProperty('--lidPositionTop', lidPositionY + 'px');
        rootSelector.style.setProperty('--lidPositionLeft', lidPositionX + 'px');
        raisedNut.style.setProperty("--targetPositionLeft", rodPositionX + "px");
        raisedNut.style.setProperty("--targetPositionTop", rodPositionY + "px");



        // Conditions to move nuts to new rod
        const isRodEmpty = 0 < rodChildrenCount;

        if (isRodEmpty) {

            runAnimation(raisedNut, "success-move")

        } else {

            // Conditions to move nuts to new rod
            const isColorMatch = raisedNutColor === targetNutColor;
            const isSpaceAvailable = rodChildrenCount < maxNutsPerRod;

            // Get styles to compare colors
            const targetNutColor = targetNut.getAttribute("data-color");
            const raisedNutColor = raisedNut.getAttribute("data-color");


            if (isColorMatch && isSpaceAvailable) {

                runAnimation(raisedNut, "success-move")

            } else {

                runAnimation(raisedNut, "fail-move")

            }
        }


    }

})