import * as pixi from 'pixi.js'
import { viewHeight, viewWidth } from './constants'
import { GameState } from './game'
import { SongSelect } from './song-select'

export class MainMenu extends GameState {
  enter() {
    const text = this.stage.addChild(new pixi.Text('Tap to begin'))
    text.style.fill = 'white'
    text.position.set(viewWidth / 2, viewHeight / 2)
    text.anchor.set(0.5, 0.5)
  }

  touchstart() {
    this.game.setState(new SongSelect(this.game))
  }
}
