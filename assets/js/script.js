// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    let lowerButton = document.getElementById('test');
    lowerButton.addEventListener('click',lowerNut);

    // Test end 


    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")

        let nuts = document.querySelectorAll(".nut");
        for (let nut of nuts) {
            nut.addEventListener('click', raiseNut);
        }
    }

    /**
     * Raise the top nut &wrapper  above the rod when clicked
     */
    function raiseNut(e) {
        let selectedNut = e.target;
        let currentNutWrap = selectedNut.parentElement;
        let currentRod = currentNutWrap.parentElement;

        // only raise the top nut
        if (currentRod.lastElementChild === currentNutWrap) {

            selectedNut.classList.add("raise-nut");
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
     * Move raised nut to another rod
     */
    function moveNut() {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const raisedNutRod = raisedNutWrapper.parentElement;

    }

})