/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  $(document).on('keydown', handleKeyDown);
  const KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 }
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }
  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("KEY pressed")
    }
  }
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    wallCollision()
    repositionGameItem()
    redrawGameItem()
  }

  function wallCollision(){
    if(walker.positionX > $("#board").width() ){
      walker.positionX = $("#board").width()
      walker.speedX = 0
    }
    if(walker.positionX < 0){
      walker.positionX = 0
      walker.speedX = 0
    }
    if(walker.positionY > $("#board").height()){
      walker.speedY = 0
      walker.positionY = $("#board").height()
    }
    if(walker.positionY < 0){
      walker.positionY = 0
      walker.speedY = 0
    }
    
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log(event.which)
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    else if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }

  }  function handleKeyUp(event) {
    console.log(event.which)
    if (event.which === KEY.LEFT) {
      walker.speedX = 0
    }
    else if (event.which === KEY.RIGHT) {
      walker.speedX =0
    }
    else if (event.which === KEY.UP) {
      walker.speedY =0;
    }
    else if (event.which === KEY.DOWN) {
      walker.speedY =0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(newframe) {
    walker.positionX += walker.speedX
    walker.positionY += walker.speedY
  }
  function redrawGameItem(newframe) {
    $("#walker").css("left", walker.positionX)
    $("#walker").css("top", walker.positionY)
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
