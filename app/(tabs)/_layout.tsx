import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#005aa6',
      },
      headerTitleStyle: {
        color: "#fff",
      },
      tabBarStyle: { display: 'none' }
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'CAIXA',
        }}
      />
    </Tabs>
  );
}