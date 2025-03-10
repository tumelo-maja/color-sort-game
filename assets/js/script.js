// Add Event Listener to run only after DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    // Run game to load default game setup with level=1 and score=0
    runGame();

    // Testing purposes
    let lowerButton = document.getElementById('test');
    lowerButton.addEventListener('click', lowerNut);

    // let moveButton = document.getElementById('rod4');
    // moveButton.addEventListener('click', moveNut);

    // Test end 


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
    function moveNut(e) {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const currentRod = raisedNutWrapper.parentElement;
        const raisedRod = e.target.parentElement.parentElement;
        console.log('This is the current rod');
        console.log(raisedRod);

        if (currentRod !== raisedRod) {
            console.log('Lets move it')

            const targetRod = e.target;
            // console.log(currentRod);
            console.log(currentRod);
            console.log(raisedNutWrapper);

            // currentRod.appendChild(raisedNutWrapper);

            // calcukate distance between the raised nut and the target rod 
            const raisedNutWrapperPosition = raisedNutWrapper.getBoundingClientRect();
            const currentRodPosition = currentRod.getBoundingClientRect();
            const targetRodPosition = targetRod.getBoundingClientRect();
            const nutStyle = window.getComputedStyle(raisedNut);
            const rodStyle = window.getComputedStyle(targetRod);


            // get the object centeres
            const raisedNutWrapperCenterX = (raisedNutWrapperPosition.left + raisedNutWrapperPosition.width) / 2;
            const targetRodCenterX = (targetRodPosition.left + targetRodPosition.width) / 2;
            const currentRodCenterX = (currentRodPosition.left + currentRodPosition.width) / 2;
            // const distanceX = (targetRodCenterX - raisedNutWrapperCenterX) -(parseFloat(rodStyle.width)-parseFloat(rodStyle.marginLeft)*2);
            const distanceX = (targetRodCenterX - currentRodCenterX) - parseFloat(rodStyle.width) / 2;

            console.log(`distancex: ${distanceX}`);
            console.log(`width: ${rodStyle.marginLeft}`);

            // height: 12px; margin: 2px; 0 nuts in test rod
            const distanceY = targetRodPosition.top - raisedNutWrapperPosition.top;

            raisedNut.style.setProperty('--distanceX', `${distanceX}px`);
            raisedNutWrapper.style.setProperty('--distanceY', `${distanceY}px`);

            raisedNutWrapper.style.zIndex = '1';

            raisedNut.style.animation = 'moveNut-X 1.5s ease forwards';
            raisedNutWrapper.style.animation = 'moveNut-Y 1.5s ease forwards';

            // targetRod.appendChild(raisedNutWrapper);

            console.log(`source: ${raisedNutWrapperCenterX}`);
            console.log(`target: ${targetRodCenterX}`);

        } else {
            lowerNut();
            console.log('Lets lower it')
        }



    }

})