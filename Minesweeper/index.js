const log = console.log.bind(console)
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到, (${selector}) 选择器错误`
        alert(s)
        return s
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到, 选择器 ${selector} 错误`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}

const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

const randomLine09 = function(n = 9) {
    let s = [0, 1, 0, 0, 0, 0, 0, 0, 0]
    let s2 = _.shuffle(s)
    let m = []
    for (let i = 0; i < n; i++) {
        // let s2 = _.shuffle(s)
        let s1 = s2[i]
        if (s1 === 1) {
            s1 = 9
        }
        m.push(s1)
    }
    log('m', m)
    return m
}

const randomSquare09 = function(n = 9) {
    let s = []
    for (let i = 0; i < n; i++) {
        let s1 = randomLine09(n)
        s.push(s1)
    }
    // log('randomSquare09 s', s)
    return s
}

const clonedArray = function(array) {
    let l = []
    for (let i = 0; i < array.length; i++) {
        l.push(array[i])
    }
    return l
}

const clonedSquare = function(array) {
    let square = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        let l = clonedArray(line)
        square.push(l)
        // 数组不能这样复制, 这是规定
        // square.push(line)
    }
    return square
}

const markedLine = function(array) {
    let line = clonedArray(array)
    for (let i = 0; i < line.length; i++) {
        let n = line[i]
        // 如果是 9, 左边 +1
        if (n === 9 && i > 0) {
            if (line[i - 1] !== 9) {
                line[i - 1] += 1
            }
        }
        // 如果是 9, 右边 +1
        if (n === 9 && i < line.length - 1) {
            if (line[i + 1] !== 9) {
                line[i + 1] += 1
            }
        }
    }
    return line
}

const plus1 = function(array, x, y) {
    let n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] !== 9) {
            array[x][y] += 1
        }
    }
}

