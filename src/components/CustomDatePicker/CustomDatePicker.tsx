import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface CustomDatePickerProps {
  label: string;
  icon?: string;
  error?: string;
  placeholder?: string;
  value: string; // Formatted date string (e.g., "2023-12-25")
  onChange: (dateString: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  icon,
  error,
  placeholder = 'Select date',
  value,
  onChange,
  minimumDate,
  maximumDate = new Date(),
  mode = 'date',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      // Format date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      onChange(formattedDate);
    }
  };

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.inputWrapper, error && styles.inputError]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon} size={20} color="#58B9D0" />
          </View>
        )}
        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Text style={value ? styles.valueText : styles.placeholderText}>
            {value ? formatDisplayDate(value) : placeholder}
          </Text>
        </View>
        <View style={styles.calendarIconContainer}>
          <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
        </View>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveHeight(0.5),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: responsiveHeight(1),
    minHeight: responsiveHeight(7.5),
  },
  iconContainer: {
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 2,
  },
  inputLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    minHeight: 24,
    textAlignVertical: 'center',
  },
  placeholderText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
    minHeight: 24,
    textAlignVertical: 'center',
  },
  calendarIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    padding: 4,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default CustomDatePicker;
