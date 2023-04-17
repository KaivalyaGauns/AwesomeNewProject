import React, { useState } from 'react';
import { Button, Linking, StyleSheet, Modal, View, Text, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const WEB_PAGE_URL = 'https://app.demo-turtlefin.turtle-feature.com/';
// const WEB_PAGE_URL = 'https://app.mintpro.in/signup';

const App = () => {



  return (
    <Modal
      // presentationStyle={'pageSheet'}
      animationType={'slide'}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          source={{ uri: WEB_PAGE_URL }}
          domStorageEnabled
          javaScriptEnabled
          originWhitelist={['*']}
        />
      </SafeAreaView>
    </Modal>
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