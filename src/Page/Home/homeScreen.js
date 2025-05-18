import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, AppRegistry } from "react-native";
import ModalForm from "../../Components/ModalForm/modalform";
import CardGames from "../../Components/CardGames/cardgames";
import ModalDetails from "../../Components/ModalDetails/modalDetails";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import gamesService from "../../Services/api";
import ModalConfirm from "../../Components/ModalConfirm/modalConfirm";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJogo, setSelectedJogo] = useState(null);
  const [isDetalhesVisible, setDetalhesVisible] = useState(false);
  const [ModalConfirmVisible, setModalConfirmVisible] = useState(false);

  // Buscar jogos ao montar a tela
  useEffect(() => {
    fetchJogos();
  }, []);

  const fetchJogos = async () => {
    setLoading(true);
    try {
      const response = await gamesService.get("/all");
      setJogos(response.data);
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao carregar jogos." });
      setJogos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleAddGame = async (formData) => {
    
    try {
        if (EditGame) {
      await gamesService.put(`/updt/${EditGame.id}`, formData);
      Toast.show({ type: 'success', text1: 'Jogo atualizado com sucesso!' });
    } else {
      await gamesService.post("/add", formData);
      setModalVisible(false);
      Toast.show({ type: "success", text1: "Jogo adicionado com sucesso!", position: 'bottom' });
      fetchJogos(); // Atualiza lista
    }
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao adicionar jogo." });
    }
  };

  const handleCardPress = (jogo) => {
    setSelectedJogo(jogo);
    setDetalhesVisible(true);
  };

  const handleCloseDetalhes = () => {
    setDetalhesVisible(false);
    setSelectedJogo(null);
  };

  // Exemplo de editar/excluir (implemente conforme sua lógica)
  const handleEdit = () => {


  };
  const handleDelete =  async (id) => {
       try{
        await gamesService.delete(`dell/${id}`);
        setDetalhesVisible(false)
        Toast.show({ type: 'info', text1:'Jogo removido!', position: 'bottom'})
        await fetchJogos();
    } catch(error){
        setDetalhesVisible(false)
        Toast.show({ type: 'error', text1:'Não foi possível remover o jogo', position: 'bottom'})
    }
  };

  return (
    <LinearGradient
      colors={["rgba(25,29,32,1)", "rgba(137,147,178,1)", "rgba(137,147,178,1)"]}
      locations={[0.26, 0.58, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={handleOpenModal}
          icon="plus"
          contentStyle={styles.contentStyle}
          style={styles.button}
          labelStyle={styles.labelStyle}
        >
          Adicionar
        </Button>

        {/* Lista de cards */}
        {loading ? (
          <ActivityIndicator color="#fff" size="large" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={jogos}
            keyExtractor={(item) => item.id?.toString() || item.nome}
            renderItem={({ item }) => (
              <CardGames
                image={item.img || item.imagem}
                onPress={() => handleCardPress(item)}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Modal de adicionar jogo */}
        <ModalForm
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleAddGame}
        />

        {/* Modal de detalhes */}
        <ModalDetails
          visible={isDetalhesVisible}
          jogo={selectedJogo}
          onClose={handleCloseDetalhes}
          onEdit={handleEdit}
          onDelete={() => setModalConfirmVisible(true)}
        />

        <ModalConfirm 
        visible={ ModalConfirmVisible }
        onConfirm={ async () => {
            await handleDelete(selectedJogo.id);
            setModalConfirmVisible(false)
        }}
        onCancel={ () => setModalConfirmVisible(false)}
        />

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#575757",
    borderRadius: 5,
    elevation: 6,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginRight: 10,
    marginBottom: 10,
  },
  contentStyle: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
  },
  labelStyle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    marginRight: 20,
  },
  listContent: {
    alignItems: "flex-start",
    paddingBottom: 80,
  },
});
