/* VARIABLES */

//Title Screen
let levelStartButton;
let levelSelectButton;
let dataButton;
let settingsButton;
let customer;
let levelName;

//Settings Screen
let musicHeading;
let musicMuteButton;
let musicUpButton;
let musicDownButton;

let sfxHeading;
let sfxMuteButton;
let sfxUpButton;
let sfxDownButton;

//Group for bars
let musicVolumeBars;
let sfxVolumeBars;

//List of bars
let musicBars;
let sfxBars;

let sfx;

let sfxVolume = 10;
let lastSfxVolume = 0;
let musicVolume = 10;
let lastMusicVolume = 0;

let bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8, bar9, bar10;
let bar11, bar12, bar13, bar14, bar15, bar16, bar17, bar18, bar19, bar20;

//Menu
let settingsBg;
let settingsScreenHeading;
let exitButton;

// Manage game states
let screen = "";
let lastLevel = 0;
let stage = "none";
let orderComplete = false;
let customersServed = 0;

//Level 1 - Order
let barTable;
let orderBubble;
let okButton;
let elaborateButton;
let order;
let customerNum = 0;
let customerObject;

//Level 1 - Conditions
let bottles;
let bottle1, bottle2, bottle3, bottle4, bottle5, bottle6, bottle7;
let bottleNames = [];
let rightBottles = [];
let wrongBottles = [];
let displayBottles = [];
let listOfbottles = [];

//Level 1 - Substance

let board;
let substance;
let carbonContainer;
let bromineContainer;
let hydrogenContainer;

let substanceBubble;

let carbons;
let bromines;
let hydrogens;

let carbon1, carbon2, carbon3, carbon4, carbon5;
let bromine1, bromine2, bromine3, bromine4, bromine5;
let hydrogen1,
  hydrogen2,
  hydrogen3,
  hydrogen4,
  hydrogen5,
  hydrogen6,
  hydrogen7,
  hydrogen8,
  hydrogen9,
  hydrogen10;

let instructions;
let buttons;
let button1, button2, button3, button4, button5;
let initialising;

let state;

let carbonsMade = 0;
let brominesMade = 0;
let hydrogensMade = 0;

//Level 1 - Mechanism

let numberOfSteps = 0;
let steps = [];

let reactionReagent;
let bonds;

let removeButton;

let linee;

//Save data
let levelData = {
  orderStage: 0,
  conditionsStage: 0,
  substanceStage: 0,
  mechanismStage: 0,
  maxOrder: 0,
  maxConditions: 0,
  maxSubstance: 0,
  maxMechanism: 0,
};

