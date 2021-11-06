#!/bin/bash
echo
echo "Generate new production index.html"
echo



DOMAIN=$1

# remove if file already exists
rm ./public/index.html 2> /dev/null

# create a new file with the proper domain names
cat <<EOT >> ./public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
 
    <script src="http://header.${DOMAIN}/headerRemoteEntry.js"></script>
    <script src="http://content-nested.${DOMAIN}/visualizationRemoteEntry.js"></script>

    <title>MicrofrontEnd Container</title>
  </head>
  <body style="margin:0;">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOT