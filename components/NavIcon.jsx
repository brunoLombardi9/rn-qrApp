import Icon from "react-native-vector-icons/MaterialIcons";

const NavIcon = ({ icon, focused, color }) => {
  return <Icon name={icon} size={30} color={focused ? color : "white"} />;
};

export default NavIcon;
