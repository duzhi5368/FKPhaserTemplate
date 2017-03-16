//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestPause = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestPause.prototype = {
        preload: function () {
            this.game.load.image('diamond', 'asset/test/images/shinyball.png');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:游戏暂停测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 创造粒子发射器
            this.emitter = this.game.add.emitter(this.game.world.centerX, 100, 200);
            this.emitter.makeParticles('diamond');
            this.emitter.start(false, 5000, 20);

            var myStyle = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                pauseBtn = this.game.add.button(this.world.centerX * 2 - 100, 20, 'defaultBtns', function () {
                    this.game.paused = true;
                    this.game.debug.text('[ 点击屏幕任何区域可激活游戏 ]', 0, 20, "#00ff00");
                }, this).anchor.setTo(0.5, 0.5),
                pauseText = this.game.add.text(this.world.centerX * 2 - 100, 20, '暂停', style).anchor.setTo(0.5, 0.4);

            this.game.input.onDown.add(unpause, self);
            function unpause(event){
                // Only act if paused
                if(event.game.paused){
                    event.game.paused = false;
                }
            };

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