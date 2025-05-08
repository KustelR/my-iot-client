import { defaultFontSize } from "@/src/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  device: {
    flex: 1,
    backgroundColor: "white",
    padding: defaultFontSize / 2,
    marginTop: defaultFontSize / 2,
    marginLeft: defaultFontSize / 2,
    marginRight: defaultFontSize / 2,
    borderRadius: 12,
  },
  deviceListItem: {
    paddingTop: defaultFontSize / 3,
    marginBottom: defaultFontSize / 2,
    paddingBottom: defaultFontSize / 3,
    paddingLeft: defaultFontSize / 2,
    paddingRight: defaultFontSize / 2,
    display: "flex",
    backgroundColor: "#D5D5D5",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deviceDataHeader: {
    fontSize: defaultFontSize * 1.1,
  },
  deviceListItemText: {
    fontSize: defaultFontSize,
    color: "#555555",
  },
});
