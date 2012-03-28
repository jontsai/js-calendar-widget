/**
 * author: akajontsai-devel AT yahoo DOT com, 2012
 * file: helpers.js
 *
 */

// there is date.toISOString(), but it does not always display in user local time
function dateToISOString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var str = year + '-' + month + '-' + day;
    return str;
}

function getHourFromTimeString(timeString) {
    var separatorIndex = timeString.indexOf(':');
    var hour = parseInt(timeString.substring(0, separatorIndex));
    return hour;
}

function getMinuteFromTimeString(timeString) {
    var separatorIndex = timeString.indexOf(':');
    var minute = parseInt(timeString.substring(separatorIndex + 1));
    return minute;
}


function customSortEventsByTime(a, b) {
    var result;
    if (a.time == undefined) {
        result = -1;
    } else if (b.time == undefined) {
        result = 1;
    } else {
        var hourA = getHourFromTimeString(a.time);
        var hourB = getHourFromTimeString(b.time);
        var minA = getMinuteFromTimeString(a.time);
        var minB = getMinuteFromTimeString(b.time);
        if (hourA < hourB) {
            result = -1;
        } else if (hourA > hourB) {
            result = 1;
        } else {
            if (minA < minB) {
                result = -1;
            } else if (minA > minB) {
                result = 1;
            } else {
                result = 0;
            }
        }
    }
    return result;
}

function formatTimeForCalendarCell(timeString) {
    // timeString is null or in 24-Hour Time
    var formattedTime = null;
    if (timeString != undefined) {
        formattedTime = '';
        var hour = getHourFromTimeString(timeString);
        var minute = getMinuteFromTimeString(timeString);
        var time24Hour = (typeof(SETTINGS) != 'undefined' && SETTINGS['TIME_24_HOUR'] != undefined)? SETTINGS['TIME_24_HOUR'] : DEFAULTS['TIME_24_HOURS'];
        var hourOnly = (typeof(SETTINGS) != 'undefined' && SETTINGS['TIME_HOUR_ONLY'] != undefined)? SETTINGS['TIME_HOUR_ONLY'] : DEFAULTS['TIME_HOUR_ONLYS'];
        var formattedTime = '';
        formattedTime += time24Hour? hour : (hour % 12);
        formattedTime += hourOnly? '' : ':' + (minute < 10? '0' + minute : minute);
        formattedTime += time24Hour? '' : ((hour >= 12)? 'p' : 'a');
    }
    return formattedTime;
}
