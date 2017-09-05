import * as pixi from 'pixi.js'
import { trackScale, viewWidth } from '../constants'
import { degreesToRadians, lerp } from '../util/math'
import { createRectObject } from '../util/pixi'

const blurFilter = new pixi.filters.BlurFilter()
blurFilter.blur = 20

export class NoteEntity {
  sprite = createRectObject(70, 70)

  constructor(public time: number, public position: number) {
    const x = lerp(100, viewWidth - 100, position)
    const y = -trackScale * time
    this.sprite.position.set(x, y)
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2)
    this.sprite.rotation += degreesToRadians(45)
  }

  playTapAnimation() {
    this.sprite.visible = false
  }
}

export class NoteExplosionEntity {
  sprite = new pixi.Container()
  time = 0

  constructor(private x: number, private y: number, private ticker: pixi.ticker.Ticker) {
    const body = createRectObject(70, 70)

    const glow = body.clone()
    glow.filters = [blurFilter]

    this.sprite.addChild(body, glow)
    this.sprite.pivot.set(body.width / 2, body.height / 2)
    this.sprite.rotation += degreesToRadians(45)

    ticker.add(this.update)
  }

  update = (dt: number) => {
    this.time += dt / 60 / 0.3
    this.sprite.alpha = lerp(1, 0, this.time)
    this.sprite.position.set(this.x, lerp(this.y, this.y + 100, this.time ** 1.5))
    if (this.time >= 1) {
      this.ticker.remove(this.update)
      this.sprite.destroy()
    }
  }
}
