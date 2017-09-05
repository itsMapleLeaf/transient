export function query(selector: string, root: NodeSelector = document.body) {
  const element = root.querySelector(selector)
  if (element) return element
  throw new Error(`Invalid selector "${selector}" in ${root}`)
}

export function animationFrame() {
  return new Promise(requestAnimationFrame)
}
