// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
    light_on: './img/denkyuu_on.png',
    light_off: './img/denkyuu_off.png'
  }
};
var SCREEN_WIDTH  = 465;
var SCREEN_HEIGHT = 665;

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    var self = this;
    // 背景色を指定
    self.backgroundColor = '#444';
    var lights = DisplayElement().addChildTo(self);
    Array.range(1, 12, 1).each((Y) =>{
      Array.range(1, 12, 1).each((X) =>{
        Light(self.gridX.span(X), self.gridY.span(Y), (Y-1)*11+(X-1)).addChildTo(lights);
      });
    });
    lights.x -= 6;
    lights.y -= 3;

    lights.children.each(function(light){
      light.onpointstart = function(){
        light.clickedAction(lights);
      };
    });

  },
  update: function(){
  }
});

phina.define('Light', {
  superClass: 'Sprite',
  init: function(gx, gy, id){
    this.superInit('light_off', 45, 45);
    this.x = gx;
    this.y = gy;
    this.id = id;
    this.isOn = false;
    this.setInteractive(true);
  },
  clickedAction: function(lights){
      this.tweener
          .clear()
          .call(function(){
            this.target.turnOn();
          })
          .wait(30)
          .call(function(){
            this.target.nextLightClick(lights, this.target.id);
          })
          .wait(40)
          .call(function(){
            this.target.turnOff();
          });
  },
  turnOn: function(){
    this.setImage('light_on', 50, 50);
    this.isOn = true;
  },
  turnOff: function(){
    this.setImage('light_off', 45, 45);
    this.isOn = false;
  },
  nextLightClick: function(lights, id){
    if(id > 11 && id % 11 != 0){
      var upLeftLight = lights.children[id - 12];
      if(!upLeftLight.isOn){
        upLeftLight.clickedAction(lights);
      }
    }

    if(id > 11){
      var upLight = lights.children[id - 11];
      if(!upLight.isOn){
        upLight.clickedAction(lights);
      }
    }

    if(id > 11 && id % 11 != 10){
      var upRightLight = lights.children[id - 10];
      if(!upRightLight.isOn){
        upRightLight.clickedAction(lights);
      }
    }

    if(id > 0 && id % 11 != 0){
      var leftLight = lights.children[id - 1];
      if(!leftLight.isOn){
        leftLight.clickedAction(lights);
      }
    }

    if(id < 120 && id % 11 != 10){
      var rightLight = lights.children[id + 1];
      if(!rightLight.isOn){
        rightLight.clickedAction(lights);
      }
    }

    if(id < 109 && id % 11 != 0){
      var downLeftLight = lights.children[id + 10];
      if(!downLeftLight.isOn){
        downLeftLight.clickedAction(lights);
      }
    }

    if(id < 109){
      var downLight = lights.children[id + 11];
      if(!downLight.isOn){
        downLight.clickedAction(lights);
      }
    }

    if(id < 109 && id % 11 != 10){
      var downRightLight = lights.children[id + 12];
      if(!downRightLight.isOn){
        downRightLight.clickedAction(lights);
      }
    }
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  // アプリケーション実行
  app.run();
});
