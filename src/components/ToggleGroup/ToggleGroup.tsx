import { useState } from "react";
import { css } from 'styled-system/css'
interface FilterToggleGroupProps {
    options: readonly {
        value: string;
        label: string;
    }[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
}

export default function FilterToggleGroup({ options, defaultValue, onChange, value: controlledValue }: FilterToggleGroupProps) {
    const [internalValue, setInternalValue] = useState(defaultValue || options[0].value);
    
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (newValue: string) => {
        setInternalValue(newValue);
        onChange?.(newValue);
    };

return (
    <div className={styles.container}>
        {options.map((option, index) => (
            <div
                key={option.value}
                className={`${styles.button} ${value === option.value ? styles.activeButton : ''}`}
                onClick={() => handleChange(option.value)}
            >
                <img 
                    src={`/icons/${index}.png`} 
                    alt={option.label}
                    className={styles.icon}

                />
                {option.label}
            </div>
        ))}
    </div>
);
}


const styles = {
    container: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        padding: '4px',
        // backgroundColor: '#F8F9FA',
        
        width: 'fit-content'
    }),
    button: css({
        borderRadius: '4px',
        border: '1px solid rgba(255, 255, 255, 0.64) !important',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--ff_2)',
        padding: '10px 16px !important',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s',
        cursor: 'pointer',
        _hover: {
            backgroundColor: 'rgba(255, 255, 255, 0.14)'
        }
    }),
    activeButton: css({
        color:'black !important',
        backgroundColor: '#81FFBA',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        _hover: {
            backgroundColor: '#FFFFFF'
        }
    }),
    icon: css({
        width: '16px !important',
        height: '16px !important',
        // border: '1px solid rgba(255, 255, 255, 0.64) !important'
    })
}





