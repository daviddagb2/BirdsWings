var GameState = new Kiwi.State('GameState');

GameState.preload = function () {
    Kiwi.State.prototype.preload.call(this);



};

GameState.create = function () {
	//CONTROL VARS
	this.lifePoints 	= 5;
	this.coinPoints 	= 0;
	this.bossApeared 	= false; // If boss already appeared
	this.playerExploded = false; // If player explode
	

	//Create GROUPS
	this.groupBombs   = new Kiwi.Group( this );
	this.groupBullets = new Kiwi.Group( this );
	this.groupEnemies = new Kiwi.Group( this );
	this.groupExpode  = new Kiwi.Group( this );
	this.groupPlayers = new Kiwi.Group( this );
	this.groupCoins   = new Kiwi.Group( this );
	this.groupBoss 	  = new Kiwi.Group( this );
	this.groupItems	  = new Kiwi.Group( this );

	//Init controller
	this.setupUpManager( 15, 15 );

	// Add methods to be dispatched on the games input object.
	this.game.input.onDown.add( this.onDown, this );
	this.game.input.onReleased.add( this.onReleased, this );
	this.game.input.onUp.add( this.onUp, this );
	
	//Add THE LEVEL
	var randomLevel = Math.floor(Math.random() * 2);
	this.level01 = new Level(this,  0, 0, randomLevel);

	//Init Icons
	this.coin_icon    = new Kiwi.HUD.Widget.Icon(this.game, this.textures.coin_icon, 335-5 ,3);

	//COIN TextField
	this.txtCoin 	  = new Kiwi.GameObjects.Textfield( this, "99999999999", //HASTA 7 CON ESTA RES 
												335-14 ,  //POSITION X 
												6, 			//POSITION Y
												"#ffba00",  //COLOR
												18, 		//SIZE IN PIXEL
												'normal', 'Bangers' );
	this.txtCoin.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT ;
	this.txtCoin.text = this.coinPoints;

	
	//NAME Label TextField
	this.txtLabelName 	= new Kiwi.GameObjects.Textfield( this, "9234", //HASTA 7 CON ESTA RES 
												50 ,  //POSITION X 
												2,  	//POSITION Y
												"#a2ff00",  //COLOR
												18, 		//SIZE IN PIXEL
												'normal', 'Bangers' );
	this.txtLabelName.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;
	this.txtLabelName.text = "White Bird";


	//MaxSCORE Label TextField
	this.txtLabelMaxScore	= new Kiwi.GameObjects.Textfield( this, "Record: ", //HASTA 7 CON ESTA RES 
												50 ,  //POSITION X 
												20,  	//POSITION Y
												"#b7b7b7",  //COLOR
												12, 		//SIZE IN PIXEL
												'normal', 'Bangers' );
	this.txtLabelMaxScore.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;
	
	//HIGH SCORE TextField
	this.txtHighScore 	= new Kiwi.GameObjects.Textfield( this, "9234", //HASTA 7 CON ESTA RES 
												50 ,  //POSITION X 
												30,  	//POSITION Y
												"#ffba00",  //COLOR
												18, 		//SIZE IN PIXEL
												'normal', 'Bangers' );
	this.txtHighScore.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;
	this.txtHighScore.text = "999999";




	//MoveTextField
    this.myText2 = new Kiwi.HUD.Widget.TextField( this.game, ' ', 
    		(this.game.stage.width / 2), 
    		(this.game.stage.height -300) );
    this.game.huds.defaultHUD.addWidget( this.myText2 );
    this.myText2.style.fontSize = '17px';
    this.myText2.style.color = '#ff0000';
    this.myText2.style.fontFamily = 'Bangers';
    this.myText2.style.textShadow = '2px 2px 5px black';
    this.myText2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;


    //BOSS TextField
    this.txtBossName = new Kiwi.HUD.Widget.TextField( this.game, 'evil fucking monster', 
    		20, 
    		50 );
   /// this.game.huds.defaultHUD.addWidget( this.txtBossName );
    this.txtBossName.style.fontSize = '20px';
    this.txtBossName.style.color = '#FFFF00';
    this.txtBossName.style.fontFamily = 'Bangers';
    this.txtBossName.style.textShadow = '2px 2px 5px black';
    this.txtBossName.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;


    //GAME OVER TextField
	this.txtGameOver = new Kiwi.GameObjects.Textfield( this, "FIN DEL JUEGO", //HASTA 7 CON ESTA RES 
												(this.game.stage.width / 2) - 10,  //POSITION X 
												(this.game.stage.height / 2), 			//POSITION Y
												"#ffba00",  //COLOR
												40, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtGameOver.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER ;
	this.txtGameOver.visible = false;


	//ADD THE BOSS BAR
	this.bossHealthBar = new Kiwi.HUD.Widget.Bar ( this.game, 
													10,  // VALUE 
													100,  // MAX VALUE
													20,   // POS X 
													80,  //POS Y 
													(this.game.stage.width - 30) ,  //WIDTH 
													10 ); //HEIGHT 
    this.bossHealthBar.counter.current = 50;
    // Change the style of the bar
    this.bossHealthBar.bar.style.backgroundColor = '#060';
    // Chage the style of the HUD object
    this.bossHealthBar.style.backgroundColor = '#F00';
    this.bossHealthBar.style.boxShadow = '5px 5px 10px #000';
   //// this.game.huds.defaultHUD.addWidget( this.bossHealthBar ); //Add the bar to the HUD


   //Add the Sprite of picture
   this.faces   = new Kiwi.GameObjects.Sprite(this, this.textures.faces, 0, 5);
   ///this.faces.y = (this.game.stage.height ) - this.faces.height;


	//Add THE PLAYER
	this.player1 = new Player(this, (this.game.stage.width / 2) - 22.5, 
									(this.game.stage.height - 160), 
									1);

	
	// Add AUDIO MUSIC
	this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'backgroundMusic', 0.3, true );
	this.backgroundMusic.play();


	//Posicion actual 
	this.posx = this.game.stage.width * 0.5;

	this.numchilds 	   = this.groupBombs.numChildren();
	this.bulletchilds  = this.groupBullets.numChildren();
	this.enemychilds   = this.groupEnemies.numChildren(); 
	this.explodechilds = this.groupExpode.numChildren();
	this.playerchilds  = this.groupPlayers.numChildren();
	this.coinchilds    = this.groupCoins.numChildren(); 
	this.bosschilds    = this.groupBoss.numChildren();
	this.itemchilds    = this.groupItems.numChildren();
	//console.log	(this.numchilds);

	//ADD CHILD ITEMS	
	// Add the group to the state.
	this.addChild(this.level01);
	this.addChild(this.txtCoin);   //Add the coin textfield
	this.addChild(this.txtHighScore); //Add The hight score textfield
	this.addChild(this.txtLabelName);
	this.addChild(this.txtLabelMaxScore);

	this.addChild(this.txtGameOver); //Add game over text
	this.addChild(this.player1); //Add the player
	this.addChild(this.groupBombs);
	this.addChild(this.groupBullets);
	this.addChild(this.groupEnemies);
	this.addChild(this.groupExpode);
	this.addChild(this.groupPlayers);
	this.addChild(this.groupCoins);
	this.addChild(this.groupBoss);
	this.addChild(this.groupItems);

	//Add icons 
	this.game.huds.defaultHUD.addWidget(this.coin_icon);

	//Add the sprites
	this.addChild(this.faces);
	//this.faces.scaleX = 0.3;
	//this.faces.scaleY = 0.3;


	//TIMER ENEMIGOS
	this.timer = this.game.time.clock.createTimer('timer', 1, 5, 5);
	this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_START, this.onTimerStart, this );
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_COUNT, this.onTimerCount, this );
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.onTimerStop, this );

	//TIMER SHOOT
	this.timerShoot = this.game.time.clock.createTimer('timershoot', 0.3, 10, false);
	this.timerShoot.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_START, this.onShootTimerStart, this );
    this.timerShoot.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_COUNT, this.onShootTimerCount, this );
    this.timerShoot.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.onShootTimerStop, this );
    this.shootCount = 0;

    //TIMER RESTART
	this.timerRestart = this.game.time.clock.createTimer('timerRestart', 1, 6, false);
	this.timerRestart.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_START, this.onRestartTimerStart, this );
    this.timerRestart.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_COUNT, this.onRestartTimerCount, this );
    this.timerRestart.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.onRestartTimerStop, this );
    this.restartTimerCount = 5;

	//Start the TIMER
	this.timer.start();
	this.timerShoot.start();

	//INIT VALUES FROM GLOBAL
	this.txtHighScore.text = SwitchingStates.globalHighScore;
	
	this.level01.input.onUp.add( this.clicked, this );  
};


