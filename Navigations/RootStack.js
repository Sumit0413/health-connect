import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import DoctorsList from "../screen/DoctorsList";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorsList"
        component={DoctorsList}
      />
    </Stack.Navigator>
  );
}
