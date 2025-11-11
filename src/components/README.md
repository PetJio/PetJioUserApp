# Common Form Components

This directory contains reusable form components with consistent styling across the app.

## Available Components

### CustomTextInput
A styled text input component with label, icon, and error handling.

**Props:**
- `label` (string, required): Label text displayed above input
- `icon` (string, optional): Material icon name to display on the left
- `error` (string, optional): Error message to display below input
- `showPasswordToggle` (boolean, optional): Shows password visibility toggle
- `secureTextEntry` (boolean, optional): Whether to mask input text
- `onTogglePassword` (function, optional): Callback for password toggle
- All standard React Native TextInput props

**Example:**
```tsx
<CustomTextInput
  label="Email"
  icon="email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  keyboardType="email-address"
/>
```

### CustomSelect
A styled dropdown/select component matching the TextInput UI design.

**Props:**
- `label` (string, required): Label text displayed above select
- `icon` (string, optional): Material icon name to display on the left
- `error` (string, optional): Error message to display below select
- `placeholder` (string, optional): Placeholder text when no value selected
- `data` (SelectOption[], required): Array of {label, value} objects
- `value` (any, required): Currently selected value
- `onChange` (function, required): Callback when value changes
- `disabled` (boolean, optional): Whether select is disabled
- `maxHeight` (number, optional): Maximum height for dropdown list (default: 300)

**Example:**
```tsx
<CustomSelect
  label="Category"
  icon="category"
  placeholder="Select a category"
  data={categories.map(cat => ({
    label: cat.name,
    value: cat.id,
  }))}
  value={selectedCategory}
  onChange={(item) => setSelectedCategory(item.value)}
  error={errors.category}
/>
```

### CustomDatePicker
A styled date picker component matching the TextInput UI design.

**Props:**
- `label` (string, required): Label text displayed above picker
- `icon` (string, optional): Material icon name to display on the left
- `error` (string, optional): Error message to display below picker
- `placeholder` (string, optional): Placeholder text when no date selected
- `value` (string, required): Selected date in YYYY-MM-DD format
- `onChange` (function, required): Callback with formatted date string
- `minimumDate` (Date, optional): Minimum selectable date
- `maximumDate` (Date, optional): Maximum selectable date (default: today)
- `mode` ('date' | 'time' | 'datetime', optional): Picker mode (default: 'date')

**Example:**
```tsx
<CustomDatePicker
  label="Date of Birth"
  icon="cake"
  placeholder="Select Date of Birth"
  value={dob}
  onChange={(dateString) => setDob(dateString)}
  error={errors.dob}
  maximumDate={new Date()}
  minimumDate={new Date(1990, 0, 1)}
/>
```

## Design Consistency

All components follow the same design pattern:
- Consistent border radius (14px)
- Same color scheme (#58B9D0 for icons, #E5E7EB for borders)
- Uppercase labels with letter spacing
- Error state with red borders and background tint
- Responsive height using react-native-responsive-dimensions
- Material Icons for visual elements

## Usage

Import from the components index:

```tsx
import { CustomTextInput, CustomSelect, CustomDatePicker } from '../../components';
// or
import CustomTextInput from '../../components/CustomTextInput';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';
```

## Migration from Old Components

### From TouchableOpacity + DateTimePicker
**Before:**
```tsx
<TouchableOpacity onPress={showDatepicker}>
  <MaterialIcons name="cake" />
  <Text>{dob || 'Select Date'}</Text>
</TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={dobDate}
    onChange={onDateChange}
    maximumDate={new Date()}
  />
)}
```

**After:**
```tsx
<CustomDatePicker
  label="Date of Birth"
  icon="cake"
  value={dob}
  onChange={setDob}
  maximumDate={new Date()}
/>
```

### From Dropdown (react-native-element-dropdown)
**Before:**
```tsx
<Dropdown
  style={{ height: 56, borderColor: '#E2E2E2' }}
  data={categories.map(c => ({ label: c.name, value: c.id }))}
  value={category}
  onChange={item => setCategory(item.value)}
  renderLeftIcon={() => <MaterialIcons name="category" />}
/>
```

**After:**
```tsx
<CustomSelect
  label="Category"
  icon="category"
  data={categories.map(c => ({ label: c.name, value: c.id }))}
  value={category}
  onChange={(item) => setCategory(item.value)}
/>
```
