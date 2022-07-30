package web

import (
	"github.com/gin-gonic/gin"
	"image-recognition/pkg"
	"log"
	"net/http"
)

var service pkg.Service

func Server(recognitionService pkg.Service) {
	service = recognitionService
	router := defaultRouter()
	endpoints(router)
	runningOn(router, ":8081")
}

func defaultRouter() *gin.Engine {
	router := gin.Default()
	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("templates/*")
	return router
}

func runningOn(router *gin.Engine, addr string) {
	err := router.Run(addr)
	if err != nil {
		log.Fatal(err)
	}
}

func endpoints(r *gin.Engine) {
	r.GET("/hi", getHello)
	r.GET("/home", getHome)
}

func getHome(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", "")
}

func getHello(c *gin.Context) {
	c.String(200, "hello %v", service.ProcessImage())
}
