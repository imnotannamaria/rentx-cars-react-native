import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends TouchableOpacityProps {
  color: string;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  
  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color }
`

export const ButtonTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`