import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="addSection_searchResultItem"
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "3rem", width: "3rem" }} />
      <div className="">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}
