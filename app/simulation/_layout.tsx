import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function SimulationLayout() {
    const [fontsLoaded] = useFonts({
    "CAIXAStd-Regular": require("../../assets/fonts/CAIXAStd-Regular.ttf"),
    "CAIXAStd-SemiBold": require("../../assets/fonts/CAIXAStd-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#005aa6' }, // cor de fundo do header
        headerTintColor: '#fff', // cor do título e ícones
        headerTitleStyle: { fontFamily: 'CAIXAStd-Regular', fontSize: 18 }, // fonte do título
      }}
    />
  );
}
