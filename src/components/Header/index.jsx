import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Background, Container } from './styles';
import Logo from '../../assets/logo.png';

export const Header = ({ children }) => {
  const signed = useSelector((state) => state.signed);

  return (
    <Background>
      {signed && (
        <Container testID="topbar">
          <Image
            source={Logo}
            style={{ width: 23, height: 24 }}
            testID="logo"
          />
        </Container>
      )}
      {children}
    </Background>
  );
};

Header.propTypes = {
  children: PropTypes.element.isRequired,
};
