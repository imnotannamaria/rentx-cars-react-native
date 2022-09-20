import React from "react"
import { TouchableOpacityProps } from "react-native"
import { ConfirmButtonContainer, Title } from "./styles"

interface Props extends TouchableOpacityProps {
  title: string;
}

export function ConfirmButton({ title, ...rest } : Props) {
  return (
    <ConfirmButtonContainer {...rest}>
      <Title>{title}</Title>
    </ConfirmButtonContainer>
  )
}