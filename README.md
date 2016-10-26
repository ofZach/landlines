# Land Lines

## Development

### Environment setup

Install the [Go SDK for App Engine](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Go)

### Running for Local testing

To run the server locally, run the command:

`make dev`

This will start a local server on `localhost:8080`

### Deployment

To deploy to our master server on App Engine ([zach-navigator.appspot.com](zach-navigator.appspot.com)), run the command:

`make deploy`

To deploy a specific version, run the command

`make deploy-[versionName]`

For example, running the command `make deploy-jeff2` would create a new server version that could be accessed at jeff2-dot-zach-navigator.appspot.com