/* PRELOAD LOADS FILES */
//preload
function preload() {
  font = loadFont("assets/Ohell-Regular.ttf");
  song1 = loadSound("assets/2008ToyotaCorolla.mp3");
  beep = loadSound("assets/Beep.mp3");
  bg = loadImage("assets/titleScreen.png");
  limbo = loadImage("assets/limboUnbiased.png");

  neutralCustomer = loadImage("assets/limboUnbiased.png");
  annoyedCustomer = loadImage("assets/limboAnnoyed.png");

  butlerImg = loadImage("assets/butler.png");

  bottleImg = loadImage("assets/bottle.PNG");
  orders = loadJSON("recipes.json");
  caCon = loadImage("assets/carbonContainer.png");
  brCon = loadImage("assets/bromineContainer.png");

  happyCustomer = loadImage("assets/limboHappy.png");
  okCustomer = loadImage("assets/limboMid.png");
  angryCustomer = loadImage("assets/limboMad.png");
}
/* SETUP RUNS ONCE */
//setup
function setup() {
  //Create canvas for game

  createCanvas(1080, 720);
  background("yellow");

  //Create buttons
  levelStartButton = new Sprite(-200, -200);
  levelSelectButton = new Sprite(-50, -50);
  dataButton = new Sprite(-200, -200);
  settingsButton = new Sprite(-50, -50);
  settingsButton.collider = "none";

  customer = new Sprite(-200, -200);
  levelName = new Sprite(-200, -200);
  butler = new Sprite(-200, -200);

  //Order Stage
  customer = new Sprite(-200, 1000);

  barTable = new Sprite(-200, -200);

  orderBubble = new Sprite(-200, -200);
  orderBubble.color = "rgb(237,232,208)";

  okButton = new Sprite(-200, -200);
  okButton.color = "rgb(246,209,153)";
  okButton.collider = "none";
  okButton.textSize = 40;

  elaborateButton = new Sprite(-200, -200);
  elaborateButton.color = "rgb(246, 209, 153)";
  elaborateButton.collider = "none";
  elaborateButton.textSize = 40;

  //Conditions Stage - Creates a group for bottles in second stage as their properties are the same
  bottles = new Group();
  bottles.img = bottleImg;
  bottles.img.scale = 0.05;
  bottles.w = 40;
  bottles.h = 150;
  bottles.pos = { x: -2000, y: -2000 };
  bottles.collider = "s";
  bottles.textColor = "white";

  //Conditions Stage - Individual bottles
  bottle1 = new bottles.Sprite();
  bottle2 = new bottles.Sprite();
  bottle3 = new bottles.Sprite();
  bottle4 = new bottles.Sprite();
  bottle5 = new bottles.Sprite();
  bottle6 = new bottles.Sprite();
  bottle7 = new bottles.Sprite();

  //Conditions Stage - Functionality of bottles - clicking and setting as answer
  bottle1func = new bottleFunctions(bottle1);
  bottle2func = new bottleFunctions(bottle2);
  bottle3func = new bottleFunctions(bottle3);
  bottle4func = new bottleFunctions(bottle4);
  bottle5func = new bottleFunctions(bottle5);
  bottle6func = new bottleFunctions(bottle6);
  bottle7func = new bottleFunctions(bottle7);

  //Substance Stage - background
  board = new Sprite(-200, -200);
  board.collider = "none";
  substanceBubble = new Sprite(-200, -200);
  substanceBubble.color = "rgb(237,232,208)";

  carbonContainer = new Sprite(-200, -200);
  carbonContainer.collider = "s";
  carbonContainer.img = caCon;

  bromineContainer = new Sprite(-200, -200);
  bromineContainer.img = brCon;
  bromineContainer.collider = "s";

  hydrogenContainer = new Sprite(-200, -200);
  hydrogenContainer.collider = "s";

  instructions = new Sprite(-200, -200);
  instructions.layer = 35;
  instructions.collider = "none";
  instructions.textSize = 40;

  buttons = new Group();
  buttons.collider = "static";
  buttons.textSize = 20;
  buttons.w = 100;
  buttons.h = 55;

  carbons = new Group();
  carbons.layer = 20;
  carbons.element = "carbon";
  carbons.color = "rgb(268, 75, 75)";
  Hide(carbons);
  carbons.diameter = 80;
  carbons.collider = "static";
  carbons.bonds = [];

  carbon1 = new carbons.Sprite();
  carbon2 = new carbons.Sprite();
  carbon3 = new carbons.Sprite();
  carbon4 = new carbons.Sprite();
  carbon5 = new carbons.Sprite();

  bromines = new Group();
  bromines.color = "rgb(94, 105, 178)";
  bromines.element = "bromine";
  Hide(bromines);
  bromines.diameter = 50;
  bromines.collider = "static";

  bromine1 = new bromines.Sprite();
  bromine2 = new bromines.Sprite();
  bromine3 = new bromines.Sprite();
  bromine4 = new bromines.Sprite();
  bromine5 = new bromines.Sprite();

  hydrogens = new Group();
  hydrogens.color = "rgb(255, 212, 125)";
  hydrogens.element = "hydrogen";
  Hide(hydrogens);
  hydrogens.diameter = 40;
  hydrogens.collider = "static";

  //Mechanism Stage
  reactionReagent = new Sprite(-200, -200);
  reactionReagent.collider = "none";
  reactionReagent.color = "rgba(237,232,208,0)";
  reactionReagent.stroke = "rgba( 255, 255, 255, 0 )";

  bonds = new Group();
  bonds.color = "rgb(118, 6, 4)";
  bonds.stroke = "rgba( 255, 255, 255, 0 )";
  bonds.collider = "s";
  bonds.w = 10;
  bonds.h = 10;

  removeButton = new Sprite(-200, -200);
  removeButton.collider = "s";
  removeButton.w = 40;
  removeButton.h = 30;
  removeButton.color = "rgba( 255, 255, 255, 0 )";
  removeButton.stroke = "rgba( 255, 255, 255, 0 )";
  removeButton.text = "Remove";
  removeButton.textSize = 30;
  removeButton.textColor = "rgb(118, 6, 4)";

  //Settings Screen - Background, title and exit button
  settingsBg = new Sprite(-200, -200);
  settingsScreenHeading = new Sprite(-200, -200);
  exitButton = new Sprite(-200, -200);
  exitButton.collider = "none";

  //Settings Screen - Music
  musicHeading = new Sprite(-200, -200);
  musicMuteButton = new Sprite(-200, -200);
  musicMuteButton.collider = "none";
  musicUpButton = new Sprite(-200, -200);
  musicUpButton.collider = "none";
  musicDownButton = new Sprite(-200, -200);
  musicDownButton.collider = "none";

  musicVolumeBars = new Group();
  musicVolumeBars.color = "rgb(115, 107, 107)";
  musicVolumeBars.stroke = "rgba( 255, 255, 255, 0 )";
  musicVolumeBars.collider = "s";
  musicVolumeBars.w = 55;
  musicVolumeBars.h = 30;

  //Settings Screen - SFX
  sfxHeading = new Sprite(-200, -200);
  sfxMuteButton = new Sprite(-200, -200);
  sfxMuteButton.collider = "none";
  sfxUpButton = new Sprite(-200, -200);
  sfxUpButton.collider = "none";
  sfxDownButton = new Sprite(-200, -200);
  sfxDownButton.collider = "none";

  sfxVolumeBars = new Group();
  sfxVolumeBars.color = "rgb(115, 107, 107)";
  sfxVolumeBars.stroke = "rgba( 255, 255, 255, 0 )";
  sfxVolumeBars.collider = "s";
  sfxVolumeBars.w = 55;
  sfxVolumeBars.h = 30;

  loadLevel1Order();
  customerArrival();
  customerOrder();
}
/* DRAW LOOP REPEATS */
//draw
function draw() {
  switch (stage) {
    case "orderStage":
      orderStage();
      break;
    case "conditionsStage":
      conditionsStage();
      break;
    case "substanceStage":
      substanceStage();
      break;
  }
}
/* FUNCTIONS */
//Functions

