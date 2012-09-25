<?php

function render_calendar($rel_path = "./") {
  $_orig_dir = getcwd();
  chdir(dirname(__FILE__));

  // use echoes instead of inline PHP, which is not allowed by all Apache configs
  echo('<script src="http://yui.yahooapis.com/3.4.1/build/yui/yui-min.js"></script>');
  echo("<script src=\"$(rel_path)calendar_settings_default.js\"></script>");
  echo("<script src=\"$(rel_path)helpers.js\"></script>");
  echo("<script src=\"$rel_path)calendar.js\"></script>");

  include('calendar_markup.html');
  chdir($_orig_dir);

}

?>
