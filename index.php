<html>
  <head>
    <title>JS Calendar Widget</title>

    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/reset-fonts-grids/reset-fonts-grids.css">
    <link type="text/css" rel="stylesheet" href="calendar.css" />

    <script src="sample_events.js"></script>
    <script src="calendar_settings.js"></script>
  </head>

  <body>
   <div style="text-align: left;"><h1 style="font-weight: bold; font-size: 22px;">Sample Calendar</h1></div>
   <br />
   <?php require_once('calendar_wrapper.php'); render_calendar(); ?>
  </body>
</html>