//General

//General function  used to hide sprites from view when not in use
function Hide(sprite) {
  sprite.pos = { x: -200, y: -200 };
}

//Order stage
function loadLevel1Order() {
  stage = "orderStage";

  barTable.pos = { x: width / 2, y: 600 };
  barTable.w = 1080;
  barTable.h = 450;
  barTable.color = "black";
  barTable.collider = "none";
}
function customerArrival() {
  customer.w = width / 10;
  customer.h = 500;
  customer.img = neutralCustomer;
  customer.collider = "none";
  customer.x = (width / 10) * 1.5;
  customer.y = 700;

  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      customer.y -= 5;
      background("yellow");
    }, i * 6);
  }
}
function customerOrder() {
  setTimeout(() => {
    orderBubble.pos = { x: width - 420, y: 250 };
    orderBubble.w = 650;
    orderBubble.h = 400;
    orderBubble.textFont = font;
    orderBubble.collider = "none";
    orderBubble.textSize = 50;

    okButton.collider = "static";
    okButton.pos = { x: width - 500, y: 480 };
    okButton.w = 100;
    okButton.h = 55;
    okButton.text = "ok";
    okButton.textFont = font;

    elaborateButton.pos = { x: width - 340, y: 480 };
    elaborateButton.collider = "static";
    elaborateButton.w = 100;
    elaborateButton.h = 55;
    elaborateButton.text = "huh?";
    elaborateButton.textFont = font;
  }, 800);

  order = setOrder();
  customerObject = new Customer(order);
  orderBubble.text = customerObject.makeOrder();
}
function orderStage() {
  if (elaborateButton.mouse.presses()) {
    orderBubble.text = customerObject.elaborate();
    customerObject.elaborations += 1;
  }
  if (okButton.mouse.presses()) {
    okButton.collider = "static";
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        camera.x += 5;
        background("yellow");
        barTable.x = camera.x;
      }, i * 6);
    }
    loadLevel1Conditions();
    stage = "conditionsStage";
  }
}
function loadLevel1Conditions() {
  bottle1.x = 270 + 995;
  bottle2.x = 540 + 995;
  bottle3.x = 810 + 995;

  bottle4.x = 135 + 995;
  bottle5.x = 405 + 995;
  bottle6.x = 675 + 995;
  bottle7.x = 945 + 995;

  bottle1.y = height / 2;
  bottle2.y = bottle1.y;
  bottle3.y = bottle1.y;
  bottle4.y = 475;
  bottle5.y = 475;
  bottle6.y = 475;
  bottle7.y = 475;

  okButton.collider = "static";
  okButton.pos = { x: width - 125 + 995, y: height - 100 };
  okButton.w = 100;
  okButton.h = 55;
  okButton.text = "ok";
  okButton.textFont = font;

  elaborateButton.collider = "static";
  elaborateButton.pos = { x: 125 + 995, y: height - 100 };
  elaborateButton.w = 100;
  elaborateButton.h = 55;
  elaborateButton.text = "huh?";
  elaborateButton.textFont = font;

  listOfbottles = [
    bottle1,
    bottle2,
    bottle3,
    bottle4,
    bottle5,
    bottle6,
    bottle7,
  ];
  //Get the bottles to display from bottlesToDisplay() function
  displayBottles = bottlesToDisplay();
  //Shuffles order of bottles so all correct answers aren't always together at start
  shuffleArray(displayBottles);

  //Add text to each bottle to assign random condition/reagent
  for (let i = 0; i < 7; i++) {
    let bottle = listOfbottles[i];
    bottle.text = displayBottles[i];
  }

  bottle1func.setAns(rightBottles);
  bottle2func.setAns(rightBottles);
  bottle3func.setAns(rightBottles);
  bottle4func.setAns(rightBottles);
  bottle5func.setAns(rightBottles);
  bottle6func.setAns(rightBottles);
  bottle7func.setAns(rightBottles);

  bottleFuncs = [
    bottle1func,
    bottle2func,
    bottle3func,
    bottle4func,
    bottle5func,
    bottle6func,
    bottle7func,
  ];
}
function bottlesToDisplay() {
  bottleNames = [
    "hydroxide",
    "reflux",
    " heat",
    " aqueous",
    "excess ammonia",
    "warm",
    " high pressure",
    "cyanide",
    "sodium hydroxide",
    "hot",
    " in ethanol",
  ];

  rightBottles.push(order.reagent); //Adds reagent from customer's order to right bottles list

  //Add conditions from customer's order to right bottles list
  for (let i = 0; i < order.conditions.length; i++) {
    rightBottles.push(order.conditions[i]);
  }
  console.log(rightBottles);

  wrongBottles = bottleNames;
  let indexesToRemove = [];

  //Records indexes of right bottles to remove from wrong bottle as popping from here will change length of wrong bottles
  for (let i = 0; i < rightBottles.length; i++) {
    for (let j = 0; j < wrongBottles.length; j++) {
      if (wrongBottles[j] == rightBottles[i]) {
        indexesToRemove.push(j);
      }
    }
  }

  //Removes the correct bottles from wrong bottles
  for (let i = 0; i < indexesToRemove.length; i++) {
    if (indexesToRemove[i] - i > 0) {
      wrongBottles.splice(indexesToRemove[i] - i, 1);
    } else {
      wrongBottles.splice(0, 1);
    }
  }

  console.log(wrongBottles);

  //Selects 7 bottles - all right bottles + additional random bottles
  for (let i = 0; i < rightBottles.length; i++) {
    displayBottles.push(rightBottles[i]);
  }

  shuffleArray(wrongBottles);

  for (let i = 0; i < 7 - rightBottles.length; i++) {
    displayBottles.push(wrongBottles[i]);
    console.log(displayBottles);
  }

  return displayBottles;
}
function conditionsStage() {
  if (elaborateButton.mouse.presses()) {
    // orderBubble.text = customerObject.elaborate()
    // console.log(customerObject.moodPercentage)
    // console.log(stage)
  }
  if (okButton.mouse.presses()) {
    // orders.getDataFromReagents();
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        camera.y -= 10;
        background("yellow");
        barTable.x = camera.x;
      }, i * 6);
    }
    loadLevel1Substance();

    stage = "substanceStage";
  }
  if (bottle1.mouse.presses()) {
    bottle1func.click();
  }
  if (bottle2.mouse.presses()) {
    bottle2func.click();
  }
  if (bottle3.mouse.presses()) {
    bottle3func.click();
  }
  if (bottle4.mouse.presses()) {
    bottle4func.click();
  }
  if (bottle5.mouse.presses()) {
    bottle5func.click();
  }
  if (bottle6.mouse.presses()) {
    bottle6func.click();
  }
  if (bottle7.mouse.presses()) {
    bottle7func.click();
  }
}
function setOrder() {
  let orderNumber = int(random(0, 3));
  return orders.recipes[orderNumber];
}
function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Substance stage

