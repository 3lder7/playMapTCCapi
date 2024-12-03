import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ThemeAccessibilityScreen = () => {
  // Estado para o tema selecionado
  const [selectedTheme, setSelectedTheme] = useState('default');
  // Estado para o tamanho da fonte
  const [fontSize, setFontSize] = useState(18);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Alterar Tema</Text>

      <View style={styles.section}>
        {/* Opção: Tema padrão */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedTheme('default')}
        >
          <Text style={styles.optionTextLarge}>Tema padrão do dispositivo</Text>
          <View
            style={
              selectedTheme === 'default' ? styles.radioSelected : styles.radio
            }
          />
        </TouchableOpacity>

        {/* Opção: Tema claro */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedTheme('light')}
        >
          <Text style={styles.optionTextLarge}>Tema claro</Text>
          <View
            style={
              selectedTheme === 'light' ? styles.radioSelected : styles.radio
            }
          />
        </TouchableOpacity>

        {/* Opção: Tema escuro */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedTheme('dark')}
        >
          <Text style={styles.optionTextLarge}>Tema escuro</Text>
          <View
            style={
              selectedTheme === 'dark' ? styles.radioSelected : styles.radio
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.accessibilitySection}>
        <Text style={styles.accessibilityTitle}>Acessibilidade</Text>
        <View style={styles.accessibilityHeader}>
          <Text style={styles.accessibilitySubtitle}>Tamanho de Texto</Text>
          <Text style={styles.accessibilityDescription}>
            Ajuste o tamanho da fonte para garantir uma leitura confortável e personalizada à sua preferência.
          </Text>
        </View>

        <View style={styles.fontSizeAdjuster}>
          {/* Botão para diminuir o tamanho da fonte */}
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() => setFontSize((prev) => Math.max(12, prev - 1))}
          >
            <Text style={styles.adjustText}>-</Text>
          </TouchableOpacity>

          {/* Valor atual do tamanho da fonte */}
          <Text style={styles.fontSizeValue}>{fontSize}</Text>

          {/* Botão para aumentar o tamanho da fonte */}
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() => setFontSize((prev) => Math.min(30, prev + 1))}
          >
            <Text style={styles.adjustText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.exampleText, { fontSize }]}>TEXTO EXEMPLO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 30,
  },
  backArrow: {
    fontSize: 20,
    color: '#000',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionTextLarge: {
    fontSize: 18,
    color: '#000',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#888',
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  accessibilitySection: {
    marginTop: 30,
  },
  accessibilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  accessibilityHeader: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  accessibilitySubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  accessibilityDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
  },
  fontSizeAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  adjustButton: {
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15, 
  },
  adjustText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000',
  },
  fontSizeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  exampleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default ThemeAccessibilityScreen;
