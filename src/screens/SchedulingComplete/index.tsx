import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { 
  SchedulingCompleteContainer,
  SchedulingCompleteContent,
  Title,
  Message,
  Footer,
} from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";

import { CommonActions, useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleBackToHomeRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
          name: 'Home',
      })
    )
  }

  return (
    <SchedulingCompleteContainer>
      <StatusBar 
        barStyle='light-content' 
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width}/>

      <SchedulingCompleteContent>
        <DoneSvg width={80} height={80} />

        <Title>Carro Alugado!</Title>
        
        <Message>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton 
            title='OK'
            onPress={handleBackToHomeRedirect}
          />
        </Footer>
      </SchedulingCompleteContent>
    </SchedulingCompleteContainer>
  )
}