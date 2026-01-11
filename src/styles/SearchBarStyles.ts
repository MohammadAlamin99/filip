import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
});