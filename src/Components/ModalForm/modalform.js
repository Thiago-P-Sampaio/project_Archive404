import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ModalForm({ visible, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    nome: '',
    img: '',
    lancamento: '',
    desenvolvedora: '',
    genero: '',
    descricao: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome || '',
        img: initialData.img || '',
        lancamento: initialData.lancamento || '',
        desenvolvedora: initialData.desenvolvedora || '',
        genero: initialData.genero || '',
        descricao: initialData.descricao || '',
      });
    } else {
      setForm({
        nome: '',
        img: '',
        lancamento: '',
        desenvolvedora: '',
        genero: '',
        descricao: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const isFormValid = () => {
    return Object.values(form).every(value => value.trim() !== '');
  };

  const handleSend = () => {
    if (!isFormValid()) {
      Alert.alert('Formulário incompleto', 'Por favor, preencha todos os campos.');
      return;
    }
    onSubmit(form);
    // Opcional: limpar formulário após envio
    setForm({
      nome: '',
      img: '',
      lancamento: '',
      desenvolvedora: '',
      genero: '',
      descricao: '',
    });
  };

  const fields = [
    { label: 'Nome', key: 'nome' },
    { label: 'Imagem (URL)', key: 'img' },
    { label: 'Lançamento', key: 'lancamento' },
    { label: 'Desenvolvedora', key: 'desenvolvedora' },
    { label: 'Gênero', key: 'genero' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(25,29,32,1)', 'rgba(137,147,178,1)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.card}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{initialData ? 'Editar Jogo' : 'Adicionar Jogo'}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {fields.map(({ label, key }) => (
            <View key={key} style={styles.fieldContainer}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                placeholder={label}
                placeholderTextColor="#ccc"
                style={styles.input}
                onChangeText={(value) => handleInputChange(key, value)}
                value={form[key]}
              />
            </View>
          ))}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#ccc"
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              onChangeText={(value) => handleInputChange('descricao', value)}
              value={form.descricao}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSend}>
              <Text style={styles.buttonText}>{initialData ? 'Confirmar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  card: {
    width: '85%',
    height: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '200',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonSubmit: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  buttonCancel: {
    backgroundColor: '#BDB76B',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
