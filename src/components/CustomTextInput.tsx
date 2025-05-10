import { TextInput, StyleSheet } from "react-native";
import { defaultFontSize, primaryColor } from "@/src/styles";
import { View, Text } from "react-native";

interface CustomTextInputProps {
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  onChangeText?: (arg: string) => void;
}

export default function CustomTextInput(props: CustomTextInputProps) {
  const {
    label,
    placeholder,
    onChangeText: onChangeProp,
    defaultValue,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChangeText={
          onChangeProp
            ? (e) => {
                onChangeProp(e);
              }
            : () => {}
        }
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: defaultFontSize,
    marginRight: 12,
  },
  input: {
    textAlignVertical: "top",
    padding: defaultFontSize / 3,
    fontSize: defaultFontSize,
    borderWidth: 2,
    borderColor: primaryColor,
  },
});
