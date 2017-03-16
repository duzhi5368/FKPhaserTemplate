//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestBase = function () {
        // 本state变量放在这里
        this.text = null;
        this.counter = 0;
        this.testSprite = null;
        this.isFollowPoint = false;
    };
    GameApp.State_TestBase.prototype = {
        preload: function () {
            this.game.load.image('testImg', 'asset/default/images/FreeKnight_Src.png');
            this.game.load.atlasJSONHash('bot', 'asset/test/images/running_bot.png', 'asset/test/images/running_bot.json');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:基本功能测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }
            // 创建精灵对象
            this.testSprite = this.game.add.sprite( 100, this.world.centerY, 'testImg');
            this.testSprite.scale.setTo(0.3, 0.3);
            this.testSprite.anchor.setTo(0.5);
            // 为指定对象开启物理
            this.game.physics.enable(this.testSprite, Phaser.Physics.ARCADE);
            //this.game.physics.arcade.enable(this.testSprite);
            // 设置速度,移动精灵
            this.testSprite.body.velocity.x = 150;
            
            // 开启精灵触碰
            this.testSprite.inputEnabled = true;
            // 创建字体
            this.text = this.game.add.text(this.world.centerX, this.world.centerY * 5 / 3, '', {fill: '#ffffff'});
            this.text.anchor.setTo(0.5, 0.5);
            // 开启触碰事件
            this.testSprite.events.onInputDown.add(this.listener, this);

            var myStyle = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                followMouseBtn = this.game.add.button(this.world.centerX * 3 / 2, this.world.centerY / 6, 'defaultBtns', function () {
                    this.isFollowPoint = !this.isFollowPoint;
                }, this).anchor.setTo(0.5, 0.5),
                followMouseText = this.game.add.text(this.world.centerX * 3 / 2, this.world.centerY / 6, '跟随点击', style).anchor.setTo(0.5, 0.4);

            // 添加一个动画
            var bot = this.game.add.sprite(this.world.centerX, this.world.centerY, 'bot');
            bot.animations.add('run');
            // 开始播放动画，以15帧/S速度播放，并且进行循环播放
            bot.animations.play('run', 15, true);

            // 添加返回按钮
            this.addBackBtn();
        },
        listener: function () {
            this.counter += 1;
            this.text.text = '你点击了图片 ' + this.counter + ' 次.';
        },
        render: function () {
            this.game.debug.spriteInfo(this.testSprite, 32, 32);
            this.game.debug.inputInfo(32, 32 + this.world.centerY / 2);
        },
        update: function () {
            if (this.isFollowPoint) {
                //  比较距离，是否在8像素内
                if (this.game.physics.arcade.distanceToPointer(this.testSprite, this.game.input.activePointer) > 8)
                {
                    //  向鼠标移动
                    this.game.physics.arcade.moveToPointer(this.testSprite, 200);
                } else {
                    // 离鼠标太近了，停止移动
                    this.testSprite.body.velocity.set(0);
                }
            }
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