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

let carbon1, carbon2, carbon3, carbon4;
let bromine;
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

//Save data
let levelData = {orderStage: 0, conditionsStage: 0, substanceStage: 0, mechanismStage: 0, maxOrder: 0, maxConditions: 0, maxSubstance: 0, maxMechanism:0};

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
  let width = 1080;
  let height = 720;
  createCanvas(width, height);
  background(bg);

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
  carbons.pos = { x: -200, y: -200 };
  carbons.diameter = 80;
  carbons.collider = "static";
  carbons.bonds = [];

  bromines = new Group();
  bromines.color = "rgb(94, 105, 178)";
  bromines.element = "bromine";
  bromines.pos = { x: -200, y: -200 };
  bromines.diameter = 50;
  bromines.collider = "static";

  hydrogens = new Group();
  hydrogens.color = "rgb(255, 212, 125)";
  hydrogens.element = "hydrogen";
  hydrogens.pos = { x: -200, y: -200 };
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

  //Collects player data after each round
  playerData = new collectData();

  loadHomeScreen();
  backgroundMusic(song1);
}

/* DRAW LOOP REPEATS */
//draw
function draw() {
  switch (screen) {
    case "Home":
      HomeScreen();
      break;
    case "Settings":
      settingsScreen();
      break;
    case "Level 1":
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
        case "mechanismStage":
          mechanismStage();
          break;
        default:
          break;
      }
    default:
      break;
  }
}

/* FUNCTIONS */

//Loads all sprites needed on home screen
function loadHomeScreen() {
  screen = "Home";

  removeSettingsScreen();

  background(bg);
  fill(255, 255, 255);
  textAlign(CENTER);
  textSize(90);
  textFont(font);
  text("O-H Hell", width / 2, 300);

  // Add level start button
  levelStartButton.w = width / 5;
  levelStartButton.h = 40;
  levelStartButton.pos = { x: width / 2 + 10, y: (height / 10) * 5 };
  levelStartButton.collider = "s";
  levelStartButton.color = "rgba( 255, 255, 255, 0 )";
  levelStartButton.stroke = "rgba( 0, 0, 0, 0)";
  levelStartButton.text = "Start Game";
  levelStartButton.textSize = 50;
  levelStartButton.textFont = font;
  levelStartButton.textColor = "rgba( 255, 255, 255, 255 )";

  // Add level select button
  levelSelectButton.w = width / 5;
  levelSelectButton.h = 40;
  levelSelectButton.pos = { x: width / 2 + 10, y: (height / 10) * 6 };
  levelSelectButton.collider = "s";
  levelSelectButton.color = "rgba( 255, 255, 255, 0 )";
  levelSelectButton.stroke = "rgba( 255, 255, 255, 0 )";
  levelSelectButton.text = "Level Select";
  levelSelectButton.textSize = 50;
  levelSelectButton.textFont = font;
  levelSelectButton.textColor = "rgba(255, 255, 255, 255 )";

  // Add data screen button
  dataButton.w = width / 5;
  dataButton.h = 40;
  dataButton.pos = { x: width / 2 + 10, y: (height / 10) * 7 };
  dataButton.collider = "s";
  dataButton.color = "rgba( 255, 255, 255, 0 )";
  dataButton.stroke = "rgba( 255, 255, 255, 0 )";
  dataButton.text = "Data";
  dataButton.textSize = 50;
  dataButton.textFont = font;
  dataButton.textColor = "rgba(255, 255, 255, 255 )";

  // Add settings screen button
  settingsButton.w = width / 5;
  settingsButton.h = 40;
  settingsButton.pos = { x: width / 2 + 10, y: (height / 10) * 8 };
  settingsButton.collider = "s";
  settingsButton.color = "rgba( 255, 255, 255, 0 )";
  settingsButton.stroke = "rgba( 255, 255, 255, 0 )";
  settingsButton.text = "Settings";
  settingsButton.textSize = 50;
  settingsButton.textFont = font;
  settingsButton.textColor = "rgba(255, 255, 255, 255 )";

  customer.w = width / 10;
  customer.h = 500;
  customer.img = limbo;
  customer.pos = { x: (width / 10) * 8.5, y: height / 2 };

  levelName.pos = { x: (width / 10) * 8.5, y: height / 2 - 260 };
  levelName.text = "Limbo";
  levelName.textFont = font;
  levelName.textColor = "rgb(210, 193, 87)";
  levelName.textSize = "70";
  levelName.w = 50;
  levelName.h = 30;
  levelName.color = "rgba( 255, 255, 255, 0 )";
  levelName.stroke = "rgba( 255, 255, 255, 0 )";
  levelName.collider = "none";
}

//Handles navigation from the homescreen
function HomeScreen() {
  if (levelStartButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    screen = "Level 1";
    loadLevel1Order();
  }
  if (levelSelectButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadLevelSelectScreen();
  }
  if (dataButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadStatsScreen();
  }
  if (settingsButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadSettingsScreen();
  }
}

//Loads a screen smaller than homescreen for manipulating sound
function loadSettingsScreen() {
  //Background of Settings Screen
  settingsBg.pos = { x: width / 2, y: height / 2 };
  settingsBg.w = width * 0.9;
  settingsBg.h = height * 0.9;
  settingsBg.collider = "none";
  settingsBg.color = "black";
  settingsBg.stroke = "rgb(118, 6, 4)";

  //Heading of Settings Screen
  settingsScreenHeading.pos = { x: width / 2, y: (height / 10) * 1.2 };
  settingsScreenHeading.w = 0;
  settingsScreenHeading.h = 0;
  settingsScreenHeading.collider = "none";
  settingsScreenHeading.color = "plum";
  settingsScreenHeading.stroke = "rgba( 255, 255, 255, 0 )";
  settingsScreenHeading.text = "Settings";
  settingsScreenHeading.textSize = 70;
  settingsScreenHeading.textColor = "rgb(118, 6, 4)";

  //Heading of music buttons
  musicHeading.pos = { x: width / 2, y: (settingsBg.y / 10) * 5 };
  musicHeading.w = 0;
  musicHeading.h = 0;
  musicHeading.collider = "none";
  musicHeading.color = "plum";
  musicHeading.stroke = "rgba( 255, 255, 255, 0 )";
  musicHeading.text = "Music Volume";
  musicHeading.textSize = 55;
  musicHeading.textColor = "rgb(118, 6, 4)";

  //Music buttons
  loadMusicButtons(musicVolume);

  //Heading of sfx buttons
  sfxHeading.pos = { x: width / 2, y: (settingsBg.y / 10) * 10 };
  sfxHeading.w = 0;
  sfxHeading.h = 0;
  sfxHeading.collider = "none";
  sfxHeading.color = "plum";
  sfxHeading.stroke = "rgba( 255, 255, 255, 0 )";
  sfxHeading.text = "Sound Effects Volume";
  sfxHeading.textSize = 55;
  sfxHeading.textColor = "rgb(118, 6, 4)";

  //Sfx
  loadSfxButtons(sfxVolume);

  //Button to exit Settings Screen and return to main menu
  exitButton.pos = { x: width / 2, y: (height / 10) * 8.5 };
  exitButton.w = 80;
  exitButton.h = 60;
  exitButton.collider = "s";
  exitButton.color = "rgba(0,0,0,0)";
  exitButton.stroke = "rgba( 255, 255, 255, 0 )";
  exitButton.textSize = 50;
  exitButton.textColor = "rgb(118, 6, 4)";

  //Changes depending on screen
  switch (screen) {
    case "Home":
      //Remove unneccessary sprites
      Hide(customer);
      Hide(levelName);
      exitButton.text = "Exit";
      break;
    case "Level 1":
      exitButton.text = "Resume";
      switch (stage) {
        case "conditionsStage":
          settingsBg.x = settingsBg.x + 995;
          settingsScreenHeading.x = settingsScreenHeading.x + 995;
          musicHeading.x = musicHeading.x + 995;
          sfxHeading.x = sfxHeading.x + 995;
          exitButton.x = exitButton.x + 995;
          break;
        case "substanceStage":
          settingsBg.pos = { x: settingsBg.x + 995, y: settingsBg.y - 2000 };
          settingsScreenHeading.pos = {
            x: settingsScreenHeading.x + 995,
            y: settingsScreenHeading.y - 2000,
          };
          musicHeading.pos = {
            x: musicHeading.x + 995,
            y: musicHeading.y - 2000,
          };
          sfxHeading.pos = { x: sfxHeading.x + 995, y: sfxHeading.y - 2000 };
          exitButton.pos = { x: exitButton.x + 995, y: exitButton.y - 2000 };
          break;
        case "mechanismStage":
          settingsBg.y = settingsBg.y - 2000;
          settingsScreenHeading.y = settingsScreenHeading.y - 2000;
          musicHeading.y = musicHeading.y - 2000;
          sfxHeading.y = sfxHeading.y - 2000;
          exitButton.y = exitButton.y - 2000;
          break;
        default:
          break;
      }

      break;
    default:
      break;
  }

  //Switch screen
  screen = "Settings";
  fill(118, 6, 4);
}

//Gets rid of settings screen
function removeSettingsScreen() {
  musicVolumeBars.removeAll();
  sfxVolumeBars.removeAll();

  Hide(settingsBg);
  Hide(settingsScreenHeading);
  Hide(exitButton);
  Hide(musicMuteButton);
  Hide(musicUpButton);
  Hide(musicDownButton);
  Hide(sfxMuteButton);
  Hide(sfxUpButton);
  Hide(sfxDownButton);
  Hide(musicHeading);
  Hide(sfxHeading);

  settingsBg.w = 0;
  settingsBg.h = 0;
}

