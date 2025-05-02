import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import InlineButton from "./InlineButton";
import { useState } from "react";
import { Portal } from "./Portal";

export interface DeviceData {
    name: string
    status: DeviceStatus
    actions: DeviceAction[]
}

interface DeviceStatus {
    [key: string]: string
}

interface DeviceAction {
    name: string
    status: boolean
}

export type DeviceProps = {
    data: DeviceData
}




 
export default function Device(props: DeviceProps) {
    const {data} = props
    return <>
        <View style={styles.device}>
            <Text style={styles.deviceHeader}>
                {props.data.name}
            </Text>
            <DeviceInfo data={data.status} />
            <DeviceActions data={data.actions} />
        </View>
    </>
}

function DeviceInfo(props: {data: DeviceStatus}) {
    return     <View>
        <Text style={styles.deviceDataHeader}>Info</Text>
    <FlatList
        data={Object.entries(props.data)}
        renderItem={item => <DeviceInfoEntry key1={item.item[0]} value={item.item[1]} /> }
    />
    </View>
}

function DeviceInfoEntry(props: {key1: string, value: string}) {
    const {key1, value} = props;
    return <View style={styles.deviceListItem}>
            <Text style={styles.deviceListItemText}>{key1}:</Text> 
            <Text style={styles.deviceListItemText}>{value}</Text>
        </View>
}

function DeviceActions(props: {data: DeviceAction[]}) {
    return <View>
        <Text style={styles.deviceDataHeader}>Actions</Text>
        <FlatList 
            data={props.data} 
            renderItem={item => <DeviceAction data={item.item} />}    
        />

    </View>
}

function DeviceAction(props: {data: DeviceAction}) {
    const [isPerforming, setIsPerforming] = useState(false)
    const {data} = props;
    return <>
    <View style={styles.deviceListItem}>
    <Text style={styles.deviceListItemText}>{data.name}</Text>
    <Text style={styles.deviceListItemText}>{data.status ? "On" : "Off"}</Text>
    <InlineButton title="Turn on" onTouchStart={() => {setIsPerforming(true)}} />
    </View>
    <ActionPerformingMenu isPerforming={isPerforming} setIsPerforming={setIsPerforming} />
    </>
}

function ActionPerformingMenu(props: {isPerforming: boolean, setIsPerforming: (arg: boolean) => void}) {
    const {isPerforming, setIsPerforming} = props;
    return <Portal isVisible={isPerforming} setIsVisible={setIsPerforming}>
        <Text>sadfasdf</Text>
    </Portal>
}

const styles = StyleSheet.create({
    device: {
        backgroundColor: "white",
        padding: 12,
        marginBottom: 12,
        borderRadius: 12
    },
    deviceHeader: {
        fontWeight: "bold",
        fontSize: 32
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
        justifyContent: "space-between"
    },
    deviceDataHeader: {
        fontSize: 24
    },
    deviceListItemText: {
        fontSize: 24,
        color: "#555555"
    },
})