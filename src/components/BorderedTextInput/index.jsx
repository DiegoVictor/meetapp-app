import { TouchableOpacity } from 'react-native';
import { Container, Input, InputGroup, Label, Error } from './styles';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';

export const BorderedTextInput = ({
  leftIcon,
  rightIcon,
  label,
  size,
  secureTextEntry,
  error,
  ...props
}) => {
  const [secureText, setSecureText] = useState(secureTextEntry);

  return (
    <>
      <Container size={size} testID="input-container">
        {leftIcon}
        <InputGroup>
          {!!label && <Label>{label}</Label>}
          <Input {...props} secureTextEntry={secureText} />
        </InputGroup>
        {secureTextEntry && (
          <TouchableOpacity
            testID="secure-text"
            onPress={() => {
              setSecureText(!secureText);
            }}
          >
            <MaterialDesignIcons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
        )}
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
};
