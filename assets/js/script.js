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

    var rootSelector = document.querySelector(':root'); 

    rootSelector.style.setProperty('--raisePositionTop', '23px');
    rootSelector.style.setProperty('--raisePositionLeft', '10px');
    rootSelector.style.setProperty('--raiseMaxTop', '10px');
    rootSelector.style.setProperty('--raiseMaxLeft', '50px');
    rootSelector.style.setProperty('--lidPositionTop', '23px');
    rootSelector.style.setProperty('--lidPositionLeft', '68px');
    rootSelector.style.setProperty('--targetPositionTop', '88px');
    rootSelector.style.setProperty('--targetPositionLeft', '68px');

    // end of variables

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
     * Move raised nut to another rod
     */
    function moveNut(e) {
        // Get raised nut
        const raisedNut = document.querySelector(".raise-nut");
        const raisedNutWrapper = raisedNut.parentElement;
        const raisedRod = raisedNutWrapper.parentElement;
        const targetNut = e.target;
        const targetRod = targetNut.parentElement.parentElement;
        console.log('This is the current rod');
        console.log(raisedRod);

        if (targetRod !== raisedRod) {
            console.log('Lets move it')

            const raisedNutWrapperRect = raisedNutWrapper.getBoundingClientRect();
            const targetRodRect = targetRod.getBoundingClientRect();

            // raisedNutWrapper.style.left = (raisedNutWrapperRect.left - currentRodRect.left) + "px";
            // raisedNutWrapper.style.top = (raisedNutWrapperRect.top - currentRodRect.top) + "px";

            // Get styles to compare colors
            const targetNutColor = targetNut.getAttribute("data-color");
            const raisedNutColor = raisedNut.getAttribute("data-color");

            console.log(`Source color: ${raisedNutColor}`);
            console.log(`Target color: ${targetNutColor}`);

            // if lastchild (top nut) color does not match, return nut
            if (raisedNutColor === targetNutColor) {

                raisedNut.classList.add("success-move");
                raisedNutWrapper.classList.add("success-move");

                let animateStages = 0;
                raisedNutWrapper.addEventListener('animationend', () => {
                    animateStages++;
                    if (animateStages === 2) {
                        raisedNutWrapper.appendChild(raisedNut);
                        targetRod.appendChild(raisedNutWrapper);
                        raisedNut.classList.remove("success-move", "raise-nut");
                        raisedNutWrapper.classList.remove("success-move");
                    }
                });

            } else {
                raisedNut.style.animation = 'returnNut 0.5s ease forwards';
                raisedNutWrapper.style.animation = 'returnNut 0.5s ease forwards';
                // lowerNut();
            }





            // const targetRod = e.target.parentElement.parentElement;
            // // console.log(targetRod);
            // console.log(targetRod);
            // console.log(raisedNutWrapper);

            // // calcukate distance between the raised nut and the target rod 
            // const raisedNutWrapperPosition = raisedNutWrapper.getBoundingClientRect();
            // const currentRodPosition = targetRod.getBoundingClientRect();
            // const targetRodPosition = targetRod.getBoundingClientRect();
            // const nutStyle = window.getComputedStyle(raisedNut);
            // const rodStyle = window.getComputedStyle(targetRod);

            // // get the .rod object centeres
            // const targetRodCenterX = (targetRodPosition.left + targetRodPosition.width) / 2;
            // const currentRodCenterX = (currentRodPosition.left + currentRodPosition.width) / 2;
            // const distanceX = (targetRodCenterX - currentRodCenterX) - parseFloat(rodStyle.width) / 2;

            // console.log(`distance: ${distanceX}`);
            // console.log(`width: ${rodStyle.marginLeft}`);

            // // height: 12px; margin: 2px; 0 nuts in test rod
            // // const distanceY = targetRodPosition.top - raisedNutWrapperPosition.top;
            // const distanceY = targetRodPosition.top - currentRodPosition.top;

            // console.log(targetRodPosition);

            // raisedNut.style.setProperty('--distanceX', `${distanceX}px`);
            // raisedNutWrapper.style.setProperty('--distanceY', `${distanceY}px`);

            // raisedNutWrapper.style.zIndex = '1';

            // raisedNut.style.animation = 'moveNut-X 1.5s ease forwards';
            // raisedNutWrapper.style.animation = 'moveNut-Y 1.5s ease forwards';

            // // targetRod.appendChild(raisedNutWrapper);

            // raisedNutWrapper.addEventListener('animationend', function () {
            //     raisedNutWrapper.appendChild(raisedNut);
            //     targetRod.appendChild(raisedNutWrapper);
            //     raisedNut.style.animation = 'none';
            //     raisedNutWrapper.style.animation = 'none';
            //     lowerNut();
            // });     

        } else {
            lowerNut();
            console.log('Lets lower it')
        }

    }

})