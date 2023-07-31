import { Platform } from 'react-native';

export default function getAutomationID(automationID) {
  return Platform.OS === 'ios' ? { testID: automationID } : { accessibilityLabel: automationID };
}
