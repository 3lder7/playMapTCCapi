import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#f5f5f5',
    },
    filterTouch: {
      height: 40,
      width: 40,
      right: 20,
      borderRadius: 45,
      elevation: 5,
      alignItems: "center",
      justifyContent:"center",
      backgroundColor: "#fff",
    },
    filterIcon: {
      height: 22,
      width: 22,
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
      color: '#000',
    },
    recentSection: {
      marginTop: 16,
      paddingHorizontal: 10,
    },
    recentTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: '#000',
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      height: 60,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#f5f5f5',
      elevation: 1,
    },
    recentInfo: {
      flex: 1,
      marginLeft: 16,
    },
    locationName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    locationIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    noSuggestions: {
      textAlign: 'center',
      color: '#555',
      marginTop: 20,
    },
  });