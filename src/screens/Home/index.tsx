import Reactm, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { 
  HomeContainer, 
  Header, 
  TotalCars, 
  HeaderContent, 
  CarList } 
from './styles'

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetailsRedirect() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
      })
    )
  }

  /*
    TODO: 
      oi Anna do futuro eu estou aqui para te lembrar de usar o 
      natigation.goBack() para voltar para a tela anterior nas telas
  */

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    fetchCars();
  }, [])
  

  return (
    <HomeContainer>
      <StatusBar 
          barStyle='light-content' 
          translucent
          backgroundColor='transparent'
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      
      {loading ? <Load/> :
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={handleCarDetailsRedirect}/>
          )}
        />
      }
    </HomeContainer>
  )
}