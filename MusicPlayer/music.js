const log = console.log.bind(console)
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了`
        alert(s)
        return []
    } else {
        return elements
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var a = e('audio')
// 进度条
const bindEvents = (curren) => {
    let inner = e('.inner')
    let outer = e('.outer')
    let dot = e('.dot')
    let result = e('.dhqm')
    let max = outer.offsetWidth
    var moving = false
    let offset = 0

    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100

            inner.style.width = String(width) + '%'
            a.currentTime = a.duration * (x / max)
        }
    })
}

// 总时间
const bindEventCanplay = function() {
    let zsuijm = e('.zsuijm')
    a.addEventListener('canplay', function() {
        let s = Math.floor(a.duration)
        let b = Math.floor(s / 60)
        let c = s - (b * 60)
        if (c === 0) {
            c = '00'
        }
        zsuijm.innerHTML = `${b}:${c}`
    })
}
// 当前时间
const currentTimes  = function() {
    let inner = e('.inner')
    let dhqm = e('.dhqm')
    setInterval(function() {
        let mm = parseInt(a.currentTime % 60)
        let ff = parseInt((a.currentTime / 60) % 60)
        inner.style.width = a.currentTime / a.duration * 100 + '%'
        dhqm.innerHTML = `0${ff}:${mm}`
    }, 1000)
}

// 通过点击按钮播放和暂停
const togglePlayPause = function() {
    let audio = e('audio')
    let playpause = e(".play")
    if (audio.paused || audio.ended) {
        playpause.title = "Pause"
        audio.play()
        currentTimes()
    } else {
        playpause.title = "Play"
        audio.pause()
    }
}
// 实现点击按钮切换上一首/下一首
var index = 1
var songsing = e('.songsing')
var songfont = e('.songfont')
var songsinger = e('.songsinger')
var songfonts = ['Throwaway(Clairo)', 'Good in Goodbye', 'This is Us']
var songsingers = ['SG Lewis、Clairo', 'Madison Beer', 'Jimmie Allen']

// 切换歌
const switchSong = function() {
    let forward = e('.forward')
    let backward = e('.backward')
    bindEvent(forward,'click', function(event){
        index += 1
        if(index > 3) {
            index = 1
        }
        a.src = 'audio' + '/' + index +'.mp3'
        a.play()
        songfont.innerHTML = songfonts[index - 1]
        songsinger.innerHTML = songsingers[index - 1]
        songsing.src = 'image' + '/' + index +'.jpg'
    })
    bindEvent(backward,'click', function(event){
        index -= 1
        if(index < 1) {
            index = 3
        }
        a.src = 'audio' + '/' + index +'.mp3'
        a.play()
        songfont.innerHTML = songfonts[index - 1]
        songsinger.innerHTML = songsingers[index - 1]
        songsing.src = 'image' + '/' + index +'.jpg'
    })
}

const choice = function(array) {
    let len = array.length
    let a = Math.random()
    a = a * len
    a = Math.floor(a)
    // log('a', a)
    return a
}

// 单曲循环，随机循环
const singleCycle = function() {
    let xyhr = e('.repeat')
    let svji = e('.shuffle')
    xyhr.addEventListener('click', (event) => {
        toggleClass(xyhr, 'active')
        svji.classList.remove('random')
    })

    svji.addEventListener('click', (event) => {
        toggleClass(svji, 'random')
        xyhr.classList.remove('active')
    })

    a.addEventListener('ended', function() {
        if (xyhr.classList.contains('active')) {
            a.currentTime = 0
            a.play()
        } else if (svji.classList.contains('random')) {
            let svjiuu = choice(songfonts)
            index = svjiuu + 1
            if (index > 3) {
                index = 1
            }
            a.src = `audio/` + index + '.mp3'
            songsing.src = 'image' + '/' + index +'.jpg'
            songfont.innerHTML = songfonts[index - 1]
            songsinger.innerHTML = songsingers[index - 1]
            a.play()

        } else {
            svji.classList.remove('random')
            xyhr.classList.remove('active')
            index += 1
            if (index > 3) {
                index = 1
            }
            a.src = `audio/` + index + '.mp3'
            songsing.src = 'image' + '/' + index +'.jpg'
            songfont.innerHTML = songfonts[index - 1]
            songsinger.innerHTML = songsingers[index - 1]
            a.play()
        }
    })
}

// 点击列表放歌
const bindEventPlaylist = function() {
    let song = '.song'
    bindAll(song, 'click', function(event){
        let self = event.target
        let index = self.dataset.index
        a.src = `audio/` + index + '.mp3'
        songsing.src = 'image' + '/' + index +'.jpg'
        songfont.innerHTML = songfonts[index - 1]
        songsinger.innerHTML = songsingers[index - 1]
        a.addEventListener('canplay', function() {
            a.play()
        })
    })
}

// 音量
const bindEventyblls = (curren) => {
    let ybll = e('.ybll')
    let outer = e('.outer-ybll')
    let dot = e('.dot-ybll')
    let inner = e('.inner-ybll')

    let max = outer.offsetWidth
    let moving = false

    let offset = 0

    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            inner.style.width = String(width) + '%'
            a.volume = width / 100
        }
    })
}

const __main = function() {
    // 切换歌
    switchSong()
    // 进度条
    bindEvents()
    // 总时间
    bindEventCanplay()
    // 当前时间
    currentTimes()
    // 单曲循环/随机循环
    singleCycle()
    // 点击播放列表改变歌曲
    bindEventPlaylist()
    //音量
    bindEventyblls()
}
__main()
