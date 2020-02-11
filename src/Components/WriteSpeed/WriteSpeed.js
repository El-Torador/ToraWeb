import React from 'react'
import './WriteSpeed.css'

let index = 0

const WriteSpeed = () =>{
    const randomSpeed = (max, min)=>{
        return Math.floor(Math.random() * (max - min) + min)
    }
const play = () =>{
        let title = document.getElementById('title_write');
        console.log(title)
        let text = 'Lancement de IAI-Learnship...';
        title.innerHTML = text.slice(0, index)
        index ++
        if(index > text.length){
            index = text.length
            clearInterval(timer)
        }
        clearInterval(timer)
        timer = setInterval(() => {
            play()
        }, randomSpeed(50, 300));
    }
    
    let timer = setInterval(() => {
        play()
    }, 1000);
    
    return (
        
        // eslint-disable-next-line jsx-a11y/heading-has-content
        <h3 id="title_write"></h3>
    )
}

export default WriteSpeed