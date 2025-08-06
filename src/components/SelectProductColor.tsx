type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

function SelectProductColor({
  colors,
  productColor,
  setProductColor,
}: SelectProductColorProps) {
  const handleColorChange = (color: string) => {
    setProductColor(color);
  };

  return (
    <div className='mt-6'>
      <h4 className='text-md font-medium tracking-wider capitalize'>colors</h4>
      <div className='mt-2 flex flex-wrap gap-2'>
        {colors.map((color) => {
          const isSelected = color === productColor;
          return (
            <button
              key={color}
              type='button'
              className={`rounded-full w-6 h-6 border-2 transition-all duration-200 ${
                isSelected 
                  ? 'border-primary ring-2 ring-primary/20 scale-110' 
                  : 'border-gray-300 hover:border-gray-400 hover:scale-105'
              }`}
              onClick={() => handleColorChange(color)}
              title={`Select ${color} color`}
              aria-label={`Select ${color} color`}
              aria-current={isSelected}
              data-testid={`color-${color}`}
            >
              <span className="sr-only">{color}</span>
              {/* Dynamic colors require inline styles - accessibility exception */}
              <div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default SelectProductColor;