GameState.update = function () {
	Kiwi.State.prototype.update.call(this);

	this.numchilds     = this.groupBombs.numChildren();
	this.bulletchilds  = this.groupBullets.numChildren();
	this.enemychilds   = this.groupEnemies.numChildren();
	this.explodechilds = this.groupExpode.numChildren();
	this.playerchilds  = this.groupPlayers.numChildren();
	this.coinchilds    = this.groupCoins.numChildren();
	this.bosschilds    = this.groupBoss.numChildren();
	this.itemchilds    = this.groupItems.numChildren();

	//Set TEXT
	this.txtCoin.text = this.coinPoints;

	//Move player to mouse position
	this.posx = this.game.input.x.toFixed(1);
	

	this.checkBullets();
	this.checkBombs();
	this.checkEnemies();
	this.checkCoins();
	this.checkItems();
	
}


GameState.checkEnemies = function(){

	this.enemychilds  = this.groupEnemies.numChildren();
	var enemies = this.groupEnemies.members;
	for (var i = 0; i < enemies.length; i ++){

		///this.bullets[i].y -= 10;
        if(enemies[i].y > this.game.stage.height - 20){       	
          	enemies[i].destroy();
			break;
        }

        if(enemies[i].physics.overlaps(this.player1)){
        	if(this.playerExploded == false){
        		
        		this.playerExploded = true;
        		this.groupExpode.addChild(new Explosion(this, this.player1.x, this.player1.y - 10, 2));
        		this.txtGameOver.visible = true;
           		this.player1.visible = false;
           		this.lifePoints = 0;

           		this.timer.stop();
       			this.timerRestart.start();
        	}
			break;
        }
	}
}