//Handles functionality of settings screen
function settingsScreen() {
  setMusicVolume(musicVolume, song1);
  setSfxVolume(sfxVolume, beep);

  if (exitButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    if (exitButton.text == "Exit") {
      loadHomeScreen();
    } else {
      removeSettingsScreen();
      background(253, 253, 150);
      screen = "Level 1";
    }
  }
}

//This and load sfxbuttons load buttons used for audio manipulation
function loadMusicButtons(currentVolume) {
  musicMuteButton.pos = {
    x: (settingsBg.x / 10) * 2.7,
    y: (settingsBg.y / 10) * 7,
  };
  musicMuteButton.w = 60;
  musicMuteButton.h = 60;
  musicMuteButton.collider = "s";
  musicMuteButton.color = "rgba( 255, 255, 255, 0 )";
  musicMuteButton.stroke = "rgba( 255, 255, 255, 0 )";
  musicMuteButton.text = "Mute";
  musicMuteButton.textSize = 30;
  musicMuteButton.textColor = "rgb(118, 6, 4)";

  musicDownButton.pos = {
    x: musicMuteButton.x + musicMuteButton.w + 10,
    y: (settingsBg.y / 10) * 7,
  };
  musicDownButton.w = 60;
  musicDownButton.h = 60;
  musicDownButton.collider = "s";
  musicDownButton.color = "rgba( 255, 255, 255, 0 )";
  musicDownButton.stroke = "rgba( 255, 255, 255, 0 )";
  musicDownButton.text = "Down";
  musicDownButton.textSize = 30;
  musicDownButton.textColor = "rgb(118, 6, 4)";

  bar1 = new musicVolumeBars.Sprite();
  bar1.pos = {
    x: musicDownButton.x + musicDownButton.w + 10,
    y: musicDownButton.y,
  };

  bar2 = new musicVolumeBars.Sprite();
  bar2.pos = { x: bar1.x + bar1.w + 10, y: bar1.y };

  bar3 = new musicVolumeBars.Sprite();
  bar3.pos = { x: bar2.x + bar2.w + 10, y: bar1.y };

  bar4 = new musicVolumeBars.Sprite();
  bar4.pos = { x: bar3.x + bar3.w + 10, y: bar1.y };

  bar5 = new musicVolumeBars.Sprite();
  bar5.pos = { x: bar4.x + bar4.w + 10, y: bar1.y };

  bar6 = new musicVolumeBars.Sprite();
  bar6.pos = { x: bar5.x + bar5.w + 10, y: bar1.y };

  bar7 = new musicVolumeBars.Sprite();
  bar7.pos = { x: bar6.x + bar6.w + 10, y: bar1.y };

  bar8 = new musicVolumeBars.Sprite();
  bar8.pos = { x: bar7.x + bar7.w + 10, y: bar1.y };

  bar9 = new musicVolumeBars.Sprite();
  bar9.pos = { x: bar8.x + bar8.w + 10, y: bar1.y };

  bar10 = new musicVolumeBars.Sprite();
  bar10.pos = { x: bar9.x + bar9.w + 10, y: bar1.y };

  musicBars = [bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8, bar9, bar10];

  for (let i = 0; i < currentVolume; i++) {
    musicBars[i].color = "rgb(118, 6, 4)";
  }

  musicUpButton.pos = { x: bar10.x + bar10.w + 10, y: bar1.y };
  musicUpButton.w = 60;
  musicUpButton.h = 60;
  musicUpButton.collider = "s";
  musicUpButton.color = "rgba( 255, 255, 255, 0 )";
  musicUpButton.stroke = "rgba( 255, 255, 255, 0 )";
  musicUpButton.text = "Up";
  musicUpButton.textSize = 30;
  musicUpButton.textColor = "rgb(118, 6, 4)";

  switch (stage) {
    case "conditionsStage":
      musicMuteButton.x += 995;
      musicDownButton.x += 995;
      musicUpButton.x += 995;
      for (let i = 0; i < musicBars.length; i++) {
        musicBars[i].x += 995;
      }
      break;
    case "substanceStage":
      musicMuteButton.x += 995;
      musicDownButton.x += 995;
      musicUpButton.x += 995;
      for (let i = 0; i < musicBars.length; i++) {
        musicBars[i].x += 995;
      }

      musicMuteButton.y -= 2000;
      musicDownButton.y -= 2000;
      musicUpButton.y -= 2000;
      for (let i = 0; i < musicBars.length; i++) {
        musicBars[i].y -= 2000;
      }
      break;
    default:
      break;
  }
}

function loadSfxButtons(currentVolume) {
  sfxMuteButton.pos = {
    x: (settingsBg.x / 10) * 2.7,
    y: (settingsBg.y / 10) * 12,
  };
  sfxMuteButton.w = 60;
  sfxMuteButton.h = 60;
  sfxMuteButton.collider = "static";
  sfxMuteButton.color = "rgba( 255, 255, 255, 0 )";
  sfxMuteButton.stroke = "rgba( 255, 255, 255, 0 )";
  sfxMuteButton.text = "Mute";
  sfxMuteButton.textSize = 30;
  sfxMuteButton.textColor = "rgb(118, 6, 4)";

  bar11 = new sfxVolumeBars.Sprite();
  bar11.pos = {
    x: sfxMuteButton.x + sfxMuteButton.w * 2 + 20,
    y: sfxMuteButton.y,
  };

  bar12 = new sfxVolumeBars.Sprite();
  bar12.pos = { x: bar11.x + bar11.w + 10, y: bar11.y };

  bar13 = new sfxVolumeBars.Sprite();
  bar13.pos = { x: bar12.x + bar12.w + 10, y: bar11.y };

  bar14 = new sfxVolumeBars.Sprite();
  bar14.pos = { x: bar13.x + bar13.w + 10, y: bar11.y };

  bar15 = new sfxVolumeBars.Sprite();
  bar15.pos = { x: bar14.x + bar14.w + 10, y: bar11.y };

  bar16 = new sfxVolumeBars.Sprite();
  bar16.pos = { x: bar15.x + bar15.w + 10, y: bar11.y };

  bar17 = new sfxVolumeBars.Sprite();
  bar17.pos = { x: bar16.x + bar16.w + 10, y: bar11.y };

  bar18 = new sfxVolumeBars.Sprite();
  bar18.pos = { x: bar17.x + bar17.w + 10, y: bar11.y };

  bar19 = new sfxVolumeBars.Sprite();
  bar19.pos = { x: bar18.x + bar18.w + 10, y: bar11.y };

  bar20 = new sfxVolumeBars.Sprite();
  bar20.pos = { x: bar19.x + bar19.w + 10, y: bar11.y };

  sfxBars = [
    bar11,
    bar12,
    bar13,
    bar14,
    bar15,
    bar16,
    bar17,
    bar18,
    bar19,
    bar20,
  ];

  for (let i = 0; i < currentVolume; i++) {
    sfxBars[i].color = "rgb(118, 6, 4)";
  }

  sfxDownButton.pos = {
    x: sfxMuteButton.x + sfxMuteButton.w + 10,
    y: sfxMuteButton.y,
  };
  sfxDownButton.w = 60;
  sfxDownButton.h = 60;
  sfxDownButton.collider = "static";
  sfxDownButton.color = "rgba( 255, 255, 255, 0 )";
  sfxDownButton.stroke = "rgba( 255, 255, 255, 0 )";
  sfxDownButton.text = "Down";
  sfxDownButton.textSize = 30;
  sfxDownButton.textColor = "rgb(118, 6, 4)";

  sfxUpButton.pos = { x: bar20.x + bar20.w + 10, y: bar11.y };
  sfxUpButton.w = 60;
  sfxUpButton.h = 60;
  sfxUpButton.collider = "static";
  sfxUpButton.color = "rgba( 255, 255, 255, 0 )";
  sfxUpButton.stroke = "rgba( 255, 255, 255, 0 )";
  sfxUpButton.text = "Up";
  sfxUpButton.textSize = 30;
  sfxUpButton.textColor = "rgb(118, 6, 4)";

  switch (stage) {
    case "conditionsStage":
      sfxMuteButton.x += 995;
      sfxDownButton.x += 995;
      sfxUpButton.x += 995;
      for (let i = 0; i < sfxBars.length; i++) {
        sfxBars[i].x += 995;
      }
      break;
    case "substanceStage":
      sfxMuteButton.x += 995;
      sfxDownButton.x += 995;
      sfxUpButton.x += 995;
      for (let i = 0; i < sfxBars.length; i++) {
        sfxBars[i].x += 995;
      }

      sfxMuteButton.y -= 2000;
      sfxDownButton.y -= 2000;
      sfxUpButton.y -= 2000;
      for (let i = 0; i < sfxBars.length; i++) {
        sfxBars[i].y -= 2000;
      }
      break;
    default:
      break;
  }
}

//General function  used to hide sprites from view when not in use
function Hide(sprite) {
  sprite.pos = { x: -200, y: -200 };
}

//Set background music's volume and plays it on a loop
function backgroundMusic(bgMusic) {
  bgMusic.setVolume(0.3);
  musicVolume = 10;
  bgMusic.play();
  bgMusic.loop();
}

//Connects functions to buttons
function setMusicVolume(currentVolume, bgMusic) {
  if (musicMuteButton.mouse.presses()) {
    console.log(sfxVolume);
    soundEffect(sfxVolume, beep);
    musicVolume = muteUnmuteMusic(currentVolume, bgMusic);
  }
  if (musicUpButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    musicVolume = increaseMusicVolume(currentVolume, bgMusic);
  }
  if (musicDownButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    musicVolume = decreaseMusicVolume(currentVolume, bgMusic);
  }
}

