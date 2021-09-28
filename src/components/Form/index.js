import React, { useState } from "react";
import {
    View,
    Vibration,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    FlatList,
    Keyboard
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular IMC");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);

    function imcCalculator() {
        let totalImc = (Number(weight.replace(",", ".")) / (Number(height.replace(",", ".")) * height.replace(",", "."))).toFixed(2);
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
        setImc(totalImc);
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate();
            setErrorMessage("Campo obrigatório *");
        }
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator();
            setWeight(null);
            setHeight(null);
            setMessageImc("Seu imc é igual:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
        } else {
            verificationImc();
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o peso e altura");
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ?
                <Pressable style={styles.form} onPress={() => Keyboard.dismiss()}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        onChangeText={setHeight}
                        value={height}
                        placeholder="1.75"
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="75.800"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            validationImc();
                            Keyboard.dismiss()
                        }}
                        style={styles.buttonCalculator}
                    >
                        <Text style={styles.textButtonCalculator}>
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity
                        onPress={() => {
                            validationImc();
                            Keyboard.dismiss()
                        }}
                        style={styles.buttonCalculator}
                    >
                        <Text style={styles.textButtonCalculator}>
                            {textButton}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    );
                }}
                keyExtractor={(item) => {
                    item.id
                }}
            />
        </View>
    );
}