// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log('Its loaded');
    let nuts = document.querySelectorAll(".nut");
    console.log(nuts);

    for (let nut of nuts) {
        nut.addEventListener('click', raiseNut);
        }
    
    /**
     * Raise the top nut when clicked
     * and return to normal state 
     */
    function raiseNut(e) {
        let selectedNut = e.target;
        let selectedNutWrap = selectedNut.parentElement;
        let currentRod = selectedNutWrap.parentElement;
        
        console.log(selectedNut);
        console.log(selectedNutWrap);
        console.log(currentRod);
        // only raise the top nut
        if (currentRod.lastElementChild === selectedNutWrap) {
            selectedNut.classList.toggle("raise-nut");
            console.log("Definitelly last born!");

        } else {
            console.log("Not the last child");
        }

            

    }
    
})