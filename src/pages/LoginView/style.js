import {
    StyleSheet,
} from 'react-native';

import { Sizing, Typography, Outlines, Colors } from "../../styles"


export const style = StyleSheet.create({
    contentContainer: {
        padding: Sizing.x20,
    },
    sectionContainer: {
        borderBottomWidth: Outlines.borderWidth.thin,
        borderColor: Colors.neutral.s100,
        paddingBottom: Sizing.x20,
        marginBottom: Sizing.x20,
    },
    container: {
        marginBottom: Sizing.x80,
    },
    headerContainer: {
        marginBottom: Sizing.x20,
        paddingBottom: Sizing.x20,
        borderBottomWidth: Outlines.borderWidth.thin,
        borderColor: Colors.neutral.s100,
    },
    headerText: {
        ...Typography.header.x60,
        marginBottom: Sizing.x10,
    },
    subheaderText: {
        ...Typography.header.x20,
    },
});