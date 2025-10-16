import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

interface MockPaymentModalProps {
  visible: boolean;
  amount: number;
  onSuccess: (paymentData: any) => void;
  onFailure: (error: string) => void;
  onCancel: () => void;
  userEmail?: string;
  userName?: string;
  description?: string;
}

const MockPaymentModal: React.FC<MockPaymentModalProps> = ({
  visible,
  amount,
  onSuccess,
  onFailure,
  onCancel,
  userEmail = '',
  userName = '',
  description = 'Payment for PetJio services',
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    // Reset form when modal opens
    if (visible) {
      setSelectedMethod('upi');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setUpiId('');
      setProcessing(false);
    }
  }, [visible]);

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      // Generate mock payment response
      const paymentResponse = {
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_order_id: `order_mock_${Date.now()}`,
        razorpay_signature: `sig_mock_${Date.now()}`,
        payment_method: selectedMethod,
        amount: amount,
        status: 'success',
      };

      setProcessing(false);
      onSuccess(paymentResponse);
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#1A1D29" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Amount Card */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amountValue}>₹ {amount.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* User Details */}
          {(userName || userEmail) && (
            <View style={styles.userDetails}>
              {userName ? (
                <View style={styles.userRow}>
                  <MaterialIcons name="person" size={18} color="#6B7280" />
                  <Text style={styles.userText}>{userName}</Text>
                </View>
              ) : null}
              {userEmail ? (
                <View style={styles.userRow}>
                  <MaterialIcons name="email" size={18} color="#6B7280" />
                  <Text style={styles.userText}>{userEmail}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* Payment Methods */}
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          <View style={styles.methodsContainer}>
            {/* UPI */}
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === 'upi' && styles.methodButtonActive,
              ]}
              onPress={() => setSelectedMethod('upi')}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color={selectedMethod === 'upi' ? '#58B9D0' : '#6B7280'}
              />
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === 'upi' && styles.methodTextActive,
                ]}
              >
                UPI
              </Text>
            </TouchableOpacity>

            {/* Card */}
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === 'card' && styles.methodButtonActive,
              ]}
              onPress={() => setSelectedMethod('card')}
            >
              <MaterialIcons
                name="credit-card"
                size={24}
                color={selectedMethod === 'card' ? '#58B9D0' : '#6B7280'}
              />
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === 'card' && styles.methodTextActive,
                ]}
              >
                Card
              </Text>
            </TouchableOpacity>

            {/* Netbanking */}
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === 'netbanking' && styles.methodButtonActive,
              ]}
              onPress={() => setSelectedMethod('netbanking')}
            >
              <MaterialIcons
                name="account-balance"
                size={24}
                color={selectedMethod === 'netbanking' ? '#58B9D0' : '#6B7280'}
              />
              <Text
                style={[
                  styles.methodText,
                  selectedMethod === 'netbanking' && styles.methodTextActive,
                ]}
              >
                Banking
              </Text>
            </TouchableOpacity>
          </View>

          {/* Payment Form */}
          <View style={styles.formContainer}>
            {selectedMethod === 'upi' && (
              <View>
                <Text style={styles.inputLabel}>UPI ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="yourname@upi"
                  placeholderTextColor="#9CA3AF"
                  value={upiId}
                  onChangeText={setUpiId}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text style={styles.helpText}>
                  Enter your UPI ID (e.g., username@paytm, username@gpay)
                </Text>
              </View>
            )}

            {selectedMethod === 'card' && (
              <View>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#9CA3AF"
                  value={cardNumber}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/\s/g, '');
                    if (cleaned.length <= 16) {
                      setCardNumber(formatCardNumber(cleaned));
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={19}
                />

                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Expiry (MM/YY)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="12/25"
                      placeholderTextColor="#9CA3AF"
                      value={cardExpiry}
                      onChangeText={(text) => {
                        const cleaned = text.replace(/\D/g, '');
                        if (cleaned.length <= 4) {
                          setCardExpiry(formatExpiry(cleaned));
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>

                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#9CA3AF"
                      value={cardCvv}
                      onChangeText={(text) => {
                        if (text.length <= 3) {
                          setCardCvv(text);
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>

                <Text style={styles.helpText}>
                  For testing, use card: 4111 1111 1111 1111
                </Text>
              </View>
            )}

            {selectedMethod === 'netbanking' && (
              <View>
                <Text style={styles.inputLabel}>Select Your Bank</Text>
                <View style={styles.bankList}>
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map(
                    (bank) => (
                      <TouchableOpacity key={bank} style={styles.bankOption}>
                        <Text style={styles.bankText}>{bank}</Text>
                        <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Secure Badge */}
          <View style={styles.secureBadge}>
            <MaterialIcons name="lock" size={16} color="#10B981" />
            <Text style={styles.secureText}>
              This is a mock payment gateway for testing purposes
            </Text>
          </View>
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.payButton, processing && styles.payButtonDisabled]}
            onPress={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.payButtonText}>Pay ₹ {amount.toFixed(2)}</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D29',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  amountCard: {
    backgroundColor: '#F8F9FB',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#58B9D0',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  userDetails: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    gap: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userText: {
    fontSize: 14,
    color: '#1A1D29',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D29',
    marginTop: 24,
    marginBottom: 16,
  },
  methodsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  methodButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#58B9D0',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  methodTextActive: {
    color: '#58B9D0',
  },
  formContainer: {
    marginTop: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1D29',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1D29',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  helpText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  bankList: {
    gap: 12,
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bankText: {
    fontSize: 15,
    color: '#1A1D29',
    fontWeight: '500',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  secureText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    backgroundColor: '#58B9D0',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default MockPaymentModal;