function loadLevel1Substance() {
  board.pos = { x: width / 2 + 995, y: height / 2 - 2000 };
  board.w = width * 0.9;
  board.h = height * 0.9;
  board.collider = "s";
  board.color = "red";
  board.stroke = "rgb(118, 6, 4)";
  board.layer = 1;

  carbonContainer.w = 200;
  carbonContainer.h = 200;
  carbonContainer.pos = { x: 105 + 995, y: 230 - 2000 };
  carbonContainer.collider = "s";
  carbonContainer.color = "red";
  carbonContainer.stroke = "rgb(118, 6, 4)";
  carbonContainer.layer = 15;

  bromineContainer.w = 200;
  bromineContainer.h = 200;
  bromineContainer.pos = { x: 105 + 995, y: 510 - 2000 };
  bromineContainer.collider = "s";
  bromineContainer.color = "red";
  bromineContainer.stroke = "rgb(118, 6, 4)";
  bromineContainer.layer = 15;

  okButton.pos = { x: 750 + 995, y: 510 - 2000 };

  createLists();
}
function createLists() {
  listOfCarbons = [carbon1, carbon2, carbon3, carbon4, carbon5];
  listOfBromines = [bromine1, bromine2, bromine3, bromine4, bromine5];
  listOfHydrogens = [
    hydrogen1,
    hydrogen2,
    hydrogen3,
    hydrogen4,
    hydrogen5,
    hydrogen6,
    hydrogen7,
    hydrogen8,
    hydrogen9,
    hydrogen10,
  ];
}
function substanceStage() {
  if (elaborateButton.mouse.presses()) {
    // orderBubble.text = customerObject.elaborate()
    // console.log(customerObject.moodPercentage)
    // console.log(stage)
  }
  if (okButton.mouse.presses()) {
    linee = new Sprite(carbon1.x, carbon1.y, [
      Math.sqrt((carbon1.x - carbon2.x) ** 2 + (carbon1.y - carbon2.y) ** 2),
      360 -
        90 -
        (Math.atan((carbon1.x - carbon2.x) / (carbon1.y - carbon2.y)) * 180) /
          Math.PI,
    ]);
    console.log(
      (carbon1.x + carbon2.x) / 2,
      (carbon1.y + carbon2.y) / 2,
      Math.sqrt((carbon1.x - carbon2.x) ** 2 + (carbon1.y - carbon2.y) ** 2),
      360 -
        90 -
        (Math.atan((carbon1.x - carbon2.x) / (carbon1.y - carbon2.y)) * 180) /
          Math.PI
    );
    linee.collider = "s";
    // playerData.getDataFromReagent;
    // for (let i = 0; i < 200; i++) {
    //   setTimeout(() => {
    //     camera.y -= 10;
    //     background("yellow");
    //     console.log(camera.y);
    //   }, i * 6);
    // }
    // loadLevel1Mechanism();

    // stage = "mechanismStage";
  }
  initialiseElement();

  carbon1Functionality();
  carbon2Functionality();
  carbon3Functionality();
  carbon4Functionality();
  carbon5Functionality();
}

