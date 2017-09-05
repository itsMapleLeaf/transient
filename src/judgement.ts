export class Judgement {
  constructor(public text: string, public color: string, public timingWindow: number) {}
}

export const absolute = new Judgement('ABSOLUTE', 'blue', 0.08)
export const great = new Judgement('GREAT', 'green', 0.12)
export const ok = new Judgement('OK', 'yellow', 0.2)
export const miss = new Judgement('BREAK', 'red', Infinity)

export function judgeTiming(timing: number) {
  if (timing <= absolute.timingWindow) return absolute
  if (timing <= great.timingWindow) return great
  if (timing <= ok.timingWindow) return ok
}
