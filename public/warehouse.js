const maxCapacity = document.querySelector('#max-capacity').innerHTML
const currentCapacity = document.querySelector('#current-capacity').innerHTML
const availableCapacity = document.querySelector('#available-capacity');


let value = parseInt(maxCapacity) - parseInt(currentCapacity)
availableCapacity.innerHTML = value
