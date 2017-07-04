import { Howl } from 'howler'
import * as pixi from 'pixi.js'
import { viewHeight, viewWidth } from '../constants'
import { GameState } from '../game'
import { degreesToRadians, lerp } from '../lib/util'

/** The vertical position of the receptor */
const receptorPosition = viewHeight * 0.875

/** The number of pixels per second between notes */
const trackScale = 300

/** Creates a rectangle pixi Graphics object with the given dimensions */
function createRectObject(width: number, height: number) {
  const sprite = new pixi.Graphics()
  sprite.beginFill(0xffffff)
  sprite.drawRect(0, 0, width, height)
  sprite.endFill()
  return sprite
}

class Note {
  sprite = createRectObject(70, 70)

  constructor(public time: number, public position: number) {
    const x = lerp(100, viewWidth - 100, position)
    const y = -trackScale * time
    this.sprite.position.set(x, y)
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2)
    this.sprite.rotation += degreesToRadians(45)
  }
}

export class Gameplay extends GameState {
  songTime = -2
  playing = false

  noteContainer = new pixi.Container()
  receptor = createRectObject(viewWidth, 10)
  fpsText = new pixi.Text('0')

  music = new Howl({
    src: [require('../assets/moonlight.flac')],
    // autoplay: true,
    volume: 0.5,
    onload: () => {
      this.playing = true
    },
  })

  enter() {
    this.receptor.position.y = receptorPosition

    this.fpsText.position.set(10, 10)
    this.fpsText.style.fill = 'white'

    this.noteContainer.addChild(
      new Note(0 / 2, 0 / 4).sprite,
      new Note(1 / 2, 1 / 4).sprite,
      new Note(2 / 2, 2 / 4).sprite,
      new Note(3 / 2, 3 / 4).sprite,
      new Note(4 / 2, 4 / 4).sprite
    )

    this.stage.addChild(this.receptor, this.noteContainer, this.fpsText)
  }

  update(dt: number) {
    this.songTime += dt
    this.noteContainer.y = this.receptor.y + this.songTime * trackScale
    this.fpsText.text = this.game.app.ticker.FPS.toFixed()
  }
}
