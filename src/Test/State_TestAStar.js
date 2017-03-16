//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestAStar = function () {
        // 本state变量放在这里
        this.pathFinder = null;
        this.map = null;
        this.turtle = null;
        this.cursors = null;
        this.layer = null;
        this.marker = null;
        this.speed = 200;
    };
    GameApp.State_TestAStar.prototype = {
        preload: function () {
            this.game.load.atlasJSONArray('turtle', '../../asset/test/images/turtle.png', '../../asset/test/images/turtle.json');
            this.game.load.tilemap('map', '../../asset/test/images/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tileset', '../../asset/test/images/tileset-claytus.jpg');
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:A*寻路测试",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }
            this.game.stage.backgroundColor = '#ffffff';

            // 创建tileMap
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('claytus', 'tileset');

            this.layer = this.map.createLayer('maze');
            this.layer.resizeWorld();
            
            // 创建寻路对象
            var walkables = [30];
            this.pathfinder = this.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
            this.pathfinder.setGrid(this.map.layers[0].data, walkables);

            // 创建精灵
            this.turtle = this.game.add.sprite(150, 150, 'turtle');
            this.turtle.animations.add('walk-west', Phaser.Animation.generateFrameNames('frame_', 1, 16, '', 4), 60, true);
            this.turtle.animations.add('walk-est', Phaser.Animation.generateFrameNames('frame_', 17, 32, '', 4), 60, true);
            this.turtle.animations.add('walk-north', Phaser.Animation.generateFrameNames('frame_', 33, 48, '', 4), 60, true);
            this.turtle.animations.add('walk-south', Phaser.Animation.generateFrameNames('frame_', 49, 64, '', 4), 60, true);

            // 记录input
            this.cursors = this.game.input.keyboard.createCursorKeys();

            // 添加方块以便查看
            this.marker = this.game.add.graphics();
            this.marker.lineStyle(2, 0x000000, 1);
            this.marker.drawRect(0, 0, 30, 30);
            
            // 摄像机跟随
            this.game.camera.follow(this.turtle);
            
            // 添加返回按钮
            this.addBackBtn();
        },
        findPathTo: function (tilex, tiley) {
            this.pathfinder.setCallbackFunction(function (path) {
                path = path || [];
                var ilen = path.length,
                    n = 0;
                for (n = 0; n < ilen; n = n + 1) {
                    this.map.putTile(1, path[n].x, path[n].y);
                }
            });

            var start = this.layer.getTileXY(this.turtle.centerX + this.game.camera.view.x, this.turtle.centerY + this.game.camera.view.y, {});
            this.pathfinder.preparePathCalculation(start, [tilex, tiley]);
            this.pathfinder.calculatePath();
        },
        update: function () {
            // 更新方块位置
            this.marker.x = this.layer.getTileX(this.game.input.activePointer.worldX) * 30;
            this.marker.y = this.layer.getTileY(this.game.input.activePointer.worldY) * 30;

            // 鼠标按下事件
            if (this.game.input.mousePointer.isDown) {
                this.findPathTo(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
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