const markAround = function(array, x, y) {
    if (array[x][y] === 9) {
        // 先标记上边 3 个
        plus1(array, x - 1, y - 1)
        plus1(array, x - 1, y)
        plus1(array, x - 1, y + 1)

        // 标记中间  2 个
        plus1(array, x, y - 1)
        plus1(array, x, y + 1)

        // 标记下边 3 个
        plus1(array, x + 1, y - 1)
        plus1(array, x + 1, y)
        plus1(array, x + 1, y + 1)
    }
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

const templateCell = function(line, x) {
    let s = ''
    for (let i = 0; i < line.length; i++) {
        let n = line[i]
        let pbjp = `<div class="cell" data-number="${n}" data-x="${x}" data-y="${i}">${n}</div>`
        s += pbjp
    }
    return s
}

const templateRow = function(square) {
    let s = ''
    for (let i = 0; i < square.length; i++) {
        let n = square[i]
        let addCell = templateCell(n, i)
        let pbjp = `<div class="row clearfix">${addCell}</div>`
        s += pbjp
    }
    return s
}

const renderSquare = function(square) {
    let row = templateRow(square)
    let div1 = document.querySelector('.grid')
    div1.innerHTML += row
}

const bindEventDelegate = function(square) {
    let container = e('.grid')
    container.addEventListener('click', function(event) {
        let self = event.target
        if (self.classList.contains('cell')) {
            vjkl(self, square)
        }
    })
}

const vcjq = function() {
    let allNumber = es('.cell')
    let fuyrsu = e('.grid')
    for (let i = 0; i < allNumber.length; i++) {
        let n = allNumber[i]
        let s = n.dataset.number
        if (s === '9') {
            n.classList.add('opened')
            n.classList.add('tupm')
            n.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgNjAgNjAiIHdpZHRoPSI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBpZD0iUGFnZS0xIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGlkPSIwMDctLS1VRk8iIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMTQuOTIgMjguNjguODggMy41MmMuMTQ1MjU1OC41NTA0NDEzLjUxMDQ4NjEgMS4wMTY5MjM2IDEuMDEgMS4yOSA2LjA5IDMuMzM2IDIwLjE5IDMuNDEgMjYuMzggMCAuNDk5NTEzOS0uMjczMDc2NC44NjQ3NDQyLS43Mzk1NTg3IDEuMDEtMS4yOWwuODgtMy41MiIgZmlsbD0iIzliYjllZSIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTU5IDE3YzAgNC45Ny0xMi45OCA5LTI5IDlzLTI5LTQuMDMtMjktOWMwLTMuNTcgNi42OS02LjY1IDE2LjQtOC4xLS45MjQzMTM4IDEuOTAwNDY4Ny0xLjQwMzExNjEgMy45ODY2Nzg2LTEuNCA2LjEgMyAyIDggMyAxNCAzczExLTEgMTQtM2MuMDA1MjMzOC0yLjExMzU1OTItLjQ3MzY3NjctNC4yMDAyNDA4LTEuNC02LjEgOS43MSAxLjQ1IDE2LjQgNC41MyAxNi40IDguMXoiIGZpbGw9IiNkZmU0ZjMiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im00Mi42IDguOWMuMDkuMTg0LjE1OC4zODEuMjQuNTY5IDcuOTI0IDEuNjAzIDEzLjE2IDQuMzc0IDEzLjE2IDcuNTMxIDAgNC44MTQtMTIuMTc4IDguNzQ2LTI3LjUgOC45ODguNDk3MzMzMy4wMDguOTk3MzMzMy4wMTIgMS41LjAxMiAxNi4wMiAwIDI5LTQuMDMgMjktOSAwLTMuNTctNi42OS02LjY1LTE2LjQtOC4xeiIgZmlsbD0iI2MxZDBmMyIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTE0LjE2MSA5LjQ2OWMtLjU4MjA1MzUgMS4zMzQ1NTM4LS45NTMxNDkyIDIuNzUxNDY0Ni0xLjEgNC4yLS4wODY5OTE2LjgxOTAyNjUuMzM0NzM3NyAxLjYwODE4MzUgMS4wNjQgMS45OTEgMy4wNTQgMS41NTkgNy41NzUgMi4zNCAxMi44NzUgMi4zNC41MTEgMCAxLS4wMTcgMS41LS4wMzItNS4zMjYtLjE1Ni05Ljc1Ni0xLjEzOC0xMi41LTIuOTY4LS4wMDMxMTYxLTIuMTEzMzIxNC40NzU2ODYyLTQuMTk5NTMxMyAxLjQtNi4xLTEuMTI0LjE2OC0yLjIuMzYtMy4yMzkuNTY5eiIgZmlsbD0iI2MxZDBmMyIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTU5IDE3djRjMCAzLjI2LTUuNTcgNi4xMS0xMy45MiA3LjY4LTkuOTc2MjE2MSAxLjc2MTAwNTEtMjAuMTgzNzgzOSAxLjc2MTAwNTEtMzAuMTYgMC04LjM1LTEuNTctMTMuOTItNC40Mi0xMy45Mi03LjY4di00YzAgNC45NyAxMi45OCA5IDI5IDlzMjktNC4wMyAyOS05eiIgZmlsbD0iIzliYjllZSIvPjxlbGxpcHNlIGlkPSJPdmFsIiBjeD0iMzAiIGN5PSIxNSIgZmlsbD0iI2MxZDBmMyIgcng9IjE0IiByeT0iMyIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTQ0IDE1Yy0zLTItOC0zLTE0LTNzLTExIDEtMTQgM2MwLTcuNzMxOTg2NSA2LjI2ODAxMzUtMTQgMTQtMTRzMTQgNi4yNjgwMTM1IDE0IDE0eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTM5LjYgOC45Yy43MDc2MjY1IDEuNDUzODk3NiAxLjE1MzEyNDcgMy4wMjEyNjYgMS4zMTYgNC42MyAxLjA4NDgxOTQuMzYwNjE3MSAyLjEyMDcyNTkuODU0Mzg1OCAzLjA4NDA0MjQgMS40Ny4wMDUxOTE0LTIuMTEzNTU5Mi0uNDczNzE5MS00LjIwMDI0MDgtMS40MDAwNDI0LTYuMS0yLjU1Mjk2LTUuMzQ0NDk4OTQtOC4yMTUwOTA0LTguNDgxMTU4NTgtMTQuMS03LjgxMSA0Ljc5ODY5MTUuNTE3MjEzMyA4Ljk5Mjk4ODMgMy40Njg3MTM1IDExLjEgNy44MTF6IiBmaWxsPSIjZGZlNGYzIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMTQuOTIgMjguNjguODggMy41MmMuMTQ1MjU1OC41NTA0NDEzLjUxMDQ4NjEgMS4wMTY5MjM2IDEuMDEgMS4yOSAzLjM3NCAxLjg0NyA5LjIgMi42OSAxNC43ODIgMi41LTQuNTg1LS4xNDctOS4wMTEtLjk4Mi0xMS43ODItMi41LS40OTk1MTM5LS4yNzMwNzY0LS44NjQ3NDQyLS43Mzk1NTg3LTEuMDEtMS4yOWwtLjg4LTMuNTJjLTguMzUtMS41Ny0xMy45Mi00LjQyLTEzLjkyLTcuNjh2LTRjMC0zLjE1NyA1LjIzNi01LjkyOCAxMy4xNjEtNy41MzEgMS4xMS0uMjIyIDIuMTA2LS40IDMuMjM5LS41NjkgMi4xMDM1NTE2LTQuMzM0NjkxNjEgNi4yODc0NTM2LTcuMjgzODU3MTMgMTEuMDc3LTcuODA4LS45ODk1NTMxLS4xMDUwNTE1My0xLjk4NzQ0NjktLjEwNTA1MTUzLTIuOTc3IDAtNC43OTgwNTA5LjUxNjYwODcxLTguOTkyMjA0IDMuNDY2ODc0MjItMTEuMSA3LjgwOC0xLjEzMy4xNjktMi4xMjkuMzQ3LTMuMjM5LjU2OS03LjkyNSAxLjYwMy0xMy4xNjEgNC4zNzQtMTMuMTYxIDcuNTMxdjRjMCAzLjI2IDUuNTcgNi4xMSAxMy45MiA3LjY4eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTEwLjg0NyAyNi43MTktLjUzOSAxLjkyNmMtMi43MDc4OTczMS0uNjgxMjYzNi01LjI4MzQ1MjgxLTEuODA4NjgxNy03LjYyMS0zLjMzNmwxLjE4My0xLjYwOWMyLjE0NTY0MyAxLjM3OTc1MjQgNC41MDIzNzc1MyAyLjM5OTUyOTEgNi45NzcgMy4wMTl6IiBmaWxsPSIjZmZmIi8+PGcgZmlsbD0iIzQyOGRmZiI+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNi40MTEgMjcuMzE0Yy4yNDY2ODUzNC4xMDgzNDU2LjUyNzA5NjE0LjExMDM1MDIuNzc1MzA1MjQuMDA1NTQyNC4yNDgyMDkwOS0uMTA0ODA3OC40NDIzMTk3NS0uMzA3MTgyLjUzNjY5NDc2LS41NTk1NDI0LjE5MzUwMTUyLS41MDQ2NDg0LS4wNDg5ODg2OC0xLjA3MTcyNjctLjU0NzUzNTY3LTEuMjgwNDQ1OS0uNDk4NTQ2OTgtLjIwODcxOTItMS4wNzI3MTk0NS4wMTY0NTkxLTEuMjk2NDY0MzMuNTA4NDQ1OS0uMTE0Mzk0MjYuMjQ1MzIyLS4xMjIxMTMyMi41MjcwNTgzLS4wMjEzMjMwNi43NzgyNzU5LjEwMDc5MDE3LjI1MTIxNzYuMzAxMDkzNDMuNDQ5NDk0LjU1MzMyMzA2LjU0NzcyNDF6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNDMuMjUzIDcuOTk0Yy0yLjU5NjY4MTUtNC45MTE4NDc3NC03LjY5NzAxMi03Ljk4NDcxMTk3LTEzLjI1My03Ljk4NDcxMTk3cy0xMC42NTYzMTg1IDMuMDcyODY0MjMtMTMuMjUzIDcuOTg0NzExOTdjLTEwLjQ5MyAxLjY0My0xNi43NDcgNC45OTQtMTYuNzQ3IDkuMDA2djRjMCAxLjU1MS45IDMgMi42ODcgNC4zMDkuMjg1OTU5NjcuMjM1MDIxNi42NzgzNTA0MS4yOTI4NjI4IDEuMDE5OTYxNDIuMTUwMzQ5N3MuNTc2NTYwMDItLjQ2MjA2NzYuNjEwNzE1MDMtLjgzMDYzNDQtLjEzODA3MTItLjcyNTg1NDEtLjQ0NzY3NjQ1LS45Mjg3MTUzYy0uODUzLS42MjktMS44Ny0xLjYwNi0xLjg3LTIuN3YtLjIxN2M5LjQyNyA4LjI2IDQ2LjU3MiA4LjI2MSA1NiAwIDAgMy45MjctOS4xNTggNi4xNzMtMTMuMDE2IDYuOTEtNC45MzkyNDY0LjkyOTQ0MzQtOS45NTg0MjY0IDEuMzY3MjQ4My0xNC45ODQgMS4zMDctNi40NTYxODczLjA3MjU1MjUtMTIuODk0NDMwOS0uNjk0MjAxMS0xOS4xNTMtMi4yODEtLjUyNjM1NDItLjE0NjI2MDctMS4wNzI2NzQzNy4xNTY5NTM3LTEuMjI3LjY4MS0uMDc3MDM4NTIuMjU3MDI2MS0uMDQ3NTUyNzIuNTM0MjI5My4wODE4Mjk0NS43NjkyOTg3LjEyOTM4MjE4LjIzNTA2OTMuMzQ3ODA1MDUuNDA4MjgxNi42MDYxNzA1NS40ODA3MDEzIDEuMjU3LjM0MiAyLjUyNC42MjYgMy43OTMuODgzLjkxMSAzLjY0Mi42NTQgNC4xOTQgMy4zNDQgNS4zODFsLTQuNTMxIDE2LjgyNmMtLjE0MzU5NC41MzM1MDcxLjE3MjQ5MjkgMS4wODI0MDYuNzA2IDEuMjI2czEuMDgyNDA2LS4xNzI0OTI5IDEuMjI2LS43MDZsNC40ODItMTYuNjUxYy42MzQuMiAxLjMwOS4zNzcgMi4wMTQuNTM1bC0uMzg1IDEuNjI2Yy0uMDk3MjM5OC4zNTI4NTk1LjAwNjA2NDkuNzMwNjUxNC4yNjkzMjQuOTg0OTM0OS4yNjMyNTkxLjI1NDI4MzQuNjQ0NDA1OC4zNDQ0MjYxLjk5MzY4MTMuMjM1MDA5NC4zNDkyNzU2LS4xMDk0MTY3LjYxMDg2ODYtLjQwMDkwODguNjgxOTk0Ny0uNzU5OTQ0M2wuNDA2LTEuNzE1Yy42ODkuMTA3IDEuNC4yIDIuMTM4LjI3bC0yLjUwNSAxNi4wNjFjLS4wODUwNTE5LjU0NTkzMzUuMjg4NTY2NSAxLjA1NzQ0ODEuODM0NSAxLjE0MjVzMS4wNTc0NDgxLS4yODg1NjY1IDEuMTQyNS0uODM0NWwyLjUzLTE2LjIyM2MuNTA2LjAyNSAxLjAyNi4wMzkgMS41NTIuMDQ5djcuMDJjMCAuNTUyMjg0Ny40NDc3MTUzIDEgMSAxczEtLjQ0NzcxNTMgMS0xdi03LjAyMWMuNTI0LS4wMSAxLjA0Ny0uMDIyIDEuNTUyLS4wNDdsMS43NDggMTEuMjIyYy4wNTEyNDM0LjM1NjQyMDUuMjkwMTUyOS42NTc3Njg2LjYyNTQ4OTEuNzg4OTU5Ni4zMzUzMzYxLjEzMTE5MTEuNzE1MzEwNy4wNzE5NjQzLjk5NDgxMTQtLjE1NTA2MTcuMjc5NTAwNy0uMjI3MDI1OS40MTUzNjI0LS41ODY3ODk4LjM1NTY5OTUtLjk0MTg5NzlsLTEuNzIxLTExLjA1NmMuNzM3LS4wNzEgMS40NDctLjE2MyAyLjEzNi0uMjdsNS4zMzUgMjIuNzA5Yy4wODE4MTM4LjM0Nzk3NjcuMzQzMDU2Mi42MjU4NzMzLjY4NTMxOTguNzI5MDA4OHMuNzEzNTUwMy4wMTU4NDEyLjk3NC0uMjI5Yy4yNjA0NDk4LS4yNDQ4NDEyLjM3MDQ5NC0uNjEwMDMyMS4yODg2ODAyLS45NTgwMDg4bC01LjMxNi0yMi42MjJjLjcwOC0uMTU3IDEuMzc3LS4zMzkgMi4wMTMtLjU0bDEuNzgzIDYuNjVjLjE0MzA0MTguNTMzNTA3MS42OTE0OTI5Ljg1MDA0MTggMS4yMjUuNzA3cy44NTAwNDE4LS42OTE0OTI5LjcwNy0xLjIyNWwtMS44MzEtNi44MjZjMi42MjgtMS4xNjEgMi40MTEtMS42NTggMy4zMzktNS4zNjkgOC4wNzMtMS41OTggMTQuMTA2LTQuNDg4IDE0LjEwNi04LjU0NnYtNGMwLTQuMDEyLTYuMjU0LTcuMzYzLTE2Ljc0Ny05LjAwNnptLS4wMjIgMjMuOTU5Yy0uMDc1Nzk4NC4yODI5ODk0LS4yNjUwMjg3LjUyMjE1MDQtLjUyMy42NjEtMS41MDgwMTk3Ljc4NDYxNDYtMy4xMjMzMzk1IDEuMzQyOTM0NC00Ljc5NCAxLjY1Ny00Ljk5ODAyNy45Mjg2NjM0LTEwLjEyMDA5MDkuOTc0NjkyMi0xNS4xMzQuMTM2LS4wMSAwLS4wMiAwLS4wMzEgMC0xLjg5ODkxNjUtLjMwNzYzNDEtMy43Mzc4OTI2LS45MTA5NTMzLTUuNDUtMS43ODgtLjI1OTY0OTUtLjEzNzgyMjctLjQ1MTAxMTYtLjM3NjU3MzEtLjUyOS0uNjZsLS41MDgtMi4wMzJjOS4xMDIyOTQ0IDEuNDI2MTU5IDE4LjM3MDk4MDEgMS40Mjg1MjA2IDI3LjQ3NC4wMDd6bS0xMy4yMzEtMjkuOTUzYzYuNDk5MjcxNi4wMDg2NzU1NCAxMS45OTYyNTg0IDQuODA5OTQ5MzIgMTIuODc5IDExLjI0OS02LjQtMy4wMTYtMTkuMzUzLTMuMDIxLTI1Ljc1OCAwIC44ODI3NDE2LTYuNDM5MDUwNjggNi4zNzk3Mjg0LTExLjI0MDMyNDQ2IDEyLjg3OS0xMS4yNDl6bTExLjkxMyAxMy4wMDdjLTUuODQ1IDIuNjctMTcuOTc1IDIuNjczLTIzLjgyNiAwIDUuODY5LTIuNjkgMTcuOTU1LTIuNjkgMjMuODI2IDB6bS0xMS45MTMgOS45OTNjLTE2LjUgMC0yOC00LjIxNi0yOC04IDAtMi4xNzcgNC4zNDEtNS4xNTcgMTMuODExLTYuODI2LS41MzQwNjk4IDEuNTUzMDc1NS0uODA4MDg3MSAzLjE4MzY2NDYtLjgxMSA0LjgyNi4wMDg1MTU4LjMzMjA3MzcuMTczNTE5My42NDA1NzQ2LjQ0NS44MzIuMjExLjA4MiAzLjk3NiAzLjE2OCAxNC41NTUgMy4xNjggNi4zNTIgMCAxMS4zNDQtMS4wNzggMTQuNDU5LTMuMTEyLjMyODY5MDUtLjE3NTI4NTYuNTM1OTc2My0uNTE1NTI1NS41NDEtLjg4OC0uMDAyOTEyOS0xLjY0MjMzNTQtLjI3NjkzMDItMy4yNzI5MjQ1LS44MTEtNC44MjYgOS40NyAxLjY2OSAxMy44MTEgNC42NDkgMTMuODExIDYuODI2IDAgMy43ODQtMTEuNSA4LTI4IDh6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNTEuMjYxIDE0LjA2M2MtLjYxNi0uMjI5LTEuMjgxLS40NS0xLjk3NS0uNjU4LS41MjQ1MjI0LS4xNDQ2NzkxLTEuMDY4NDYxNS4xNTY1NjU0LTEuMjI0MTExMi42Nzc5Mzc2LS4xNTU2NDk4LjUyMTM3MjIuMTM0MTE4NiAxLjA3MTUxMDUuNjUyMTExMiAxLjIzODA2MjQuNjc5MzMzMy4yIDEuMjk1NjY2Ny40MDU2NjY3IDEuODQ5LjYxNy4xMTE4MjMzLjA0MDg3NjkuMjI5OTM5Ny4wNjE4NjA0LjM0OS4wNjIuNDgzNzYxOS0uMDAwMTU5My44OTgwNDMyLS4zNDY1ODM4Ljk4MzgyNC0uODIyNjc5NnMtLjE4MTUzOTEtLjk0NTMyODItLjYzNDgyNC0xLjExNDMyMDR6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMTEuODcgMTQuMDc3Yy0uMTU4MDU1NC0uNTI5MDA1OC0uNzE0OTI0Ny0uODI5ODIyNy0xLjI0NC0uNjcyLS42OTQuMjA4LTEuMzU4LjQyOS0xLjk3NS42NTgtLjQ1MzI4NDkxLjE2ODk5MjItLjcyMDYwNDc5LjYzODIyNDYtLjYzNDgyMzk4IDEuMTE0MzIwNHMuNTAwMDYyMTIuODIyNTIwMy45ODM4MjM5OC44MjI2Nzk2Yy4xMTkwNjAyNS0uMDAwMTM5Ni4yMzcxNzY3NS0uMDIxMTIzMS4zNDktLjA2Mi41NTQtLjIwNzMzMzMgMS4xNzAzMzMzLS40MTMgMS44NDktLjYxNy41MjkwMDU4LS4xNTgwNTU0LjgyOTgyMjctLjcxNDkyNDcuNjcyLTEuMjQ0eiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTMxIDIxaC0uMDExYy0uNjUyLjAwNi0xLjMyNi4wMDYtMS45NzggMGgtLjAxMWMtLjU1MjI4NDctLjAwMzAzNzYtMS4wMDI0NjI0LjQ0MjIxNTMtMS4wMDU1Ljk5NDVzLjQ0MjIxNTMgMS4wMDI0NjI0Ljk5NDUgMS4wMDU1aDEuMDExIDEuMDExYy41NTIyODQ3LS4wMDMwMzc2Ljk5NzUzNzYtLjQ1MzIxNTMuOTk0NS0xLjAwNTVzLS40NTMyMTUzLS45OTc1Mzc2LTEuMDA1NS0uOTk0NXoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0yNS4wNTUgMjAuODY3Yy0uNjc1MzMzMy0uMDM3MzMzMy0xLjMzNC0uMDgxNjY2Ny0xLjk3Ni0uMTMzLS41NDkyMzY2LS4wMzg3NTczLTEuMDI4Njc4OC4zNjg3MDE5LTEuMDc5LjkxNy0uMDIxMjY0NS4yNjQ1OTMyLjA2MzU0MzMuNTI2Nzg0Ni4yMzU3MzY3LjcyODgwMjQuMTcyMTkzNS4yMDIwMTc4LjQxNzY0MjEuMzI3Mjg0MS42ODIyNjMzLjM0ODE5NzYuNjU3MzMzMy4wNTIgMS4zMzIuMDk3MzMzMyAyLjAyNC4xMzZoLjA1OGMuNTUyMjg0Ny4wMTQ5MTE3IDEuMDEyMDg4My0uNDIwNzE1MyAxLjAyNy0uOTczcy0uNDIwNzE1My0xLjAxMjA4ODMtLjk3My0xLjAyN3oiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0xOS4xMzUgMjAuMzEzYy0uNjg1MzMzMy0uMDkyLTEuMzQ1LS4xOTItMS45NzktLjMtLjM1NTAyMTEtLjA2NTUzNTYtLjcxNzgwMzIuMDY1MzczOS0uOTQ5MTcyNC4zNDI1MDc3LS4yMzEzNjkyLjI3NzEzMzktLjI5NTM5OTguNjU3NDYwNC0uMTY3NTI3OC45OTUwNzVzLjQyNzc5MTQuNTgwMDk0NS43ODQ3MDAyLjYzNDQxNzNjLjY1NDY2NjcuMTEgMS4zMzUuMjEzIDIuMDQxLjMwOS4wNDQ4MjM4LjAwNDkwNS4wODk5MTc3LjAwNjkwOTEuMTM1LjAwNi41MjYyNzMxLjAwMDA3MjcuOTYyNTQxMy0uNDA3NzYzOC45OTc4ODEtLjkzMjg0OS4wMzUzMzk4LS41MjUwODUzLS4zNDIzNDQ0LS45ODc3MDMxLS44NjM4ODEtMS4wNTgxNTF6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMTMuMjQgMTkuMjExYy0uNy0uMTcyLTEuMzQ3LS4zNTEtMS45NTMtLjUzMi0uNTI5MDg4OC0uMTU4NTA1Ny0xLjA4NjQ5NDMuMTQxOTExMi0xLjI0NS42NzEtLjE1ODUwNTcxLjUyOTA4ODguMTQxOTExMiAxLjA4NjQ5NDMuNjcxIDEuMjQ1LjYzNTMzMzMuMTkgMS4zMTc2NjY3LjM3NTY2NjcgMi4wNDcuNTU3LjM1MDA0ODEuMDk1MTY2LjcyNDE4My0uMDA2Njk3OS45Nzc2NzEzLS4yNjYxODU4LjI1MzQ4ODItLjI1OTQ4NzkuMzQ2NTczOC0uNjM1OTAyOS4yNDMyNDY4LS45ODM2Mjk1cy0uMzg2ODYxMy0uNjEyMjI4OS0uNzQwOTE4MS0uNjkxMTg0N3oiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im03LjI0NCAxNy4xMTNjLS40NjY5MzEyOS0uMjI1ODQ3Ny0uOTAzNjc2NTItLjUwOTM5NjItMS4zLS44NDQtLjI2Mjc2ODg0LS4yNDI3NjItLjYzNTA4OTI0LS4zMjY4OTc4LS45NzY3MTE2OS0uMjIwNzE0My0uMzQxNjIyNDYuMTA2MTgzNS0uNjAwNjQ2NC4zODY1NTQ1LS42Nzk1MDAwMS43MzU1cy4wMzQ0NDI4NS43MTM0NTIzLjI5NzIxMTcuOTU2MjE0M2MuNTI3MTc5NjEuNDU0NTkwOCAxLjExMDIyMzU0Ljg0MDAzODMgMS43MzUgMS4xNDcuMzE2ODk0NTguMTY1MDU2Ny42OTc3NzM5NS4xNDg1MTQyLjk5OTE2NDU1LS4wNDMzOTYyLjMwMTM5MDU5LS4xOTE5MTA1LjQ3NzUwNC0uNTMwMDMyOS40NjItLjg4NzAwMDEtLjAxNTUwMzk5LS4zNTY5NjcxLS4yMjAyNjk5Ni0uNjc4NTQ3LS41MzcxNjQ1NS0uODQzNjAzN3oiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0zNi45MjEgMjAuNzM0Yy0uNjQyLjA1MDY2NjctMS4zMDA2NjY3LjA5NS0xLjk3Ni4xMzMtLjU1MjI4NDcuMDE0OTExNy0uOTg3OTExNy40NzQ3MTUzLS45NzMgMS4wMjdzLjQ3NDcxNTMuOTg3OTExNyAxLjAyNy45NzNoLjA1NmMuNjkyLS4wMzggMS4zNjY2NjY3LS4wODMzMzMzIDIuMDI0LS4xMzYuMjY1NzIzMy0uMDIwMTM2LjUxMjQxODYtLjE0NTQ5OTMuNjg1MzM0LS4zNDgyNjY1LjE3MjkxNTUtLjIwMjc2NzMuMjU3NzQ2Ni0uNDY2MTY0OC4yMzU2NjYtLjczMTczMzUtLjA0OTgwOTYtLjU0ODU2MzYtLjUyOTU4MzgtLjk1NjMwNS0xLjA3OS0uOTE3eiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTQyLjg0NCAyMC4wMTRjLS42MzQuMTA2NjY2Ny0xLjI5MzY2NjcuMjA2NjY2Ny0xLjk3OS4zLS41MDc3NTYyLjA4NDUyMjUtLjg2ODQwMzguNTQwNjg3OS0uODMzNDk0MyAxLjA1NDI0NTguMDM0OTA5Ni41MTM1NTguNDUzOTcwNy45MTY3MjIuOTY4NDk0My45MzE3NTQyLjA0NTQ3OTYtLjAwMDA3NjYuMDkwOTA3LS4wMDMwODI4LjEzNi0uMDA5LjcwNi0uMDk2IDEuMzg2MzMzMy0uMTk5IDIuMDQxLS4zMDkuNTM3MDcwNi0uMDk5MTQxMy44OTUyNjQtLjYxMDg0MDguODA0NTkyOC0xLjE0OTQwNjFzLS41OTY2NjY0LS45MDQ3NzI2LTEuMTM2NTkyOC0uODIyNTkzOXoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im00OC43MTMgMTguNjc5Yy0uNjA2LjE4MS0xLjI1Ny4zNi0xLjk1My41MzItLjM1NDA1NjguMDc4OTU1OC0uNjM3NTkxMS4zNDM0NTgxLS43NDA5MTgxLjY5MTE4NDdzLS4wMTAyNDE0LjcyNDE0MTYuMjQzMjQ2OC45ODM2Mjk1Yy4yNTM0ODgzLjI1OTQ4NzkuNjI3NjIzMi4zNjEzNTE4Ljk3NzY3MTMuMjY2MTg1OC43My0uMTggMS40MTIzMzMzLS4zNjU2NjY3IDIuMDQ3LS41NTcuNTI5MDg4OC0uMTU4NTA1Ny44Mjk1MDU3LS43MTU5MTEyLjY3MS0xLjI0NS0uMTU4NTA1OC0uNTI5MDg4OC0uNzE1OTExMi0uODI5NTA1Ny0xLjI0NS0uNjcxeiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTU0LjA2IDE2LjI2OWMtLjM5NjMyMzUuMzM0NjAzOC0uODMzMDY4Ny42MTgxNTIzLTEuMy44NDQtLjQ4OTg3NjYuMjU1MTU1Ni0uNjgwMTU1NS44NTkxMjM0LS40MjUgMS4zNDkuMjU1MTU1Ni40ODk4NzY1Ljg1OTEyMzQuNjgwMTU1NSAxLjM0OS40MjUuNjI0Nzc2NS0uMzA2OTYxNyAxLjIwNzgyMDQtLjY5MjQwOTIgMS43MzUtMS4xNDcuNDAyMzg3MS0uMzc0OTg0LjQyNjQwMzktMS4wMDQ1MzkyLjA1Mzc1NTItMS40MDkwOS0uMzcyNjQ4Ny0uNDA0NTUwNy0xLjAwMjA1NDQtLjQzMjIxMS0xLjQwODc1NTItLjA2MTkxeiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTIyIDEwLjAwNmMuMzE0NzU3MyAwIC42MTExNDU2LS4xNDgxOTQxNi44LS40IDEuNjkxMDkwNi0yLjI3NzI4MTQ0IDQuMzYzNTA1LTMuNjE1NzE1NjMgNy4yLTMuNjA2LjU1MjI4NDcgMCAxLS40NDc3MTUyNSAxLTFzLS40NDc3MTUzLTEtMS0xYy0zLjQ2MTA4NTcuMDExMTEwOTgtNi43MTc0NzM1IDEuNjQxNTI1MTYtOC44IDQuNDA2LS4yMjcyNjMyLjMwMzAxNzY1LS4yNjM4MTkyLjcwODQyOTU3LS4wOTQ0MjcyIDEuMDQ3MjEzNi4xNjkzOTIuMzM4Nzg0MDIuNTE1NjU1MS41NTI3ODY0Ljg5NDQyNzIuNTUyNzg2NHoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0xMiA2MGMuNDUxOTI0OS0uMDAwMjc1MS44NDc0OTk2LS4zMDM2MTczLjk2NS0uNzRsLjgwNy0zYy4wOTg4MzEtLjM0NjkxNDIuMDAzMTY4NS0uNzIwMTY4NC0uMjUwMzQyLS45NzY3Nzk5LS4yNTM1MTA2LS4yNTY2MTE1LS42MjU1NzQyLS4zNTY4MDQ3LS45NzM2NjQzLS4yNjIxOTg2LS4zNDgwOTAxLjA5NDYwNjItLjYxODI1MTYuMzY5MzQ3NC0uNzA2OTkzNy43MTg5Nzg1bC0uODA4IDNjLS4wNjkwNjExLjI1NjIwMjctLjAzMzQ2NDcuNTI5MzQ5My4wOTg5NTEzLjc1OTI5NTYuMTMyNDE2MS4yMjk5NDYyLjM1MDc5MzguMzk3ODM3LjYwNzA0ODcuNDY2NzA0NC4wODUxNzA4LjAyMjUzNTguMTcyODk4Mi4wMzM5NjM4LjI2MS4wMzR6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMTcgNjBjLjQ2MzkwNzItLjAwMDE5NzguODY2NzY1My0uMzE5NDIwNC45NzMtLjc3MWwzLjk5My0xN2MuMDgxODEzOC0uMzQ3Nzk4MS0uMDI4MTM1MS0uNzEyODIzOS0uMjg4NDMwMi0uOTU3NTc1Ny0uMjYwMjk1LS4yNDQ3NTE5LS42MzEzOTExLS4zMzIwNDYyLS45NzM1LS4yMjktLjM0MjEwODguMTAzMDQ2MS0uNjAzMjU2LjM4MDc3NzYtLjY4NTA2OTguNzI4NTc1N2wtMy45OTQgMTdjLS4xMjQ5MTI0LjUzNjk3NjMuMjA4MzM2MSAxLjA3Mzc1MjMuNzQ1IDEuMi4wNzUzMDU5LjAxODQyNzUuMTUyNDc2OC4wMjgxNTc3LjIzLjAyOXoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0yMyA2MGMuNDkyNDIwMy0uMDAwNTI3NC45MTExNjc1LS4zNTk0NTM1Ljk4Ny0uODQ2bC4zMTItMmMuMDg1MDUxOS0uNTQ1OTMzNS0uMjg4NTY2NS0xLjA1NzQ0ODEtLjgzNDUtMS4xNDI1cy0xLjA1NzQ0ODEuMjg4NTY2NS0xLjE0MjUuODM0NWwtLjMxMSAyYy0uMDg1MDExMi41NDU2NDc1LjI4ODM2NDQgMS4wNTY5MTI0LjgzNCAxLjE0Mi4wNTEyODY2LjAwNzkzMzQuMTAzMTAzNC4wMTE5NDUxLjE1NS4wMTJ6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNDggNjBjLjA4ODEwMTgtLjAwMDAzNjIuMTc1ODI5Mi0uMDExNDY0Mi4yNjEtLjAzNC4yNTYyNTQ5LS4wNjg4Njc0LjQ3NDYzMjYtLjIzNjc1ODIuNjA3MDQ4Ny0uNDY2NzA0NC4xMzI0MTYtLjIyOTk0NjMuMTY4MDEyNC0uNTAzMDkyOS4wOTg5NTEzLS43NTkyOTU2bC0zLjUtMTNjLS4xNDM1OTQxLS41MzM1MDctLjY5MjQ5MjktLjg0OTU5NC0xLjIyNi0uNzA1OTk5OS0uNTMzNTA3LjE0MzU5NC0uODQ5NTk0LjY5MjQ5MjgtLjcwNiAxLjIyNTk5OTlsMy41IDEzYy4xMTc1MDA0LjQzNjM4MjcuNTEzMDc1MS43Mzk3MjQ5Ljk2NS43NHoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0zNyA2MGMuMDUxODk2Ni0uMDAwMDU0OS4xMDM3MTM0LS4wMDQwNjY2LjE1NS0uMDEyLjU0NTYzNTYtLjA4NTA4NzYuOTE5MDExMi0uNTk2MzUyNS44MzQtMS4xNDJsLTEuMDktN2MtLjA1MTI0MzQtLjM1NjQyMDUtLjI5MDE1MjktLjY1Nzc2ODYtLjYyNTQ4OTEtLjc4ODk1OTYtLjMzNTMzNjEtLjEzMTE5MTEtLjcxNTMxMDctLjA3MTk2NDMtLjk5NDgxMTQuMTU1MDYxNy0uMjc5NTAwNy4yMjcwMjU5LS40MTUzNjI0LjU4Njc4OTgtLjM1NTY5OTUuOTQxODk3OWwxLjA5IDdjLjA3NTgzMjUuNDg2NTQ2NS40OTQ1Nzk3Ljg0NTQ3MjYuOTg3Ljg0NnoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0zMSA1OXYtMTFjMC0uNTUyMjg0Ny0uNDQ3NzE1My0xLTEtMXMtMSAuNDQ3NzE1My0xIDF2MTFjMCAuNTUyMjg0Ny40NDc3MTUzIDEgMSAxczEtLjQ0NzcxNTMgMS0xeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==" width="80%" style="filter: hue-rotate(30deg) ">';

        }
    }
    fuyrsu.classList.add('jbvi')
}

const vjkl = function(cell, square) {
    let number = cell.dataset.number
    let x = Number(cell.dataset.x)
    let y = Number(cell.dataset.y)
    let result = e('#result')
    log('x', x)
    log('y', y)
    if (!(cell.classList.contains('opened'))) {
        cell.classList.add('opened')
        if (number === '9') {
            alert('Game over')
            result.innerHTML = 'GAME OVER'
            vcjq()
        } else if (number === '0') {
            log('cell', cell)
            cell.innerHTML = ''
            vjklAround(square, x, y)
        }
    }
}

const vjklAround = function(square, x, y) {
    // 先标记上边 3 个
    vjkl1(square, x - 1, y - 1)
    vjkl1(square, x - 1, y)
    vjkl1(square, x - 1, y + 1)

    // 标记中间  2 个
    vjkl1(square, x, y - 1)
    vjkl1(square, x, y + 1)

    // 标记下边 3 个
    vjkl1(square, x + 1, y - 1)
    vjkl1(square, x + 1, y)
    vjkl1(square, x + 1, y + 1)
}


const vjkl1 = function(square, x, y) {
    let n = square.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        let a = `[data-x="${x}"][data-y="${y}"]`
        let yrsu = e(a)
        if (!(yrsu.classList.contains('opened'))){
            yrsu.classList.add('opened')
            if (yrsu.dataset.number === '0') {
                yrsu.classList.add('opened')
                yrsu.innerHTML = ''
                vjklAround(square, x, y)
            }
        }
    }
}

