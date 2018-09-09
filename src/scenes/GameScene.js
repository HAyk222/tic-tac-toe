import Phaser from 'phaser'
import { SCENE_GAME } from '../constants/Constants'
import { gameConfig } from '../constants/GameConfig'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super(SCENE_GAME)
    this.board = 3
  }

  create () {
  		const size = 64;
  		const space = 1;
    	const group = this.add.group({
	     createCallback: this.shapeCreateCallback

	    })

	   for (let i = 0; i < this.board; i++) {
	     group.createMultiple({
	       key: 'field',
	       repeat: this.board - 1,
	       setXY: {
	         x: 0,
	         y: i * (size + space),
	         stepX: size + space
	       }
	     });
	   }

	  const boardWidth = this.board * size + (this.board - 1) * space
	  const groupX = (gameConfig.width - boardWidth) / 2 + (size / 2)
	  const groupY = (gameConfig.height - boardWidth) / 2 + (size / 2)

	  Phaser.Actions.IncX(group.getChildren(), groupX)
	  Phaser.Actions.IncY(group.getChildren(), groupY)
  }

  shapeCreateCallback () {
  	
  }

  update () {
    
  }
}
