import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import ModalForm from "../../Components/ModalForm/modalform";
import CardGames from "../../Components/CardGames/cardgames";
import ModalDetails from "../../Components/ModalDetails/modalDetails";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import gamesService from "../../Services/api";
import ModalConfirm from "../../Components/ModalConfirm/modalConfirm";

export default function HomeScreen() {
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    if (!refreshing) setLoading(true);
    try {
      const response = await gamesService.get();
      setGames(response.data);
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao carregar os jogos" });
      setGames([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchGames();
  };

  const openFormModalForAdd = () => {
    setGameToEdit(null);
    setFormModalVisible(true);
  };

  const openFormModalForEdit = (game) => {
    setGameToEdit(game);
    setFormModalVisible(true);
    setDetailsModalVisible(false);
  };

  const closeFormModal = () => {
    setFormModalVisible(false);
    setGameToEdit(null);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (gameToEdit) {
        await gamesService.put(`/${gameToEdit.id}`, formData);
        Toast.show({ type: "success", text1: "Jogo atualizado com sucesso!" });
      } else {
        await gamesService.post("", formData);
        Toast.show({ type: "success", text1: "Jogo adicionado com sucesso!" });
      }
      closeFormModal();
      fetchGames();
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro ao salvar jogo." });
    }
  };

  const handleCardPress = (game) => {
    setSelectedGame(game);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedGame(null);
  };

  const openConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await gamesService.delete(`/${id}`);
      Toast.show({ type: "info", text1: "Jogo removido!", position: "bottom" });
      closeDetailsModal();
      closeConfirmModal();
      fetchGames();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao remover o jogo!.",
        position: "bottom",
      });
      closeConfirmModal();
    }
  };

  const handleEdit = () => {
    if (selectedGame) {
      openFormModalForEdit(selectedGame);
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
        <View style={styles.containerHeader}>
          <Text style={styles.text}>
            {games.length > 0 ? `${games.length} Jogos` : "Nenhum jogo"}
          </Text>
          <Button
            mode="contained"
            onPress={openFormModalForAdd}
            icon="plus"
            contentStyle={styles.contentStyle}
            style={styles.button}
            labelStyle={styles.labelStyle}
          >
            Adicionar
          </Button>
        </View>

        {loading && !refreshing ? (
          <ActivityIndicator color="#fff" size="large" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item, index) =>
              item.id?.toString() || `${item.nome}-${index}`
            }
            renderItem={({ item }) => (
              <CardGames
                image={item.img || item.imagem}
                onPress={() => handleCardPress(item)}
              />
            )}
            numColumns={3}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        <ModalForm
          visible={isFormModalVisible}
          onClose={closeFormModal}
          onSubmit={handleSubmitForm}
          initialData={gameToEdit}
        />

        <ModalDetails
          visible={isDetailsModalVisible}
          jogo={selectedGame}
          onClose={closeDetailsModal}
          onEdit={handleEdit}
          onDelete={openConfirmModal}
        />

        <ModalConfirm
          visible={isConfirmModalVisible}
          onConfirm={() => handleDelete(selectedGame?.id)}
          onCancel={closeConfirmModal}
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
    paddingHorizontal: 6,
    alignItems: "flex-start",
    paddingBottom: 80,
    marginTop: 5,
  },
  containerHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200",
  },
});
