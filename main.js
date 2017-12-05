// phina.js をグローバル領域に展開
phina.globalize();
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

    lights.children.each(function(item){
      item.onpointstart = function(){
        console.log(item.id);
      };
    });

  },
  update: function(){
  }

});

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

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });
  // アプリケーション実行
  app.run();
});
