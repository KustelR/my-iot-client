import { TextInput, StyleSheet } from "react-native";
import { defaultFontSize, primaryColor } from "@/src/styles";
import { View, Text } from "react-native";

interface CustomTextInputProps {
  placeholder?: string;
  label?: string;
  onChangeText?: (arg: string) => void;
}

export default function CustomTextInput(props: CustomTextInputProps) {
  const { label, placeholder, onChangeText: onChangeProp } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
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
    flexDirection: "row",
    alignItems: "flex-end",
  },
  label: {
    fontSize: defaultFontSize,
    marginRight: 12,
  },
  input: {
    fontSize: 24,
    borderBottomWidth: 2,
    flexGrow: 1,
    borderBottomColor: primaryColor,
  },
});
