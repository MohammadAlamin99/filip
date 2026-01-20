import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../screen/purchase/style';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const PlanHeader = () => {
    const navigation = useNavigation<any>();
    const handleBack = () => {
        navigation.goBack();
    };


    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
                <Text>
                    <ArrowLeft width={22} height={22} color="white" />
                </Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Premium</Text>
            <View></View>
        </View>
    )
}

export default PlanHeader