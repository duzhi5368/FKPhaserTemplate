//--------------------------------------------------------
var Phaser;
var GameApp;
var MACRO_DEBUG;
//--------------------------------------------------------
(function (GameApp) {
    "use strict";
    GameApp.State_TestUI = function () {
        // 本state变量放在这里
    };
    GameApp.State_TestUI.prototype = {
        preload: function () {
            // load theme
        },
        create: function () {
            // 输出DEBUG信息
            if (MACRO_DEBUG) {
                var text = "State:测试RSGUI插件",
                    style = { font: "10px Arial", fill: "#ff0000", align: "center" },
                    t = this.game.add.text(this.world.centerX * 2 - 10, this.world.centerY * 2, text, style);
                t.anchor.setTo(1.0, 1.0);
            }

            // 动态创建对象
            var dynamicButton = this.game.gui.add.button(this.world.centerX / 2, this.world.centerY * 3 / 2, "动态按钮"),
            // 控件测试
                button1 = this.game.gui.add.button(0, 0, "显示窗口"),
                button2 = this.game.gui.add.button(150, 0, "关闭窗口"),
                button3 = this.game.gui.add.button(300, 0, "更改背景颜色"),
                mywin = this.game.gui.add.window(240, 150, 400, 240, "子窗口"),
                button4 = this.game.gui.add.radiobox(150, 120, "单选框", mywin),
                button5 = this.game.gui.add.textinput(20, 130, "输入框", mywin),
                button6 = this.game.gui.add.toggle(20, 0, "toggle", mywin),
                button16 = this.game.gui.add.rating(120, 20, 3, mywin),
                button8 = this.game.gui.add.tooltip(30, 20, '这是一个Tips\n测试下中文', mywin),
                button9 = this.game.gui.add.scrollbar(350, 10, 20, 180, 'vertical', mywin),
                button10 = this.game.gui.add.listview(240, 10, 100, 100, mywin),
                button11 = this.game.gui.add.button(-20, 0, "宽按钮", button10),
                button12 = this.game.gui.add.button(-20, 40, "列表框中的宽按钮", button10),
                button13 = this.game.gui.add.button(-20, 80, "列表框中的宽按钮", button10),
                button14 = this.game.gui.add.checkbox(150, 140, "复选框", mywin),
                button7 = this.game.gui.add.dropdown(20, 80, "测试文字", mywin);
            mywin.input.enableDrag();
            this.game.gui.ready(function () {
                button2.setFont("'Fjalla One'");
            });
          //button3.group='group1';
          //mywin.show();
            button2.events.onInputDown.add(function () {
                mywin.close();
            }, this);
            button1.events.onInputDown.add(function () {
                mywin.show();
            }, this);
            button3.events.onInputDown.add(function () {
                this.game.stage.setBackgroundColor('#cccccc');
            }, this);
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