//Mutes and unmutes background music
function muteUnmuteMusic(currentVolume, bgMusic) {
  if (currentVolume > 0) {
    bgMusic.setVolume(0);
    lastMusicVolume = currentVolume;
    currentVolume = 0;
    musicVolumeBars.color = "rgb(115, 107, 107)";
    return currentVolume;
  }
  if (currentVolume == 0) {
    currentVolume = lastMusicVolume;
    bgMusic.setVolume(currentVolume / 200);
    for (let i = 0; i < currentVolume; i++) {
      musicBars[i].color = "rgb(118, 6, 4)";
    }
    return currentVolume;
  }
}

//Increases volume of music within game
function increaseMusicVolume(currentVolume, bgMusic) {
  if (currentVolume == 0) {
    currentVolume = lastMusicVolume + 1;
    bgMusic.setVolume(currentVolume / 200);
    for (let i = 0; i < currentVolume; i++) {
      musicBars[i].color = "rgb(118, 6, 4)";
    }
  } else if ((currentVolume > 0) & (currentVolume < 10)) {
    currentVolume += 1;
    bgMusic.setVolume((0.3 * currentVolume) / 10);
    musicBars[currentVolume - 1].color = "rgb(118, 6, 4)";
  }
  return currentVolume;
}

//Decreases volume of music within game
function decreaseMusicVolume(currentVolume, bgMusic) {
  if (currentVolume > 0) {
    currentVolume -= 1;
    bgMusic.setVolume((0.3 * currentVolume) / 10);
    musicBars[currentVolume].color = "rgb(115, 107, 107)";
  } else if (currentVolume == 0) {
    currentVolume = lastMusicVolume - 1;
    bgMusic.setVolume(currentVolume / 200);
    for (let i = 0; i < currentVolume; i++) {
      musicBars[i].color = "rgb(118, 6, 4)";
    }
  }
  return currentVolume;
}

//Stops the game music from playing
function stopMusic(bgMusic) {
  bgMusic.stop();
}

//Connects functions to buttons
function setSfxVolume(currentVolume, sfx) {
  if (sfxMuteButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    sfxVolume = muteUnmuteSfx(currentVolume, sfx);
  }
  if (sfxUpButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    sfxVolume = increaseSfxVolume(currentVolume, sfx);
  }
  if (sfxDownButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    sfxVolume = decreaseSfxVolume(currentVolume, sfx);
  }
}
//Mutes and unmutes sound effects
function muteUnmuteSfx(currentVolume, sfx) {
  if (currentVolume > 0) {
    sfx.setVolume(0);
    lastSfxVolume = currentVolume;
    currentVolume = 0;
    sfxVolumeBars.color = "rgb(115, 107, 107)";
    return currentVolume;
  }
  if (currentVolume == 0) {
    currentVolume = lastSfxVolume;
    sfx.setVolume((currentVolume * 0.3) / 10);
    for (let i = 0; i < currentVolume; i++) {
      sfxBars[i].color = "rgb(118, 6, 4)";
    }
    return currentVolume;
  }
}
//Increases sound effect volume
function increaseSfxVolume(currentVolume, sfx) {
  if ((currentVolume > 0) & (currentVolume < 10)) {
    sfx.setVolume((currentVolume * 0.3) / 10);
    currentVolume += 1;
    sfxBars[currentVolume - 1].color = "rgb(118, 6, 4)";
  } else if (currentVolume == 0) {
    currentVolume = lastSfxVolume + 1;
    sfx.setVolume((currentVolume * 0.3) / 10);
    for (let i = 0; i < currentVolume; i++) {
      sfxBars[i].color = "rgb(118, 6, 4)";
    }
  }
  return currentVolume;
}
//Decreases sound effect volume
function decreaseSfxVolume(currentVolume, sfx) {
  if (currentVolume > 0) {
    sfx.setVolume((currentVolume * 0.3) / 10);
    currentVolume -= 1;
    sfxBars[currentVolume].color = "rgb(115, 107, 107)";
  } else if (currentVolume == 0) {
    currentVolume = lastSfxVolume - 1;
    sfx.setVolume((currentVolume * 0.3) / 10);
    for (let i = 0; i < currentVolume; i++) {
      sfxBars[i].color = "rgb(118, 6, 4)";
    }
  }
  return currentVolume;
}
//Plays sound effect
function soundEffect(currentVolume, sfx) {
  sfx.setVolume((0.3 * currentVolume) / 10);
  sfx.play();
}

//Level 1
//Functions

//Loads all sprites needed for order stage
function loadLevel1Order() {
  removeSettingsScreen();
  Hide(levelStartButton);
  Hide(levelName);

  settingsButton.pos = { x: 1030, y: 50 };
  settingsButton.layer = 25;
  settingsButton.text = "⏸️";
  settingsButton.textColor = "black";

  screen = "Level 1";
  stage = "orderStage";

  barTable.pos = { x: width / 2, y: 600 };
  barTable.w = 1080;
  barTable.h = 450;
  barTable.color = "black";
  barTable.collider = "none";

  customerArrival();
  customerOrder();
}

//Customer arrival animation
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
      background(253, 253, 150);
    }, i * 6);
  }
}

