import React, { useState, useRef, useContext } from "react";
import { Person, Email, Lock } from "@material-ui/icons";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Canvas } from "@react-three/fiber";
import MusicNoteManager from "./../../3dComponents/MusicNoteManager";
import Light from "./../../3dComponents/Light";
import { Context } from './../../context/Context'
import { loginCall } from './../../utils/apiCalls'

function Login() {
  const username = useRef();
  const password = useRef();
  const history = useHistory();

  const { isFetching, dispatch } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = new URLSearchParams(window.location.search).get("code")

    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    )
    history.push('/spotLogin')
  };

  return (
    <div>
      <div class="singup">
        <div className="singup_logo_circle">
          <img
            src="/images/ogerano.png"
            alt=""
            className="singup_logo_circle_img"
          />
        </div>
        <Canvas className="singup_top">
          <MusicNoteManager />
          <Light />

          {/* <img src="/images/test_image.svg" alt="" className="singup_top_image" /> */}
        </Canvas>
        <div className="singup_bottom">
          <div className="singup_card_one">
            <h2 className="singup_title_part">CONNECT YOUR ACCOUNT</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="singup_form">
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
                  <Lock />
                  <input
                    type="password"
                    ref={password}
                    className="singup_input_field"
                    required
                    placeholder="Password..."
                  />
                </div>
              </div>
              <a href="/spotLogin">Connect to spotify</a>
              <button
                type="submit"
                style={{ marginBottom: "2rem" }}
                className="singup_submit_button"
              >
                Submit
              </button>
            </form>
            <p className="singup_already_user">
              Don't have a user yet?
              <Link to="/singup" className="singup_already_user_bold">
                click here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
