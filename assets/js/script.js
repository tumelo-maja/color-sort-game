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
        const currentNut = e.target;
        const raisedRod = currentNut.parentElement.parentElement;
        console.log('This is the current rod');
        console.log(raisedRod);

        if (currentRod !== raisedRod) {
            console.log('Lets move it')

            const raisedNutWrapperRect = raisedNutWrapper.getBoundingClientRect();
            const currentRodRect = currentRod.getBoundingClientRect();

            raisedNutWrapper.style.left = (raisedNutWrapperRect.left - currentRodRect.left) + "px";
            raisedNutWrapper.style.top = (raisedNutWrapperRect.top - currentRodRect.top) + "px";

            // Pass two animations together 1) raised to target rod and 2) target rod top to base
            const dur1 = 1;
            const dur2 = 1;
            // raisedNut.style.animation = `moveNutToLid ${dur1}s ease forwards, moveNutDownRod ${dur2}s ease 0.5s forwards`;
            // raisedNutWrapper.style.animation = `moveNutToLid ${dur1}s ease forwards, moveNutDownRod ${dur2} ease 0.5s forwards`;
            // raisedNut.style.animation = `moveNutToLid ${dur1}s ease forwards`;
            // raisedNutWrapper.style.animation = `moveNutToLid ${dur1}s ease forwards`;

            // raisedNut.style.animation = 'returnNut 0.5s ease forwards';



            // Get styles to compare colors
            const targetNutColor = currentNut.getAttribute("data-color");
            const raisedNutColor = raisedNut.getAttribute("data-color");

            console.log(`Source color: ${raisedNutColor}`);
            console.log(`Target color: ${targetNutColor}`);

            // raisedNutWrapper.addEventListener('animationend', function () {


            // if lastchild (top nut) does not match, return nut
            if (raisedNutColor === targetNutColor) {
                raisedNutWrapper.appendChild(raisedNut);
                currentRod.appendChild(raisedNutWrapper);

                raisedNut.classList.add("success-move");
                raisedNutWrapper.classList.add("success-move");

                let animateStages = 0;
                raisedNutWrapper.addEventListener('animationend', () => {
                    animateStages++;
                    if (animateStages === 2) {
                        raisedNut.classList.remove("success-move");
                        raisedNutWrapper.classList.remove("success-move");
                        console.log('Both animations finished; class removed.');
                    }
                });

            } else {
                raisedNut.style.animation = 'returnNut 0.5s ease forwards';
                raisedNutWrapper.style.animation = 'returnNut 0.5s ease forwards';
                // lowerNut();
            }





            // const targetRod = e.target.parentElement.parentElement;
            // // console.log(currentRod);
            // console.log(currentRod);
            // console.log(raisedNutWrapper);

            // // calcukate distance between the raised nut and the target rod 
            // const raisedNutWrapperPosition = raisedNutWrapper.getBoundingClientRect();
            // const currentRodPosition = currentRod.getBoundingClientRect();
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