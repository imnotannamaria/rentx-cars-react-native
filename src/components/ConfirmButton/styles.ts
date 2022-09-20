import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ConfirmButtonContainer = styled.TouchableOpacity`
  width: 80px;
  height: 56px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape_dark};

  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`