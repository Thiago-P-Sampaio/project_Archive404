import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

    export default function Header({ username, onAdd }) {
    return (
        <View style={styles.headerContainer}>
        {/* Avatar e Nome */}
        <View style={styles.avatarContainer}>
            <Avatar.Image
            size={40}
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.avatar}
            />
            <Text style={styles.username}>{username}</Text>
        </View>

        {/* Menu de Navegação - Apenas Visual */}
        <View style={styles.navContainer}   >
            
            <Text style={styles.navItemInactive}>Consoles</Text>
            <Text style={styles.navItemActive}>Coleção</Text>
            <Text style={styles.navItemInactive}>Conquistas</Text>
        </View>

        {/* Botão Adicionar */}
        <Button mode="contained" onPress={onAdd} style={styles.addButton}>
            Adicionar +
        </Button>
        </View>
    );
    }

    const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#232729',
        padding: 16,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 8,
    },
    username: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    navItemActive: {
        color: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
    navItemInactive: {
        color: '#888',
    },
    addButton: {
        backgroundColor: '#575757',
    },
    });
