<?php

function render_calendar($rel_path = "./") {
  $_orig_dir = getcwd();
  chdir(dirname(__FILE__));
?>
<script src="http://yui.yahooapis.com/3.4.1/build/yui/yui-min.js"></script>
<script src="<?= $rel_path ?>helpers.js"></script>
<script src="<?= $rel_path ?>calendar.js"></script>
<?php
  include('calendar_markup.html');
  chdir($_orig_dir);

}

?>