//Ensures order bubble created after customer arrives
function customerOrder() {
  setTimeout(() => {
    orderBubble.pos = { x: width - 420, y: 250 };
    orderBubble.w = 650;
    orderBubble.h = 400;
    orderBubble.textFont = font;
    orderBubble.collider = "none";
    orderBubble.textSize = 50;

    okButton.collider = "static";
    okButton.pos = { x: width - 340, y: 480 };
    okButton.w = 100;
    okButton.h = 55;
    okButton.text = "ok";
    okButton.textFont = font;

    elaborateButton.pos = { x: width - 500, y: 480 };
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

//Functionality of buttons in order stage
function orderStage() {
  if (orderComplete) {
    console.log(customersServed)
    if (customersServed < 8) {
      if (okButton.mouse.presses()) {
        reset()
        soundEffect(sfxVolume, beep);
        for (let i = 0; i < 70; i++) {
          setTimeout(() => {
            customer.y += 5;
            background(253, 253, 150);
          }, i * 6);
        }
        for (let i = 0; i < 80; i++) {
          setTimeout(() => {
            loadLevel1Order();
          }, i);
        }
        orderComplete = false;
      }
    }
    else if(customersServed = 8){
      save(levelData, 'playerData.json')
      stage = "end"
    }
    if (settingsButton.mouse.presses()) {
      soundEffect(sfxVolume, beep);
      loadSettingsScreen();
    }
  } else {
    if (elaborateButton.mouse.presses()) {
      soundEffect(sfxVolume, beep);
      orderBubble.text = customerObject.elaborate();
      customerObject.elaborations += 1;
    }
    if (okButton.mouse.presses()) {
      soundEffect(sfxVolume, beep);
      okButton.collider = "static";
      for (let i = 0; i < 200; i++) {
        setTimeout(() => {
          camera.x += 5;
          background(253, 253, 150);
          barTable.x = camera.x;
        }, i * 6);
      }
      loadLevel1Conditions();
      stage = "conditionsStage";
    }
    if (settingsButton.mouse.presses()) {
      soundEffect(sfxVolume, beep);
      loadSettingsScreen();
    }
  }
}

//Loads all sprites needed for conditions stage
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

  //Move Pause Button
  settingsButton.pos = { x: 1030 + 1000, y: 50 };

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
  //Checks if bottle is correct or not
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

//Chooses random bottles to be displayed including all from order
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

  console.log(order, rightBottles);

  wrongBottles = bottleNames;
  let indexesToRemove = [];

  //Records indexes of right bottles to remove from wrongBottles as popping from here will change length of wrong bottles
  for (let i = 0; i < rightBottles.length; i++) {
    for (let j = 0; j < wrongBottles.length; j++) {
      if (wrongBottles[j] == rightBottles[i]) {
        indexesToRemove.push(j);
      }
    }
  }

  console.log(wrongBottles);

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

//Functionality of buttons and bottles in conditions stage
function conditionsStage() {
  if (elaborateButton.mouse.presses()) {
    butler.w = width / 10;
    butler.h = 500;
    butler.img = butlerImg;
    butler.collider = "none";
    butler.x = (width / 10) * 1.5 + 1000;
    butler.y = 700;

    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        butler.y -= 5;
        background(253, 253, 150);
      }, i * 6);
    }
  }
  if (okButton.mouse.presses()) {
    playerData.getDataFromReagents();
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        camera.y -= 10;
        background(253, 253, 150);
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
  if (settingsButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadSettingsScreen();
  }
}

//Chooses a random order from JSON file
function setOrder() {
  let orderNumber = int(random(0, 3));
  return orders.recipes[orderNumber];
}

//Shuffles an array
function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Loads all sprites needed for substance stage
function loadLevel1Substance() {
  board.pos = { x: width / 2 + 995, y: height / 2 - 2000 };
  board.w = width * 0.9;
  board.h = height * 0.9;
  board.collider = "s";
  board.color = "rgba(201,173,151,255)";
  board.stroke = "rgb(118, 6, 4)";

  carbonContainer.w = 200;
  carbonContainer.h = 200;
  carbonContainer.pos = { x: 105 + 995, y: 230 - 2000 };
  carbonContainer.collider = "s";
  carbonContainer.color = "red";
  carbonContainer.stroke = "rgb(118, 6, 4)";

  bromineContainer.w = 200;
  bromineContainer.h = 200;
  bromineContainer.pos = { x: 105 + 995, y: 510 - 2000 };
  bromineContainer.collider = "s";
  bromineContainer.color = "red";
  bromineContainer.stroke = "rgb(118, 6, 4)";

  //Move Pause Button
  settingsButton.pos = { x: 2000, y: 50 - 2000 };

  button1 = new buttons.Sprite();
  button2 = new buttons.Sprite();
  button3 = new buttons.Sprite();
  button4 = new buttons.Sprite();

  createLists();

  substance = setSubstance();
  state = declareSubstance();

  console.log(state);
}

//Lists for each element
function createLists() {
  listOfCarbons = [carbon1, carbon2, carbon3, carbon4];
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

//Chooses a random starting compound from JSON file
function setSubstance() {
  if (order.reaction == "nucleophilic substitution") {
    let substanceNumber = int(random(0, 3));
    return orders.haloalkanes.primaryHalides[substanceNumber];
  } else {
    let substanceNumber = int(random(0, 2));
    return orders.haloalkanes.secondaryHalides[substanceNumber];
  }
}

//Buttons in substance stage
function substanceStage() {
  if (state == "declaring") {
    if (okButton.mouse.presses()) {
      state = "";
      Hide(substanceBubble);
      elaborateButton.pos = {
        x: elaborateButton.x + 550,
        y: height / 2 + 50 - 2050,
      };
      elaborateButton.text = "Add Hs";
      elaborateButton.w = 125;
      Hide(okButton);
    } else if (elaborateButton.mouse.presses()) {
      substanceBubble.text = `Its molecular formula \nis ${substance.formula}`;
    }
  } else {
    if (elaborateButton.mouse.presses()) {
      if (brominesMade > 0) {
        elaborateButton.text = "huh?";
        elaborateButton.w = 100;
        okButton.pos = { x: elaborateButton.x, y: height / 2 + 50 - 2050 };
        Hide(elaborateButton);
        background(253, 253, 150);
        initialiseHydrogens();
      }
    }
    if (okButton.mouse.presses()) {
      playerData.getDataFromSubstance();
      carbons.removeAll();
      hydrogens.removeAll();
      bromines.removeAll();
      soundEffect(sfxVolume, beep);
      for (let i = 0; i < 200; i++) {
        setTimeout(() => {
          camera.x -= 5;
          background(253, 253, 150);
          barTable.x = camera.x;
        }, i * 6);
      }
      loadLevel1Mechanism();
      initialiseMechanism();

      stage = "mechanismStage";
    }
    initialiseCarbons();
    if (carbonsMade > 0) {
      initialiseBromines();
    }
  }

  if (settingsButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadSettingsScreen();
  }
}
//Tells user the substance to create
function declareSubstance() {
  setTimeout(() => {
    substanceBubble.w = 650;
    substanceBubble.h = 400;
    substanceBubble.pos = { x: width / 2 + 50 + 995, y: 400 - 2050 };
    substanceBubble.textFont = font;
    substanceBubble.collider = "none";
    substanceBubble.textSize = 50;

    okButton.collider = "static";
    okButton.pos = { x: substanceBubble.x + 163, y: 650 - 2050 };
    okButton.w = 100;
    okButton.h = 55;
    okButton.text = "ok";
    okButton.textFont = font;
    okButton.layer = 35;

    elaborateButton.pos = { x: substanceBubble.x - 163, y: 650 - 2050 };
    elaborateButton.collider = "static";
    elaborateButton.w = 100;
    elaborateButton.h = 55;
    elaborateButton.text = "huh?";
    elaborateButton.textFont = font;
    elaborateButton.layer = 36;
  }, 800);

  substanceBubble.text = `Please make \n${substance.name}.`;

  return "declaring";
}

//Creates the number of carbons needed
function initialiseCarbons() {
  if (carbonContainer.mouse.presses()) {
    instructions.w = 500;
    instructions.h = 150;
    instructions.pos = { x: width / 2 + 995, y: height / 2 - 2050 };
    instructions.text = "How many carbons do you need?";

    button1.pos = { x: instructions.x - 225, y: instructions.y + 150 };
    button2.pos = { x: instructions.x - 75, y: button1.y };
    button3.pos = { x: button2.x + 150, y: button2.y };
    button4.pos = { x: button3.x + 150, y: button3.y };

    listOfButtons = [button1, button2, button3, button4];

    for (let i = 0; i < listOfButtons.length; i++) {
      listOfButtons[i].text = i + 1;
    }
    carbons.removeAll();
    bromines.removeAll();
    hydrogens.removeAll();
    carbonsMade = 0;
    initialising = "carbon";
  }
  if (initialising == "carbon") {
    if (button1.mouse.presses()) {
      Hide(instructions);
      for (let i = 0; i < listOfButtons.length; i++) {
        Hide(listOfButtons[i]);
      }
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x, y: board.y };
      carbonsMade = 1;
    } else if (button2.mouse.presses()) {
      Hide(instructions);
      for (let i = 0; i < listOfButtons.length; i++) {
        Hide(listOfButtons[i]);
      }
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x - 50, y: board.y };
      carbon2 = new carbons.Sprite();
      carbon2.pos = { x: board.x + 50, y: board.y };
      carbonsMade = 2;
    } else if (button3.mouse.presses()) {
      Hide(instructions);
      for (let i = 0; i < listOfButtons.length; i++) {
        Hide(listOfButtons[i]);
      }
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x - 100, y: board.y };
      carbon2 = new carbons.Sprite();
      carbon2.pos = { x: board.x, y: board.y };
      carbon3 = new carbons.Sprite();
      carbon3.pos = { x: board.x + 100, y: board.y };
      carbon3.bonds = [];
      carbonsMade = 3;
    } else if (button4.mouse.presses()) {
      Hide(instructions);
      for (let i = 0; i < listOfButtons.length; i++) {
        Hide(listOfButtons[i]);
      }
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x - 150, y: board.y };
      carbon2 = new carbons.Sprite();
      carbon2.pos = { x: board.x - 50, y: board.y };
      carbon3 = new carbons.Sprite();
      carbon3.pos = { x: board.x + 50, y: board.y };
      carbon3.bonds = [];
      carbon4 = new carbons.Sprite();
      carbon4.pos = { x: board.x + 150, y: board.y };
      carbon4.bonds = [];
      carbonsMade = 4;
    }
  }
}

//Creates bromine
function initialiseBromines() {
  if (bromineContainer.mouse.presses() & (carbon1.x == board.x)) {
    carbon1.bonds = [];
    bromines.removeAll();
    hydrogens.removeAll();
    bromine = new bromines.Sprite();
    bromine.pos = { x: carbon1.x, y: carbon1.y - 90 };
    brominesMade = 1;
    carbon1.bonds.push(bromine);
  } else if (bromineContainer.mouse.presses() & (carbon1.x < board.x)) {
    carbon1.bonds = [];
    bromines.removeAll();
    hydrogens.removeAll();
    carbon2.bonds = [];
    instructions.w = 500;
    instructions.h = 150;
    instructions.pos = { x: width / 2 + 995, y: height / 2 - 2050 };
    instructions.text = "Which carbon should the bromine be attached to?";

    button1.pos = { x: instructions.x - 75, y: instructions.y + 150 };
    button2.pos = { x: button1.x + 150, y: button1.y };

    listOfButtons = [button1, button2];

    for (let i = 0; i < listOfButtons.length; i++) {
      listOfButtons[i].text = i + 1;
    }
    bromines.removeAll();
    brominesMade = 0;
    initialising = "bromine";
  }

  if (button1.mouse.presses() & (initialising == "bromine")) {
    carbon1.bonds = [];
    bromines.removeAll();
    hydrogens.removeAll();
    Hide(instructions);
    for (let i = 0; i < listOfButtons.length; i++) {
      Hide(listOfButtons[i]);
    }
    bromine = new bromines.Sprite();
    bromine.pos = { x: carbon1.x, y: carbon1.y - 90 };
    brominesMade = 1;
    carbon1.bonds.push(bromine);
  } else if (button2.mouse.presses() & (initialising == "bromine")) {
    carbon2.bonds = [];
    bromines.removeAll();
    hydrogens.removeAll();
    Hide(instructions);
    for (let i = 0; i < listOfButtons.length; i++) {
      Hide(listOfButtons[i]);
    }
    bromine = new bromines.Sprite();
    bromine.pos = { x: carbon2.x, y: carbon2.y - 90 };
    brominesMade = 1;
    carbon2.bonds.push(bromine);
  }
}

