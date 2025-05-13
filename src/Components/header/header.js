import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            {/* Avatar e Nome */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBe6Lrai5rlwmAfhe0H2DMmDT0vcDYWAE_iw&s' }} // Substitua pela imagem desejada
                    style={styles.avatar}
                />
                <Text style={styles.username}>Archive 404</Text>
            </View>

            {/* Menu de Navegação - Apenas Visual */}
            <View style={styles.navContainer}>
                <Text style={styles.navItemInactive}>Consoles</Text>
                <Text style={styles.navItemActive}>Coleção</Text>
                <Text style={styles.navItemInactive}>Conquistas</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#232729',
        paddingVertical: 40,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    navContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItemActive: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        paddingBottom: 5,
    },
    navItemInactive: {
        color: '#888',
        fontSize: 16,
    },
});
