var loadingState = new Kiwi.State( "LoadingState" );
 
loadingState.preload = function(){

    ////////////////////////////////////////////////////////////////////////////////
    // ASSETS LOADER
    ////////////////////////////////////////////////////////////////////////////////
 	this.addImage('backgroundbg', './assets/img/bg.png');
    this.addImage('mainlogo', './assets/img/logo.png');

    ////////////////////////////////////////////////////////////////////////////////
    // ASSETS MENU
    ////////////////////////////////////////////////////////////////////////////////
    this.addImage('backgroundbg', './assets/img/bg.png');
	this.addImage('topbar', './assets/img/topbar.png');
	this.addImage('coin_icon', './assets/img/coin.png');
	this.addImage('trophy', './assets/img/trophy.png');
	this.addImage('gem', './assets/img/gem.png');
	this.addImage('hearth_icon', './assets/img/hearth.png');
	this.addImage('settings_icon', './assets/img/settings.png');
	this.addImage('ic_arrow_left', './assets/img/if_arrow-left.png');
	this.addImage('ic_arrow_right', './assets/img/if_arrow-right.png');
	this.addSpriteSheet('birds', './assets/img/sprites/birds1.png', 45, 50);
	this.addSpriteSheet('birds2', './assets/img/sprites/birds2.png', 45, 50);

    ////////////////////////////////////////////////////////////////////////////////
    // ASSETS GAME
    ////////////////////////////////////////////////////////////////////////////////
	this.addImage('level01', './assets/img/levels/Whispering_Forest_Background.jpg', true);
	this.addImage('level02', './assets/img/levels/Spirit_Forest_Background.jpg', true);
	this.addImage('bomb', './assets/img/sprites/bomb.png');
	this.addSpriteSheet('bullet01', './assets/img/sprites/bullet01.png', 10, 17);
	this.addSpriteSheet('bulletFire', './assets/img/sprites/bulletFire.png', 22, 50);
	this.addSpriteSheet('monster1', './assets/img/sprites/monster1.png', 32, 32);
	this.addSpriteSheet('explosion', './assets/img/sprites/Explosion.png', 64, 64);
	this.addSpriteSheet('explosion2', './assets/img/sprites/Explosion2.png', 160, 160);
	this.addSpriteSheet('coin_gold', './assets/img/sprites/coin_gold.png', 32, 32);
	this.addSpriteSheet('coin_silver', './assets/img/sprites/coin_silver.png', 32, 32);
	this.addSpriteSheet('coin_copper', './assets/img/sprites/coin_copper.png', 32, 32);
	// BOSS SPRITES 
	this.addSpriteSheet('bossAngelDark', './assets/img/sprites/bossAngelDark.png', 120, 120);
	this.addSpriteSheet('bossDead', './assets/img/sprites/bossDead.png', 96, 96);
	this.addSpriteSheet('bossDragon', './assets/img/sprites/bossDragon.png', 96, 96);
	this.addSpriteSheet('bossEvilDemon', './assets/img/sprites/bossEvilDemon.png', 120, 120);
	this.addSpriteSheet('bossSnake', './assets/img/sprites/bossSnake.png', 96, 96);
	//PLAYER FACES
	this.addSpriteSheet('faces', './assets/img/sprites/faces.png', 40, 40);


	this.addSpriteSheet('spell', './assets/img/sprites/spell.png', 60, 60);
	////////////////////////////////////////////////////////////////////////////////


}
 
loadingState.create = function(){

	//El background y el logo
	this.backgroundbg = new Kiwi.GameObjects.Sprite(this, this.textures.backgroundbg, 0, 0);
	this.mainlogo = new Kiwi.GameObjects.Sprite(this, this.textures.mainlogo,  
											(this.game.stage.width / 2) - 160 ,150);

	//El texto de Iniciar juego
	this.textField = new Kiwi.GameObjects.Textfield(this, 'Presione para iniciar');
	this.textField.x = this.game.stage.width / 2;
	this.textField.y = (this.game.stage.height - 50);
	this.textField.color = '#311500';
	this.textField.fontFamily = 'Bangers';
	this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;


	this.addChild(this.backgroundbg);
	this.addChild(this.mainlogo);  //Add the topBar to the scene
	this.addChild(this.textField); //Add the click textfield

   this.backgroundbg.input.onUp.add( this.clicked, this );
}


loadingState.clicked = function(){

	console.log(SwitchingStates.globalCoins);

	this.game.states.switchState( "MenuState" );
};