const yzjm = function () {
    let div = e('.grid')
    log('div', div)
    div.addEventListener('contextmenu', e=> {
        e.preventDefault();
    })
    div.addEventListener('contextmenu', function(event) {
        let self = event.target
        if (!self.classList.contains("opened")) {
            self.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTM2IDQ5aDJ2MmgtMnoiLz48cGF0aCBkPSJtMzQgNTVoMnYyaC0yeiIvPjxwYXRoIGQ9Im0zOSA1MmgydjJoLTJ6Ii8+PHBhdGggZD0ibTQwIDU4aDJ2MmgtMnoiLz48cGF0aCBkPSJtNDYgNTVoMnYyaC0yeiIvPjxwYXRoIGQ9Im01MiA1N2gydjJoLTJ6Ii8+PHBhdGggZD0ibTMwIDU4aDJ2MmgtMnoiLz48cGF0aCBkPSJtMTcgMTljMy44NiAwIDctMy4xNCA3LTdzLTMuMTQtNy03LTctNyAzLjE0LTcgNyAzLjE0IDcgNyA3em0wLTEyYzIuNzU3IDAgNSAyLjI0MyA1IDVzLTIuMjQzIDUtNSA1LTUtMi4yNDMtNS01IDIuMjQzLTUgNS01eiIvPjxwYXRoIGQ9Im0xNSAzN2g0YzEuNjU0IDAgMy0xLjM0NiAzLTN2LTRjMC0xLjY1NC0xLjM0Ni0zLTMtM2gtNGMtMS42NTQgMC0zIDEuMzQ2LTMgM3Y0YzAgMS42NTQgMS4zNDYgMyAzIDN6bS0xLTdjMC0uNTUxLjQ0OS0xIDEtMWg0Yy41NTEgMCAxIC40NDkgMSAxdjRjMCAuNTUxLS40NDkgMS0xIDFoLTRjLS41NTEgMC0xLS40NDktMS0xeiIvPjxwYXRoIGQ9Im0xNiAzMWgydjJoLTJ6Ii8+PHBhdGggZD0ibTUyIDMwaDExdi0xOGgtOHYtNWMwLTEuNjU0LTEuMzQ2LTMtMy0zaC05di0xYzAtMS4xMDMtLjg5Ny0yLTItMmgtMmMtMS4xMDMgMC0yIC44OTctMiAydjE2aC02di02YzAtMi4yNjktMS41NTMtNC4yMjUtMy42OTQtNC44MDgtMS41NTQtNC4xOTItNS41ODEtNy4xOTItMTAuMzA2LTcuMTkycy04Ljc1MiAzLTEwLjMwNiA3LjE5MmMtMi4xNDEuNTgzLTMuNjk0IDIuNTM5LTMuNjk0IDQuODA4djEwLjY1OWMtMS4yNiAxLjc5NC0yIDMuOTc4LTIgNi4zNDF2N2MwIDMuMzA5IDIuNjkxIDYgNiA2aDF2MTMuNTRjLTEuMjI0IDEuMS0yIDIuNjg5LTIgNC40NnYyaDEwIDIgOSAxIDM0di0yLjMzM2wtNC40NDgtNS45M2MtMS4yODQtMS43MTQtMy4zMzEtMi43MzctNS40NzItMi43MzdoLTUuNzA5Yy0uMzk3IDAtLjc1Ny0uMjM1LS45MTctLjU5OWwtMS4wMDctMi4zMDJjLS4zNS0uNzk5LS44NTItMS40OTUtMS40NDctMi4wODh2LTI1LjAxMWg2djVjMCAxLjY1NCAxLjM0NiAzIDMgM3ptOS0xNnYxNGgtOWMtLjU1MSAwLTEtLjQ0OS0xLTFzLjQ0OS0xIDEtMWMxLjY1NCAwIDMtMS4zNDYgMy0zdi05em0tMjAtMTF2NDIuNjE0Yy0uNjI3LS4yODQtMS4zMDEtLjQ2OS0yLS41NTN2LTQyLjA2MXptLTE5IDUyYy0xLjUzOCAwLTIuOTM3LjU4Ni00IDEuNTR2LTMuOTIybDYtM3Y1LjczMmMtLjYyNy0uMjIyLTEuMjk4LS4zNS0yLS4zNXptMi03LjYxOC02IDN2LTEuNzY0bDYtM3ptMC00LTYgM3YtNS4zODJoNnptLTggMy02LTN2LTIuMzgyaDZ6bS02LS43NjQgNiAzdjEuNzY0bC02LTN6bTE2LTIuNjE4aDFjMi4yMDYgMCA0LTEuNzk0IDQtNHYtMTFoNnYxNy4wNTRjLTIuNDA3LjI2My00LjUwMSAxLjc4OS01LjQ1NCA0LjA1OWwtLjk1NCAyLjI3M2MtLjE1Ni4zNzMtLjUxOC42MTQtLjkyMi42MTRoLTMuNjd6bTAtMnYtMTNoM3YxMWMwIDEuMTAzLS44OTcgMi0yIDJ6bTExLTE1aC0ydi01aDJ6bS04LTEzdjZoLTMuNTIxYzEuNTc0LTEuOTAzIDIuNTIxLTQuMzQzIDIuNTIxLTcgMC0uNDQxLS4wMzMtLjg3My0uMDg0LTEuMzAxLjY2My41NTUgMS4wODQgMS4zODcgMS4wODQgMi4zMDF6bS0xMi0xMGM0Ljk2MiAwIDkgNC4wMzggOSA5cy00LjAzOCA5LTkgOS05LTQuMDM4LTktOSA0LjAzOC05IDktOXptLTEwLjkxNiA3LjY5OWMtLjA1MS40MjgtLjA4NC44Ni0uMDg0IDEuMzAxIDAgMi44NjcgMS4xMTIgNS40NzQgMi45MTYgNy40MzQtMS40NjMuNDItMi43ODMgMS4xMzctMy45MTYgMi4wNjh2LTguNTAyYzAtLjkxNC40MjEtMS43NDYgMS4wODQtMi4zMDF6bTQuNzI4IDEwLjM4OWMxLjc2NSAxLjIwNSAzLjg5NSAxLjkxMiA2LjE4OCAxLjkxMiAyLjM0NiAwIDQuNTE3LS43NDQgNi4zMDUtMmg5LjY5NXY1aC05djEzaC0xNHYtMTNoLTJ2OWgtNXYtNWMwLTQuNTYyIDMuMzM1LTguMzI2IDcuODEyLTguOTEyem0tMy44MTIgMTkuOTEyYy0yLjIwNiAwLTQtMS43OTQtNC00aDV2NHptMyA4LjYxOCA2IDN2My45MjJjLTEuMDYzLS45NTQtMi40NjItMS41NC00LTEuNTQtLjcwMiAwLTEuMzczLjEyOC0yIC4zNXptLTIgMTEuMzgyYzAtMi4yMDYgMS43OTQtNCA0LTRzNCAxLjc5NCA0IDR6bTEwIDBjMC0yLjIwNiAxLjc5NC00IDQtNHM0IDEuNzk0IDQgNHptMjguMzcxLTdoNS43MDljMS41MTYgMCAyLjk2My43MjQgMy44NzMgMS45MzdsMy43OTcgNS4wNjNoLTMxLjc1YzAtMS43NzEtLjc3Ni0zLjM2LTItNC40NnYtMi41NGgzLjY3YzEuMjExIDAgMi4yOTctLjcyMiAyLjc2Ny0xLjgzOWwuOTU0LTIuMjc0Yy43MzUtMS43NTQgMi40NC0yLjg4NyA0LjM0Mi0yLjg4N2guNDQ2YzEuOTIzIDAgMy42NjUgMS4xMzkgNC40MzYgMi45MDFsMS4wMDcgMi4zMDJjLjQ3OCAxLjA5MSAxLjU1NyAxLjc5NyAyLjc0OSAxLjc5N3ptLTMuMzcxLTQ4aDljLjU1MSAwIDEgLjQ0OSAxIDF2MTMuMTg0Yy0uMzE0LS4xMTItLjY0OC0uMTg0LTEtLjE4NGgtOXptOSAxNmMuNTUxIDAgMSAuNDQ5IDEgMXMtLjQ0OSAxLTEgMWMtLjM1MiAwLS42ODYuMDcyLTEgLjE4NHYtMi4xODR6Ii8+PHBhdGggZD0ibTQ1IDhoMnYyaC0yeiIvPjxwYXRoIGQ9Im00NSAxNmgydjJoLTJ6Ii8+PHBhdGggZD0ibTQ1IDEyaDJ2MmgtMnoiLz48L3N2Zz4=" width="90%" style="filter: contrast(10%) brightness(2)">';
        }
    })
}

