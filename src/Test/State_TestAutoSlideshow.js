//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestAutoSlideshow = function () {
        // 本state变量放在这里
        this.pictureA = null;
        this.pictureB = null;
        this.timer = null;
        this.current = 1;
    };
    GameApp.State_TestAutoSlideshow.prototype = {
        preload: function () {
            this.game.load.image('picture1', 'asset/test/images/running_bot.png');
            this.game.load.image('picture2', 'asset/test/images/turtle.png');
            this.game.load.image('picture3', 'asset/test/images/tileset-claytus.jpg');
            this.game.load.image('picture4', 'asset/test/images/background.png');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:自动壁纸切换",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            this.pictureA = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'picture1');
            this.pictureA.anchor.setTo(0.5, 0.5);
            this.pictureA.scale.setTo(2, 2);

            this.pictureB = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'picture2');
            this.pictureB.anchor.setTo(0.5, 0.5);
            this.pictureB.scale.setTo(2, 2);
            this.pictureB.alpha = 0;

            //  创建自定义定时器
            this.timer = this.game.time.create(false);
            this.timer.add(3000, this.fadePictures, this);
            this.timer.start();

            // 添加返回按钮
            this.addBackBtn();
        },
        fadePictures: function () {
            var tween;
            if (this.pictureA.alpha === 1) {
                tween = this.game.add.tween(this.pictureA).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.pictureB).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            } else {
                this.game.add.tween(this.pictureA).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
                tween = this.game.add.tween(this.pictureB).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            }
            //  当本次Tween完毕之后
            tween.onComplete.add(this.changePicture, this);
        },
        changePicture: function () {
            // 更换下一套图片
            if (this.pictureA.alpha === 0) {
                this.pictureA.loadTexture('picture' + this.current);
            } else {
                this.pictureB.loadTexture('picture' + this.current);
            }

            this.current++;

            if (this.current > 4) {
                this.current = 1;
            }

            // 再次开启一次渐变行为
            this.timer.add(3000, this.fadePictures, this);
        },
        render: function () {
            this.game.debug.text("到下一个定时器事件时间: " + this.timer.duration.toFixed(0), 10, 20);
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