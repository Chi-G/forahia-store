import { Label } from './ui/label';
import { Input } from './ui/input';

type ControlledFormInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  name?: string;
};

function ControlledFormInput({ 
  label, 
  value, 
  onChange, 
  type, 
  placeholder,
  name 
}: ControlledFormInputProps) {
  const inputName = name || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className='mb-2'>
      <Label htmlFor={inputName} className='capitalize'>
        {label}
      </Label>
      <Input 
        id={inputName} 
        name={inputName} 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default ControlledFormInput;