function initialiseHydrogens() {
  hydrogens.removeAll();
  if (carbonsMade > 0) {
    createLists();
    let carbonList = listOfCarbons.splice(0, carbonsMade);

    hydrogens.removeAll(); // Clear existing hydrogens
    let hydrogensNeeded = carbonsMade * 2 + 1;
    let hydrogenIndex = 0;
    let offset = 90; // Increased offset to move hydrogens further from carbons

    // Place the first hydrogen at the start of the chain
    let firstCarbon = carbons[0];
    let firstHydrogen = new hydrogens.Sprite();
    firstHydrogen.pos = { x: firstCarbon.x - offset, y: firstCarbon.y };
    firstCarbon.bonds.push(firstHydrogen);
    console.log(firstCarbon.bonds);
    hydrogenIndex++;

    for (let i = 0; i < carbonsMade; i++) {
      console.log(carbonList);
      let selectedCarbon = carbonList[i];
      // Check if a bromine is attached to this carbon
      let bromineAbove =
        bromine.x == selectedCarbon.x && bromine.y == selectedCarbon.y - offset;
      let bromineBelow =
        bromine.x == selectedCarbon.x && bromine.y == selectedCarbon.y + offset;

      // Place hydrogen in available space at top
      if (hydrogenIndex < hydrogensNeeded) {
        if (!bromineAbove) {
          let hydrogen = new hydrogens.Sprite();
          hydrogen.pos = { x: selectedCarbon.x, y: selectedCarbon.y - offset };
          selectedCarbon.bonds.push(hydrogen);
          hydrogenIndex++;
        } else if (!bromineBelow) {
          let hydrogen = new hydrogens.Sprite();
          hydrogen.pos = { x: selectedCarbon.x, y: selectedCarbon.y + offset };
          selectedCarbon.bonds.push(hydrogen);
          hydrogenIndex++;
        } else {
          break;
        }
      }

      // Bottom hydrogens placement
      if (hydrogenIndex < hydrogensNeeded) {
        if (!bromineBelow) {
          let hydrogen = new hydrogens.Sprite();
          hydrogen.pos = { x: selectedCarbon.x, y: selectedCarbon.y + offset };
          selectedCarbon.bonds.push(hydrogen);
          hydrogenIndex++;
        } else if (!bromineAbove) {
          let hydrogen = new hydrogens.Sprite();
          hydrogen.pos = { x: selectedCarbon.x, y: selectedCarbon.y - offset };
          selectedCarbon.bonds.push(hydrogen);
          hydrogenIndex++;
        } else {
          break;
        }
      }
    }

    // Place the last hydrogen at the end of the chain
    if (hydrogenIndex - 1 < hydrogensNeeded) {
      let lastCarbon = carbonList[carbonsMade - 1];
      let lastHydrogen = new hydrogens.Sprite();
      lastHydrogen.pos = { x: lastCarbon.x + offset, y: lastCarbon.y };
      lastCarbon.bonds.push(lastHydrogen);
    }
  }
}

function finaliseStructure() {
  let finalStructure = [];

  createLists();

  for (let i = 0; i < carbonsMade; i++) {
    console.log(listOfCarbons[i]);
    finalStructure.push(listOfCarbons[i].element);
    if (listOfCarbons[i].bonds[0].element == "bromine") {
      listOfCarbons[i].bonds = listOfCarbons[i].bonds.slice(
        0,
        listOfCarbons[i].bonds.length - 1
      );
    }
    for (let j = 0; j < listOfCarbons[i].bonds.length; j++) {
      console.log(listOfCarbons[i].bonds[j]);
      finalStructure.push(listOfCarbons[i].bonds[j].element);
    }
  }
  console.log(finalStructure);

  return finalStructure;
}

