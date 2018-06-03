export function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`/api/${endpoint}`)
        .then((res) => res.json())
        .then(resolve)
        .catch(reject)
    }, 1000)
  })
}
