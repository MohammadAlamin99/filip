import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#111111',
  cardBg: '#121212',
  primary: '#FFD900',
  white: '#FFFFFF',
  gray: '#9CA3AF',
  textDark: '#1F2937',
  border: '#2A2A2A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.primary,
    fontFamily: 'InterDisplayRegular',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: COLORS.white,
    fontFamily: 'InterDisplayMedium',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'InterDisplayRegular',
    fontWeight: 400,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  languageItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#1A1A1A',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    height: 25,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.white,
    fontFamily: 'InterDisplaySemiBold',
    letterSpacing: -0.18,
    textTransform: 'capitalize',
  },
  defaultText: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.white,
    fontFamily: 'InterDisplayRegular',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  saveButton: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    borderRadius: 7,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 900,
    color: COLORS.textDark,
    fontFamily: 'InterDisplaySemiBold',
    letterSpacing: -0.18,
    textTransform: 'capitalize',
  },
});

export default styles;