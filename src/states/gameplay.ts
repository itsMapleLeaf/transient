import { Howl } from 'howler'
import * as pixi from 'pixi.js'
import { receptorPosition, trackScale, viewWidth } from '../constants'
import { JudgementAnimation } from '../entities/judgement'
import { NoteEntity, NoteExplosion } from '../entities/note'
import { GameState } from '../game'
import { Judgement, judgeTiming, miss } from '../judgement'
import { createRectObject } from '../util/pixi'

export class Gameplay extends GameState {
  songTime = -2
  notes = [] as NoteEntity[]
  judgement = new JudgementAnimation(this.app.ticker)
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

    this.notes.push(
      new NoteEntity(0 / 2, Math.random()),
      new NoteEntity(1 / 2, Math.random()),
      new NoteEntity(2 / 2, Math.random()),
      new NoteEntity(3 / 2, Math.random()),
      new NoteEntity(4 / 2, Math.random()),
    )

    this.notes.forEach(note => this.noteContainer.addChild(note.sprite))

    this.stage.addChild(this.receptor, this.noteContainer, this.fpsText, this.judgement.sprite)
  }

  update(dt: number) {
    this.songTime += dt
    this.noteContainer.y = this.receptor.y + this.songTime * trackScale
    this.fpsText.text = this.game.app.ticker.FPS.toFixed()
  }

  touchstart(event: pixi.interaction.InteractionEvent) {
    for (const note of this.notes) {
      const touchDistance = Math.abs(note.sprite.position.x - event.data.global.x)
      const touchTiming = Math.abs(note.time - this.songTime)
      const judgement = judgeTiming(touchTiming)
      if (touchDistance < 50 && judgement !== miss) {
        this.handleTappedNote(note, judgement)
      }
    }
  }

  handleTappedNote(note: NoteEntity, judgement: Judgement) {
    note.hide()

    const global = note.sprite.getGlobalPosition()
    const explosion = new NoteExplosion(global.x, receptorPosition, this.app.ticker)
    this.stage.addChild(explosion.sprite)

    this.judgement.play(judgement)
  }
}
