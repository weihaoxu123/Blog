import React, { useState, useRef, useEffect } from "react";
import MusicList from "./musicList";
import {
  PlayCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PauseOutlined,
} from "@ant-design/icons";
var cumulativeOffset = function (element) {
  var top = 0,
    left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
};
const musicPlayer = () => {
  const audioEle = useRef(null);
  const proEle = useRef(null);
  const timeEle = useRef(null);
  const [onPlay, setOnPlay] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Icon = onPlay ? (
    <PauseOutlined style={{ fontSize: "25px" }} />
  ) : (
    <PlayCircleOutlined style={{ fontSize: "25px" }} />
  );
  const format = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);
    const formatTime = minutes + ":" + seconds;
    return formatTime;
  };

  useEffect(() => {
    audioEle.current.addEventListener(
      "timeupdate",
      () => {
        setCurrentTime(audioEle.current.currentTime);
        const percentage =
          (100 * audioEle.current.currentTime) / audioEle.current.duration;
        proEle.current.style.width = percentage + "%";
      },
      false
    );
    audioEle.current.addEventListener(
      "ended",
      () => {
        setCurrentTime(0);
        const percentage = (100 * currentTime) / audioEle.current.duration;
        proEle.current.style.width = percentage + "%";
        setOnPlay(0);
      },
      false
    );
    timeEle.current.addEventListener(
      "click",
      (e) => {
        const left = cumulativeOffset(timeEle.current).left;
        const right = e.clientX;
        const userClickWidthInPercent =
          ((right - left) * 100) / timeEle.current.clientWidth;
        proEle.current.width = userClickWidthInPercent + "%";

        audioEle.current.currentTime =
          (audioEle.current.duration * userClickWidthInPercent) / 100;
      },
      false
    );
  }, []);

  return (
    <div className="card" id="card">
      <div className="current-song">
        <audio ref={audioEle} preload="metadata">
          <source src={MusicList[currentIndex].src} />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div className="img-wrap">
          <img src={MusicList[currentIndex].img} />
        </div>
        <span className="song-name">{MusicList[currentIndex].name}</span>
        <span className="author-name">{MusicList[currentIndex].author}</span>
        <div className="time">
          <div className="current-time">{format(currentTime)}</div>
          <div className="end-time">{MusicList[currentIndex].duration}</div>
        </div>
        <div className="time-line" ref={timeEle}>
          <div className="completed-line" ref={proEle}></div>
        </div>
        <div className="control">
          <DoubleLeftOutlined
            style={{ fontSize: "20px", margin: "auto 0", cursor: "pointer" }}
            onClick={() => {
              if (currentIndex == 0) {
                setCurrentIndex(MusicList.length - 1);
              } else {
                setCurrentIndex(currentIndex - 1);
              }

              audioEle.current.load();
              audioEle.current.play();
              setOnPlay(1);
            }}
          />
          <div
            onClick={() => {
              if (onPlay) {
                setOnPlay(0);
                audioEle.current.pause();
              } else {
                setOnPlay(1);
                audioEle.current.play();
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {Icon}
          </div>
          <DoubleRightOutlined
            style={{ fontSize: "20px", margin: "auto 0", cursor: "pointer" }}
            onClick={() => {
              if (currentIndex == MusicList.length - 1) {
                setCurrentIndex(0);
              } else {
                setCurrentIndex(currentIndex + 1);
              }

              audioEle.current.load();
              audioEle.current.play();
              setOnPlay(1);
            }}
          />
        </div>
        <span className="end-word">歌单背后的故事</span>
      </div>
      <style jsx>{`
        $border-radius: 20px;

        $primary: #709fdc;
        $base: #071739;
        $shadow-color: #274684;
        $lighter-shadow: rgba($shadow-color, 0.7);
        $white: #fff;
        $gray: #8c8c8c;
        $lighter-gray: rgba($gray, 0.1);
        $time-line-width: 240px;
        $transition: 0.3s all ease;
        .card {
          display: flex;
          width: 250px;
          height: 350px;
          margin: 40px auto;
          border-radius: 20px;
          font-weight: 100;
          box-shadow: 0px 0px 20px 0px #274684;
          background: #071739;
          overflow: hidden;
          float: right;
        }
        .current-song {
          padding: 10px 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          border-radius: 20px;
          color: $base;
          background: #fff;
        }
        .img-wrap {
          position: relative;
          margin: 0 auto;
          width: 180px;
          height: 180px;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0px 10px 40px 0px rgba($gray, 0.1);
        }
        img {
          height: 100%;
          width: 100%;
        }
        .song-name {
          margin-top: 20px;
          color: black;
        }
        .author-name {
          color: #709fdc;
        }
        .time {
          margin-top: 5px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 80%;
        }
        .time-line {
          position: relative;
          width: 80%;
          height: 5px;
          background: #709fdc;
          border-radius: 5px;
          cursor: pointer;
        }
        .completed-line {
          width: 0%;
          height: 5px;
          background: #a2e1d4;
          border-radius: 5px;
          cursor: pointer;
        }
        .control {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          width: 50%;
        }
        .end-word {
          margin-top: 15px;
          float: left;
          font-size: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
export default musicPlayer;
