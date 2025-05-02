import { ReactNode, useEffect } from "react";
import { Modal, View, StyleSheet, BackHandler } from "react-native";
import InlineButton from "./InlineButton";

export function Portal(
    props: {
        isVisible: boolean, 
        setIsVisible: (arg: boolean) => void,
        children: ReactNode
    }
    ) {
    const {isVisible, setIsVisible, children} = props;

    return <>
        {isVisible && <Modal onRequestClose={() => setIsVisible(false)}>
            <View style={styles.portal}>
                {children}
                <InlineButton title="go back" onTouchStart={() => {setIsVisible(false)}} destructive />
            </View>

        </Modal>}
    </>
}

const styles = StyleSheet.create({
    portal: {
        padding: 5,
        display: "flex",
        height: "100%",
        justifyContent: "space-between"
    }
})