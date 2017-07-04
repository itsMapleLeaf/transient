import * as pixi from 'pixi.js'
import { viewHeight, viewWidth } from './constants'

type InteractionEvent = pixi.interaction.InteractionEvent

export class Game {
  app = new pixi.Application()
  state = new GameState(this)
  interaction = new pixi.interaction.InteractionManager(this.app.renderer)

  run() {
    this.app.renderer.resize(viewWidth, viewHeight)
    this.app.ticker.add(dt => this.state.update(dt / 60))
    this.interaction.on('touchstart', (event: InteractionEvent) => this.state.touchstart(event))
    this.interaction.on('touchend', (event: InteractionEvent) => this.state.touchend(event))
    this.interaction.on('touchmove', (event: InteractionEvent) => this.state.touchmove(event))
  }

  setState(state: GameState) {
    this.state.leave()
    this.app.stage.removeChildren()
    this.state = state
    this.state.enter()
  }
}

export class GameState {
  constructor(protected game: Game) {}
  enter() {}
  leave() {}
  update(dt: number) {}
  touchstart(touch: InteractionEvent) {}
  touchend(touch: InteractionEvent) {}
  touchmove(touch: InteractionEvent) {}

  get app() {
    return this.game.app
  }

  get stage() {
    return this.app.stage
  }
}
