import React , { useState } from "react";

import { 
  Header, 
  SchedulingContainer, 
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg';

import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { DateData } from "react-native-calendars";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from 'date-fns';
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const route = useRoute();
  const { car } = route.params as Params;

  const theme = useTheme();

  const navigation = useNavigation();

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [markedDates, SetMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  function handleConfirmSchedulingRedirect() {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo para alugar')
    }else {
      navigation.dispatch(
        CommonActions.navigate({
            name: 'SchedulingDetails', 
            params: {
              car,
              dates: Object.keys(markedDates)
            }
        })
      )
    }
  }

  function handleGoBackRedirect() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    SetMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }
  
  return (
    <SchedulingContainer>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <BackButton color={theme.colors.shape} onPress={handleGoBackRedirect}/>

        <Title>
          Escolha uma {'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>de</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          
          <ArrowSvg/>

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
            {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmSchedulingRedirect}
        />
      </Footer>
    </SchedulingContainer>
  )
}