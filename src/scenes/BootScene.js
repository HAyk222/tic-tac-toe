import Phaser from 'phaser'
import { SCENE_BOOT, SCENE_GAME } from '../constants/Constants'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super(SCENE_BOOT)
  }

  preload () {
    this.load.image('platform', 'assets/platform.png')
    this.load.image('x', 'assets/x.png')
    this.load.image('o', 'assets/o.png')
  }

  create () {
    this.scene.start(SCENE_GAME)
  }
}