function initialiseElement() {
  //Makes a new Carbon
  if (carbonContainer.mouse.presses()) {
    if (carbonsMade < 5) {
      listOfCarbons[carbonsMade].pos = { x: mouse.x, y: mouse.y };
      carbonsMade += 1;
    }
  }

  //Makes a new Bromine
  if (bromineContainer.mouse.presses()) {
    if (brominesMade < 5) {
      listOfBromines[brominesMade].pos = { x: mouse.x, y: mouse.y };
      brominesMade += 1;
    }
  }

  //Makes a new Hydrogen
  if (hydrogenContainer.mouse.presses()) {
    if (hydrogensMade < 10) {
      listOfHydrogens[hydrogensMade].pos = { x: mouse.x, y: mouse.y };
      hydrogensMade += 1;
    }
  }
}
function moveElement(atom) {
  atom.pos = { x: mouse.x + atom.mouse.x, y: mouse.y + atom.mouse.y };
  background("yellow");
}
function removeElement(atom) {
  if (removeButton.mouse.presses()) {
    Hide(atom);
    let toRemove;
    //Checks element removes from appropriate list and replaces at the end
    if (atom.element == "carbon") {
      carbonsMade -= 1;
      for (let i = 0; i < listOfCarbons; i++) {
        if (listOfCarbons[i] == atom) {
          toRemove = i;
        }
      }
      listOfCarbons.splice(toRemove, 1);
      listOfCarbons.push(atom);
    }
  }
  background("yellow");
}

