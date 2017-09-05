import { trackScale, viewWidth } from '../constants'
import { degreesToRadians, lerp } from '../util/math'
import { createRectObject } from '../util/pixi'

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
