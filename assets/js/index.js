// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {

    const playInstructionElement = document.querySelector('.play-instructions');
    const targetElement = document.querySelector('.game-instructions');

    // Event listener to toggle hidden-item class on .game-instructions element 
    playInstructionElement.addEventListener('click', function () {
        targetElement.classList.toggle('hidden-item')
    });
})