GameState.checkCoins = function(){

	this.coinchilds  = this.groupCoins.numChildren();
	var coins = this.groupCoins.members;
	for (var i = 0; i < coins.length; i ++){

		///this.bullets[i].y -= 10;
        if(coins[i].y > this.game.stage.height - 20){       	
          	coins[i].destroy();
			break;
        }

        if(coins[i].physics.overlaps(this.player1)){
        	this.coinPoints += coins[i].value;
         	coins[i].destroy();          
			break;
        }
	}
}



GameState.checkItems = function(){

	this.itemchilds  = this.groupItems.numChildren();
	var items = this.groupItems.members;
	for (var i = 0; i < items.length; i ++){

		///this.bullets[i].y -= 10;
        /*if(items[i].y > this.game.stage.height - 20){       	
          	items[i].destroy();
			break;
        }*/

       /* if(items[i].physics.overlaps(this.player1)){
        	//this.coinPoints += coins[i].value;
        	//myText2.text = items[i].itemName;
         	items[i].destroy();          
			break;
        }*/
	}
}







GameState.checkBullets = function(){

	this.bulletchilds = this.groupBullets.numChildren();
	this.bosschilds   = this.groupBoss.numChildren();

	var bullets = this.groupBullets.members;
	var enemies = this.groupEnemies.members;
	var bosses  = this.groupBoss.members;

	for (var i = 0; i < bullets.length; i ++){
		///this.bullets[i].y -= 10;
        if(bullets[i].y < 10){
        	this.groupExpode.addChild(new Explosion(this, bullets[i].x, bullets[i].y, 1));
           	bullets[i].destroy();
			break;
        }

        for (var j = 0; j < enemies.length; j++){ //collides with enemy
        	if(bullets[i].physics.overlaps(enemies[j])){
        		enemies[j].health --;
        		this.groupExpode.addChild(new Explosion(this, bullets[i].x, bullets[i].y, 1));
        		this.groupCoins.addChild(new Coin(this, bullets[i].x, bullets[i].y, 3));
	           	bullets[i].destroy();
	           	break;
        	}
        }

        if(this.bosschilds > 0){
        	
        	for (var k = 0; k < bosses.length; k++){ //collides with enemy
					if(bullets[i].physics.overlaps(bosses[k])){
	        		bosses[k].life -= 1;
	        		this.groupExpode.addChild(new Explosion(this, bullets[i].x, bullets[i].y, 1));
	        		//this.groupCoins.addChild(new Coin(this, bullets[i].x, bullets[i].y, 3));
		           	
		           	bullets[i].destroy();
		           	break;
	        	}
        	}


        	
        }

	}

}


