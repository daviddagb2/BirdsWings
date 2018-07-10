
//var game = new Kiwi.Game();
//game.states.addState( loadingState );

var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var gameOptions = {
	width: 360,
	height: 640
	//,scaleType: Kiwi.Stage.SCALE_FIT 
};

//Init the KIWI Engine
var game = new Kiwi.Game('game-container', 'LoadingAnImage', loadingState, gameOptions);

//Global VARS
var SwitchingStates = {};
SwitchingStates.globalCoins = 990;
SwitchingStates.globalTrophies = 3;
SwitchingStates.globalGems = 234;
SwitchingStates.globalLevels = 3;
SwitchingStates.globalHighScore = 10;
//Screen Size
SwitchingStates.ww = w;
SwitchingStates.wh = h;
console.log("WIN HEIGHT: " + SwitchingStates.wh);


SwitchingStates.game = game;
SwitchingStates.states = {};
SwitchingStates.states.menuState 	= menuState;
SwitchingStates.states.GameState	= GameState;
SwitchingStates.states.loadingState = loadingState;


game.states.addState( menuState );
game.states.addState( GameState );
game.states.switchState( "LoadingState" );