function loadLevel1Mechanism() {
  Hide(carbonContainer);
  Hide(bromineContainer);
  board.pos = { x: width / 2, y: height / 2 - 2000 };
  board.w = width * 0.9;
  board.h = height * 0.9;
  board.collider = "s";
  board.color = "rgba(201,173,151,255)";
  board.stroke = "rgb(118, 6, 4)";

  // Move Pause Button
  settingsButton.pos = { x: 2000, y: 50 - 2000 };

  // Load in substance
  console.log(substance.carbons);
  console.log(substance.name);

  switch (substance.carbons) {
    case "1":
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x, y: board.y };
      bromine = new bromines.Sprite();
      bromine.pos = { x: carbon1.x, y: carbon1.y - 90 };
      hydrogen1 = new hydrogens.Sprite();
      hydrogen1.pos = { x: carbon1.x, y: carbon1.y + 90 };
      hydrogen2 = new hydrogens.Sprite();
      hydrogen2.pos = { x: carbon1.x + 90, y: carbon1.y };
      hydrogen3 = new hydrogens.Sprite();
      hydrogen3.pos = { x: carbon1.x - 90, y: carbon1.y };
      bond1 = new bonds.Sprite();
      bond1.pos = { x: carbon1.x, y: carbon1.y - 53 };
      bond1.height = 20;
      bond2 = new bonds.Sprite();
      bond2.pos = { x: carbon1.x, y: carbon1.y + 53 };
      bond2.height = 20;
      bond3 = new bonds.Sprite();
      bond3.pos = { x: carbon1.x + 53, y: carbon1.y };
      bond3.width = 20;
      bond4 = new bonds.Sprite();
      bond4.pos = { x: carbon1.x - 53, y: carbon1.y };
      bond4.width = 20;
      carbon1func = new ElementFunctions(carbon1);
      hydrogen1func = new ElementFunctions(hydrogen1);
      hydrogen2func = new ElementFunctions(hydrogen2);
      hydrogen3func = new ElementFunctions(hydrogen3);
      brominefunc = new ElementFunctions(bromine);
      bond1func = new ElementFunctions(bond1);
      bond2func = new ElementFunctions(bond2);
      bond3func = new ElementFunctions(bond3);
      bond4func = new ElementFunctions(bond4);
      console.log(carbon1);
      console.log(bromine);
      break;

    case "2":
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x - 50, y: board.y };
      carbon2 = new carbons.Sprite();
      carbon2.pos = { x: board.x + 50, y: board.y };
      bromine = new bromines.Sprite();
      bromine.pos = { x: carbon1.x, y: carbon1.y - 90 };
      hydrogen1 = new hydrogens.Sprite();
      hydrogen1.pos = { x: carbon1.x, y: carbon1.y + 90 };
      hydrogen2 = new hydrogens.Sprite();
      hydrogen2.pos = { x: carbon1.x - 90, y: carbon1.y };
      hydrogen3 = new hydrogens.Sprite();
      hydrogen3.pos = { x: carbon2.x, y: carbon2.y + 90 };
      hydrogen4 = new hydrogens.Sprite();
      hydrogen4.pos = { x: carbon2.x + 90, y: carbon2.y };
      hydrogen5 = new hydrogens.Sprite();
      hydrogen5.pos = { x: carbon2.x, y: carbon2.y - 90 };
      bond1 = new bonds.Sprite();
      bond1.pos = { x: carbon1.x, y: carbon1.y - 53 };
      bond1.height = 20;
      bond2 = new bonds.Sprite();
      bond2.pos = { x: carbon1.x, y: carbon1.y + 53 };
      bond2.height = 20;
      bond3 = new bonds.Sprite();
      bond3.pos = { x: carbon1.x - 53, y: carbon1.y };
      bond3.width = 20;
      bond4 = new bonds.Sprite();
      bond4.pos = { x: carbon2.x, y: carbon2.y - 53 };
      bond4.height = 20;
      bond5 = new bonds.Sprite();
      bond5.pos = { x: carbon2.x, y: carbon2.y + 53 };
      bond5.height = 20;
      bond6 = new bonds.Sprite();
      bond6.pos = { x: carbon2.x + 53, y: carbon2.y };
      bond6.width = 20;
      bond7 = new bonds.Sprite();
      bond7.pos = { x: carbon1.x + 50, y: carbon1.y };
      bond7.width = 18;
      carbon1func = new ElementFunctions(carbon1);
      carbon2func = new ElementFunctions(carbon2);
      hydrogen1func = new ElementFunctions(hydrogen1);
      hydrogen2func = new ElementFunctions(hydrogen2);
      hydrogen3func = new ElementFunctions(hydrogen3);
      hydrogen4func = new ElementFunctions(hydrogen4);
      hydrogen5func = new ElementFunctions(hydrogen5);
      brominefunc = new ElementFunctions(bromine);
      bond1func = new ElementFunctions(bond1);
      bond2func = new ElementFunctions(bond2);
      bond3func = new ElementFunctions(bond3);
      bond4func = new ElementFunctions(bond4);
      bond5func = new ElementFunctions(bond5);
      bond6func = new ElementFunctions(bond6);
      bond7func = new ElementFunctions(bond7);
      break;

    case "3":
      switch (substance.name) {
        case "1-Bromopropane":
          carbon1 = new carbons.Sprite();
          carbon1.pos = { x: board.x - 100, y: board.y };
          carbon2 = new carbons.Sprite();
          carbon2.pos = { x: board.x, y: board.y };
          carbon3 = new carbons.Sprite();
          carbon3.pos = { x: board.x + 100, y: board.y };
          bromine = new bromines.Sprite();
          bromine.pos = { x: carbon1.x, y: carbon1.y - 90 };
          hydrogen1 = new hydrogens.Sprite();
          hydrogen1.pos = { x: carbon1.x, y: carbon1.y + 90 };
          hydrogen2 = new hydrogens.Sprite();
          hydrogen2.pos = { x: carbon1.x - 90, y: carbon1.y };
          hydrogen3 = new hydrogens.Sprite();
          hydrogen3.pos = { x: carbon2.x, y: carbon2.y + 90 };
          hydrogen4 = new hydrogens.Sprite();
          hydrogen4.pos = { x: carbon2.x, y: carbon2.y - 90 };
          hydrogen5 = new hydrogens.Sprite();
          hydrogen5.pos = { x: carbon3.x, y: carbon3.y + 90 };
          hydrogen6 = new hydrogens.Sprite();
          hydrogen6.pos = { x: carbon3.x + 90, y: carbon3.y };
          hydrogen7 = new hydrogens.Sprite();
          hydrogen7.pos = { x: carbon3.x, y: carbon3.y - 90 };
          bond1 = new bonds.Sprite();
          bond1.pos = { x: carbon1.x, y: carbon1.y - 53 };
          bond1.height = 20;
          bond2 = new bonds.Sprite();
          bond2.pos = { x: carbon1.x, y: carbon1.y + 53 };
          bond2.height = 20;
          bond3 = new bonds.Sprite();
          bond3.pos = { x: carbon1.x - 53, y: carbon1.y };
          bond3.width = 20;
          bond4 = new bonds.Sprite();
          bond4.pos = { x: carbon1.x + 50, y: carbon2.y };
          bond4.width = 18;
          bond5 = new bonds.Sprite();
          bond5.pos = { x: carbon2.x, y: carbon2.y - 53 };
          bond5.height = 20;
          bond6 = new bonds.Sprite();
          bond6.pos = { x: carbon2.x, y: carbon2.y + 53 };
          bond6.height = 20;
          bond7 = new bonds.Sprite();
          bond7.pos = { x: carbon2.x + 50, y: carbon2.y };
          bond7.width = 18;
          bond8 = new bonds.Sprite();
          bond8.pos = { x: carbon3.x, y: carbon3.y - 53 };
          bond8.height = 20;
          bond9 = new bonds.Sprite();
          bond9.pos = { x: carbon3.x, y: carbon3.y + 53 };
          bond9.height = 20;
          bond10 = new bonds.Sprite();
          bond10.pos = { x: carbon3.x + 53, y: carbon3.y };
          bond10.width = 20;
          break;

        case "2-Bromopropane":
          carbon1 = new carbons.Sprite();
          carbon1.pos = { x: board.x - 100, y: board.y };
          carbon2 = new carbons.Sprite();
          carbon2.pos = { x: board.x, y: board.y };
          carbon3 = new carbons.Sprite();
          carbon3.pos = { x: board.x + 100, y: board.y };
          bromine = new bromines.Sprite();
          bromine.pos = { x: carbon2.x, y: carbon2.y - 90 };
          hydrogen1 = new hydrogens.Sprite();
          hydrogen1.pos = { x: carbon1.x, y: carbon1.y + 90 };
          hydrogen2 = new hydrogens.Sprite();
          hydrogen2.pos = { x: carbon1.x - 90, y: carbon1.y };
          hydrogen3 = new hydrogens.Sprite();
          hydrogen3.pos = { x: carbon1.x, y: carbon1.y - 90 };
          hydrogen4 = new hydrogens.Sprite();
          hydrogen4.pos = { x: carbon2.x, y: carbon2.y + 90 };
          hydrogen5 = new hydrogens.Sprite();
          hydrogen5.pos = { x: carbon3.x, y: carbon3.y + 90 };
          hydrogen6 = new hydrogens.Sprite();
          hydrogen6.pos = { x: carbon3.x + 90, y: carbon3.y };
          hydrogen7 = new hydrogens.Sprite();
          hydrogen7.pos = { x: carbon3.x, y: carbon3.y - 90 };
          bond1 = new bonds.Sprite();
          bond1.pos = { x: carbon1.x, y: carbon1.y - 53 };
          bond1.height = 20;
          bond2 = new bonds.Sprite();
          bond2.pos = { x: carbon1.x, y: carbon1.y + 53 };
          bond2.height = 20;
          bond3 = new bonds.Sprite();
          bond3.pos = { x: carbon1.x - 53, y: carbon1.y };
          bond3.width = 20;
          bond4 = new bonds.Sprite();
          bond4.pos = { x: carbon1.x + 50, y: carbon2.y };
          bond4.width = 18;
          bond5 = new bonds.Sprite();
          bond5.pos = { x: carbon2.x, y: carbon2.y - 53 };
          bond5.height = 20;
          bond6 = new bonds.Sprite();
          bond6.pos = { x: carbon2.x, y: carbon2.y + 53 };
          bond6.height = 20;
          bond7 = new bonds.Sprite();
          bond7.pos = { x: carbon2.x + 50, y: carbon2.y };
          bond7.width = 18;
          bond8 = new bonds.Sprite();
          bond8.pos = { x: carbon3.x, y: carbon3.y - 53 };
          bond8.height = 20;
          bond9 = new bonds.Sprite();
          bond9.pos = { x: carbon3.x, y: carbon3.y + 53 };
          bond9.height = 20;
          bond10 = new bonds.Sprite();
          bond10.pos = { x: carbon3.x + 53, y: carbon3.y };
          bond10.width = 20;
          break;
      }
      carbon1func = new ElementFunctions(carbon1);
      carbon2func = new ElementFunctions(carbon2);
      carbon3func = new ElementFunctions(carbon3);
      hydrogen1func = new ElementFunctions(hydrogen1);
      hydrogen2func = new ElementFunctions(hydrogen2);
      hydrogen3func = new ElementFunctions(hydrogen3);
      hydrogen4func = new ElementFunctions(hydrogen4);
      hydrogen5func = new ElementFunctions(hydrogen5);
      hydrogen6func = new ElementFunctions(hydrogen6);
      hydrogen7func = new ElementFunctions(hydrogen7);
      brominefunc = new ElementFunctions(bromine);
      bond1func = new ElementFunctions(bond1);
      bond2func = new ElementFunctions(bond2);
      bond3func = new ElementFunctions(bond3);
      bond4func = new ElementFunctions(bond4);
      bond5func = new ElementFunctions(bond5);
      bond6func = new ElementFunctions(bond6);
      bond7func = new ElementFunctions(bond7);
      bond8func = new ElementFunctions(bond8);
      bond9func = new ElementFunctions(bond9);
      break;
    case "4":
      carbon1 = new carbons.Sprite();
      carbon1.pos = { x: board.x - 150, y: board.y };
      carbon2 = new carbons.Sprite();
      carbon2.pos = { x: board.x - 50, y: board.y };
      carbon3 = new carbons.Sprite();
      carbon3.pos = { x: board.x + 50, y: board.y };
      carbon4 = new carbons.Sprite();
      carbon4.pos = { x: board.x + 150, y: board.y };
      bromine = new bromines.Sprite();
      bromine.pos = { x: carbon2.x, y: carbon2.y - 90 };
      hydrogen1 = new hydrogens.Sprite();
      hydrogen1.pos = { x: carbon1.x, y: carbon1.y + 90 };
      hydrogen2 = new hydrogens.Sprite();
      hydrogen2.pos = { x: carbon1.x - 90, y: carbon1.y };
      hydrogen3 = new hydrogens.Sprite();
      hydrogen3.pos = { x: carbon2.x, y: carbon2.y + 90 };
      hydrogen4 = new hydrogens.Sprite();
      hydrogen4.pos = { x: carbon1.x, y: carbon1.y - 90 };
      hydrogen5 = new hydrogens.Sprite();
      hydrogen5.pos = { x: carbon3.x, y: carbon3.y + 90 };
      hydrogen6 = new hydrogens.Sprite();
      hydrogen6.pos = { x: carbon3.x, y: carbon3.y - 90 };
      hydrogen7 = new hydrogens.Sprite();
      hydrogen7.pos = { x: carbon4.x, y: carbon4.y + 90 };
      hydrogen8 = new hydrogens.Sprite();
      hydrogen8.pos = { x: carbon4.x + 90, y: carbon4.y };
      hydrogen9 = new hydrogens.Sprite();
      hydrogen9.pos = { x: carbon4.x, y: carbon4.y - 90 };
      bond1 = new bonds.Sprite();
      bond1.pos = { x: carbon1.x, y: carbon1.y - 53 };
      bond1.height = 20;
      bond2 = new bonds.Sprite();
      bond2.pos = { x: carbon1.x, y: carbon1.y + 53 };
      bond2.height = 20;
      bond3 = new bonds.Sprite();
      bond3.pos = { x: carbon1.x - 53, y: carbon1.y };
      bond3.width = 20;
      bond4 = new bonds.Sprite();
      bond4.pos = { x: carbon1.x + 50, y: carbon2.y };
      bond4.width = 18;
      bond5 = new bonds.Sprite();
      bond5.pos = { x: carbon2.x, y: carbon2.y - 53 };
      bond5.height = 20;
      bond6 = new bonds.Sprite();
      bond6.pos = { x: carbon2.x, y: carbon2.y + 53 };
      bond6.height = 20;
      bond7 = new bonds.Sprite();
      bond7.pos = { x: carbon2.x + 50, y: carbon2.y };
      bond7.width = 18;
      bond8 = new bonds.Sprite();
      bond8.pos = { x: carbon3.x, y: carbon3.y - 53 };
      bond8.height = 20;
      bond9 = new bonds.Sprite();
      bond9.pos = { x: carbon3.x, y: carbon3.y + 53 };
      bond9.height = 20;
      bond10 = new bonds.Sprite();
      bond10.pos = { x: carbon3.x + 50, y: carbon3.y };
      bond10.width = 18;
      bond11 = new bonds.Sprite();
      bond11.pos = { x: carbon4.x, y: carbon4.y - 53 };
      bond11.height = 20;
      bond12 = new bonds.Sprite();
      bond12.pos = { x: carbon4.x, y: carbon4.y + 53 };
      bond12.height = 20;
      bond13 = new bonds.Sprite();
      bond13.pos = { x: carbon4.x + 53, y: carbon4.y };
      bond13.width = 20;

      carbon1func = new ElementFunctions(carbon1);
      carbon2func = new ElementFunctions(carbon2);
      carbon3func = new ElementFunctions(carbon3);
      carbon4func = new ElementFunctions(carbon4);
      hydrogen1func = new ElementFunctions(hydrogen1);
      hydrogen2func = new ElementFunctions(hydrogen2);
      hydrogen3func = new ElementFunctions(hydrogen3);
      hydrogen4func = new ElementFunctions(hydrogen4);
      hydrogen5func = new ElementFunctions(hydrogen5);
      hydrogen6func = new ElementFunctions(hydrogen6);
      hydrogen7func = new ElementFunctions(hydrogen7);
      hydrogen8func = new ElementFunctions(hydrogen8);
      hydrogen9func = new ElementFunctions(hydrogen9);
      brominefunc = new ElementFunctions(bromine);
      bond1func = new ElementFunctions(bond1);
      bond2func = new ElementFunctions(bond2);
      bond3func = new ElementFunctions(bond3);
      bond4func = new ElementFunctions(bond4);
      bond5func = new ElementFunctions(bond5);
      bond6func = new ElementFunctions(bond6);
      bond7func = new ElementFunctions(bond7);
      bond8func = new ElementFunctions(bond8);
      bond9func = new ElementFunctions(bond9);
      bond10func = new ElementFunctions(bond10);
      bond11func = new ElementFunctions(bond11);
      bond12func = new ElementFunctions(bond12);
      bond13func = new ElementFunctions(bond13);
      break;
  }
}

