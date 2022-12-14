import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const AccessoryContainer = styled.View`
  width: 109px;
  height: 92px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};

  padding: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(13)}px;
`;