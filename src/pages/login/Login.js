import React, { useState, useRef } from "react";
import { Person, Email, Lock } from "@material-ui/icons";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Canvas } from "@react-three/fiber";
import MusicNoteManager from "./../../3dComponents/MusicNoteManager";
import Light from "./../../3dComponents/Light";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=44ac6a7030a545d681e0ff5e34777f28&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Login() {
  const username = useRef();
  const password = useRef();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:11111/api/users/login",
        user
      );
      history.push(AUTH_URL);
    } catch (err) {
      console.log(err);
    }
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
          <MusicNoteManager />
          <MusicNoteManager />
          <MusicNoteManager />
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
              <Link to="/login" className="singup_already_user_bold">
                click here!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <a className="btn btn-success btn-lg" href={"/"}>
        Login With Spotify
      </a>
    </div>
  );
}

export default Login;
