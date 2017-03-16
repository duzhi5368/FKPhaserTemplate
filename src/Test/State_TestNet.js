//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestNet = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestNet.prototype = {
        preload: function () {
            // load theme
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:网络测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 添加返回按钮
            this.addBackBtn();
        },
        render: function () {
            this.game.debug.text('本地主机名:' + this.game.net.getHostName(), 8, 20);
            this.game.debug.text('本地主机名是否包含 192:' + this.game.net.checkDomainName('192'),8, 40);
            this.game.debug.text('本地主机名是否包含 google.com:' + this.game.net.checkDomainName('google.com'), 8, 60);
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