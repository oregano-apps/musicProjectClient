import React, {useState} from 'react'
import {Person, Email, Lock} from '@material-ui/icons';
import {Link} from 'react-router-dom'

function Singup() {
    const [page, setPage] = useState(0)
    const pageTranslate = page * 40

    const movePage = (e, number) => {
        e.preventDefault()
        setPage(number)
        console.log(number)
    }

    return (
        <div class="singup">
            <div className="singup_top">
                <img src="/images/test_image.svg" alt="" className="singup_top_image" />
                </div>
            <div className="singup_bottom">
                <div className="singup_card_one">
                    <h2 className="singup_title_part">CREATE NEW ACCOUNT</h2>
                        <form action="" className="singup_form">
                            <div className="singup_input"><Person /> <input type="text" className="singup_input_field" /></div>
                            <div className="singup_input"></div>
                        </form>
            </div>
                <div style = {{transform: `translateY(${pageTranslate}rem)`}} className="singup_card_two">
                    <form onSubmit={(e) => movePage(e, 1)} className="singup_form">
                        <div className="singup_input_part">
                            <div className="singup_input">
                                <Person /> 
                                <input type="text" className="singup_input_field" placeholder="Username..." />
                            </div>
                            <div className="singup_input">
                                <Email /> 
                                <input type="email" className="singup_input_field" placeholder="Email..." />
                            </div>
                        </div>
                            <button type = 'submit' className="singup_submit_button">Next</button>
                    </form>
                    <Link to="/login" className="singup_already_user">Already have a user? <p className="singup_already_user_bold">click here!</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Singup
