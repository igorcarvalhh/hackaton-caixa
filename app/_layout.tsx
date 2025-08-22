import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
    "CAIXAStd-Regular": require("../assets/fonts/CAIXAStd-Regular.ttf"),
    "CAIXAStd-SemiBold": require("../assets/fonts/CAIXAStd-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}
