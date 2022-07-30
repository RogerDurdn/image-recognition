package main

import (
	"image-recognition/pkg"
	"image-recognition/web"
)

func main() {
	service := pkg.RecognitionService{}
	web.Server(&service)
}
