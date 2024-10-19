// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';
// import * as Linking from 'expo-linking';

// const Call = () => {
//   useEffect(() => {
//     // The number you want to prefill in the dial pad
//     const phoneNumber = '09369452215';
//     const url = `tel:${phoneNumber}`;

//     // Check if the device can open the phone's dial pad
//     Linking.canOpenURL(url)
//       .then((supported) => {
//         if (!supported) {
//           Alert.alert('Error', 'This device does not support phone calls');
//         } else {
//           return Linking.openURL(url);
//         }
//       })
//       .catch((err) => Alert.alert('Error', err.message));
//   }, []);

//   return null; // No need for a UI element since it will directly trigger the dial pad
// };

// export default Call;
