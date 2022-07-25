const pictures = ['pic1','pic2','pic3','pic4','pic5','pic6','pic7','pic8','pic9','pic10']

// let allowedItems = 1
// let currentStartingPic = 'pic1'
// // let count = 0


// let start = pictures.indexOf(currentStartingPic)
// let end = allowedItems + start

// const carousel = (array, start, end) => {
//     if (end <= array.length) {
//         return array.slice(start, end)
//     } else {
//         let endingArray = array.slice(start, array.length)
//         let startingArray = array.slice(0, end - array.length)
//         return endingArray.concat(startingArray)
//     }
// }

// console.log(carousel(pictures, start, end))
// console.log(pictures.slice(1))

// check if start and end fall under the array regularly
// return the sliced array. 

// if not I need to establish a new ending value first (ending at the last item of the array), then a starting value (starting at the first value of the array)
// example 8,9,10,1
// loop through the array and push in the values for indexes 8,9,10, then push in the value for index 1




// whats the starting index the user is on?
// how many images are allowed based on the screen size?


const renderImages = (startingIndex, allowedImages, images) => {
    let returnedArray = []
    let imageIndex = startingIndex
    let count = 0
    while (count < allowedImages) {
        if (imageIndex <= (images.length - 1)) {
            console.log("first")
            returnedArray.push(images[imageIndex])
            imageIndex ++
            count ++
        } else {
            console.log("second")
            imageIndex = 0
        }
    }
    return returnedArray
}



console.log(renderImages(8, 22, pictures))




































