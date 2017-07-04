import { Howl } from 'howler'
import * as pixi from 'pixi.js'
import { Chart } from './chart'
import { viewHeight, viewWidth } from './constants'
import { GameState } from './game'
import { degreesToRadians } from './util'

function createRectObject(width: number, height: number) {
  const sprite = new pixi.Graphics()
  sprite.beginFill(0xffffff)
  sprite.drawRect(0, 0, width, height)
  sprite.endFill()
  return sprite
}

class NoteObject {
  sprite = createRectObject(70, 70)

  constructor() {
    this.sprite.position.set(100, 100)
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2)
    this.sprite.rotation += degreesToRadians(45)
  }
}

export class Gameplay extends GameState {
  receptor = createRectObject(viewWidth, 10)
  fpsText = new pixi.Text('0')
  songTime = 0
  playing = false

  music = new Howl({
    src: [require('./moonlight.flac')],
    // autoplay: true,
    volume: 0.5,
    onload: () => {
      this.playing = true
    },
  })

  enter() {
    this.receptor.position.y = viewHeight * 0.825

    this.fpsText.position.set(10, 10)
    this.fpsText.style.fill = 'white'

    this.stage.addChild(this.receptor, this.fpsText, new NoteObject().sprite)
  }

  update(dt: number) {
    this.songTime += dt

    this.fpsText.text = this.game.app.ticker.FPS.toFixed()
  }
}
