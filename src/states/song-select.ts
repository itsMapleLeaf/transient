import * as pixi from 'pixi.js'
import { GameState } from '../game'
import { Gameplay } from './gameplay'

export class SongSelect extends GameState {
  enter() {
    this.stage.addChild(new pixi.Text('todo', { fill: 'white' }))
  }

  touchstart() {
    this.game.setState(new Gameplay(this.game))
  }
}
