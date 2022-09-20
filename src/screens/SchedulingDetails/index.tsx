import React, { useEffect, useState } from "react"

import { Accessory } from "../../components/Accessory"
import { Button } from "../../components/Button"
import { BackButton } from "../../components/BackButton"
import { ImageSlider } from "../../components/ImageSlider"

import { Feather } from "@expo/vector-icons";

import { format } from 'date-fns';

import { 
  SchedulingDetailsContainer, 
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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from "./styles"

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from "../../utils/getAccessoryIcon"
import { CarDTO } from "../../dtos/CarDTO"
import { Alert, StatusBar } from "react-native"
import { useTheme } from "styled-components"
import { RFValue } from "react-native-responsive-fontsize"
import { getPlatformDate } from "../../utils/getPlatformDate"
import api from "../../services/api"

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod ] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  const theme = useTheme();

  const navigation = useNavigation();

  async function handleconfirmRentalApi() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
    })
    .then(() => handleCarSchedulingConfirmationRedirect())
    .catch(() => Alert.alert('Não foi possível confirmar o agendamento'))
  }


  function handleCarSchedulingConfirmationRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'SchedulingComplete',
      })
    )
  }

  function handleGoBackRedirect() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])
  
  return (
    <SchedulingDetailsContainer>
      <StatusBar 
        barStyle='light-content' 
        translucent
        backgroundColor='transparent'
      />
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
            <Price>R${car.rent.price}</Price>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </CarDetailsContent>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success}
          onPress={handleconfirmRentalApi}
        />
        
      </Footer>

    </SchedulingDetailsContainer>
  )
}