// Add flags
let isGameOver = false;
const addFlag = function (square) {
    if (isGameOver) return
    if (!square.classList.contains("opened")) {
        square.classList.add("flag");
        square.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfNSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTM2IDQ5aDJ2MmgtMnoiLz48cGF0aCBkPSJtMzQgNTVoMnYyaC0yeiIvPjxwYXRoIGQ9Im0zOSA1MmgydjJoLTJ6Ii8+PHBhdGggZD0ibTQwIDU4aDJ2MmgtMnoiLz48cGF0aCBkPSJtNDYgNTVoMnYyaC0yeiIvPjxwYXRoIGQ9Im01MiA1N2gydjJoLTJ6Ii8+PHBhdGggZD0ibTMwIDU4aDJ2MmgtMnoiLz48cGF0aCBkPSJtMTcgMTljMy44NiAwIDctMy4xNCA3LTdzLTMuMTQtNy03LTctNyAzLjE0LTcgNyAzLjE0IDcgNyA3em0wLTEyYzIuNzU3IDAgNSAyLjI0MyA1IDVzLTIuMjQzIDUtNSA1LTUtMi4yNDMtNS01IDIuMjQzLTUgNS01eiIvPjxwYXRoIGQ9Im0xNSAzN2g0YzEuNjU0IDAgMy0xLjM0NiAzLTN2LTRjMC0xLjY1NC0xLjM0Ni0zLTMtM2gtNGMtMS42NTQgMC0zIDEuMzQ2LTMgM3Y0YzAgMS42NTQgMS4zNDYgMyAzIDN6bS0xLTdjMC0uNTUxLjQ0OS0xIDEtMWg0Yy41NTEgMCAxIC40NDkgMSAxdjRjMCAuNTUxLS40NDkgMS0xIDFoLTRjLS41NTEgMC0xLS40NDktMS0xeiIvPjxwYXRoIGQ9Im0xNiAzMWgydjJoLTJ6Ii8+PHBhdGggZD0ibTUyIDMwaDExdi0xOGgtOHYtNWMwLTEuNjU0LTEuMzQ2LTMtMy0zaC05di0xYzAtMS4xMDMtLjg5Ny0yLTItMmgtMmMtMS4xMDMgMC0yIC44OTctMiAydjE2aC02di02YzAtMi4yNjktMS41NTMtNC4yMjUtMy42OTQtNC44MDgtMS41NTQtNC4xOTItNS41ODEtNy4xOTItMTAuMzA2LTcuMTkycy04Ljc1MiAzLTEwLjMwNiA3LjE5MmMtMi4xNDEuNTgzLTMuNjk0IDIuNTM5LTMuNjk0IDQuODA4djEwLjY1OWMtMS4yNiAxLjc5NC0yIDMuOTc4LTIgNi4zNDF2N2MwIDMuMzA5IDIuNjkxIDYgNiA2aDF2MTMuNTRjLTEuMjI0IDEuMS0yIDIuNjg5LTIgNC40NnYyaDEwIDIgOSAxIDM0di0yLjMzM2wtNC40NDgtNS45M2MtMS4yODQtMS43MTQtMy4zMzEtMi43MzctNS40NzItMi43MzdoLTUuNzA5Yy0uMzk3IDAtLjc1Ny0uMjM1LS45MTctLjU5OWwtMS4wMDctMi4zMDJjLS4zNS0uNzk5LS44NTItMS40OTUtMS40NDctMi4wODh2LTI1LjAxMWg2djVjMCAxLjY1NCAxLjM0NiAzIDMgM3ptOS0xNnYxNGgtOWMtLjU1MSAwLTEtLjQ0OS0xLTFzLjQ0OS0xIDEtMWMxLjY1NCAwIDMtMS4zNDYgMy0zdi05em0tMjAtMTF2NDIuNjE0Yy0uNjI3LS4yODQtMS4zMDEtLjQ2OS0yLS41NTN2LTQyLjA2MXptLTE5IDUyYy0xLjUzOCAwLTIuOTM3LjU4Ni00IDEuNTR2LTMuOTIybDYtM3Y1LjczMmMtLjYyNy0uMjIyLTEuMjk4LS4zNS0yLS4zNXptMi03LjYxOC02IDN2LTEuNzY0bDYtM3ptMC00LTYgM3YtNS4zODJoNnptLTggMy02LTN2LTIuMzgyaDZ6bS02LS43NjQgNiAzdjEuNzY0bC02LTN6bTE2LTIuNjE4aDFjMi4yMDYgMCA0LTEuNzk0IDQtNHYtMTFoNnYxNy4wNTRjLTIuNDA3LjI2My00LjUwMSAxLjc4OS01LjQ1NCA0LjA1OWwtLjk1NCAyLjI3M2MtLjE1Ni4zNzMtLjUxOC42MTQtLjkyMi42MTRoLTMuNjd6bTAtMnYtMTNoM3YxMWMwIDEuMTAzLS44OTcgMi0yIDJ6bTExLTE1aC0ydi01aDJ6bS04LTEzdjZoLTMuNTIxYzEuNTc0LTEuOTAzIDIuNTIxLTQuMzQzIDIuNTIxLTcgMC0uNDQxLS4wMzMtLjg3My0uMDg0LTEuMzAxLjY2My41NTUgMS4wODQgMS4zODcgMS4wODQgMi4zMDF6bS0xMi0xMGM0Ljk2MiAwIDkgNC4wMzggOSA5cy00LjAzOCA5LTkgOS05LTQuMDM4LTktOSA0LjAzOC05IDktOXptLTEwLjkxNiA3LjY5OWMtLjA1MS40MjgtLjA4NC44Ni0uMDg0IDEuMzAxIDAgMi44NjcgMS4xMTIgNS40NzQgMi45MTYgNy40MzQtMS40NjMuNDItMi43ODMgMS4xMzctMy45MTYgMi4wNjh2LTguNTAyYzAtLjkxNC40MjEtMS43NDYgMS4wODQtMi4zMDF6bTQuNzI4IDEwLjM4OWMxLjc2NSAxLjIwNSAzLjg5NSAxLjkxMiA2LjE4OCAxLjkxMiAyLjM0NiAwIDQuNTE3LS43NDQgNi4zMDUtMmg5LjY5NXY1aC05djEzaC0xNHYtMTNoLTJ2OWgtNXYtNWMwLTQuNTYyIDMuMzM1LTguMzI2IDcuODEyLTguOTEyem0tMy44MTIgMTkuOTEyYy0yLjIwNiAwLTQtMS43OTQtNC00aDV2NHptMyA4LjYxOCA2IDN2My45MjJjLTEuMDYzLS45NTQtMi40NjItMS41NC00LTEuNTQtLjcwMiAwLTEuMzczLjEyOC0yIC4zNXptLTIgMTEuMzgyYzAtMi4yMDYgMS43OTQtNCA0LTRzNCAxLjc5NCA0IDR6bTEwIDBjMC0yLjIwNiAxLjc5NC00IDQtNHM0IDEuNzk0IDQgNHptMjguMzcxLTdoNS43MDljMS41MTYgMCAyLjk2My43MjQgMy44NzMgMS45MzdsMy43OTcgNS4wNjNoLTMxLjc1YzAtMS43NzEtLjc3Ni0zLjM2LTItNC40NnYtMi41NGgzLjY3YzEuMjExIDAgMi4yOTctLjcyMiAyLjc2Ny0xLjgzOWwuOTU0LTIuMjc0Yy43MzUtMS43NTQgMi40NC0yLjg4NyA0LjM0Mi0yLjg4N2guNDQ2YzEuOTIzIDAgMy42NjUgMS4xMzkgNC40MzYgMi45MDFsMS4wMDcgMi4zMDJjLjQ3OCAxLjA5MSAxLjU1NyAxLjc5NyAyLjc0OSAxLjc5N3ptLTMuMzcxLTQ4aDljLjU1MSAwIDEgLjQ0OSAxIDF2MTMuMTg0Yy0uMzE0LS4xMTItLjY0OC0uMTg0LTEtLjE4NGgtOXptOSAxNmMuNTUxIDAgMSAuNDQ5IDEgMXMtLjQ0OSAxLTEgMWMtLjM1MiAwLS42ODYuMDcyLTEgLjE4NHYtMi4xODR6Ii8+PHBhdGggZD0ibTQ1IDhoMnYyaC0yeiIvPjxwYXRoIGQ9Im00NSAxNmgydjJoLTJ6Ii8+PHBhdGggZD0ibTQ1IDEyaDJ2MmgtMnoiLz48L3N2Zz4=" width="90%" style="filter: contrast(10%) brightness(2)">';
    }
}

const __main  = function() {
    let svji = randomSquare09()
    let square = markedSquare(svji)
    renderSquare(square)
    bindEventDelegate(square)
    yzjm()
}
__main()