GameState.checkBombs = function(){

	this.numchilds = this.groupBombs.numChildren();
	var bombs = this.groupBombs.members;
	for (var i = 0; i < bombs.length; i ++){

		///this.bullets[i].y -= 10;
        if(bombs[i].y < 50){
        	bombs[i].destroy();
			break;
        }
	}

}

///////////////////////////////////////////////////
//TIMER FUNCTIONS
GameState.onTimerStart= function () {

}

GameState.onTimerCount = function () {
	this.timerCount += 1;
	//this.myText2.text = "Timer has counted " + this.timerCount + " times(s).";
	this.addEnemy();
}

GameState.onTimerStop = function () {
	this.timerCount = 0;
	//this.myText2.text = "The timer has stopped.";

}


///////////////////////////////////////////////////
//RESTART TIMER FUNCTIONS
GameState.onRestartTimerStart= function () {
	this.myText2.text = " ";
}

GameState.onRestartTimerCount = function () {	
	console.log	("restart timer: " + this.restartTimerCount );	
	this.myText2.text = " " + this.restartTimerCount + " ";
	this.restartTimerCount  -= 1;
}

GameState.onRestartTimerStop = function () {
	this.restartTimerCount = 0;
	this.myText2.text = "";
	this.restartTimerCount = 5;
	this.game.huds.defaultHUD.removeAllWidgets ();
	this.game.states.switchState( "MenuState" );
}


///////////////////////////////////////////////////
//SHOOT TIMER FUNCTIONS
GameState.onShootTimerStart = function () {
	//this.myText2.text = " ";
	///console.log("SHOOT START");
}

GameState.onShootTimerCount = function () {	
	this.shootCount += 1;

	if(this.enemychilds > 0 || this.bosschilds > 0){
		//FOR ADD BULLET EVERY TICK  
		this.groupBullets.addChild(new Bullet(this, this.player1.x + 20, this.player1.y, this.player1.bulletType));
	}	
}

GameState.onShootTimerStop = function () {
	//shoot stop
	this.timerShoot.start();
}

///////////////////////////////////////////////////





GameState.onDown = function () {
	//this.onDownCount += 1;
}

GameState.onReleased = function () {
	//this.onReleasedCount += 1;
}

GameState.onUp = function () {
	//this.onUpCount += 1;
}

GameState.setupUpManager = function ( x, y ){

};


GameState.clicked = function(){

	//FOR ADD BULLET
	//this.groupBullets.addChild(new Bullet(this, this.player1.x + 20, this.player1.y, 2));
    
    //FOR ADD BOMB
    /// this.groupBombs.addChild(new Bomb(this, this.player1.x, this.player1.y));

    //FOR ADD EXPLOSION
    //this.groupExpode.addChild(new Explosion(this, bullets[i].x, 200)); 
    

    //FOR ADD BOSS
    //var randomBoss = Math.floor(Math.random() * 14);
    //this.groupBoss.addChild(new Boss(this, (this.game.stage.width / 2), 200, randomBoss))

    //FOR ADD ITEM 
    var randomItem = Math.floor(Math.random() * 14);
    this.groupItems.addChild(new Item(this, (this.game.stage.width / 2), 200, randomItem));

};


GameState.addEnemy = function(){

	//FOR ADD ENEMY
	this.spriteWidth = 45;
	this.spriteHeight = 50;
	var enemyX = Math.random() * ( this.game.stage.width - this.spriteWidth );
	var enemyY = 200;
	this.groupEnemies.addChild(new Enemy(this, enemyX, enemyY, 1 ));

}

////////////////////////////////////////////////////////////////////
//CLASSES
////////////////////////////////////////////////////////////////////
//===========================================================
// BOMB CLASS 
//===========================================================
var Bomb = function(state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['bomb'], x, y, true);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	this.physics.acceleration = new Kiwi.Geom.Point(0,-15);
	this.physics.velocity = new Kiwi.Geom.Point(0,9);

	Bomb.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		//Update ArcadePhysics
		this.physics.update();
	}	
}
Kiwi.extend(Bomb,Kiwi.GameObjects.Sprite);


