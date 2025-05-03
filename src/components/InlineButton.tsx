import {
  Button,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from "react-native";
import { primaryColor } from "@/src/styles";

export default function InlineButton(props: {
  title: string;
  active?: boolean;
  destructive?: boolean;
  onTouchStart?: () => void;
}) {
  const { title, active, destructive, onTouchStart } = props;
  return (
    <TouchableHighlight>
      <View
        style={[
          styles.button,
          active ? styles.activeButton : "",
          destructive ? styles.destructiveButton : "",
        ]}
        onTouchStart={onTouchStart}
      >
        <Text
          style={[
            { fontSize: 24 },
            active || destructive ? styles.activeText : "",
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: primaryColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: primaryColor,
  },
  activeText: {
    color: "white",
  },
  destructiveButton: {
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
  },
});
