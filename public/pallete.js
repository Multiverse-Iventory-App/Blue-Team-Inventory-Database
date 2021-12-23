const deleteBtn = document.querySelector('#delete-btn')
const boxCounter = document.querySelector('#box-counter')

const maxCapacity = document.querySelector('#max-capacity').innerHTML
const currentCapacity = document.querySelector('#current-capacity').innerHTML
// const id = document.querySelector('#pallete-id').innerHTML;
let availableCapacity = document.querySelector('#available-capacity').innerHTML;

const id = window.location.pathname.split('/palletes/')[1]



let value = parseInt(maxCapacity) - parseInt(currentCapacity)
availableCapacity = value

//delete pallete button
deleteBtn.addEventListener('click', async () => {
    const id = window.location.pathname.split('/palletes/')[1]
    let res = await fetch(`/pallete/${id}`, {
        method: 'DELETE'
    })
    console.log(res)
    //window.location.assign('/warehouses/${id}')
});

// async function deletedPallete(id){
//     //delete a sauce matching parameter id
//     let res = await fetch(`/palletes/${id}` ,{
//         method: 'DELETE'
//     })
//     console.log(res)
//     //send user back to the sauces path
//     window.location.assign('/warehouse')
// }

//add and delete boxes button
// async function box(value) {
//     let currentBoxes = parseInt(boxCounter.innerHTML)
//     console.log(currentBoxes)
//     currentBoxes += value
//     boxCounter.innerHTML = currentBoxes
//     let res = await fetch (`/palletes/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             boxes: currentBoxes
//         })
//     })
// }

