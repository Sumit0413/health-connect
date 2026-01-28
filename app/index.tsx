import { SafeAreaView } from "react-native-safe-area-context";
import RootStack from "../Navigations/RootStack";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
       <RootStack />
    </SafeAreaView>
  );
}
