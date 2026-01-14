import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CircleCheck, Circle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

type Language = {
  code: string;
  name: string;
  flag: any;
  isDefault?: boolean;
};

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('GB');
  const [searchQuery, setSearchQuery] = useState('');

  const languages: Language[] = [
    { code: 'RS', name: 'Srpski', flag: require('../../../assets/images/rs.png') },
    { code: 'GB', name: 'English', flag: require('../../../assets/images/gb.png'), isDefault: true },
    { code: 'FR', name: 'Français', flag: require('../../../assets/images/fr.png') },
    { code: 'DE', name: 'Deutsch', flag: require('../../../assets/images/de.png') },
    { code: 'PL', name: 'Polski', flag: require('../../../assets/images/pl.png') },
    { code: 'TR', name: 'Türkçe', flag: require('../../../assets/images/tr.png') },
    { code: 'IT', name: 'Italiano', flag: require('../../../assets/images/it.png') },
    { code: 'ES', name: 'Español', flag: require('../../../assets/images/es.png') },
    { code: 'PT', name: 'Português', flag: require('../../../assets/images/pt.png') },
    { code: 'RU', name: 'Русский', flag: require('../../../assets/images/ru.png') },
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSaveChanges = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.searchContainer}>
          <Search width={25} height={25} color="#ffffff" />
          <TextInput
            placeholder="Search Language..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLanguages.map((language) => {
            const isSelected = selectedLanguage === language.code;
            return (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  isSelected && styles.languageItemSelected,
                ]}
                onPress={() => setSelectedLanguage(language.code)}
                activeOpacity={0.7}
              >
                <View style={styles.languageLeft}>
                  <Image source={language.flag} style={styles.flagIcon} />
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    {language.isDefault && selectedLanguage === language.code && (
                      <Text style={styles.defaultText}>Default</Text>
                    )}
                  </View>
                </View>
                {isSelected ? (
                  <CircleCheck width={28} height={28} fill="#FFD900" />
                ) : (
                  <Circle width={24} height={24} color="#FFD900" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveChanges}
          activeOpacity={0.7}
        >
          <CircleCheck width={28} height={28} color="#FFD900" fill="#1F2937" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;