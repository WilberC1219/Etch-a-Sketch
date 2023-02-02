/**
 * fill the webpage with 16 x 16 grid of square divs
 * look into the best way to make divs appear as a grid
 * example it can be done using;
 * 1) float/clear
 * 2) inline-block
 * 3) flexbox
 * 4) CCS Grid
*/


/**
 * This function creates a grid container with n x n cells
 * 
 * @param {n} - n is the number of boxes on each side of the grid
 * @returns a grid_container with n X n cells
 */
function createGrid(n=16){
    //create grid-container, add grid-container class
    const grid_container = document.createElement(`div`);
    grid_container.classList.add(`grid-container`);
    grid_container.style.cssText = `grid-template-rows: repeat(${n}, 1fr); grid-template-columns: repeat(${n}, 1fr)`;

    //adds n*n cells to the grid
    //cells will have their initial css class added
    for(let i = 0; i < n * n; i++){
        let cell = document.createElement(`div`);
        cell.classList.add(`grid-cell-initial`);

        cell.addEventListener('mouseover', () => {
            //if this cell has a mouse hover over, remove current class
            // and add new color depending on mode
            cell.className = "";

            if(rgb_mode === "off"){
                cell.classList.add(`grid-cell-black`);
            }
            else{
                cell.classList.add(`grid-cell-rgb`);
            }
        });
        grid_container.appendChild(cell);
    }
    return grid_container;
}

/**
 * 
 * @param {option}  
 */
function modeChange(option){
    //option button was clicked, update mode variable
    rgb_mode = option.srcElement.value;
    console.log(`rgb mode is now: ${rgb_mode}`);
}   


//get all doms that provide info of grid
const sketch_zone = document.getElementById(`sketch-zone`);
const size_label = document.querySelector(`span[name="grid-size-span"]`);
const size_dom = document.querySelector(`input[name="grid-size-input"]`);
const rgb_radios = document.querySelectorAll(`input[type="radio"]`);
let rgb_mode = "off";

//initialize the radio buttons checked status and add event listener for when 
// one of the buttons are clicked
rgb_radios.forEach((option) => {
    if(option.value === "off"){
        option.checked = true;
    }
    option.addEventListener('input', modeChange);
});


//add default text for span 
size_label.appendChild(document.createTextNode(`${size_dom.value} x ${size_dom.value}`));

//create grid using details from size_dom, rbg_radios
sketch_zone.appendChild(createGrid(Number(size_dom.value), ));


//add event listener to the range slider incase the input is changed
size_dom.addEventListener('input', () => {
    //update grid size label
    size_label.removeChild(size_label.firstChild);
    size_label.appendChild(document.createTextNode(`${size_dom.value} x ${size_dom.value}`));

    //update the grid itself
    sketch_zone.removeChild(sketch_zone.firstChild);
    sketch_zone.appendChild(createGrid(Number(size_dom.value)));

});



