var menuState = new Kiwi.State('MenuState');

menuState.preload = function () {
    
	
	
	// Load audio object here.
   //// this.addAudio('backgroundMusic', './assets/audio/S31-Night Prowler.ogg');
};

menuState.create = function () {

	//Create HUD kiwi Group
	this.groupHUD = new Kiwi.Group( this );

	//Init images
	this.backgroundbg = new Kiwi.GameObjects.Sprite(this, this.textures.backgroundbg, 0, 0);
	this.topbar       = new Kiwi.GameObjects.Sprite(this, this.textures.topbar, 0, 0);		

	//Init Icons
	this.hearth_icon  = new Kiwi.HUD.Widget.Icon(this.game, this.textures.hearth_icon, 5, 3);
	this.coin_icon    = new Kiwi.HUD.Widget.Icon(this.game, this.textures.coin_icon, 80 ,3);
	this.gem_icon 	  = new Kiwi.HUD.Widget.Icon(this.game, this.textures.gem, 160 ,3);
	this.trophy_icon  = new Kiwi.HUD.Widget.Icon(this.game, this.textures.trophy, 240,3);
	this.settings_icon = new Kiwi.HUD.Widget.Icon(this.game, this.textures.settings_icon, 335-5 ,3);

	this.ic_arrow_left = new Kiwi.GameObjects.Sprite(this, this.textures.ic_arrow_left, 
			50, (this.game.stage.height - 200));
	this.ic_arrow_right = new Kiwi.GameObjects.Sprite(this, this.textures.ic_arrow_right, 
			310, (this.game.stage.height - 200));

	
	//Init TextFields 
	this.textField = new Kiwi.GameObjects.Textfield(this, '');
	this.textField.x = this.game.stage.width / 2;
	this.textField.y = 400;
	this.textField.color = '#FFFFFF';
	this.textField.fontFamily = 'sans-serif';
	this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	//LEVEL TextField
	this.txtLevel = new Kiwi.GameObjects.Textfield( this, "9999", //HASTA 7 CON ESTA RES 
												(5 + 28),  //POSITION X 
												8, 			//POSITION Y
												"#fddb00",  //COLOR
												16, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtLevel.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;

	//COIN TextField
	this.txtCoin = new Kiwi.GameObjects.Textfield( this, "999999", //HASTA 7 CON ESTA RES 
												(80 + 28),  //POSITION X 
												8, 			//POSITION Y
												"#ffba00",  //COLOR
												16, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtCoin.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;

	//GEM TextField
	this.txtGem = new Kiwi.GameObjects.Textfield( this, "999999", //HASTA 7 CON ESTA RES 
												(160 + 28),  //POSITION X 
												8, 			//POSITION Y
												"#f0303e",  //COLOR
												16, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtGem.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;


	//THROPY TextField
	this.txtTrophy = new Kiwi.GameObjects.Textfield( this, "999999", //HASTA 7 CON ESTA RES 
												(240 + 28),  //POSITION X 
												8, 			//POSITION Y
												"#3a6aff",  //COLOR
												16, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtTrophy.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT ;



	
	/* this.txtMoveMouse = new Kiwi.GameObjects.Textfield( this, "Arrastra para mover", //HASTA 7 CON ESTA RES 
												(this.game.stage.width / 2),  //POSITION X 
												(this.game.stage.height - 200), 			//POSITION Y
												"#ffcc00",  //COLOR
												17, 		//SIZE IN PIXEL
												'normal', 
												'Bangers' );
	this.txtMoveMouse.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER ;
	*/
	//MoveTextField
    this.myText2 = new Kiwi.HUD.Widget.TextField( this.game, 'Arrastra para mover', 
    		(this.game.stage.width / 2) - 70, 
    		(this.game.stage.height - 200) );
    this.myText2.style.color = '#ffcc00';
    this.myText2.style.fontSize = '17px';
    this.myText2.style.fontFamily = 'Bangers';
    this.myText2.style.textShadow = '2px 2px 5px black';
    this.myText2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;



	//Add player spritesheet
	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.birds, 
					(this.game.stage.width / 2) - 22.5,
					(this.game.stage.height - 160));

	/*
	* Adding the 'fly' animation to the animation component of the sprite. 
	* Param 1: Name.
	* Param 2: cells of texture atlas.
	* Param 3: Speed of animation.
	* Param 4: Loop animation boolean.
	* Param 5: Play this animation.
	*/
	this.player.animation.add( 'fly', [ 84, 85, 86 ], 0.1, true, true );


	// Add AUDIO MUSIC
	///this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'backgroundMusic', 0.3, true );
	///this.backgroundMusic.play();


	// Add the group to the state.
	this.addChild( this.groupHUD );

	this.counter = 0;
	
	this.groupHUD.addChild(this.backgroundbg);
	this.groupHUD.addChild(this.topbar);  //Add the topBar to the scene
	this.groupHUD.addChild(this.textField); //Add the click textfield
	this.groupHUD.addChild(this.txtLevel);  //Add the level textfield
	this.groupHUD.addChild(this.txtCoin);   //Add the coin textfield
	this.groupHUD.addChild(this.txtGem);	   //Add the gem textfield
	this.groupHUD.addChild(this.txtTrophy); //Add the trophy textfield
	this.groupHUD.addChild(this.ic_arrow_left);
	this.groupHUD.addChild(this.ic_arrow_right);

	//Add animations
	this.groupHUD.addChild(this.player);

	//Add icons 
	this.game.huds.defaultHUD.addWidget(this.hearth_icon);
	this.game.huds.defaultHUD.addWidget(this.coin_icon);
	this.game.huds.defaultHUD.addWidget(this.gem_icon);
	this.game.huds.defaultHUD.addWidget(this.trophy_icon);
	this.game.huds.defaultHUD.addWidget(this.settings_icon);
	this.game.huds.defaultHUD.addWidget( this.myText2 );


	//INIT VALUES
	this.txtCoin.text   = SwitchingStates.globalCoins;
	this.txtTrophy.text = SwitchingStates.globalTrophies;
	this.txtGem.text 	= SwitchingStates.globalGems;
	this.txtLevel.text  = SwitchingStates.globalLevels
	
	this.backgroundbg.input.onUp.add( this.clicked, this );
  
};

menuState.clicked = function(){


	this.groupHUD.visible = false;
	this.game.huds.defaultHUD.removeAllWidgets ();
	
	//this.counter++;
	//this.textField.text = 'Has presionado ' + this.counter + ' veces.';
	this.game.states.switchState( "GameState" );

};


