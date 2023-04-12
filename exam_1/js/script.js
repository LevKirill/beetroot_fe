//Video youtube
function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}

r(function () {
    if (!document.getElementsByClassName) {
        // Поддержка IE8
        var getElementsByClassName = function (node, classname) {
            var a = [];
            var re = new RegExp('(^| )' + classname + '( |$)');
            var els = node.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++)
                if (re.test(els[i].className)) a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body, "youtube");
    } else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i = 0; i < nb_videos; i++) {
        // Находим постер для видео, зная ID нашего видео
        videos[i].style.backgroundImage = 'url(./img/screensaver-video.png)';

        // Размещаем над постером кнопку Play, чтобы создать эффект плеера
        let play = document.querySelector('.use_cases__tablet--play');
        videos[i].appendChild(play);

        videos[i].onclick = function () {
            // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
            iframe.setAttribute("src", iframe_url);
            iframe.setAttribute("class", 'youtube');
            iframe.setAttribute("frameborder", '0');
            iframe.setAttribute("allowfullscreen", '');
            iframe.setAttribute("allow", 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');

            // Заменяем начальное изображение (постер) на iFrame
            this.parentNode.replaceChild(iframe, this);
        }
    }
});

//Изменение шапки
let element = document.querySelector('.header');
window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
        element.classList.add("sticky");
    } else {
        element.classList.remove("sticky");
    }
});

// Lite or Dark Theme
const date = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/Kiev'}));
let time = date.getHours();
let layout = document.querySelector('.layout');

if (time < 7 || time >= 19) {
    layout.classList.add('layout__dark');
}
