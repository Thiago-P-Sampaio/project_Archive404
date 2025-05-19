import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ModalDetalhesJogo({ visible, jogo, onClose, onEdit, onDelete }) {
  if (!jogo) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(25,29,32,1)', 'rgba(137,147,178,1)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          {/* Botão de voltar */}
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name="chevron-back" size={32} color="#fff" />
          </TouchableOpacity>

          {/* Imagem do jogo */}
          <Image
            source={{ uri: jogo.img }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Título */}
          <Text style={styles.titlegame}>{jogo.nome}</Text>

          {/* Descrição */}
          <Text style={styles.descricao}>{jogo.descricao}</Text>

          {/* Informações adicionais */}
          <Text style={styles.info}>{jogo.lancamento}</Text>
          <Text style={styles.info}>Desenvolvido por: {jogo.desenvolvedora}</Text>
          <Text style={styles.info}>{jogo.genero}</Text>

          {/* Botões */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonText}>Excluir</Text>
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
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: "90%",
    height: '90%',
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 10,
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 214,
    height: 260,
    marginBottom: 24,
    boxShadow: '9px 11px 4px rgba(0,0,0,0.25)', 
    backgroundColor: '#222',
  },
  titlegame: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 32,
    fontWeight: '200',
    marginBottom: 18,
    alignSelf: 'flex-start',
    width: '100%',
  },
  descricao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '200',
    marginBottom: 18,
    textAlign: 'left',
    width: '100%',
    opacity: 0.8,
  },
  info: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
    opacity: 0.8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 28,
    gap: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#BDB76B',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#D46A6A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
});
