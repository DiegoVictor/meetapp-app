import { Button, Text } from './styles';

export const TextButton = ({ children, leftIcon, rightIcon, ...props }) => {
  return (
    <Button {...props}>
      {leftIcon}
      <Text marginLeft={!!leftIcon}>{children}</Text>
      {rightIcon}
    </Button>
  );
};