//===========================================================
// BULLET CLASS 
//===========================================================
var Bullet = function(state, x, y, animSelect){
		
	var anim = '';
	var speed = 1;
	switch ( animSelect ) {
		/*case 0:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bullet01'], x, y, true);
			this.animation.add( '00', [ 0, 2, 1 ], 0.1, true, true );
			anim = '00';
			this.animation.play( anim );
			break; */
		case 0:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bullet01'], x, y, true);
			this.animation.add( '01', [ 0, 8, 9 ], 0.1, true, true );
			anim = '01';
			var speed = 1;
			this.animation.play( anim );
			break;
		case 1:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bullet01'], x, y, true);
			this.animation.add( '02', [ 5, 6, 7,8 ], 0.1, true, true );
			anim = '02';
			var speed = 2;
			this.animation.play( anim );
			break;
		case 2:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bullet01'], x, y, true);
			this.animation.add( '03', [ 0,1,2 ], 0.1, true, true );
			anim = '03';
			var speed = 3;
			this.animation.play( anim );
			break;
		case 3:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '04', [ 5 ], 0.1, true, true );
			anim = '04';
			this.animation.play( anim );
			break;
		case 4:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '05', [ 0,1 ], 0.1, true, true );
			anim = '05';
			this.animation.play( anim );
			break;
		case 5:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '06', [ 9, 10, 11, 12, 13 ], 0.1, true, true );
			anim = '06';
			this.animation.play( anim );
			break;
		case 6:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '07', [ 14, 15, 16, 17, 18, 19 ], 0.1, true, true );
			anim = '07';
			this.animation.play( anim );
			break;
		case 7:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '08', [ 7 ], 0.1, true, true );
			anim = '08';
			this.animation.play( anim );
			break;
		case 8:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '09', [ 6 ], 0.1, true, true );
			anim = '09';
			this.animation.play( anim );
			break;
		case 9:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( '10', [ 2,3,4 ], 0.1, true, true );
			anim = '10';
			this.animation.play( anim );
			break;
		default:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bulletFire'], x, y, true);
			this.animation.add( 'Fire01', [ 0,1 ], 0.1, true, true );
			anim = 'Fire01';
			this.animation.play( anim );
	}


	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
	this.physics.acceleration = new Kiwi.Geom.Point(0,-15);
	this.physics.velocity = new Kiwi.Geom.Point(0,9);

	Bullet.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		//Update ArcadePhysics
		this.physics.update();
		//console.log(x);
		//console.log(y);
	}	
}
Kiwi.extend(Bullet,Kiwi.GameObjects.Sprite);

//===========================================================
// ENEMY CLASS 
//===========================================================
var Enemy = function(state, x, y, enemySelect){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['monster1'], x, y, true);

	this.animation.add( 'CHINCHE_VERDE',    [ 0,1,2 ], 0.1, true, true );
	this.animation.add( 'CHINCHE_GRIS',     [ 3,4,5 ], 0.1, true, true );
	this.animation.add( 'CHINCHE_CAFE',     [ 6,7,8 ], 0.1, true, true );
	this.animation.add( 'FUEGO_VERDE',    [ 9,10,11 ], 0.1, true, true );
	this.animation.add( 'FUEGO_ROJO',    [ 21,22,23 ], 0.1, true, true );
	this.animation.add( 'FUEGO_AZUL',    [ 33,34,35 ], 0.1, true, true );
	this.animation.add( 'FUEGO_MORADO',  [ 45,46,47 ], 0.1, true, true );
	this.animation.add( 'PAJARO_VERDE',  [ 48,49,50 ], 0.1, true, true );
	this.animation.add( 'PAJARO_MORADO', [ 51,52,53 ], 0.1, true, true );
	this.animation.add( 'PAJARO_ROJO',   [ 54,55,56 ], 0.1, true, true );
	this.animation.add( 'VAMPIRO',       [ 57,58,59 ], 0.1, true, true );

	var anim = '';
	var acelerationS = 1;
	switch ( enemySelect ) {
		case 1:
			anim = 'CHINCHE_VERDE';
			acelerationS = 0.5;
			break;
		case 2:
			anim = 'CHINCHE_GRIS';
			acelerationS = 1;
			break;
		case 3:
			anim = 'CHINCHE_CAFE';
			acelerationS = 2;
			break;
		case 4:
			anim = 'FUEGO_VERDE';
			acelerationS = 1;
			break;
		case 5:
			anim = 'FUEGO_ROJO';
			acelerationS = 2;
			break;
		case 6:
			anim = 'FUEGO_AZUL';
			acelerationS = 3;
			break;
		case 7:
			anim = 'FUEGO_MORADO';
			acelerationS = 4;
			break;
		case 8:
			anim = 'PAJARO_VERDE';
			acelerationS = 5;
			break;
		case 9:
			anim = 'PAJARO_MORADO';
			acelerationS = 5;
			break;
		case 10:
			anim = 'PAJARO_ROJO';
			acelerationS = 6;
			break;
		case 11:
			acelerationS = 8;
			anim = 'VAMPIRO';
			break;
		default:
			anim = 'VAMPIRO';
	}
	//console.log	(anim);
	this.animation.play( anim );

	
	this.box.hitbox = new Kiwi.Geom.Rectangle(2, 2, 30, 30);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
	this.health = 1;

	this.physics.acceleration = new Kiwi.Geom.Point(0, acelerationS);
	this.physics.velocity = new Kiwi.Geom.Point(0,9);

	Enemy.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		//Update ArcadePhysics
		this.physics.update();
		if(this.health <= 0){
			this.destroy();
		}
	}	
}
Kiwi.extend(Enemy,Kiwi.GameObjects.Sprite);

