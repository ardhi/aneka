function delay (ms = 1000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (timer) clearTimeout(timer)
      resolve()
    }, ms)
  })
}

export default delay
