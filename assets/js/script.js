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
    function raiseNut() {
        console.log('Nut was clicked')
    }
    
})