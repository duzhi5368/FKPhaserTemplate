//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTimer4 = function () {
        // 本state变量放在这里
        this.counter = 0;
        this.timer = null;
    };
    GameApp.State_TestTimer4.prototype = {
        preload: function () {
            this.counter = 0;
            this.timer = null;
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:TestTimer2",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 创建自定义计时器
            this.timer = this.game.time.create(false);
            // 2秒后开始执行
            this.timer.loop(2000, this.updateCounter, this);
            // 自定义计时器必须手动启动（ 你可以放置在例如按钮事件等里面开启它 ）
            this.timer.start();

            // 添加返回按钮
            this.addBackBtn();
        },
        updateCounter: function () {
            this.counter++;
            if (this.counter >= 5 ) {
                // 你同样可以自定义关闭它
                this.timer.stop();
            }
        },
        render: function () {
            this.game.debug.text("到下一个事件之间的间隔时间: " + this.timer.duration.toFixed(0) + " ms", 32, 32);
            this.game.debug.text("循环次数: " + this.counter, 32, 64);
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