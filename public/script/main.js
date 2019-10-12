function map(val, from, to, start, end) {
    const pdist = to - from
    const ndist = end - start

    Math.min(start, end)
    return Math.min(start, end) + ((ndist / pdist) * val)
}

function $(el) {
    return document.querySelector(el)
}