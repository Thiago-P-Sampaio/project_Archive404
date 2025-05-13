import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalForm({ visible, onClose }) {
    const [form, setForm] = useState({
        nome: '',
        imagem: '',
        lancamento: '',
        desenvolvedora: '',
        genero: '',
        descricao: '',
    });

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {/* Título e botão de fechar */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Adicionar Jogo</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Campos do formulário */}
                    {['Nome', 'Imagem(URL)', 'Lançamento', 'Desenvolvedora', 'Gênero'].map((label) => (
                        <TextInput
                            key={label}
                            placeholder={label}
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            onChangeText={(value) => handleInputChange(label.toLowerCase(), value)}
                        />
                    ))}
                    <TextInput
                        placeholder="Descrição"
                        placeholderTextColor="#ccc"
                        style={[styles.input, styles.textArea]}
                        multiline
                        numberOfLines={4}
                        onChangeText={(value) => handleInputChange('descricao', value)}
                    />

                    {/* Botões */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonEnviar}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancelar} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: '85%',
        padding: 20,
        backgroundColor: '#232729',
        borderRadius: 20,
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        marginVertical: 5,
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
        marginTop: 10,
    },
    buttonEnviar: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    buttonCancelar: {
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
