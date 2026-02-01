import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0B0B0B',
        paddingBottom: 60,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 20,
    },

    /* PHOTO */
    photoSection: {
        alignItems: 'center',
        marginBottom: 24,
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#1F2937',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },

    cameraIcon: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FACC15',
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 12,
    },

    subText: {
        color: '#9CA3AF',
        fontSize: 13,
        marginTop: 4,
    },

    /* SECTIONS */
    section: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 28,
        marginBottom: 12,
    },

    label: {
        color: '#9CA3AF',
        fontSize: 14,
        marginBottom: 6,
        marginTop: 16,
    },

    /* INPUTS */
    input: {
        height: 52,
        borderRadius: 12,
        backgroundColor: '#141414',
        paddingHorizontal: 14,
        color: '#FFFFFF',
        fontSize: 15,
    },

    textArea: {
        minHeight: 120,
        borderRadius: 12,
        backgroundColor: '#141414',
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: '#FFFFFF',
        fontSize: 15,
        textAlignVertical: 'top',
    },

    dropdown: {
        height: 52,
        borderRadius: 12,
        backgroundColor: '#141414',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    dropdownText: {
        color: '#9CA3AF',
        fontSize: 15,
    },

    /* ICON INPUT */
    iconInput: {
        height: 52,
        borderRadius: 12,
        backgroundColor: '#141414',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    flexInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        marginLeft: 10,
    },

    /* SAVE BUTTON */
    saveBtn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: '#FACC15',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginBottom: 24,
    },

    saveText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default styles;
