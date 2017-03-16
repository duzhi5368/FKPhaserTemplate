//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestJuice = function () {
        // 本state变量放在这里
        this.isUseMouseStretch = false;
        this.isUseOverScale = false;
        this.isUseJelly = false;
    };
    GameApp.State_TestJuice.prototype = {
        preload: function () {

        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:Juicy特效集测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }
            
            // 创建测试Btns
            this.createDefaultBtns();
            
            // 添加返回按钮
            this.addBackBtn();
        },
        createDefaultBtns: function () {
            var defaultBtnWidth = 80,
                defaultBtnHeight = 20,
                col = 1,
                row = 1,
                style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                TestShakeWindowBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 8 + defaultBtnHeight * row, 'defaultBtns', function () {
                    // 窗口震动
                    this.game.plugins.juicy.shake(20, 20);
                }, this).anchor.setTo(0.5, 0.5),
                TestShakeWindowText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 8 + defaultBtnHeight * row, '窗口震动', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestFlashScreenBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 8 + defaultBtnHeight * row, 'defaultBtns', function () {
                    // 闪屏
                    this.screenFlash = this.game.plugins.juicy.createScreenFlash('#0044dd');
                    this.add.existing(this.screenFlash);
                    this.screenFlash.flash();
                }, this).anchor.setTo(0.5, 0.5),
                TestFlashScreenText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 8 + defaultBtnHeight * row, '闪屏', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestTrailBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 8 + defaultBtnHeight * row, 'defaultBtns', function () {
                    // Trail
                    this.Trail = this.game.plugins.juicy.createTrail(25, 0xff7813);
                    this.Trail.trailScaling = true;
                    this.add.existing(this.Trail);
                    //this.Trail.target = this.ball;
                }, this).anchor.setTo(0.5, 0.5),
                TestTrailText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, '物件拖尾', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestOverScaleBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.isUseOverScale = true;
                }, this).anchor.setTo(0.5, 0.5),
                TestOverScaleText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'OverScale', style).anchor.setTo(0.5, 0.4);
            col += 2;
            
            var TestJellyBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.isUseJelly = true;
                }, this).anchor.setTo(0.5, 0.5),
                TestJellyText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'Jelly', style).anchor.setTo(0.5, 0.4);
            col += 2;

            row += 1;
            col = 1;
            
            var TestMouseStretchBtn = this.game.add.button(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'defaultBtns', function () {
                    this.isUseMouseStretch = true;
                }, this).anchor.setTo(0.5, 0.5),
                TestMouseStretchText = this.game.add.text(16 + (defaultBtnWidth + 8) * col / 2, 16 + defaultBtnHeight * row, 'MouseStretch', style).anchor.setTo(0.5, 0.4);
            col += 2;
        },
        addBackBtn: function () {
            var style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                backToGameBtn = this.game.add.button(this.world.centerX, this.world.centerY * 11 / 6, 'defaultBtns', function () {
                    this.state.start('State_DemoGame');
                }, this).anchor.setTo(0.5, 0.5),
                backToGameText = this.game.add.text(this.world.centerX, this.world.centerY * 11 / 6, '返回', style).anchor.setTo(0.5, 0.4);
        },
        update: function () {
            if (this.isUseMouseStretch) {
                //this.game.plugins.juicy.mouseStretch(this.ball, 1.0);
            }
            if (this.isUseOverScale) {
                //this.game.plugins.juicy.overScale(this.ball, 1.75);
            }
            if (this.isUseJelly) {
                //this.game.plugins.juicy.jelly(this.ball, 0.2, Math.random() * 100);
            }
        }
    };
}(GameApp));