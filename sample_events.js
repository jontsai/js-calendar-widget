function getExternalEvents() {
    var json = {};
    var dayEvents = [];
    var now = new Date();
    var dateString = dateToISOString(now);
    dayEvents.push({time:'18:30', content: 'Dinner with Jack'});
    dayEvents.push({ time: '03:30', content: 'Hello World Program'});
    dayEvents.push({time: '22:00', content: 'Call Jill to say Happy BDay'});
    dayEvents.push({content: 'Jill\'s Birthday'});
    json[dateString] = dayEvents;
    return json;
}