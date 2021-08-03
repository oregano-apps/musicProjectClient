import React, {useEffect, useState} from 'react'

function TitleSection() {
    const [image, setImage] = useState(null)
    const [moto, setMoto] = useState("")

    useEffect(() => {
        let randomNumber = Math.ceil(Math.random() * 9)
        console.log(randomNumber)
        setImage(`/images/oregano-image-${randomNumber}.jpeg`)
    }, [])




    return (
        <div class="titleSection">
           <img src={image} alt="" className="titleSection_img" />
           <div className="titleSection_background">
               <h1 className="titleSection_mainTitle">Oregano music app</h1>
               <h2 className="titleSection_subtitle">חיים רק פעם אחת!!</h2>
           </div>
        </div>
    )
}

export default TitleSection