function carbon1Functionality() {
  //Move Carbon 1

  if (carbon1.mouse.hovering()) {
    removeButton.pos = { x: carbon1.x + 20, y: carbon1.y - 20 };
    if (carbon1.mouse.dragging()) {
      Hide(removeButton);
      moveElement(carbon1);
    } else if (removeButton.mouse.presses()) {
      carbons.collider = "s";
      removeElement(carbon1);
    }
    if (carbon1.x == carbon2.x + 60) {
      console.log("over");
      bond.display();
    }
  } else {
    Hide(removeButton);
  }
}

function carbon2Functionality() {
  //Move Carbon 2
  if (carbon2.mouse.dragging()) {
    moveElement(carbon2);
  }
}
function carbon3Functionality() {
  //Move Carbon 3
  if (carbon3.mouse.dragging()) {
    moveElement(carbon3);
  }
}
function carbon4Functionality() {
  //Move Carbon 4
  if (carbon4.mouse.dragging()) {
    moveElement(carbon4);
  }
}
function carbon5Functionality() {
  //Move Carbon 5
  if (carbon5.mouse.dragging()) {
    moveElement(carbon5);
  }
}
// function carbon2Functionality(){

//     //Carbon 2
//     if(carbon2.mouse.dragging()){
//         moveElement(carbon2);
//         Hide(removeButton)
//     }
//     if(carbon2.mouse.hovering()){
//         removeButton.pos = {x: carbon2.x+20, y: carbon2.y-20}
//         removeElement(carbon2);
//     }

// function carbon3Functionality(){

//     //Carbon 3
//     if(carbon3.mouse.hovering()){
//         removeButton.pos = {x: carbon3.x+20, y: carbon3.y-20}
//         removeElement(carbon3);
//     }
//     if(carbon3.mouse.dragging()){
//         moveElement(carbon3);
//         Hide(removeButton)
//     }

// }
// function carbon4Functionality(){

//     //Carbon 4
//     if(carbon4.mouse.hovering()){
//         removeButton.pos = {x: carbon4.x+20, y: carbon4.y-20}
//         removeElement(carbon4);
//     }
//     if(carbon4.mouse.dragging()){
//         moveElement(carbon4);
//         Hide(removeButton)
//     }

// }
// function carbon5Functionality(){

//     //Carbon 5
//     if(carbon5.mouse.hovering()){
//         removeButton.pos = {x: carbon5.x+20, y: carbon5.y-20}
//         removeElement(carbon5);
//     }
//     if(carbon5.mouse.dragging()){
//         moveElement(carbon5);
//         Hide(removeButton)
//     }

