//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestWebCam = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestWebCam.prototype = {
        preload: function () {
            // load theme
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:网络摄像头测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 添加插件
            this.webcam = this.game.plugins.add(Phaser.Plugin.Webcam);
            this.bmd = this.game.make.bitmapData(MACRO_WINDOW_WIDTH, MACRO_WINDOW_HEIGHT);
            this.sprite = this.bmd.addToWorld();
            this.webcam.start(MACRO_WINDOW_WIDTH, MACRO_WINDOW_HEIGHT, this.bmd.context);
            this.game.input.onDown.addOnce(this.takePicture, this);

            // 添加返回按钮
            this.addBackBtn();
        },
        takePicture: function () {
            this.webcam.stop();
            // 现在bmd.context中就是照片了
            this.sprite.tint = Math.random() * 0xff0000;
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