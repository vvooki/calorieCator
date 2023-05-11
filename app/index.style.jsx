import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  loginHeader: {
    textAlign: 'center',
    fontSize: SIZES.xxLarge,
    fontWeight: '500',
    color: COLORS.blankPurple,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer2: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  label: {
    width: '80%',
    paddingLeft: 10,
    fontSize: SIZES.medium,
  },
  input: {
    fontSize: SIZES.medium,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: COLORS.blankPurple,
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  loginBtnText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  plainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    backgroundColor: COLORS.blankPurple,
    padding: 10,
  },
  foodCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '80%',
    paddingVertical: 7,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  foodItemDetails: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 15,
  },
});

export default styles;
