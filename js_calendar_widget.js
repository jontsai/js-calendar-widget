/**
 * author: akajontsai-devel AT yahoo DOT com
 * file: calendar.js
 *
 * This is JS for the page and UI controls for the calendar
 */

YUI().use('node', function (Y) {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var events = getExternalEvents();
    // SETUP: must provide a function called getExternalEvents()
    // expects a JSON object of events formatted as follows:
    // events = { 'YYYY-MM-DD' : [ { time: 'HH:MM (24-Hours)', content: 'HTML Markup' }, { ... } ], ... }
    // events per day are not ordered chronologically and must be sorted first
    // TODO: This works for a small number of events. Can improve performance by implementing an AJAX fetch events in the future

    // calendar UI
    var uiControls = Y.one('#calendar_controls');
    var uiMonthYear = Y.one('#cal_ui_month_year');

    // calendar state variables
    var current_month, current_year;

    function redrawCalendar() {
        var monthYear = MONTHS[current_month] + " " + current_year;
        uiMonthYear.setContent(monthYear);

        var firstOfMonth = new Date(current_year, current_month, 1);
        var dayOfWeek = firstOfMonth.getDay();
        var currentDate = new Date(current_year, current_month, 1 - dayOfWeek);
        var inMonth = false;

        for (var row=0; row < 6; ++row) {
            for (var col=0; col < 7; ++col) {
                var uiCell = Y.one('#cal_ui_cell_' + row + '_' + col);
                var uiDate = uiCell.one('.cal-ui-cell-date');
                var uiContent = uiCell.one('.cal-ui-cell-content');
                if (row == 0 && currentDate.getDate() == 1) {
                    inMonth = true;
                } else if (row > 0 && currentDate.getDate() == 1) {
                    inMonth = false;
                }
                if (inMonth) {
                    uiCell.removeClass('cal-ui-cell-other-month');
                } else {
                    uiCell.addClass('cal-ui-cell-other-month');
                }
                var date = currentDate.getDate();
                uiDate.setContent(date);
                renderEvents(uiContent, currentDate);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    function renderEvents(uiContent, date) {
        var dateString = (date.toISOString) ? date.toISOString().substring(0, 10) : dateToISOString(date);
        var dayEvents = events[dateString];
        if (dayEvents) {
            var html = '<ul>';
            dayEvents.sort(function (a, b) {
                var result;
                if (a.time == undefined) {
                    result = -1;
                } else if (b.time == undefined) {
                    result = 1;
                } else {
                    var hourA = a.time.substring(0, 2);
                    var minA = a.time.substring(3);
                    var hourB = b.time.substring(0, 2);
                    var minB = b.time.substring(3);
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
            });
            for (var i=0; i < dayEvents.length; ++i) {
                var event = dayEvents[i];
                var time = event.time;
                var content = event.content;
                html += '<li>';
                html += (time != undefined)? '<span class="cal-ui-cell-time">' + time + '</span>' : '';
                html += (content != undefined)? content : '';
                html += '</li>';
            }
            html += '</ul>';
            uiContent.setContent(html);
        } else {
            uiContent.setContent('');
        }
    }

    function setToday() {
        var now = new Date();
        current_month = now.getMonth();
        current_year = now.getFullYear();
    }

    function handleControlClick(e) {
        var control = e.target;
        var control_id = control.get('id');
        if (control_id == 'cal_ui_today') {
            setToday();
        } else if (control_id == 'cal_ui_prev_year') {
            current_year -= 1;
        } else if (control_id == 'cal_ui_next_year') {
            current_year += 1;
        } else if (control_id == 'cal_ui_prev_month') {
            if (current_month == 0) {
                current_month = 11;
                current_year -= 1;
            } else {
                current_month -= 1;
            }
        } else if (control_id == 'cal_ui_next_month') {
            if (current_month == 11) {
                current_month = 0;
                current_year += 1;
            } else {
                current_month += 1;
            }
        }
        redrawCalendar();
    }

    uiControls.delegate('click', handleControlClick, '.calendar-control');

    // initialize the calendar
    setToday();
    redrawCalendar();
});
