export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export const money = (n: number) => `$${n.toLocaleString('en-CA')}`
