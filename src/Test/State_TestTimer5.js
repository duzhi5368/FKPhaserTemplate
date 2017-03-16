//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTimer5 = function () {
        // 本state变量放在这里
        this.counters = [];
        this.text = [];
        this.timerEvents = [];
        this.i = 9;
    };
    GameApp.State_TestTimer5.prototype = {
        preload: function () {
            // load theme
            this.counters = [];
            this.text = [];
            this.timerEvents = [];
            this.i = 9;
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:TestUI",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            for (var i = 0; i < 10; i++)
            {
                this.counters[i] = 0;
                this.text[i] = this.game.add.text(this.game.world.centerX, 80 + (40 * i), '定时器 ' + i + ' 调用 0 次', { font: "32px Arial", fill: "#ffffff", align: "center" });
                this.text[i].anchor.setTo(0.5, 0);

                //  Here we create our timer events. They will be set to loop at a random value between 250ms and 1000ms
                this.timerEvents[i] = this.game.time.events.loop(this.game.rnd.integerInRange(250, 1000), this.updateCounter, this, i);
            }

            //  当点击，开始移除定时器
            this.game.input.onDown.add(this.removeCounter, this);

            // 添加返回按钮
            this.addBackBtn();
        },
        updateCounter: function (idx) {
            this.counters[idx]++;
            this.text[idx].setText('定时器 ' + idx + ' 调用 ' + this.counters[idx] + ' 次');
        },
        removeCounter: function () {
            if (this.i >= 0)
            {
                // 从头部删除一个定时器
                this.game.time.events.remove(this.timerEvents[this.i]);

                //  更新文字信息
                this.text[this.i].style.fill = '#3344aa';
                this.text[this.i].setText('定时器 ' + this.i + ' 被移除');
                this.i--;
            }
        },
        render: function () {
            this.game.debug.text("剩余存活定时器队列: " + this.game.time.events.length + ' - 点击删除', 32, 32);
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