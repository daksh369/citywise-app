import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { router } from 'expo-router';
import { ArrowLeft, Scan } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    if (Platform.OS !== 'web') {
      getBarCodeScannerPermissions();
    } else {
      // On web, we'll just assume permission is granted
      setHasPermission(true);
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    // In a real app, we would validate the QR code data here
    // For this demo, we'll just navigate to the landing page
    setTimeout(() => {
      router.push({
        pathname: '/landing',
        params: { location: 'Downtown Transit Hub' }
      });
    }, 1000);
  };

  // For web testing, simulate scanning
  const simulateScan = () => {
    setScanned(true);
    setTimeout(() => {
      router.push({
        pathname: '/landing',
        params: { location: 'Downtown Transit Hub' }
      });
    }, 1000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => router.back()}>
        <ArrowLeft color={colors.white} size={24} />
        <Text style={styles.headerText}>Scan QR Code</Text>
      </TouchableOpacity>

      {Platform.OS !== 'web' ? (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay}>
            <View style={styles.scannerFrame} />
          </View>
        </View>
      ) : (
        <View style={styles.webScannerContainer}>
          <Scan color={colors.white} size={80} />
          <Text style={styles.webScannerText}>Camera access not available in web preview</Text>
          <TouchableOpacity 
            style={styles.simulateButton} 
            onPress={simulateScan}
            disabled={scanned}
          >
            <Text style={styles.simulateButtonText}>
              {scanned ? 'Simulating Scan...' : 'Simulate QR Scan'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.instructionText}>
        Position the QR code within the frame to scan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  scannerContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.accent[500],
    backgroundColor: 'transparent',
    borderRadius: 24,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 100,
  },
  instructionText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    padding: 32,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: colors.accent[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  webScannerContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  webScannerText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
    maxWidth: 300,
  },
  simulateButton: {
    backgroundColor: colors.accent[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  simulateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  }
});