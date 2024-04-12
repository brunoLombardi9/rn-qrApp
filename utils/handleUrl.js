import { setStringAsync } from "expo-clipboard";
import { Linking } from "react-native";

export async function copyUrl(link) {
  await setStringAsync(link);
}

export async function openUrl(link) {
  try {
    const formattedLink = link.startsWith("http") ? link : `http://${link}`;
    const supported = await Linking.canOpenURL(formattedLink);

    if (supported) {
      await Linking.openURL(formattedLink);
    }
  } catch (error) {
    console.log(error);
  }
}
