// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();
    console.log('Its loaded');
    let nuts = document.querySelectorAll(".nut");
    console.log(nuts);

    for (let nut of nuts) {
        nut.addEventListener('click', raiseNut);
    }

    /**
     * initialize the game play
     */
    function runGame() {
        // first function to run after loading
        console.log("Game has started! Lets play!")
    }

    /**
     * Raise the top nut when clicked
     * and return to normal state 
     */
    function raiseNut(e) {
        let selectedNut = e.target;
        let currentNutWrap = selectedNut.parentElement;
        let currentRod = currentNutWrap.parentElement;

        // console.log(selectedNut);
        // console.log(currentNutWrap);
        // console.log(currentRod);
        // only raise the top nut
        if (currentRod.lastElementChild === currentNutWrap) {

            selectedNut.classList.toggle("raise-nut");
            console.log("Definitely last born!");

        } else {
            console.log("Not the last child");
        }

    }

})