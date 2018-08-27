// Notação Oh O
// O(f(n)) intuitivamente são funções que não crescem mais rápido que f(n).
// Apresenta o pior caso de um algoritmo.
// Sejam T(n) e f(n) funções dos inteiros reais. 
// Dizemos que T(n) é O(f(n)) se existem constantes positivas e "c" e "n0" tais que:
// T(n) <= c f(n) para todo n >= n0.

// Notação Ômega Ω
// Ω(f(n)) intuitivamente são funções que crescem mais rápido que f(n).
// Apresenta o melhor caso de um algoritmo.
// Sejam T(n) e f(n) funções dos inteiros reais. 
// Dizemos que T(n) é Ω(f(n)) se existem constantes positivas e "c" e "n0" tais que:
// T(n) >= c f(n) para todo n >= n0.

// Notação Theta Θ
// Θ(f(n)) intuitivamente são funções
// Sejam T(n) e f(n) funções dos inteiros reais. 
// Dizemos que T(n) é Θ(f(n)) se existem constantes positivas "c1" e "c2" e "n0" tais que:
// c1 f(n) <= T(n) <= c2 f(n) para todo n >= n0.

const isEvenNumber = number => number % 2 === 0

const generateNumber = max => Math.floor(Math.random() * max) + 1

const generateEvenNumber = max => {
  const number = generateNumber(max)
  return isEvenNumber(number) ? number : generateEvenNumber(max)
}

const generateOddNumber = max => {
  const number = generateNumber(max)
  return isEvenNumber(number) ? generateOddNumber(max) : number
}

const generateVector = (evenAmount, oddAmount, maxVectorNumber) => {
  const vector = []
  while (evenAmount > 0 || oddAmount > 0) {
    if (oddAmount === 0 || (evenAmount > 0 && Math.random() >= 0.50)) {
      evenAmount--
      vector.push(generateEvenNumber(maxVectorNumber))
    } else {
      oddAmount--
      vector.push(generateOddNumber(maxVectorNumber))
    }
  }
  return vector
}

// Método solicitado no exercício "separaParImpar" utilizando vetor auxiliar.
// O(n * 2)
const sortEvenOddWithAuxVector = vector => vector
  .filter(isEvenNumber)
  .concat(
    vector.filter(number => !isEvenNumber(number))
  )

// Método solicitado no exercício "separaParImpar" sem utilizar vetor auxiliar.
// O(n)
const sortEvenOddWithoutAuxVector = vector => {
  let lastPar = -1
  let lastImpar = vector.length
  for (let i = 0; i < vector.length - 1; i++) {
    if (i === lastImpar) {
      break
    }
    const number = vector[i]
    if (isEvenNumber(number)) {
      lastPar++
      vector[lastPar] = number
    } else {
      lastImpar--
      vector[i] = vector[lastImpar]
      vector[lastImpar] = number
      i--
    }
  }
  return vector
}

// execution
const maxVectorNumber = 100
const vectors = [
  generateVector(50, 50, maxVectorNumber),
  generateVector(20, 80, maxVectorNumber),
  generateVector(80, 20, maxVectorNumber),
  generateVector(50000, 50000, maxVectorNumber),
  generateVector(20000, 80000, maxVectorNumber),
  generateVector(80000, 20000, maxVectorNumber)
]
const methods = [
  sortEvenOddWithAuxVector,
  sortEvenOddWithoutAuxVector
]
methods.forEach(method => {
  const startTime = Date.now()
  vectors.forEach(method)
  const elapsedTime = (Date.now() - startTime)
  console.log(`Executed tests of method '${method.name}' in ${elapsedTime}ms.`)
})
