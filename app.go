package app

import (
	"net/http"
)


func init() {
	www := http.FileServer(http.Dir("www"))
	
	http.Handle("/", www)
}