//===========================================================
// EXPLOSION CLASS 
//===========================================================
var Explosion = function (state, x, y, explosiontype){
	this.explosiontype = explosiontype;
	switch( explosiontype ){
		case 1:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['explosion'], x, y);
			this.animation.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 0.1, false);    
			this.animation.play('explode');
			break;
		case 2:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['explosion2'], x, y);
			this.animation.add('explode', [0,1,2,3,4,5,6,7,8,9], 0.1, false);    
			this.animation.play('explode');
			break;
		default:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['explosion'], x, y);
			this.animation.add('explode', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 0.1, false);    
			this.animation.play('explode');
	}	

	Explosion.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		
		if(this.explosiontype == 2){
			this.y += 0.5;
			if(this.animation.currentCell == 9){
				this.destroy();
			}
		}else{
			this.y += 2;
			if(this.animation.currentCell == 15){
				this.destroy();
			}
		}
	}
}
Kiwi.extend(Explosion,Kiwi.GameObjects.Sprite);


//===========================================================
// COIN CLASS 
//===========================================================
var Coin = function (state, x, y, cointype){
	this.value = 1;
	switch ( cointype ) {
		case 1:
			this.value = 1;
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['coin_copper'], x, y);
			this.animation.add('idle', [0,1,2,3,4,5,6,7], 0.1, true, true);
			this.animation.play('idle');
			break;
		case 2:
			this.value = 2;
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['coin_silver'], x, y);
			this.animation.add('idle', [0,1,2,3,4,5,6,7], 0.1, true, true);
			this.animation.play('idle');
			break;
		case 3:
			this.value = 3;
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['coin_gold'], x, y);
			this.animation.add('idle', [0,1,2,3,4,5,6,7], 0.1, true, true);
			this.animation.play('idle');
			break;
		default:
			this.value = 3;
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['coin_gold'], x, y);
			this.animation.add('idle', [0,1,2,3,4,5,6,7], 0.1, true, true);
			this.animation.play('idle');
			break;
	}

	this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 32, 32);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	Coin.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.y += 0.5;
	}
}
Kiwi.extend(Coin,Kiwi.GameObjects.Sprite);


//===========================================================
// PLAYER CLASS 
//===========================================================
var Player = function (state, x, y, characterid){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['birds'], x, y);
	//this.player1 = new Kiwi.GameObjects.Sprite(this, this.textures.birds, x, y);
					//(this.game.stage.width / 2) - 22.5,
					//(this.game.stage.height - 160));
	this.animation.add( 'fly', [ 84, 85, 86 ], 0.1, true, true ); 
	this.animation.play('fly');
	this.bulletType = 0;  //The actual Bullet Type of the player

	Player.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		
		this.x = this.game.input.x ;

		if( this.x > this.game.stage.width - this.width ) {
			this.x = 310;
		}

		/*if(this.animation.currentCell == 15){
			this.destroy();
		}*/
	}
}
Kiwi.extend(Player,Kiwi.GameObjects.Sprite);


