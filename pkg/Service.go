package pkg

import (
	"image-recognition/model"
)

type Service interface {
	ProcessImage() string
	ProcessImg(image model.Image) string
}

type RecognitionService struct {
}

func (s *RecognitionService) ProcessImage() string {
	return "you"
}

func (s *RecognitionService) ProcessImg(image model.Image) string {
	return "you"
}
