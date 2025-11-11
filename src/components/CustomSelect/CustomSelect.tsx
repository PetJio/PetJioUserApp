import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export interface SelectOption {
  label: string;
  value: any;
}

interface CustomSelectProps {
  label: string;
  icon?: string;
  error?: string;
  placeholder?: string;
  data: SelectOption[];
  value: any;
  onChange: (item: SelectOption) => void;
  disabled?: boolean;
  maxHeight?: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  icon,
  error,
  placeholder = 'Select an option',
  data,
  value,
  onChange,
  disabled = false,
  maxHeight = 300,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {icon && (
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon} size={20} color="#58B9D0" />
          </View>
        )}
        <View style={styles.inputContent}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderText}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
            containerStyle={[styles.dropdownContainer, { maxHeight }]}
            itemContainerStyle={styles.itemContainer}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disable={disabled}
            renderRightIcon={() => (
              <MaterialIcons 
                name={disabled ? "lock" : "keyboard-arrow-down"} 
                size={20} 
                color={disabled ? "#9CA3AF" : "#6B7280"} 
              />
            )}
          />
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  dropdown: {
    minHeight: 24,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  placeholderText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
  },
  selectedText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  itemText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '400',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
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

export default CustomSelect;
