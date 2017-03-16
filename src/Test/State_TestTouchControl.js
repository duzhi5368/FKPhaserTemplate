//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTouchControl = function () {
        // 本state变量放在这里
        this.character = null;          // 主角
        this.directionsText = null;     // 方向提示文字
        this.velocityText = null;       // 速度文字
        this.tilesprite = null;         // 背景
    };
    GameApp.State_TestTouchControl.prototype = {
        preload: function () {
            // 为测试界面加载UI,注意这些image名禁止修改
            this.load.image('compass', '../../asset/test/images/compass_rose.png');
			this.load.image('touch_segment', '../../asset/test/images/touchSegment.png');
			this.load.image('touch', '../../asset/test/images/touch.png');
            this.load.image('background', '../../asset/test/images/background.png');
            
            this.load.spritesheet('characterImage', '../../asset/test/images/rpg_sprite_walk.png', 72, 96, 32);
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:测试虚拟摇杆插件",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 添加虚拟遥杆插件
            this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.game.touchControl.inputEnable();
            
            // 创建背景
            this.tilesprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.tilesprite.scale.set(3);
            // 创建角色
            this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'characterImage');
            this.character.anchor.set(0.5);
            
            this.character.animations.add('walkDown', [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
            this.character.animations.add('walkUp', [8, 9, 10, 11, 12, 13, 14, 15], 20, true);
            this.character.animations.add('walkLeft', [16, 17, 18, 19, 20, 21, 22, 23], 20, true);
            this.character.animations.add('walkRight', [24, 25, 26, 27, 28, 29, 30, 31], 20, true);
            
            // 添加四向限制
            var dirBtn = this.add.button(this.world.centerX, this.world.centerY / 6, 'defaultBtns', function () {
                if (this.game.touchControl.settings.singleDirection === true) {
                    this.game.touchControl.settings.singleDirection = false;
                } else {
                    this.game.touchControl.settings.singleDirection = true;
                }
            }, this).anchor.setTo(0.5, 0.5),
                dirBtnText = this.game.add.text(this.world.centerX, this.world.centerY / 6, '开/关方向限制', {font: '10px Arial', fill: '#ff44dd', align: 'center'}).anchor.setTo(0.5, 0.4);
            
            // debug信息显示
            var debugTextStyle = {font: '25px Arial', fill: '#ffffff', align: 'left', fontWeight: 'bold', stroke: '#000000', strokeThickness: 6};
            this.directionsText = this.add.text(16, this.world.centerY / 3, '', debugTextStyle);
            this.velocityText = this.add.text(16, this.world.centerY * 4 / 3, '', debugTextStyle);
            
            // 添加返回按钮
            this.addBackBtn();
        },
        addBackBtn: function () {
            var style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                backToGameBtn = this.game.add.button(this.world.centerX, this.world.centerY * 11 / 6, 'defaultBtns', function () {
                    this.state.start('State_DemoGame');
                }, this).anchor.setTo(0.5, 0.5),
                backToGameText = this.game.add.text(this.world.centerX, this.world.centerY * 11 / 6, '返回', style).anchor.setTo(0.5, 0.4);
        },
        updateDebugText: function () {
            this.directionsText.setText('朝向: \n  上: ' + this.game.touchControl.cursors.up +
                ',\n  下: ' + this.game.touchControl.cursors.down + ',\n  左: ' + this.game.touchControl.cursors.left +
                ',\n  右: ' + this.game.touchControl.cursors.right + ',\n');
            this.velocityText.setText('速度: \n  x: ' + this.game.touchControl.speed.x + ',\n  y: ' + this.game.touchControl.speed.y + '\n');

        },
        easeInSpeed: function (x) {
            return x * Math.abs(x) / 2000;
        },
        update: function () {
            // 显示DEBUG信息
            this.updateDebugText();
            var speed = this.game.touchControl.speed,
                delay = 0;

            //this.tilesprite.tilePosition.y += this.easeInSpeed(speed.y);
            //this.tilesprite.tilePosition.x += this.easeInSpeed(speed.x);
            // 可以更换为线性速度
            this.tilesprite.tilePosition.y += this.game.touchControl.speed.y / 20;
            this.tilesprite.tilePosition.x += this.game.touchControl.speed.x / 20;

            if (Math.abs(speed.y) < Math.abs(speed.x)) {
                
                delay = parseInt(1000 / Math.abs((this.easeInSpeed(speed.x)) * 10), 10);

                // 主要左右移动
                if (this.game.touchControl.cursors.left) {
                    this.character.play('walkLeft');
                } else if (this.game.touchControl.cursors.right) {
                    this.character.play('walkRight');
                }
            } else if (Math.abs(speed.y) > Math.abs(speed.x)) {
                
                delay = parseInt(1000 / Math.abs((this.easeInSpeed(speed.y)) * 10), 10);
                // 主要是上下移动
                if (this.game.touchControl.cursors.up) {
                    this.character.play('walkUp');
                } else if (this.game.touchControl.cursors.down) {
                    this.character.play('walkDown');
                }
            } else {
                this.character.animations.stop(0, true);
            }

            // this is a little hack, if the next frame its really slow and we have speed up things we will
            // have to wait for _timeNextFrame to se the fps updated
            this.character.animations.currentAnim.delay = delay;
            if (delay && (this.character.animations.currentAnim.timeNextFrame - this.time.now) > delay) {
                this.character.animations.currentAnim.timeNextFrame = this.time.now + delay;
            }
        }
    };
}(GameApp));