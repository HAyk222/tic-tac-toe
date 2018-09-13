import Phaser from 'phaser'
import { SCENE_GAME } from '../constants/Constants'
import { gameConfig } from '../constants/GameConfig'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super(SCENE_GAME)
    this.clickCount = 0
    this.spaceSize = 10
    this.stop = false
    this.board = []
  }

  getPlatformSize () {
    this.platform = this.add.image(0, 0, 'platform')
    const { width, height } = this.platform
    this.platform.destroy()
    return width
  }

 create () {
    const boardContainer = this.add.container(0, 0)

    for (let i = 0; i < 3; ++i) {
      let arr = [];
      for (let j = 0; j < 3; ++j) {
        const platformContainer = this.add.container(i * (this.getPlatformSize() + this.spaceSize), j * (this.getPlatformSize() + this.spaceSize))
        const platform = this.add.image(0, 0, 'platform')
        platformContainer.setInteractive(
          new Phaser.Geom.Circle(0, 0, platform.width / 2),
          Phaser.Geom.Circle.Contains,
        )
        platformContainer.add(platform)
        boardContainer.add(platformContainer)
        platformContainer.cordinat = {i,j}
        arr.push(" ");
      }
      this.board.push(arr);
    }
    this.input.on('gameobjectdown', this.drawSymbols, this)
    boardContainer.x = (gameConfig.width - 2 * ((this.getPlatformSize() + this.spaceSize))) / 2
    boardContainer.y = (gameConfig.height - 2 * ((this.getPlatformSize() + this.spaceSize))) / 2

    console.log(this.board);
  }


  drawSymbols (pointer, target) {
    if (target.data || this.stop) {
      return
    }
    const a = target.cordinat.j
    const b = target.cordinat.i
    this.clickCount++
    if( this.clickCount % 2 === 1 ) {
      this.symbol = this.add.image(0, 0, 'x')
      this.board[a][b] = "X"
    }else{
      this.symbol = this.add.image(0, 0, 'o')
      this.board[a][b] = "O"
    }
    target.data = true
    target.add(this.symbol)
    this.findWinner("X");
    this.findWinner("O");
    if(this.findWinner("X") == "X"){
      this.add.text(10, 10, "X win!", {color:"#ffffff",fontSize:"30px"})
      this.stop = true;
    }
    if(this.findWinner("O") == "O"){
      this.add.text(10, 10, "O win!", {color:"#ffffff",fontSize:"30px"})
      this.stop = true;
    }
  }

 findWinner = (player) => {
   let y = false;
   for(let i = 0; i < this.board.length; i++){
     let n = 0
     for(let j = 0; j < this.board[i].length; j++){
       if(this.board[i][j] == player){
         n++
       }
     }

     if(n==this.board[i].length){
       y=true
     }
   }

   for(let i = 0; i < this.board[0].length; i++) {
     let n = 0
     for(let j = 0; j < this.board.length; j++) {
       if(this.board[j][i] == player){
         n++
       }
     }
     if(n==this.board.length){
       y=true;
     }
   }

   let n = 0;
   for(let i = 0; i < this.board.length; i++){
     for(let j = 0; j < this.board[i].length; j++){
       if(i != j){
         continue
       }
       if(this.board[i][j] == player){
         n++
       }
     }
     if(n==this.board.length){
       y=true;
     }
   }

   let x = 0;
   for(let i = 0; i < this.board.length; i++){
     for(let j = 0; j < this.board[i].length; j++){
       if(j != (this.board.length-1)-i){
         continue
       }
       if(this.board[i][j] == player){
         x++
       }
     }
     if(x==this.board.length){
       y=true
     }
   }

   if(y){
     return player
   }

   return "";
 }

  

  update () {
    
  }
}
