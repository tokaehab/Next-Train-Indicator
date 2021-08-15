let h = 5
let m = 0
let schedule = [[20, 'Central Station'], [60, 'Circular'],
[1000, 'North Square'], [1000, 'West Market']]

function startTime() {
    m = checkTime(m)
    if (m == 60) {
        m = 0
        h++
    }
    if (h == 24) { h = 0 }
    document.getElementById('clock').innerHTML = h + ":" + m + ":00 " + (h < 12 ? "AM" : "PM")
    updateSchedule()
    m++
    setTimeout(startTime, 1000)
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }
    return i
}

function updateSchedule() {
    if (h == 5 && m == 30) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i][1] == 'West Market') {
                schedule[i][0] = 6
                break
            }
        }
    }
    else if (h == 1 && m == 30) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i][1] == 'West Market') {
                schedule[i][0] = 1000
                break
            }
        }
    }
    else if (h == 7 && m == 0) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i][1] == 'North Square') {
                schedule[i][0] = 12
                break
            }
        }
    }
    else if (h == 22 && m == 0) {
        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i][1] == 'North Square') {
                schedule[i][0] = 1000
                break
            }
        }
    }

    for (let i = 0; i < schedule.length; i++) {
        if (schedule[i][1] == 'West Market' && schedule[i][0] < 1000) {
            schedule[i][0]--
            if (schedule[i][0] == -1) { schedule[i][0] = 6 }
        } else if (schedule[i][1] == 'West Market') { continue }

        if (schedule[i][1] == 'North Square' && schedule[i][0] < 1000) {
            schedule[i][0]--
            if (schedule[i][0] == -1) { schedule[i][0] = 12 }
        } else if (schedule[i][1] == 'North Square') { continue }

        if (schedule[i][1] == 'Central Station') {
            schedule[i][0]--
            if (schedule[i][0] == -1) { schedule[i][0] = 20 }
        } else if (schedule[i][1] == 'Circular') {
            schedule[i][0]--
            if (schedule[i][0] == -1) { schedule[i][0] = 60 }
        }
    }


    schedule = schedule.sort((a, b) => a[0] - b[0]);
    let menu = document.getElementById('list');
    while (menu.firstChild) {
        menu.removeChild(menu.firstChild);
    }
    if (schedule[0][0] <= 15) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(schedule[0][1] + ' - ' + schedule[0][0] + ' min');
        node.appendChild(textnode)
        document.getElementById("list").appendChild(node);
    }
    if (schedule[1][0] <= 15) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(schedule[1][1] + ' - ' + schedule[1][0] + ' min');
        node.appendChild(textnode)
        document.getElementById("list").appendChild(node);
    }
    if (schedule[2][0] <= 15) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(schedule[2][1] + ' - ' + schedule[2][0] + ' min');
        node.appendChild(textnode)
        document.getElementById("list").appendChild(node);
    }
}