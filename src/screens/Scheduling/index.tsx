import React from "react";
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

import { CommonActions, useNavigation } from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg';

import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

export function Scheduling() {
  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmSchedulingRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'SchedulingDetails',
      })
    )
  }

  function handleBackToCarDetailsRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'CarDetails',
      })
    )
  }
  
  return (
    <SchedulingContainer>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <BackButton color={theme.colors.shape} onPress={handleBackToCarDetailsRedirect}/>

        <Title>
          Escolha uma {'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>de</DateTitle>
            <DateValue>
              20/11/2021
            </DateValue>
          </DateInfo>
          
          <ArrowSvg/>

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>
              20/11/2021
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar/>
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