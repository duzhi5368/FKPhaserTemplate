//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTimer2 = function () {
        // 本state变量放在这里
        this.counter = 0;
        this.text = 0;
    };
    GameApp.State_TestTimer2.prototype = {
        preload: function () {
            this.counter = 0;
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:TestTimer2",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '次数定时器计数: 0', { font: "32px Arial", fill: "#ff8888", align: "center" });
            this.text.anchor.setTo(0.5, 0.5);

            // 次数定时器
            // 参数：第一个是间隔多久调用一次，第二个参数是循环多少次后停止，第三个参数是回调，第死个是上下文限制，在该上下文下则执行
            this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 3, this.updateCounter, this);
            // 添加返回按钮
            this.addBackBtn();
        },
        updateCounter: function () {
            this.counter++;
            this.text.setText('次数定时器计数: ' + this.counter);
        },
        render: function () {
            this.game.debug.text("到下一个事件之间的间隔时间: " + this.game.time.events.duration.toFixed(0) + " ms", 32, 32);
            this.game.debug.text("下一个Tick时间: " + this.game.time.events.next.toFixed(0), 32, 64);
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