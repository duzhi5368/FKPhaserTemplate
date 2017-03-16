//--------------------------------------------------------
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_DemoGame = function () {
        // 本state变量放在这里
        /*
        this.game;      //  a reference to the currently running game
        this.add;       //  used to add sprites, text, groups, etc
        this.camera;    //  a reference to the game camera
        this.cache;     //  the game cache
        this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
        this.load;      //  for preloading assets
        this.math;      //  lots of useful common math operations
        this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
        this.stage;     //  the game stage
        this.time;      //  the clock
        this.tweens;    //  the tween manager
        this.world;     //  the game world
        this.particles; //  the particle manager
        this.physics;   //  the physics manager
        this.rnd;       //  the repeatable random number generator
        */
    };
    GameApp.State_DemoGame.prototype = {
        preload: function () {

        },
        create: function () {
            // 创建测试Btns
            this.createDefaultBtns();
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:DemoGame",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }
        },
        createDefaultBtns: function () {
            var defaultBtnWidth = 80,
                defaultBtnHeight = 20,
                col = 1,
                row = 1,
                style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                TestJuiceBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.state.start('State_TestJuice');
                }, this).anchor.setTo(0.5, 0.5),
                TestJuiceText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, '测试效果', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestNinePatchBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.state.start('State_TestNinePatchUI');
                }, this).anchor.setTo(0.5, 0.5),
                TestNinePatchText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, '九宫UI', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestRSGUIBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.state.start('State_TestUI');
                }, this).anchor.setTo(0.5, 0.5),
                TestRSGUIText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'RSGUI测试', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestTouchControlBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.state.start('State_TestTouchControl');
                }, this).anchor.setTo(0.5, 0.5),
                TestTouchControlText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, '虚拟摇杆', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestAStarBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.state.start('State_TestAStar');
                }, this).anchor.setTo(0.5, 0.5),
                TestAStarText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'A*寻路', style).anchor.setTo(0.5, 0.4);
            col += 2;

            col = 1;
            row += 1;

            var TestBaseBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestBase');
                }, this).anchor.setTo(0.5, 0.5),
                TestBaseText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '基本功能', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTweenImageBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTweenImage');
                }, this).anchor.setTo(0.5, 0.5),
                TestTweenImageText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '过渡行为', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTimer1Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer1');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer1Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '无限定时器', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTimer2Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer2');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer2Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '次数定时器', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTimer3Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer3');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer3Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '单次定时器', style).anchor.setTo(0.5, 0.4);
            col += 2;

            col = 1;
            row += 1;

            var TestTimer4Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer4');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer4Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '自定义定时器', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTimer5Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer5');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer5Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '移除定时器', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestTimer6Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestTimer6');
                }, this).anchor.setTo(0.5, 0.5),
                TestTimer6Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '慢动作和降帧', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestAutoSlideshow6Btn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestAutoSlideshow');
                }, this).anchor.setTo(0.5, 0.5),
                TestAutoSlideshow6Text = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '自动壁纸切换', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestNetBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestNet');
                }, this).anchor.setTo(0.5, 0.5),
                TestNetText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '网络', style).anchor.setTo(0.5, 0.4);
            col += 2;

            row += 1;
            col = 1;

            var TestPauseBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestPause');
                }, this).anchor.setTo(0.5, 0.5),
                TestPauseText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '游戏暂停', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestRandomBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestRandom');
                }, this).anchor.setTo(0.5, 0.5),
                TestRandomText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '随机数', style).anchor.setTo(0.5, 0.4);
            col += 2;

            var TestWebCamBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, 'defaultBtns', function () {
                    this.state.start('State_TestWebCam');
                }, this).anchor.setTo(0.5, 0.5),
                TestWebCamText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + (defaultBtnHeight + 8) * row, '摄像头', style).anchor.setTo(0.5, 0.4);
            col += 2;
        }
    };
}(GameApp));