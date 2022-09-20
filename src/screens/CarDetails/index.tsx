import React from "react"

import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { 
  CarDetailsContainer, 
  Header, 
  CarImages,
  CarDetailsContent,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  About,
  Footer,
} from "./styles"

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import pleaple from "../../assets/people.svg";
import { useNavigation, CommonActions } from "@react-navigation/native";

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRentalRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'Scheduling',
      })
    )
  }

  function handleBackToHomeRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'Home',
      })
    )
  }

  return (
    <CarDetailsContainer>
      <Header>
        <BackButton onPress={handleBackToHomeRedirect}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </CarImages>

      <CarDetailsContent>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Hurancan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory name="380km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={accelerationSvg}/>
          <Accessory name="800 HP" icon={forceSvg}/>
          <Accessory name="Gasolina" icon={gasolineSvg}/>
          <Accessory name="Auto" icon={exchangeSvg}/>
          <Accessory name="2 Pessoas" icon={pleaple}/>
        </Acessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </CarDetailsContent>

      <Footer>
          <Button 
            title="Escolher período do aluguel" 
            onPress={handleConfirmRentalRedirect} 
          />
      </Footer>

    </CarDetailsContainer>
  )
}