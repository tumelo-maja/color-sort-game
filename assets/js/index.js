/**
 * Add Event Listener to run only after HTML document has completely loaded
 * All code within this eventlistener will be accessible to the browser once the page has loaded.
 * @listens document#DOMContentLoaded - the namespace and name of the event
 */
document.addEventListener("DOMContentLoaded", function () {

    // Declare the clickable h3 element 
    const playInstructionElement = document.querySelector('.play-instructions');
    // Declare the game instruction div containing instructions to be displayed/hidden on toggle.
    const targetElement = document.querySelector('.game-instructions');
    // Declare the arrow icon to be rotated 
    const arrowElement = playInstructionElement.querySelector(".bi-chevron-double-down");

    /**
     * Add Event Listener to toggle the visibility of the gameplay instructions and
     * rotate the arrow icon with each toggle.
     */
    playInstructionElement.addEventListener('click', function () {
        targetElement.classList.toggle('hidden-item');
        arrowElement.classList.toggle('rotate');
    });
})