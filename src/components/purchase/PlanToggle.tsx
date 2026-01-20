import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../screen/purchase/style'

const PlanToggle = ({ selectedPlan, setSelectedPlan }: { selectedPlan: 'monthly' | 'yearly', setSelectedPlan: (plan: 'monthly' | 'yearly') => void }) => {
    return (
        <View style={styles.toggleContainer}>
            <TouchableOpacity
                style={[
                    styles.toggleButton,
                    selectedPlan === 'monthly' && styles.toggleButtonActive,
                ]}
                onPress={() => setSelectedPlan('monthly')}
            >
                <Text
                    style={[
                        styles.toggleText,
                        selectedPlan === 'monthly' && styles.toggleTextActive,
                    ]}
                >
                    Monthly
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.toggleButton,
                    selectedPlan === 'yearly' && styles.toggleButtonActive,
                ]}
                onPress={() => setSelectedPlan('yearly')}
            >
                <Text
                    style={[
                        styles.toggleText,
                        selectedPlan === 'yearly' && styles.toggleTextActive,
                    ]}
                >
                    Yearly
                </Text>
                <View style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>Save 20%</Text>
                </View>
            </TouchableOpacity>
            {/* plan section */}
        </View>

    )
}

export default PlanToggle