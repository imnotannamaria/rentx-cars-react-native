import { 
  ImageSliderContainer, 
  ImageIndexes, 
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl } : Props) {
  return (
    <ImageSliderContainer>
      <ImageIndexes>
        <ImageIndex active={true}></ImageIndex>
        <ImageIndex active={false}></ImageIndex>
        <ImageIndex active={false}></ImageIndex>
        <ImageIndex active={false}></ImageIndex>
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage 
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </ImageSliderContainer>
  )
}