import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Form from './src/components/Form';
import Title from './src/components/Title';

export default function App() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Title />
                <Form />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e5e5',
        paddingTop: 40,
    },
});