//===========================================================
// LEVEL CLASS 
//===========================================================
var Level = function (state, x, y, levelid){

	//d3x lvl
	switch(levelid){
		case 1:  //LEVEL FOREST
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['level01'], x, y);
			break;
		case 2:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['level02'], x, y);
			break;
		default:
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['level02'], x, y);
	}

	this.x  = 0;
	this.y = this.game.stage.height - this.height;	

	Level.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		
		if(state.lifePoints > 0){
			if(this.y < 0){
				//Move Background to end
				this.y += 10.5;
			}

			if(this.y >= 0 && state.bossApeared == false){

				this.y = 0;
				//FOR ADD BOSS
		    	var randomBoss = Math.floor(Math.random() * 14);
		    	state.groupBoss.addChild(new Boss(state, (this.game.stage.width / 2), 200, randomBoss));
				state.bossApeared = true;
			}		
		}
	}
}
Kiwi.extend(Level,Kiwi.GameObjects.Sprite);


//===========================================================
// ITEM CLASS 
//===========================================================
var Item = function (state, x, y, ItemID){

	this.itemName   = "";
	this.bulletType = ItemID;

	Kiwi.GameObjects.Sprite.call(this, state, state.textures['spell'], x, y);
	this.animation.add( 'spell0', [ 0 ], 0.1, true, false );
	this.animation.add( 'spell1', [ 1 ], 0.1, true, false );
	this.animation.add( 'spell2', [ 2 ], 0.1, true, false );
	this.animation.add( 'spell3', [ 3 ], 0.1, true, false );
	this.animation.add( 'spell4', [ 4 ], 0.1, true, false );
	this.animation.add( 'spell5', [ 5 ], 0.1, true, false );
	this.animation.add( 'spell6', [ 6 ], 0.1, true, false );
	this.animation.add( 'spell7', [ 7 ], 0.1, true, false );
	this.animation.add( 'spell8', [ 8 ], 0.1, true, false );
	this.animation.add( 'spell9', [ 9 ], 0.1, true, false );
	this.animation.add( 'spell10', [ 10 ], 0.1, true, false );
	this.animation.add( 'spell11', [ 11 ], 0.1, true, false );
	this.animation.add( 'spell12', [ 12 ], 0.1, true, false );
	this.animation.add( 'spell13', [ 13 ], 0.1, true, false );
	this.animation.add( 'spell14', [ 14 ], 0.1, true, false );

	this.animation.play( 'spell' + ItemID );
	
	switch(ItemID){
		case 1: 
			this.itemName = "Purple Beam";
			this.bulletType = 1;
			break;
		case 2: 
			this.itemName = "Blue Beam";
			this.bulletType = 2;
			break;
		case 3:
			this.itemName = "Red Beam";
			this.bulletType = 3;
			break;
		case 4:  
			this.itemName = "Cristal Spears";
			this.bulletType = 4;
			break;
		case 5:
			this.itemName = "Meteor";
			this.bulletType = 5;
			break;
		case 6:  
			this.itemName = "Tornado";
			this.bulletType = 6;
			break;
		case 7:
			this.itemName = "Lightbolt";
			this.bulletType = 7;
			break;
		case 8:  
			this.itemName = "Lightspeed beam";
			this.bulletType = 8;
			break;
		case 9:
			this.itemName = "Sword Beam";
			this.bulletType = 9;
			break;
		case 10:  
			this.itemName = "Angel Wings";
			this.bulletType = 10;
			break;
		case 11:
			this.itemName = "Star of Justice";
			this.bulletType = 11;
			break;
		case 12:
			this.itemName = "Dark Swords";
			this.bulletType = 12;
			break;
		case 13:
			this.itemName = "Clone of Shadows";
			this.bulletType = 13;
			break;
		case 14:
			this.itemName = "Earth Spell";
			this.bulletType = 14;
			break;
		case 15:
			this.itemName = "Earth Spell";
			this.bulletType = 15;
			break;
		case 16:
			this.itemName = "Earth Spell";
			this.bulletType = 16;
			break;
		default:
			this.itemName = "Default Beam";
			this.animation.play( 'spell1' );
	}

	this.scaleX = 0.5;
	this.scaleY = 0.5;
	state.myText2.text = " " + this.bulletType + " ";

	this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 60, 60);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	Item.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		
		this.y += 1.5;
		
		/*if(this.y > this.game.stage.height - 20){       	
          	this.destroy();
			break;
        } */

        if(this.physics.overlaps(state.player1)){
        	//this.coinPoints += coins[i].value;
        	//myText2.text = items[i].itemName;
        	state.player1.bulletType = this.bulletType;
         	this.destroy();          
			
        }

	}
}
Kiwi.extend(Item,Kiwi.GameObjects.Sprite);




