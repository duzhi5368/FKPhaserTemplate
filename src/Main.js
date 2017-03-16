//--------------------------------------------------------
var Phaser;
var MACRO_WINDOW_HEIGHT;
var MACRO_WINDOW_WIDTH;

//--------------------------------------------------------
(function (Phaser) {
    "use strict";
    //--------------------------------------------------------
    var game = new Phaser.Game(MACRO_WINDOW_WIDTH, MACRO_WINDOW_HEIGHT, Phaser.AUTO, 'FKGame');
    //--------------------------------------------------------
    game.state.add('State_Boot', GameApp.State_Boot);
    game.state.add('State_FlashLogo', GameApp.State_FlashLogo);
    game.state.add('State_Preload', GameApp.State_Preload);
    game.state.add('State_MainMenu', GameApp.State_MainMenu);
    game.state.add('State_DemoGame', GameApp.State_DemoGame);
    
    game.state.add('State_TestUI', GameApp.State_TestUI);
    game.state.add('State_TestNinePatchUI', GameApp.State_TestNinePatchUI);
    game.state.add('State_TestJuice', GameApp.State_TestJuice);
    game.state.add('State_TestTouchControl', GameApp.State_TestTouchControl);
    game.state.add('State_TestAStar', GameApp.State_TestAStar);
    game.state.add('State_TestBase', GameApp.State_TestBase);
    game.state.add('State_TestTweenImage', GameApp.State_TestTweenImage);
    game.state.add('State_TestTimer1', GameApp.State_TestTimer1);
    game.state.add('State_TestTimer2', GameApp.State_TestTimer2);
    game.state.add('State_TestTimer3', GameApp.State_TestTimer3);
    game.state.add('State_TestTimer4', GameApp.State_TestTimer4);
    game.state.add('State_TestTimer5', GameApp.State_TestTimer5);
    game.state.add('State_TestTimer6', GameApp.State_TestTimer6);
    game.state.add('State_TestAutoSlideshow', GameApp.State_TestAutoSlideshow);
    game.state.add('State_TestNet', GameApp.State_TestNet);
    game.state.add('State_TestPause', GameApp.State_TestPause);
    game.state.add('State_TestRandom', GameApp.State_TestRandom);
    game.state.add('State_TestWebCam', GameApp.State_TestWebCam);
    //--------------------------------------------------------
    game.state.start('State_Boot');
    //--------------------------------------------------------
}(Phaser));