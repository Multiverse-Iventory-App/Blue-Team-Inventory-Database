const deleteBtn = document.querySelector('#delete-btn')
const boxCounter = document.querySelector('#box-counter')

const maxCapacity = document.querySelector('#max-capacity').innerHTML
const currentCapacity = document.querySelector('#current-capacity').innerHTML
let availableCapacity = document.querySelector('#available-capacity').innerHTML;

const id = window.location.pathname.split('/palletes/')[1]

let value = parseInt(maxCapacity) - parseInt(currentCapacity)
availableCapacity = value

//delete pallete button
deleteBtn.addEventListener('click', async () => {
    let res = await fetch (`/pallete/${id}`, {
        method: 'DELETE'
    })
    console.log(res)
    window.location.assign(`/warehouses/${id}`)
});

//add and delete boxes button
async function box(value) {
    let currentBoxes = parseInt(boxCounter.innerHTML)
    console.log(currentBoxes)
    currentBoxes += value
    boxCounter.innerHTML = currentBoxes
    let res = await fetch (`/palletes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            boxes: currentBoxes
        })
    })
}