//===========================================================
// COIN CLASS 
//===========================================================
var Boss = function (state, x, y, bossnumber){
	
	this.bossName = "Boss";
	this.value = 1;
	this.maxLife = 100;
	this.life = 80;

	state.bossHealthBar.counter.current = state.life;

	switch ( bossnumber ) {
		case 1: //EVIL SNAKE MONSTER			
			this.value = 1;
			this.bossName = "Serpiente buchona";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossSnake'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 2: //BOSS DEAD PURPLE
			this.value = 2;
			this.bossName = "Poison Dead Fairy";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossDead'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 3: //BOSS DEAD RED
			this.value = 3;
			this.bossName = "Fire Dead Fairy";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossDead'], x, y);
			this.animation.add('idle', [3,4,5], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 4://BOSS DEAD BLACK
			this.value = 4;
			this.bossName = "Dark Dead Fairy";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossDead'], x, y);
			this.animation.add('idle', [6,7,8], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 5://BOSS DEAD WHITE
			this.value = 5;
			this.bossName = "Phantom Dead Fairy";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossDead'], x, y);
			this.animation.add('idle', [9,10,11], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 6:// DRAGON 
			this.value = 6;
			this.bossName = "Cindersnare";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossDragon'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
		case 7:// EVIL DEMON RED
			this.value = 7;
			this.bossName = "Red Demon Vextree";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossEvilDemon'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 8:// EVIL DEMON BLACK
			this.value = 8;
			this.bossName = "Black Demon Taintfiend";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossEvilDemon'], x, y);
			this.animation.add('idle', [3,4,5], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 9:// EVIL DEMON PURPLE
			this.value = 9;
			this.bossName = "Purple Demon Slaghound";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossEvilDemon'], x, y);
			this.animation.add('idle', [6,7,8], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 10:// EVIL DEMON GREEN
			this.value = 10;
			this.bossName = "Green Demon Poisonghoul";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossEvilDemon'], x, y);
			this.animation.add('idle', [9,10,11], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 11:// BOSS ANGEL PURPLE
			this.value = 11;
			this.bossName = "Corrupted Angel Qaphsiel";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossAngelDark'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 12:// BOSS ANGEL GREEN
			this.value = 12;
			this.bossName = "Corrupted Angel Remliel";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossAngelDark'], x, y);
			this.animation.add('idle', [3,4,5], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 13:// BOSS ANGEL YELLOW
			this.value = 13;
			this.bossName = "Golden Angel Tabris";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossAngelDark'], x, y);
			this.animation.add('idle', [6,7,8], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
		case 14:// BOSS ANGEL DARK RED
			this.value = 14;
			this.bossName = "Dark Angel Malakh";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossAngelDark'], x, y);
			this.animation.add('idle', [9,10,11], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 120,120);
			break;
			
		default:
			this.value = 1;
			this.bossName = "Serpiente buchona";
			Kiwi.GameObjects.Sprite.call(this, state, state.textures['bossSnake'], x, y);
			this.animation.add('idle', [0,1,2], 0.1, true, true);
			this.animation.play('idle');
			this.box.hitbox = new Kiwi.Geom.Rectangle(0, 0, 96, 96);
			break;
	}

	this.scaleX = 1.3;
	this.scaleY = 1.3;

	state.txtBossName.text = "" + this.bossName;

	this.game.huds.defaultHUD.addWidget( state.bossHealthBar );
	this.game.huds.defaultHUD.addWidget( state.txtBossName );

	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	Boss.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		//this.y += 0.5;
		//this.healthBar.counter.current = ( this.life / this.game.stage.width ) * this.healthBar.counter.max;
		state.bossHealthBar.counter.current = state.life;

		/*this.x += 3;
		if( this.x > this.game.stage.width ) {
			this.x = -this.width;
		} */

		if(this.life <= 0){

			state.txtGameOver.visible = true;
			state.txtGameOver.text = "STAGE CLEAR";

			state.groupEnemies.clear();
			state.groupBullets.clear();
			state.groupItems.clear();
			state.groupCoins.clear();

			state.timerRestart.start();

			//state.bossHealthBar.visible = false;
			this.game.huds.defaultHUD.removeWidget( state.txtBossName );
			this.game.huds.defaultHUD.removeWidget( state.bossHealthBar );
			this.destroy();
			
		}

	}
}
Kiwi.extend(Boss,Kiwi.GameObjects.Sprite);

