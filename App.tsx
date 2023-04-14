import React, { useState } from 'react';
import { Button, Linking, StyleSheet, Modal, View, Text } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import WebView from 'react-native-webview';

const WEB_PAGE_URL = 'http://localhost:8080/';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("NO TEXTT");

  const openLinkInBrowserHandler = () => {
    Linking.canOpenURL(WEB_PAGE_URL).then((supported) => {
      supported && Linking.openURL(WEB_PAGE_URL);
    });
  };

  const openLinkInWebView = () => setVisible(true);

  const openLinkInAppBrowser = () => {
    InAppBrowser.isAvailable()
      .then(() => {
        return InAppBrowser.open(WEB_PAGE_URL, {
          // iOS Properties
          animated: true,
          modalEnabled: true,
          // Android Properties
          showTitle: true,
        });
      })
      .catch((_) => openLinkInBrowserHandler());
  };

  const INJECTED_JAVASCRIPT = `(function() {
    setInterval(()=> {
      window.postMessage(JSON.stringify(window.location));
    },1000)
  })();`;

  return (
    <View style={styles.container}>
      <Button
        title={'Open link in Browser'}
        onPress={openLinkInBrowserHandler}
      />
      <View style={styles.separator} />
      <Button title={'Open link in WebView'} onPress={openLinkInWebView} />
      <View style={styles.separator} />
      <Button
        title={'Open link in InAppBrowser'}
        onPress={openLinkInAppBrowser}
      />
      <Modal
        visible={visible}
        presentationStyle={'pageSheet'}
        animationType={'slide'}
        onRequestClose={() => setVisible(!visible)}
      >
        <WebView 
          source={{ uri: WEB_PAGE_URL }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onMessage={(event)=>{
            let message  = event.nativeEvent.data;
            /* event.nativeEvent.data must be string, i.e. window.postMessage
            should send only string.
            * */
            setText(message);
          }}
          domStorageEnabled
          javaScriptEnabled
          originWhitelist={['*']}
        />
      </Modal>
      <Text>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 20,
  },
});

export default App;