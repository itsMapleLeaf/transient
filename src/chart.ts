export class Note {
  constructor(public time: number, public position: number) {}
}

export class Chart {
  constructor(public notes: Note[]) {}

  static fromChartData() {}
}
