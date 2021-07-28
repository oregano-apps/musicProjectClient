import React from 'react'
import MusicNote from "./MusicNote";

function MusicNoteManager() {
    const notes = []
    const numbers = []
    const get_random_position = () => {
        const negative = Math.random()      
        let random_x = Math.random() * 6
        if (negative > 0.5) random_x *= -1
        return random_x
    }

    const get_random_path = () => {
        const number = Math.ceil(Math.random() * 12)
        if (numbers.includes(number)) {
            return get_random_path()
        } else {
            numbers.push(number)
            return "/3dmodels/note-"+ number + ".glb"
        }
        

    }
    // const generate_notes = () => {
    //     for (let i = 0; i < 10; i++) {
    //         notes.push(<MusicNote path={get_random_path()} position={[get_random_position(), get_random_position(), 0]} rotation={[1,1,1 ]} />) 
    //     }
    // }

    // generate_notes()
    // console.log(notes)

    
    return (
        <>
        <MusicNote path={get_random_path()} position={[0, 0, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[-5, 3, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[5, 5, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[-3, 1, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[2, 2, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[-4, -4, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[6, -3, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[-6, 3, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[1, -2, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[7, -1, -2]} rotation={[1,1,1]} />
        <MusicNote path={get_random_path()} position={[-7, 1, -2]} rotation={[1,1,1]} />
        </>
    )
}

export default MusicNoteManager
