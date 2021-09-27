import React, { useState } from "react";
import { 
    View, 
    Vibration,
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
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

    function imcCalculator() {
        return setImc((Number(weight.replace(",", ".")) / (Number(height.replace(",", ".")) * height.replace(",", "."))).toFixed(2));
    }

    function verificationImc(){
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("Campo obrigatório *");
        }
    }

    function validationImc() {
        verificationImc();

        if (weight != null && height != null) {
            imcCalculator();
            setWeight(null);
            setHeight(null);
            setMessageImc("Seu imc é igual:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
            return
        }
        setImc(null);
        setTextButton("Calcular");
        setMessageImc("Preencha o peso e altura");
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.formContext}>
                <View style={styles.form}>
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
                </View>

                <ResultImc messageResultImc={messageImc} resultImc={imc} />
            </View>
        </TouchableWithoutFeedback>
    );
}