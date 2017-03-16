//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTimer3 = function () {
        // 本state变量放在这里
        this.picture = null;
    };
    GameApp.State_TestTimer3.prototype = {
        preload: function () {
            this.game.load.image('einstein', 'asset/default/images/FreeKnight_Src.png');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:TestTimer2",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            this.picture = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'einstein');
            this.picture.anchor.setTo(0.5, 0.5);
            this.picture.scale.setTo(0.5);
            // 单次执行定时器
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadePicture, this);

            // 添加返回按钮
            this.addBackBtn();
        },
        fadePicture: function () {
            this.game.add.tween(this.picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        },
        render: function () {
            this.game.debug.text("距离下一次事件时间: " + this.game.time.events.duration + " ms", 32, 32);
        },
        addBackBtn: function () {
            var style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                backToGameBtn = this.game.add.button(this.world.centerX, this.world.centerY * 11 / 6, 'defaultBtns', function () {
                    this.state.start('State_DemoGame');
                }, this).anchor.setTo(0.5, 0.5),
                backToGameText = this.game.add.text(this.world.centerX, this.world.centerY * 11 / 6, '返回', style).anchor.setTo(0.5, 0.4);
        }
    };
}(GameApp));