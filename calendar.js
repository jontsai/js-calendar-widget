/**
 * author: akajontsai-devel AT yahoo DOT com, 2012
 * file: calendar.js
 *
 * This is JS for the page and UI controls for the calendar
 *
 * DO NOT EDIT THIS FILE
 * Changes to this file are not guaranteed to maintain backwards compatibility in future versions.
 * Instead, adjust behavior and display by editing:
 *   calendar_settings.js
 *   helpers.js
 *
 */

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

YUI().use('node', function (Y) {


    var events = (typeof(getExternalEvents) != 'undefined')? getExternalEvents() : null;
    // SETUP: must provide a function called getExternalEvents()
    // expects a JSON object of events formatted as follows:
    // events = { 'YYYY-MM-DD' : [ { time: 'HH:MM (24-Hours)', content: 'HTML Markup' }, { ... } ], ... }
    // TODO: This works for a small number of events. Can improve performance by implementing an AJAX fetch events in the future

    // calendar UI
    var uiControls = Y.one('#calendar_controls');
    var uiMonthYear = Y.one('#cal_ui_month_year');

    // calendar state variables
    var currentMonth, currentYear, todayDate;

    function redrawCalendar() {
        var monthYear = MONTHS[currentMonth] + " " + currentYear;
        uiMonthYear.setContent(monthYear);

        var firstOfMonth = new Date(currentYear, currentMonth, 1);
        var dayOfWeek = firstOfMonth.getDay();
        var currentDate = new Date(currentYear, currentMonth, 1 - dayOfWeek);
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
                if (isDateToday(currentDate)) {
                    uiCell.addClass('cal-ui-cell-today');
                } else {
                    uiCell.removeClass('cal-ui-cell-today');
                }
                var date = currentDate.getDate();
                uiDate.setContent(date);
                renderEvents(uiContent, currentDate);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    function renderEvents(uiContent, date) {
        var dateString = dateToISOString(date);
        var dayEvents = (events != undefined) ? events[dateString] : null;
        if (dayEvents) {
            var html = '<ul>';
            dayEvents.sort(customSortEventsByTime);
            for (var i=0; i < dayEvents.length; ++i) {
                var event = dayEvents[i];
                var time = formatTimeForCalendarCell(event.time);
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
        todayDate = new Date();
        currentMonth = todayDate.getMonth();
        currentYear = todayDate.getFullYear();
    }

    function isDateToday(date) {
        var isToday = todayDate.getFullYear() == date.getFullYear() &&
          todayDate.getMonth() == date.getMonth() &&
          todayDate.getDate() == date.getDate();
        return isToday;
    }

    function handleControlClick(e) {
        var control = e.target;
        var control_id = control.get('id');
        if (control_id == 'cal_ui_today') {
            setToday();
        } else if (control_id == 'cal_ui_prev_year') {
            currentYear -= 1;
        } else if (control_id == 'cal_ui_next_year') {
            currentYear += 1;
        } else if (control_id == 'cal_ui_prev_month') {
            if (currentMonth == 0) {
                currentMonth = 11;
                currentYear -= 1;
            } else {
                currentMonth -= 1;
            }
        } else if (control_id == 'cal_ui_next_month') {
            if (currentMonth == 11) {
                currentMonth = 0;
                currentYear += 1;
            } else {
                currentMonth += 1;
            }
        }
        redrawCalendar();
    }

    uiControls.delegate('click', handleControlClick, '.calendar-control');

    // initialize the calendar
    setToday();
    redrawCalendar();
});
