import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const VIDEO_CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(playerOn, 1000));
function playerOn(event) {
  // console.log(event);
  localStorage.setItem(VIDEO_CURRENT_TIME, JSON.stringify(event));
}
playerRestart();
function playerRestart() {
  const savedTime = localStorage.getItem(VIDEO_CURRENT_TIME);
  const parsedTime = JSON.parse(savedTime);
  if (localStorage.getItem(VIDEO_CURRENT_TIME)) {
    player
      .setCurrentTime(parsedTime.seconds)
      .then(value => {
        console.log(value);
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            console.log(error);
            break;
          default:
            break;
        }
      });
  }
}
