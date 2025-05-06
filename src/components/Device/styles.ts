import { defaultFontSize } from "@/src/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  device: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    marginTop: 12,
    borderRadius: 12,
  },
  deviceListItem: {
    paddingTop: 6,
    marginBottom: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    display: "flex",
    backgroundColor: "#D5D5D5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deviceDataHeader: {
    fontSize: defaultFontSize * 1.1,
  },
  deviceListItemText: {
    fontSize: 24,
    color: "#555555",
  },
});
