import Phaser from 'phaser'
import { SCENE_GAME } from '../constants/Constants'
import { gameConfig } from '../constants/GameConfig'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super(SCENE_GAME)
    this.count=3
    this.clickCount = 0
    this.spaceSize = 10
    this.stop = false
    this.board = []
    this.allFields_X = { row: {}, column: {}, mainDiaganal: [], secondDiaganal: [] }
    this.allFields_O = { row: {}, column: {}, mainDiaganal: [], secondDiaganal: [] }
    this.rowColumn(this.count)
  }

  rowColumn (n) {
    for(let i = 0; i < n; ++i){
      this.allFields_X.row[i] = [];
      this.allFields_X.column[i] = [];
      this.allFields_O.row[i] = [];
      this.allFields_O.column[i] = [];
    }
  }

  getPlatformSize () {
    this.platform = this.add.image(0, 0, 'platform')
    const { width, height } = this.platform
    this.platform.destroy()
    return width
  }

 create () {
    const boardContainer = this.add.container(0, 0)

    for (let i = 0; i < this.count; ++i) {
      let arr = [];
      for (let j = 0; j < this.count; ++j) {
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
    boardContainer.x = (gameConfig.width - (this.count-1) * ((this.getPlatformSize() + this.spaceSize))) / 2
    boardContainer.y = (gameConfig.height - (this.count-1) * ((this.getPlatformSize() + this.spaceSize))) / 2

    console.log(this.board);
  }

  drawSymbols (pointer, target) {
    if (target.data || this.stop) {
      return
    }
    this.clickCount++
    if( this.clickCount % 2 === 1 ) {
      this.symbol = this.add.image(0, 0, 'x')
      this.board[ target.cordinat.j ][ target.cordinat.i ] = "X"
      this.pushArray(this.allFields_X, target.cordinat.j, target.cordinat.i)
    } else {
      this.symbol = this.add.image(0, 0, 'o')
      this.board[ target.cordinat.j ][ target.cordinat.i ] = "O"
      this.pushArray(this.allFields_O, target.cordinat.j, target.cordinat.i)
    }
    this.findWinner(this.allFields_X, target.cordinat.j, target.cordinat.i, "X")
    this.findWinner(this.allFields_O, target.cordinat.j,target.cordinat.i, "O")
    target.data = true
    target.add(this.symbol)
  }

  pushArray ( obj, i, j) {
    obj.row[i].push([i,j])
    obj.column[j].push([i,j])
    if (i == j) { obj.mainDiaganal.push([i,j]) }
    if (i + j == this.board.length-1) { obj.secondDiaganal.push([i,j]) }
  }

  findWinner ( obj, i, j, str ) {
    if(obj.row[i].length >= this.count || obj.column[j].length >= this.count || obj.mainDiaganal.length >= this.count || obj.secondDiaganal.length >= this.count){
        this.add.text(10, 10, `${str} win!`, {color:"#ffffff",fontSize:"30px"})
        this.stop = true
    }
  }
}