// }
//Classes ig
class Customer {
  constructor(order) {
    this.elaborations = 0;
    this.mood = "waiting";
    this.moodPercentage = 100;
    this.sprite = "";
    this.order = order;
  }
  setSprite() {
    if ((this.mood = "waiting")) {
      if (this.moodPercentage >= 80) {
        customer.img = neutralCustomer;
      } else if (this.moodPercentage < 85) {
        customer.img = annoyedCustomer;
      }
    }
  }
  makeOrder() {
    let initialOrder = `${this.order.product} please!`;
    return initialOrder;
  }
  elaborate() {
    console.log(this.elaborations);
    this.setSprite();
    if (this.elaborations == 0) {
      this.moodPercentage -= 5;
      let newOrder = `I think it has ${this.order.reagent}...`;
      console.log(this.elaborations);
      return newOrder;
    } else if (this.elaborations == 1) {
      this.moodPercentage -= 5;
      let newOrder = `Umm and it needs these conditions: ${this.order.conditions}. :/`;
      console.log(this.elaborations);
      return newOrder;
    } else if (this.elaborations <= 4) {
      this.moodPercentage -= 5;
      if (this.order.product == "nitrile") {
        let newOrder = `Sigh... so my order was for a ${this.order.product} which has ${this.order.reagent} and needs ${this.order.conditions}. Got that?`;
        console.log(this.elaborations);

        return newOrder;
      } else {
        let newOrder = `Sigh... so my order was for an ${this.order.product} which has ${this.order.reagent} and needs ${this.order.conditions}. Got that?`;
        console.log(this.elaborations);

        return newOrder;
      }
    } else {
      for (let i = 0; i < 70; i++) {
        setTimeout(() => {
          customer.y += 5;
          background("yellow");
        }, i * 6);
      }
    }
  }
}
class bottleFunctions {
  constructor(bottleNumber) {
    this.bottleNumber = bottleNumber;
    this.clicked = false;
    this.answer = false;
  }
  setAns(answers) {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == this.bottleNumber.text) {
        this.answer = true;
      } else {
        this.answer = false;
      }
    }
  }
  click() {
    if (this.clicked === false) {
      this.clicked = true;
      this.bottleNumber.y -= 20;
      background("yellow");
    } else if (this.clicked === true) {
      this.clicked = false;
      this.bottleNumber.y += 20;
      background("yellow");
    } else {
      console.log("x");
    }
  }
}
class collectData {
  constructor() {
    this.dataFromOrder = 0;
    this.dataFromReagents = 0;
    this.dataFromSubstance = 0;
    this.dataFromMechanism = 0;
  }
  getDataFromOrder(customer) {
    if (customer.moodPercentage > 85) {
      this.dataFromOrder += 1;
    } else {
      console.log("U should know better");
    }
  }
  getDataFromReagents() {
    let ammountCorrect = 0;
    for (let i = 0; i < bottleFuncs.length; i++) {
      if (bottleFuncs[i].clicked == true) {
        if (bottleFuncs[i].answer == true) {
          ammountCorrect += 1;
        }
      }
    }
    this.dataFromReagents += ammountCorrect;
    console.log(this.dataFromReagents);
  }
  getDataFromSubstance() {}
  getDataFromMechanism() {}
}

class Element {
  constructor() {
    this.name = "";
    this.maxBonds = 0;
    this.noOfBonds = 0;
    this.bonds = [];
    this.saturated = false;
  }
  connectElement() {
    this.noOfBonds += 1;
  }
  disconnectElement() {
    this.noOfBonds -= 1;
  }
  setSaturation() {
    if (this.noOfBonds == this.maxBonds) {
      this.saturated == true;
    } else {
      this.saturated == false;
    }
  }
}

class Bond {
  constructor(atom1, atom2) {
    this.atom1 = atom1;
    this.atom2 = atom2;
  }

  display() {
    line(this.atom1.x, this.atom2.y);
    console.log(this.atom1.x, this.atom2.y);
    console.log("done");
  }
}
