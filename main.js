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
/*
phina.define('Light', {
  superClass: 'CircleShape',
  init: function(gx, gy, id){
    this.superInit();
    this.x = gx;
    this.y = gy;
    this.id = id;
    this.radius = 15;
    this.setInteractive(true);
  }
});
*/
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
        .wait(200)
        .call(function(){
          if(this.target.isOn){
            if(this.target.id > 0){
              lights.children[this.target.id - 1].clickedAction(lights);
            }
            if(this.target.id < 120){
              lights.children[this.target.id + 1].clickedAction(lights);
            }
          }
        })
        .wait(10)
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
