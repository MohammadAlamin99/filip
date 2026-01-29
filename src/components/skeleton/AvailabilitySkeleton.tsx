import React from 'react';
import { View } from 'react-native';

const AvailabilitySkeleton = () => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                {/* Icon */}
                <View style={styles.icon} />

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.lineLg} />
                    <View style={styles.lineMd} />

                    <View style={styles.bottomRow}>
                        <View style={styles.badge} />
                        <View style={styles.lineSm} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AvailabilitySkeleton;
import { StyleSheet } from 'react-native';

const skeletonColor = '#2A2A2A';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: skeletonColor,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    lineLg: {
        height: 14,
        width: '70%',
        borderRadius: 6,
        backgroundColor: skeletonColor,
        marginBottom: 8,
    },
    lineMd: {
        height: 12,
        width: '50%',
        borderRadius: 6,
        backgroundColor: skeletonColor,
        marginBottom: 12,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badge: {
        width: 70,
        height: 22,
        borderRadius: 11,
        backgroundColor: skeletonColor,
    },
    lineSm: {
        width: 90,
        height: 10,
        borderRadius: 5,
        backgroundColor: skeletonColor,
    },
});
