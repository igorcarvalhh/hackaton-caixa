import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CAIXAStd-Regular": require("../assets/fonts/CAIXAStd-Regular.ttf"),
    "CAIXAStd-SemiBold": require("../assets/fonts/CAIXAStd-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <Stack>
      <Stack.Screen name="home"
        options={{
          headerStyle: { backgroundColor: '#005aa6' }, // cor de fundo do header
          headerTintColor: '#fff', // cor do título e ícones
          headerTitleStyle: { fontFamily: 'CAIXAStd-Regular', fontSize: 18 }, // fonte do título
          title: "Home"
        }}
      />
      <Stack.Screen name="new-product"
        options={{
          headerStyle: { backgroundColor: '#005aa6' }, // cor de fundo do header
          headerTintColor: '#fff', // cor do título e ícones
          headerTitleStyle: { fontFamily: 'CAIXAStd-Regular', fontSize: 18 }, // fonte do título
          title: "Novo Produto"
        }}
      />
      <Stack.Screen name="simulation"
        options={{
          headerStyle: { backgroundColor: '#005aa6' }, // cor de fundo do header
          headerTintColor: '#fff', // cor do título e ícones
          headerTitleStyle: { fontFamily: 'CAIXAStd-Regular', fontSize: 18 }, // fonte do título
          title: "Simulação"
        }}
      />
    </Stack>
  );
}
