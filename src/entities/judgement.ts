import * as pixi from 'pixi.js'
import { viewHeight, viewWidth } from '../constants'
import { Judgement } from '../judgement'
import { lerpClamped } from '../util/math'

export class JudgementAnimation {
  text = new pixi.Text('', {
    fill: 'white',
    fontFamily: 'Teko',
    fontSize: 120,
    fontWeight: '600',
  })

  sprite = new pixi.Container()

  time = 0

  judgement?: Judgement

  constructor(ticker: pixi.ticker.Ticker) {
    this.text.position.set(viewWidth * 0.5, viewHeight * 0.45)
    this.text.anchor.set(0.5, 0.5)
    this.sprite.addChild(this.text)
    ticker.add(this.update)
  }

  update = (dt: number) => {
    this.time += dt / 60
    this.sprite.y = lerpClamped(40, 0, (this.time / 0.3) ** 0.5)
    if (this.judgement) {
      this.text.text = this.judgement.text
      this.text.style.fill = this.judgement.color
    }
  }

  play(judgement: Judgement) {
    this.time = 0
    this.judgement = judgement
  }
}
