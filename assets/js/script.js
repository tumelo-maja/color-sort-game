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
         
        //console.log(selectedNut);

        // selectedNut.classList.toggle("raise-nut");

        let nutStyle = getComputedStyle(selectedNut);
        let nuts = document.querySelectorAll(".nut");

        let nutPosition = this.getAttribute("data-number");

        // offset = 30px (transform value) + marginBottom + height
        let offset = 32 +(( parseInt(nutStyle.height)*2)*(8-nutPosition));
        console.log(`offset: ${offset}`);
        console.log(`marginBottom: ${parseInt(nutStyle.marginBottom)}`);
        console.log(`height: ${parseInt(nutStyle.height)}`);
        console.log(`Data number: ${nutPosition}`);
        
        selectedNut.style.transform = `translateY(-${offset}px)`; 
        // selectedNut.style.backgroundColor = "red"; 
        console.log(selectedNut);
        // console.log(`margin: ${parseInt(nutStyle.marginBottom)}`);


    }
    
})