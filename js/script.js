/*  
Project Name: Random Choice Picker
Description: This is a Random Choice Picker app. Give me a thumbs-up, If you like it. Enjoy!
Author: Abdul Samad
Author URI: https://getabdulsamad.com/
*/

const typingBox = document.getElementById('typingBox')
const tagsEl = document.getElementById('tags')
const btnDone = document.getElementById('btnDone')
const finalPicked = document.getElementById('picked')

typingBox.focus()

typingBox.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        typingBox.value = ''
        randomSelect()
    } 
})

btnDone.addEventListener('click', () => {
        typingBox.value = ''
        randomSelect()
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
       const tagEl = document.createElement('span')
       tagEl.classList.add('tag')
       tagEl.innerText = tag
       tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
        
	if (randomTag !== undefined) {
        highlightTag(randomTag)
        
        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
	}
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
            
            const getFinalPicked = randomTag.innerText
            finalPicked.innerHTML = `<p>You have picked: <b>${getFinalPicked}</b></p>`

        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}
