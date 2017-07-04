import * as pixi from 'pixi.js'
import { GameState } from '../game'
import { MainMenu } from './main-menu'

export class ResultsScreen extends GameState {
  enter() {
    this.stage.addChild(new pixi.Text('todo', { fill: 'white' }))
  }

  touchstart() {
    this.game.setState(new MainMenu(this.game))
  }
}
