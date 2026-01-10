import { StyleSheet } from 'react-native';
const bgColor = '#111';
const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 700,
    fontFamily: 'InterDisplayBold',
    textAlign: 'center',
  },
  span: {
    fontStyle: 'italic',
  },
  subtext: {
    color: '#9CA3AF',
    fontFamily: 'InterDisplayRegular',
    fontWeight: 400,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 72,
  },
  label: {
    fontFamily: 'InterDisplayMedium',
    color: '#E5E7EB',
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontFamily: 'InterDisplayRegular',
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 16,
  },
});
export default styles;
