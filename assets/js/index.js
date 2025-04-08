/**
 * Add Event Listener to run only after HTML document has completely loaded
 * @listens document#DOMContentLoaded - the namespace and name of the event
 */
document.addEventListener("DOMContentLoaded", function () {

    const playInstructionElement = document.querySelector('.play-instructions');
    const targetElement = document.querySelector('.game-instructions');
    const arrowElement = playInstructionElement.querySelector(".arrow-icons");

    /**
     * Add eventListener to toggle the visibility of the gameplay instructions
     * and rotate the arrow icon with each toggle.
     */
    playInstructionElement.addEventListener('click', function () {
        targetElement.classList.toggle('hidden-item');
        arrowElement.classList.toggle('rotate');
    });
});