// Function to handle mechanism stage
function mechanismStage() {
  if (settingsButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadSettingsScreen();
  }
  if (okButton.mouse.presses()) {
    playerData.getDataFromMechanism();
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        camera.y -= 5;
        background(253, 253, 150);
      }, i * 6);
    }
  }
}

// Function to initialize mechanism
function initialiseMechanism() {
  if (order.reaction == "nucleophilic substitution") {
    numberOfSteps = 4;
    console.log(order);
    console.log(order.reagent);
    reactionReagent.text = `:${order.reagentFormula}`;
    reactionReagent.pos = { x: 650, y: 150 - 2000 };
    reactionReagent.textSize = 70;
    reactionReagent.width = 150;
    reactionReagent.height = 60;
    reactionReagent.collider = "static";
  } else {
    numberOfSteps = 6;
    reactionReagent.text = `:${substance.reagentFormula}`;
    reactionReagent.pos = { x: 650, y: 150 - 2000 };
    reactionReagent.textSize = 70;
    reactionReagent.width = 150;
    reactionReagent.height = 600;
    reactionReagent.collider = "static";
  }

  okButton.pos = { x: 125, y: height - 250 - 2000 };
  okButton.text = "Ok";
  okButton.textSize = 50;
  okButton.width = 150;
  okButton.height = 60;
  okButton.collider = "static";
  okButton.layer = 60;

  removeButton.pos = { x: width - 125, y: height - 250 - 2000 };
  removeButton.text = "Remove";
  removeButton.textSize = 50;
  removeButton.width = 150;
  removeButton.height = 60;
  removeButton.collider = "static";
}

// Function to handle order of mechanism
function orderOfMechanism() {
  if (numberOfSteps > 0) {
    if (reactionReagent.mouse.presses()) {
      steps.push(reactionReagent);
      reactionReagent.text = steps.length + reactionReagent.text;
      reactionReagent.textSize = 50;
      numberOfSteps -= 1;
    }
    switch (substance.carbons) {
      case "1":
        carbon1.layer = 60;
        bromine.layer = 60;
        hydrogen1.layer = 60;
        hydrogen2.layer = 60;
        hydrogen3.layer = 60;
        bond1.layer = 60;
        bond2.layer = 60;
        bond3.layer = 60;
        bond4.layer = 60;
        if (carbon1.mouse.presses()) {
          carbon1func.click();
          console.log("Carbon 1 clicked");
        }
        if (hydrogen1.mouse.presses()) {
          hydrogen1func.click();
          console.log("Hydrogen clicked");
        }
        if (hydrogen2.mouse.presses()) {
          hydrogen2func.click();
        }
        if (hydrogen3.mouse.presses()) {
          hydrogen3func.click();
        }
        if (bond1.mouse.presses()) {
          bond1func.click();
        }
        if (bond2.mouse.presses()) {
          bond2func.click();
        }
        if (bond3.mouse.presses()) {
          bond3func.click();
        }
        if (bond4.mouse.presses()) {
          bond4func.click();
        }
        if (bromine.mouse.presses()) {
          brominefunc.click();
        }
        break;
      case "2":
        carbon1.layer = 60;
        carbon2.layer = 60;
        bromine.layer = 60;
        hydrogen1.layer = 60;
        hydrogen2.layer = 60;
        hydrogen3.layer = 60;
        hydrogen4.layer = 60;
        hydrogen5.layer = 60;
        bond1.layer = 60;
        bond2.layer = 60;
        bond3.layer = 60;
        bond4.layer = 60;
        bond5.layer = 60;
        bond6.layer = 60;
        bond7.layer = 60;
        if (carbon1.mouse.presses()) {
          carbon1func.click();
        }
        if (carbon2.mouse.presses()) {
          carbon2func.click();
        }
        if (hydrogen1.mouse.presses()) {
          hydrogen1func.click();
        }
        if (hydrogen2.mouse.presses()) {
          hydrogen2func.click();
        }
        if (hydrogen3.mouse.presses()) {
          hydrogen3func.click();
        }
        if (hydrogen4.mouse.presses()) {
          hydrogen4func.click();
        }
        if (hydrogen5.mouse.presses()) {
          hydrogen5func.click();
        }
        if (bond1.mouse.presses()) {
          bond1func.click();
        }
        if (bond2.mouse.presses()) {
          bond2func.click();
        }
        if (bond3.mouse.presses()) {
          bond3func.click();
        }
        if (bond4.mouse.presses()) {
          bond4func.click();
        }
        if (bond5.mouse.presses()) {
          bond5func.click();
        }
        if (bond6.mouse.presses()) {
          bond6func.click();
        }
        if (bond7.mouse.presses()) {
          bond7func.click();
        }
        if (bromine.mouse.presses()) {
          brominefunc.click();
        }
        break;
      case "3":
        carbon1.layer = 60;
        carbon2.layer = 60;
        carbon3.layer = 60;
        bromine.layer = 60;
        hydrogen1.layer = 60;
        hydrogen2.layer = 60;
        hydrogen3.layer = 60;
        hydrogen4.layer = 60;
        hydrogen5.layer = 60;
        hydrogen6.layer = 60;
        hydrogen7.layer = 60;
        bond1.layer = 60;
        bond2.layer = 60;
        bond3.layer = 60;
        bond4.layer = 60;
        bond5.layer = 60;
        bond6.layer = 60;
        bond7.layer = 60;
        if (carbon1.mouse.presses()) {
          carbon1func.click();
        }
        if (carbon2.mouse.presses()) {
          carbon2func.click();
        }
        if (carbon3.mouse.presses()) {
          carbon3func.click();
        }
        if (hydrogen1.mouse.presses()) {
          hydrogen1func.click();
        }
        if (hydrogen2.mouse.presses()) {
          hydrogen2func.click();
        }
        if (hydrogen3.mouse.presses()) {
          hydrogen3func.click();
        }
        if (hydrogen4.mouse.presses()) {
          hydrogen4func.click();
        }
        if (hydrogen5.mouse.presses()) {
          hydrogen5func.click();
        }
        if (hydrogen6.mouse.presses()) {
          hydrogen6func.click();
        }
        if (hydrogen7.mouse.presses()) {
          hydrogen7func.click();
        }
        if (bond1.mouse.presses()) {
          bond1func.click();
        }
        if (bond2.mouse.presses()) {
          bond2func.click();
        }
        if (bond3.mouse.presses()) {
          bond3func.click();
        }
        if (bond4.mouse.presses()) {
          bond4func.click();
        }
        if (bond5.mouse.presses()) {
          bond5func.click();
        }
        if (bond6.mouse.presses()) {
          bond6func.click();
        }
        if (bond7.mouse.presses()) {
          bond7func.click();
        }
        if (bromine.mouse.presses()) {
          brominefunc.click();
        }
        break;
      case "4":
        carbon1.layer = 60;
        carbon2.layer = 60;
        carbon3.layer = 60;
        carbon4.layer = 60;
        bromine.layer = 60;
        hydrogen1.layer = 60;
        hydrogen2.layer = 60;
        hydrogen3.layer = 60;
        hydrogen4.layer = 60;
        hydrogen5.layer = 60;
        hydrogen6.layer = 60;
        hydrogen7.layer = 60;
        hydrogen8.layer = 60;
        hydrogen9.layer = 60;
        bond1.layer = 60;
        bond2.layer = 60;
        bond3.layer = 60;
        bond4.layer = 60;
        bond5.layer = 60;
        bond6.layer = 60;
        bond7.layer = 60;
        bond8.layer = 60;
        bond9.layer = 60;
        bond10.layer = 60;
        bond11.layer = 60;
        bond12.layer = 60;
        bond13.layer = 60;
        if (carbon1.mouse.presses()) {
          carbon1func.click();
        }
        if (carbon2.mouse.presses()) {
          carbon2func.click();
        }
        if (carbon3.mouse.presses()) {
          carbon3func.click();
        }
        if (carbon4.mouse.presses()) {
          carbon4func.click();
        }
        if (hydrogen1.mouse.presses()) {
          hydrogen1func.click();
        }
        if (hydrogen2.mouse.presses()) {
          hydrogen2func.click();
        }
        if (hydrogen3.mouse.presses()) {
          hydrogen3func.click();
        }
        if (hydrogen4.mouse.presses()) {
          hydrogen4func.click();
        }
        if (hydrogen5.mouse.presses()) {
          hydrogen5func.click();
        }
        if (hydrogen6.mouse.presses()) {
          hydrogen6func.click();
        }
        if (hydrogen7.mouse.presses()) {
          hydrogen7func.click();
        }
        if (hydrogen8.mouse.presses()) {
          hydrogen8func.click();
        }
        if (hydrogen9.mouse.presses()) {
          hydrogen9func.click();
        }
        if (bond1.mouse.presses()) {
          bond1func.click();
        }
        if (bond2.mouse.presses()) {
          bond2func.click();
        }
        if (bond3.mouse.presses()) {
          bond3func.click();
        }
        if (bond4.mouse.presses()) {
          bond4func.click();
        }
        if (bond5.mouse.presses()) {
          bond5func.click();
        }
        if (bond6.mouse.presses()) {
          bond6func.click();
        }
        if (bond7.mouse.presses()) {
          bond7func.click();
        }
        if (bond8.mouse.presses()) {
          bond8func.click();
        }
        if (bond9.mouse.presses()) {
          bond9func.click();
        }
        if (bond10.mouse.presses()) {
          bond10func.click();
        }
        if (bond11.mouse.presses()) {
          bond11func.click();
        }
        if (bond12.mouse.presses()) {
          bond12func.click();
        }
        if (bond13.mouse.presses()) {
          bond13func.click();
        }
        if (bromine.mouse.presses()) {
          brominefunc.click();
        }
        break;
    }
  }
}

