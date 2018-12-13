export const Just = x => ({
    x,
    map: f => Just(f(x)),
    chain: f => f(x),
    fold: (f, g) => g(x),
    ap: fx => fx.map(x),
    inspect: () => `Maybe.Just(${x})`
})

export const Nothing = x => ({
    x,
    map: f => Nothing(x),
    chain: f => Nothing(x),
    fold: (f, g) => f(x),
    ap: fx => Nothing(x),
    inspect: () => `Maybe.Nothing`
})

export const fromNullable = x =>
    x != null ? Just(x) : Nothing()

export const of = Just;
