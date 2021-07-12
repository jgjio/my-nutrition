import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Register } from "./Register";
import { Login } from "./Login";
import { selectLoggedInUser } from "./userSlice";
import { useSelector } from "react-redux";
import { Theme } from "src/Theme";

export function Authentication({ navigation }) {
  const [isSignInActive, setIsSignActive] = useState<boolean>(true);
  const user = useSelector(selectLoggedInUser);

  const onSignInPressed = () => {
    setIsSignActive(true);
  };

  const onSignUpPressed = () => {
    setIsSignActive(false);
  };

  const styles = StyleSheet.create({
    loginSelectionContainer: {
      flexDirection: "row",
      marginBottom: "5%",
      marginTop: "5%",
      width: "100%",
    },
    registerSelection: {
      alignItems: "flex-end",
      width: "50%",
    },
    signInSelection: {
      alignItems: "flex-start",
      width: "50%",
    },
  });
  return (
    <Theme.themedBackgroundContainer>
      {user.status == "loading" ? (
        <Theme.themedLoadingIndicator />
      ) : (
        <View>
          <Theme.themedLogo />
          <View style={styles.loginSelectionContainer}>
            <View style={styles.registerSelection}>
              {isSignInActive ? (
                <Theme.inactiveButtonNoOutline
                  title="Register"
                  onPress={onSignUpPressed}
                ></Theme.inactiveButtonNoOutline>
              ) : (
                <Theme.themedClearButtonNoOutline
                  title="Register"
                  onPress={onSignUpPressed}
                ></Theme.themedClearButtonNoOutline>
              )}
            </View>
            <View style={styles.signInSelection}>
              {isSignInActive ? (
                <Theme.themedClearButtonNoOutline
                  title="Login"
                  onPress={onSignInPressed}
                ></Theme.themedClearButtonNoOutline>
              ) : (
                <Theme.inactiveButtonNoOutline
                  title="Login"
                  onPress={onSignInPressed}
                ></Theme.inactiveButtonNoOutline>
              )}
            </View>
          </View>
          {
            <View>
              {isSignInActive ? (
                <Login navigation={navigation} />
              ) : (
                <Register navigation={navigation} />
              )}
            </View>
          }
        </View>
      )}
    </Theme.themedBackgroundContainer>
  );
}
