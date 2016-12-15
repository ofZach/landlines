# Land Lines

This is the source code for [Land Lines](http://lines.chromeexperiments.com). For more information about how the project came together, check out the [case study](https://developers.google.com/web/showcase/2016/land-lines).


## To run the site locally

You can run a simple python server to host the site

`pushd www; python -m SimpleHTTPServer; popd`

which you can reach at `http://localhost:8000/`



## Deployment to App Engine

1. Install the [Go SDK for App Engine](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Go)
2. Update Makefile with your AppID
3. run the command: `make deploy`