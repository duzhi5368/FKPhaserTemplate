//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTweenImage = function () {
        // 本state变量放在这里
        this.sprite = null;
        this.tween = null;
    };
    GameApp.State_TestTweenImage.prototype = {
        preload: function () {
            // this.game.forceSingleUpdate = true;
            this.game.load.image('einstein', 'asset/default/images/FreeKnight_Src.png');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:测试Tween效果",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            this.sprite = this.game.add.sprite(this.world.centerX / 4, this.world.centerY / 4, 'einstein');
            this.sprite.scale.setTo(0.2);
            this.tween = this.game.add.tween(this.sprite);

            // 延迟1秒后执行移动动作
            this.tween.to({ x: this.world.centerX * 3 / 2, y: this.world.centerY * 7 / 4 }, 1000, 'Linear', true, 2000);

            // 添加返回按钮
            this.addBackBtn();
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