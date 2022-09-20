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

import { useNavigation, CommonActions, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRentalRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'Scheduling',
          params: {
            car
          }
      })
    )
  }

  function handleGoBackRedirect() {
    navigation.goBack();
  }

  return (
    <CarDetailsContainer>
      <Header>
        <BackButton onPress={handleGoBackRedirect}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <CarDetailsContent>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Acessories>

        <About>{car.about}</About>
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