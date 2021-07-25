import React, { useState, useRef } from "react";
import { Person, Email, Lock } from "@material-ui/icons";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Canvas } from "@react-three/fiber";
import MusicNote from "./../../3dComponents/MusicNote";

function Singup() {
  const [page, setPage] = useState(0);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();
  const pageTranslate = page * 40;

  const movePage = (e, number) => {
    e.preventDefault();
    setPage(number);
    console.log(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordConfirm.current.value) {
      password.current.setCustomValidity("Passwords not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const res = await axios.post(
          "http://localhost:11111/api/users/singup",
          user
        );
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div class="singup">
      <Canvas className="singup_top">
        <MusicNote />
        {/* {page == 1 ? (
          <ArrowBackIcon
            onClick={(e) => movePage(e, 0)}
            id="singup_button_back"
          />
        ) : null}
        <img src="/images/test_image.svg" alt="" className="singup_top_image" /> */}
      </Canvas>
      <div className="singup_bottom">
        <div className="singup_card_one">
          <h2 className="singup_title_part">CREATE NEW ACCOUNT</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="singup_form">
            <div className="singup_input_part">
              <div className="singup_input">
                <Lock />
                <input
                  type="password"
                  minLength="6"
                  maxLength="20"
                  ref={password}
                  className="singup_input_field"
                  placeholder="Password..."
                  required
                />
              </div>
              <div className="singup_input">
                <Lock />
                <input
                  type="password"
                  ref={passwordConfirm}
                  className="singup_input_field"
                  required
                  placeholder="Password Again..."
                />
              </div>
            </div>
            <button type="submit" className="singup_submit_button">
              Submit
            </button>
          </form>
        </div>

        <div
          style={{ transform: `translateY(${pageTranslate}rem)` }}
          className="singup_card_two"
        >
          <form onSubmit={(e) => movePage(e, 1)} className="singup_form">
            <div className="singup_input_part">
              <div className="singup_input">
                <Person />
                <input
                  type="text"
                  ref={username}
                  required
                  minLength="5"
                  maxLength="20"
                  className="singup_input_field"
                  placeholder="Username..."
                />
              </div>
              <div className="singup_input">
                <Email />
                <input
                  type="email"
                  ref={email}
                  required
                  maxLength="50"
                  className="singup_input_field"
                  placeholder="Email..."
                />
              </div>
            </div>
            <button type="submit" className="singup_submit_button">
              Next
            </button>
          </form>
          <p className="singup_already_user">
            Already have a user?
            <Link to="/login" className="singup_already_user_bold">
              click here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Singup;
