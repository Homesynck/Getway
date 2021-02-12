import React from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"

import { Sizing, Typography, Outlines, Colors, Buttons } from "../../styles"

const BaseExample = () => {
  return (
    <View style={style.container}>
        <View style={style.headerContainer}>
            <Text style={style.headerText}>
                Home
            </Text>
            <Text style={style.subheaderText}>
              Find all your contacts here
            </Text>
      </View>
      <View style={style.bodyContainer}>
          <Text style={style.bodyText}>
              We'll need to integrate contacts here
          </Text>
          <Text style={style.bodyText}>
              And more contacts
          </Text>
      </View>
      <Pressable style={style.button}>
          <Text style={style.buttonText}>One button</Text>
      </Pressable>
      <Pressable style={style.secondaryButton}>
          <Text style={style.secondaryButtonText}>
            secondaryButton
          </Text>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
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
  bodyContainer: {
    marginBottom: Sizing.x20,
  },
  bodyText: {
    ...Typography.fontSize.x20,
    ...Typography.fontWeight.regular,
    ...Typography.lineHeight.x30,
    color: Colors.neutral.s600,
    marginBottom: Sizing.x20,
  },
  button: {
    ...Buttons.bar.primary,
    marginBottom: Sizing.x10,
  },
  buttonText: {
    ...Buttons.barText.primary,
  },
  secondaryButton: {
    ...Buttons.bar.secondary,
  },
  secondaryButtonText: {
    ...Buttons.barText.secondary,
  },
})

export default BaseExample