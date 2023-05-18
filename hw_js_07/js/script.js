//HW_1
var playList = [
  {
    author: "LED ZEPPELIN",
    song: "STAIRWAY TO HEAVEN"
  },
  {
    author: "QUEEN",
    song: "BOHEMIAN RHAPSODY"
  },
  {
    author: "LYNYRD SKYNYRD",
    song: "FREE BIRD"
  },
  {
    author: "DEEP PURPLE",
    song: "SMOKE ON THE WATER"
  },
  {
    author: "JIMI HENDRIX",
    song: "ALL ALONG THE WATCHTOWER"
  },
  {
    author: "AC/DC",
    song: "BACK IN BLACK"
  },
  {
    author: "QUEEN",
    song: "WE WILL ROCK YOU"
  },
  {
    author: "METALLICA",
    song: "ENTER SANDMAN"
  }
];

let blockHw1 = document.querySelector('.listSong'),
  result = '';

for (let i = 0; i < playList.length; i++) {
  result += `<li><strong>${playList[i].author}</strong> - ${playList[i].song}</li>`;
}
blockHw1.innerHTML = `<ol>${result}</ol>`;

//HW_2
let btn = document.querySelectorAll('.btn_popup'),
  popup = document.querySelector('.popup_back');

for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = function () {
    popup.classList.toggle('popup_back__active');
  }
}

// HW_3
let trafficLightCircle = document.querySelectorAll('.traffic_light__circle'),
  trafficLightSwitch = document.querySelector('.switch'),
  index = 0;

trafficLightSwitch.onclick = function () {
  for (let i = 0; i < trafficLightCircle.length; i++) {
    trafficLightCircle[i].classList.remove('traffic_light__circle--active');
    if (index === 0) {
      trafficLightCircle[0].classList.add('traffic_light__circle--active');
    } else if (index === 1) {
      trafficLightCircle[1].classList.add('traffic_light__circle--active');
    } else if (index === 2) {
      trafficLightCircle[2].classList.add('traffic_light__circle--active');
    }
    if (index === 3) {
      index = 0;
    }
  }
  index++;
  console.log(index);
}
