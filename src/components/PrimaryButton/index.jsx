import { Button, Text } from './styles';

export const PrimaryButton = ({ leftIcon, rightIcon, children, ...props }) => {
  return (
    <Button {...props}>
      {leftIcon}
      <Text marginLeft={!!leftIcon}>{children}</Text>
      {rightIcon}
    </Button>
  );
};