function checkOrderOfMechanism() {
  let correct = 0;
  if (order.reaction == "nucleophilic substitution") {
    switch (substance.carbons) {
      case "1":
        console.log(steps);
        if (steps[0] == reactionReagent) {
          correct += 1;
        }
        if (steps[1] == carbon1) {
          correct += 1;
        }
        if (steps[2] == bond1) {
          correct += 1;
        }
        if (steps[3] == bromine) {
          correct += 1;
        }
        break;
      case "2":
        if (steps[0] == reactionReagent) {
          correct += 1;
        }
        if (steps[1] == carbon1) {
          correct += 1;
        }
        if (steps[2] == bond1) {
          correct += 1;
        }
        if (steps[3] == bromine) {
          correct += 1;
        }
        break;

      case "3":
        if (steps[0] == reactionReagent) {
          correct += 1;
        }
        if (steps[1] == carbon1) {
          correct += 1;
        }
        if (steps[2] == bond1) {
          correct += 1;
        }
        if (steps[3] == bromine) {
          correct += 1;
        }
        break;
    }
  } else {
    switch (substance.carbons) {
      case "3":
        if (steps[0] == reactionReagent) {
          correct += 1;
        }
        if (steps[1] == hydrogen1) {
          correct += 1;
        }
        if (steps[2] == bond) {
          correct += 1;
        }
        if (steps[3] == bond4) {
          correct += 1;
        }
        if (steps[4] == bond5) {
          correct += 1;
        }
        if (steps[5] == bromine) {
          correct += 1;
        }
        break;
      case "4":
        if (steps[0] == reactionReagent) {
          correct += 1;
        }
        if (steps[1] == hydrogen1) {
          correct += 1;
        }
        if (steps[2] == bond) {
          correct += 1;
        }
        if (steps[3] == bond4) {
          correct += 1;
        }
        if (steps[4] == bond5) {
          correct += 1;
        }
        if (steps[5] == bromine) {
          correct += 1;
        }
        break;
    }
  }
  return correct;
}

// Function to handle mechanism stage
function mechanismStage() {
  orderOfMechanism();
  if (settingsButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    loadSettingsScreen();
  }
  if (okButton.mouse.presses()) {
    soundEffect(sfxVolume, beep);
    playerData.getDataFromMechanism();
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        camera.y += 10;
        background(253, 253, 150);
      }, i * 6);
    }
    finaliseOrder();
    stage = "orderStage";
  }
}

// Finalise customer order
function finaliseOrder() {

  customersServed += 1;

  levelData.orderStage += playerData.dataFromOrder;
  levelData.conditionsStage += playerData.dataFromReagents;
  levelData.substanceStage += playerData.dataFromSubstance;
  levelData.substanceStage += playerData.dataFromMechanism;
  levelData.maxOrder += 1;
  levelData.maxConditions += order.conditions.length+1;
  levelData.maxSubstance += 2;
  levelData.maxMechanism += order.orderOfSteps.length;

  console.log(playerData.shareData())
  orderBubble.text = customerObject.receiveOrder(playerData.shareData());

  settingsButton.pos = { x: 1030, y: 50 };

  okButton.pos = { x: orderBubble.x, y: 480 };
  okButton.text = "ok";

  console.log(levelData)

  orderComplete = true;
}
function reset() {

  for(let i = 0; i < bottleFuncs; i++){
    bottleFuncs[i].clicked = false
    bottleFuncs[i].ans = false
  }

  // Clear all sprite groups
  carbons.removeAll();
  bromines.removeAll();
  hydrogens.removeAll();
  bonds.removeAll();

  // Reset element counts
  carbonsMade = 0;
  brominesMade = 0;
  hydrogensMade = 0;

  Hide(okButton)
  Hide(orderBubble)
  Hide(removeButton)
}

//Classes
class Customer {
  constructor(order) {
    this.elaborations = 0;
    this.mood = "waiting";
    this.moodPercentage = 100;
    this.sprite = "";
    this.order = order;
  }
  setSprite() {
    if ((this.mood == "waiting")) {
      if (this.moodPercentage >= 80) {
        customer.img = neutralCustomer;
      } else if (this.moodPercentage <= 85) {
        customer.img = annoyedCustomer;
      }
    } else if ((this.mood == "happy")) {
      customer.img = happyCustomer;
    } else if ((this.mood == "ok")) {
      customer.img = okCustomer;
    } else {
      customer.img = madCustomer;
    }
  }
  makeOrder() {
    let initialOrder = `I'd like a nice ${this.order.product} please!`;
    return initialOrder;
  }
  elaborate() {
    console.log(this.elaborations);
    if (this.elaborations == 0) {
      this.moodPercentage -= 5;
      let newOrder = `I think it has ${this.order.reagent}...`;
      this.setSprite();
      return newOrder;
    } else if (this.elaborations == 1) {
      this.moodPercentage -= 5;
      let newOrder = `Umm and it needs these conditions: \n${this.order.conditions}. :/`;
      this.setSprite();
      return newOrder;
    } else if (this.elaborations <= 4) {
      this.moodPercentage -= 5;
      this.setSprite();
      if (this.order.product == "nitrile") {
        let newOrder = `Sigh... so my order was for a \n${this.order.product} which has \n${this.order.reagent} and needs \n${this.order.conditions}. \nGot that?`;
        return newOrder;
      } else {
        let newOrder = `Sigh... so my order was for an \n${this.order.product} which has \n${this.order.reagent} and needs \n${this.order.conditions}. \nGot that?`;
        return newOrder;
      }
    } else {
      this.setSprite();
      for (let i = 0; i < 70; i++) {
        setTimeout(() => {
          customer.y += 5;
          background(253, 253, 150);
        }, i * 6);
      }
      orderComplete = true;
    }
  }
  receiveOrder(data) {
    this.moodPercentage = data;
    if (this.moodPercentage >= 80) {
      this.mood = "happy";
      this.setSprite();
      let response = "Yummy! Thanks!";
      return response;
    } else if (this.moodPercentage < 80 && this.moodPercentage > 45) {
      this.mood = "ok";
      this.setSprite();
      let response = "This is ok, I guess...";
      return response;
    } else {
      this.mood = "mad";
      this.setSprite();
      let response = "This is so bad! >:(";
      return response;
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
    let i = 0;
    while (i < answers.length) {
      if (answers[i] == this.bottleNumber.text) {
        this.answer = true;
        i += answers.length;
      } else {
        this.answer = false;
        i += 1;
      }
    }
  }
  click() {
    if (this.clicked === false) {
      this.clicked = true;
      this.bottleNumber.y -= 20;
      background(253, 253, 150);
    } else if (this.clicked === true) {
      this.clicked = false;
      this.bottleNumber.y += 20;
      background(253, 253, 150);
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
    bottleFuncs = [
      bottle1func,
      bottle2func,
      bottle3func,
      bottle4func,
      bottle5func,
      bottle6func,
      bottle7func,
    ];
    let amountCorrect = 0;
    for (let i = 0; i < bottleFuncs.length; i++) {
      if (bottleFuncs[i].clicked == true) {
        console.log(bottleFuncs[i], bottleFuncs[i].answer);
        if (bottleFuncs[i].answer == true) {
          amountCorrect += 1;
        } else {
          amountCorrect -= 1;
        }
      }
    }
    if (amountCorrect < 0) {
      amountCorrect = 0;
    }
    this.dataFromReagents += amountCorrect;
    console.log(this.dataFromReagents);
  }
  getDataFromSubstance() {
    let finalStructure = finaliseStructure();
    let correctStructure = substance.structure;
    let correct = 1;

    for (let i = 0; i < finalStructure.length; i++) {
      if (finalStructure[i] != correctStructure[i]) {
        correct = 0;
      }
    }
    this.dataFromSubstance += correct * 2;
    console.log(this.dataFromSubstance);
  }
  getDataFromMechanism() {
    let correct = checkOrderOfMechanism();
    this.dataFromMechanism += correct;
    console.log(this.dataFromMechanism);
  }
  shareData() {
    let totalData =
      ((this.dataFromOrder +
        this.dataFromReagents +
        this.dataFromSubstance +
        this.dataFromMechanism) /
        (1 + order.conditions.length+1 + 2 + order.orderOfSteps.length)) *
      100;
    return totalData;
  }
}

class ElementFunctions {
  constructor(element) {
    this.element = element;
    this.clicked = false;
  }
  click() {
    if (this.clicked == false) {
      this.clicked = true;
      steps.push(this.element);
      this.element.text = steps.length;
      this.element.textSize = 50;
      numberOfSteps -= 1;
      console.log(steps);
    } else if (this.clicked == true) {
      this.clicked = false;
      numberOfSteps += 1;
      steps.pop();
      this.element.text = "";
    } else {
    }
  }
}
