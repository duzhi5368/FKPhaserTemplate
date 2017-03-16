//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestTimer6 = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestTimer6.prototype = {
        preload: function () {
            this.game.load.image('ball', 'asset/test/images/shinyball.png');
            this.gui = null;
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:减速与降帧阻塞的不同",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.time.slowMotion = 1.0;

            this.ballMovement = this.game.add.sprite(100, 100, 'ball');
            this.ballMovement.anchor.set(0.5);
            this.ballMovement.vy = 0;

            this.ballTween = this.game.add.sprite(150, 100, 'ball');
            this.ballTween.anchor.set(0.5);
            this.startFall(this.ballTween);

            this.emitter = this.game.add.emitter(this.game.world.centerX, 200, 200);
            this.emitter.makeParticles('ball');
            this.emitter.start(false, 5000, 20);

            this.wasteTime = 0;

            // dat.GUI
            this.gui = new dat.GUI();
            this.gui.add(this.game.time, "slowMotion", 1, 16).step(1);
            this.gui.add(this, "wasteTime", 0, 10).step(1);
            this.gui.add(this.game.time, "desiredFps", 10, 60).step(5);

            this.game.fpsProblemNotifier.add(this.handleFpsProblem, this);

            // 添加返回按钮
            this.addBackBtn();
        },
        update: function () {
            this.ballMovement.y += this.ballMovement.vy;

            if (this.ballMovement.y > 400)
            {
                this.ballMovement.vy = -this.ballMovement.vy;
            }
            else
            {
                this.ballMovement.vy++;
            }

            // 空消耗CPU，用以模拟低端CPU
            this.r = 0;
            for(var i = 0; i < this.wasteTime * 500000; i++)
            {
                var a = Math.sqrt(i);
                this.r += a * a;
            }
        },
        render: function () {
            this.game.debug.text('渲染 FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");

            if (this.game.time.suggestedFps !== null)
            {
                this.game.debug.text('建议 FPS: ' + this.game.time.suggestedFps, 2, 28, "#00ff00");
                this.game.debug.text('期望 FPS: ' + this.game.time.desiredFps, 2, 42, "#00ff00");
            }
        },
        startFall: function(_sprite) {
            this.game.add.tween(_sprite).to({y:400}, 500, Phaser.Easing.Quadratic.InOut, true).onComplete.addOnce(this.bounceTween, this);
        },
        bounceTween: function(_sprite) {
            this.game.add.tween(_sprite).to({y:100}, 500, Phaser.Easing.Quadratic.InOut, true).onComplete.addOnce(this.startFall, this);
        },
        handleFpsProblem: function () {
            // modify the game desired fps to match the current suggested fps
            this.game.time.desiredFps = this.game.time.suggestedFps;
        },
        addBackBtn: function () {
            var style = { font: "10px Arial", fill: "#ff44dd", align: "center" },
                backToGameBtn = this.game.add.button(this.world.centerX, this.world.centerY * 11 / 6, 'defaultBtns', function () {
                    this.state.start('State_DemoGame');
                }, this).anchor.setTo(0.5, 0.5),
                backToGameText = this.game.add.text(this.world.centerX, this.world.centerY * 11 / 6, '返回', style).anchor.setTo(0.5, 0.4);
        },
        shutdown: function(){
            this.gui = null;
        }
    };
}(GameApp));