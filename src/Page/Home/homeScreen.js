    import React, { useState } from 'react';
    import { View, StyleSheet } from 'react-native'; // Importação corrigida
    import ModalForm from '../../Components/ModalForm/modalform';
    import { Button } from 'react-native-paper';
    import { LinearGradient } from 'expo-linear-gradient';

    export default function HomeScreen() {
        const [isModalVisible, setModalVisible] = useState(false);

        const handleOpenModal = () => {
            setModalVisible(true);
        };

        const handleCloseModal = () => {
            setModalVisible(false);
        };

        return (
            <LinearGradient
            colors={[
            'rgba(25,29,32,1)',
            'rgba(137,147,178,1)',
            'rgba(137,147,178,1)'
            ]}
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
                <ModalForm visible={isModalVisible} onClose={handleCloseModal} />
            </View>
        </LinearGradient>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            backgroundColor: 'transparent', // remova o branco para deixar o gradiente visível
            padding: 10, // sem aspas
        },
        button: {
            backgroundColor: '#575757',
            borderRadius: 5,
            elevation: 6,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            marginRight: 10

        },
        contentStyle: {
        flexDirection: 'row-reverse', // texto à esquerda, ícone à direita
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 40,
        },
        labelStyle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '400',
        marginRight: 20  , // espaço entre texto e ícone
        },
    });
