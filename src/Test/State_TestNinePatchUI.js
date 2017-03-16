//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestNinePatchUI = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestNinePatchUI.prototype = {
        preload: function () {
            this.game.load.atlasXML('blueSheet', 'asset/test/nineUI/blueSheet.png', 'asset/test/nineUI/blueSheet.xml');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:九宫格UI测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 缓存图片
            this.game.cache.addNinePatch('blue_button02', 'blueSheet', 'blue_button02.png', 10, 10, 10, 20);

            // 从缓存纹理中创建一个图片
            var image = new Phaser.NinePatchImage(this.game, this.game.width / 2, this.game.height / 2, 'blue_button02');

            // 设置图片大小，会自动update
            image.targetWidth  = 250;
            image.targetHeight = 180;
            // 设置锚点，注意要Update一下
            image.anchor.setTo(0.5, 0.5);
            image.UpdateImageSizes();
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