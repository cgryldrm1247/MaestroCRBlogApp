import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import DarkModeContext from "../../DarkModeContext";

const BlogDetailScreen = ({ route }) => {
  const { content, imageUrl } = route.params;

  // İçeriğin başına resim HTML etiketini ekleyin
  const contentWithImage = `<img src="${imageUrl}" style="width: 100%; height: auto;" />${content}`;

  const { isDarkMode } = useContext(DarkModeContext);

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            background-color: ${isDarkMode ? "#000" : "#fff"};
            color: ${isDarkMode ? "#fff" : "#000"};
          }
        </style>
      </head>
      <body>
        ${contentWithImage}
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        originWhitelist={['*']}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BlogDetailScreen;
