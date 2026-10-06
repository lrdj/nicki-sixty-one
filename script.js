// Small, optional enhancements. The page works fully without JavaScript.
(function () {
  'use strict';

  // Appointments in local (Europe/London) time. In November the UK is on GMT,
  // so these are also the UTC instants used in the calendar links.
  var events = [
    { name: 'your Kobido session', when: new Date(Date.UTC(2026, 10, 6, 10, 0)) },
    { name: 'your Ayurvedic massage', when: new Date(Date.UTC(2026, 10, 28, 11, 30)) }
  ];

  var el = document.getElementById('countdown');
  if (!el) return;

  var now = new Date();
  var next = null;
  for (var i = 0; i < events.length; i++) {
    if (events[i].when.getTime() > now.getTime()) { next = events[i]; break; }
  }

  var text;
  if (!next) {
    text = 'Both treatments are done. Hope they were lovely.';
  } else {
    var msPerDay = 24 * 60 * 60 * 1000;
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var startOfThen = new Date(next.when.getFullYear(), next.when.getMonth(), next.when.getDate());
    var days = Math.round((startOfThen - startOfToday) / msPerDay);
    if (days === 0) text = 'Today is the day: ' + next.name + '.';
    else if (days === 1) text = 'Tomorrow: ' + next.name + '.';
    else text = days + ' days until ' + next.name + '.';
  }

  el.textContent = text;
  el.hidden = false;

  // Mark today on the faux calendar if we are in November 2026.
  if (now.getFullYear() === 2026 && now.getMonth() === 10) {
    var cells = document.querySelectorAll('.calendar__cell');
    for (var j = 0; j < cells.length; j++) {
      var num = cells[j].querySelector('.calendar__num') || cells[j];
      if (parseInt(num.textContent, 10) === now.getDate()) {
        cells[j].classList.add('calendar__cell--today');
        cells[j].setAttribute('title', 'Today');
      }
    }
  }
})();
