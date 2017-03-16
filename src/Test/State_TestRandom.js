//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestRandom = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestRandom.prototype = {
        preload: function () {
            // load theme
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:随机数和随机选取",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 随机数
            var style = { font: "14px Arial", fill: "#ff0044", align: "center" };

            this.game.add.text(32, 30, '随机整形: ' + this.game.rnd.integer(), style);
            this.game.add.text(32, 60, '随机0-1之间的浮点数: ' + this.game.rnd.frac(), style);
            this.game.add.text(32, 90, '随机浮点数: ' + this.game.rnd.real(), style);
            this.game.add.text(32, 120, '随机整形，区域为(100-200): ' + this.game.rnd.integerInRange(100, 200), style);

            // 重置随机数种子
            this.game.rnd.sow([123]);
            this.game.add.text(32, 180, '设置随机数种子为 [123]',style);
            this.game.add.text(32, 210, '随机数1为' + this.game.rnd.integer(), style);
            this.game.add.text(32, 240, '随机数2为' + this.game.rnd.integer(), style);

            this.game.rnd.sow([0]);
            this.game.add.text(32, 280, '设置随机数种子为 [0]',style);
            this.game.add.text(32, 310, '随机数1为' + this.game.rnd.integer(), style);
            this.game.add.text(32, 340, '随机数2为' + this.game.rnd.integer(), style);

            this.game.rnd.sow([123]);
            this.game.add.text(32, 380, '设置随机数种子为 [123]',style);
            this.game.add.text(32, 410, '随机数1为' + this.game.rnd.integer(), style);
            this.game.add.text(32, 440, '随机数2为' + this.game.rnd.integer(), style);

            var test = [0,1,2,3,4,5,6,7,8,9];
            var total = [0,0,0,0,0,0,0,0,0,0];
            // 进行随机选取
            for (var i = 0; i < 1000000; i++) {
                this.rnd = this.game.rnd.weightedPick(test);    // 从一个队列中进行前置优先随机选取
                total[this.rnd]++;
            }
            var NewStyle = { font: "12px Courier", fill: "#ff0000", tabs: [ 75 ] };
            var list = [
                ['随机数', '出现次数' ]
            ];
            for (i = 0; i < total.length; i++) {
                list.push([i, total[i]]);
            }
            var title = this.game.add.text(32 + this.world.centerX, 180, '前置优先随机筛选', NewStyle);
            text = this.game.add.text(32 + this.world.centerX, 210, '', NewStyle);
            text.parseList(list);

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