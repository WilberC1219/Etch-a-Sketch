/**
 * This function creates a grid container with n x n cells
 *
 * @param {n} - n is the number of boxes on each side of the grid
 * @returns a grid_container with n X n cells
 */
function createGrid(n = 16) {
  //create grid-container, add grid-container class
  const grid_container = document.createElement(`div`);
  grid_container.classList.add(`grid-container`);
  grid_container.style.cssText = `grid-template-rows: repeat(${n}, 1fr); grid-template-columns: repeat(${n}, 1fr)`;

  //adds n*n cells to the grid
  //cells will have their initial css class added
  for (let i = 0; i < n * n; i++) {
    let cell = document.createElement(`div`);
    cell.classList.add(`grid-cell-initial`);

    //covers when mouse is hovering over a cell and mouse is down
    cell.addEventListener("mouseover", changeColor);

    //covers when cell is clicked
    cell.addEventListener("mousedown", changeColor);
    grid_container.appendChild(cell);
  }
  return grid_container;
}

/**
 * This changes the color of the cell's whose's eventlistener
 * fired off
 *
 * @param {mouse_event} - the mouse_event that caused this function to be 
 * called. This event contains the source element whose's event triggered
 * 
 */
function changeColor(mouse_event) {
  const cell = mouse_event.srcElement;

  //do not change cell when mouseover and mousedown is false
  if(mouse_event.type === 'mouseover' && !mousedown) return;
    
  //otherwise change color
  //first remove all styling from the cell
  cell.className = "";
  cell.style = "";

  //if rgb_mode is off, then set cell to be black
  if (mode === "normal") {
    cell.classList.add(`grid-cell-black`);
  } 
  else if(mode ==="rgb") { //rbg mode is on, set cell to a random background color
    let [x, y, z] = genRandomXYZ();
    cell.style = `background-color: rgb(${x},${y},${z});`;
  }
  else{
    //set cell back to initial color
    cell.classList.add(`grid-cell-initial`);
  }
  
}

/**
 * This function changes the global variable "mode"
 * so that the program knows what color to change the cell to.
 * 
 * @param {option} -the radio button option that was selected. This contains the 
 * radio button that was clicked, whos value we need to update mode variable.
 */
function modeChange(option) {
  //option button was clicked, update mode variable
  mode = option.srcElement.value;
}


/**
 * This function generates 3 random numbers. The numbers can be anything
 * in the range from 0 to 255
 * 
 * @return The function returns the array "xyz", where its size is 3.
 * xyz[0] is the first number to use in the rgb css funtion 
 * xyz[1] is the seconds number to use in the rgb css funtion 
 * xyz[2] is the last number to use in the rgb css funtion 
 */
function genRandomXYZ() {
  let xyz = [0, 0, 0];
  for (let i = 0; i < xyz.length; i++) {
    xyz[i] = Math.floor(Math.random() * 256);
  }
  return xyz;
}


/**
 * This function will initialize the user's screen to the initial state before any 
 * sketching is done on the sketch zone. This function initializes the reset button,
 * size label, size slider, and the radio buttons, and also creates the screens grid.
 */
function initializeSketch() {
  //button initialization
  rgb_radios.forEach((option) => {
    if (option.value === "normal") {
      option.checked = true;
    }
    option.addEventListener("input", modeChange);
  });

  initResetBtn();
  initSizeLabel();
  initSizeSlider();
  //create grid using details from size_dom, rbg_radios
  sketch_zone.appendChild(createGrid(Number(size_dom.value)));
}


/**
 * This function will initialize the size label that will be updated
 * each time the range slider is moved
 */
function initSizeLabel() {
  //add default text for span
  size_label.appendChild(
    document.createTextNode(`${size_dom.value} x ${size_dom.value}`)
  );
}



/**
 * This function will initialize the reset button that will have an 
 * event listener, listening to clicks. When this button is clicked it will clear the grid of all drawings
 */
function initResetBtn() {
  //initialize reset button
  reset_btn.addEventListener("click", () => {
    sketch_zone.removeChild(sketch_zone.firstChild);
    sketch_zone.appendChild(createGrid(Number(size_dom.value)));
  });
}


/**
 * This function will initialize the grid size slider. Which wiill update the size label when moved 
 * and also create a new grid of the size that the user leaves the slider at.
 */
function initSizeSlider() {
  //add event listener to the range slider incase the input is changed
  size_dom.addEventListener("input", () => {
    //update grid size label
    size_label.removeChild(size_label.firstChild);
    size_label.appendChild(
      document.createTextNode(`${size_dom.value} x ${size_dom.value}`)
    );

    //update the grid itself
    sketch_zone.removeChild(sketch_zone.firstChild);
    sketch_zone.appendChild(createGrid(Number(size_dom.value)));
  });
}

//get all doms that provide info of grid
const sketch_zone = document.getElementById(`sketch-zone`);
const size_label = document.querySelector(`span[name="grid-size-span"]`);
const size_dom = document.querySelector(`input[name="grid-size-input"]`);
const rgb_radios = document.querySelectorAll(`input[type="radio"]`);
const reset_btn = document.querySelector(`button[name="reset"]`);
let mousedown = false;

//listen for any click on a cell in sketch zone
document.addEventListener('mousedown', () => {
  mousedown = true
});

//listen for whenever the mouseup event occurs
document.addEventListener('mouseup', () => {
  mousedown = false
});


//variable that determines color the grid cells will be when hovered
let mode = "normal";

//initialize etch-a-sketch
initializeSketch();
