import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    darkMode: {
      control: {
        type: 'boolean',
      }
    },
    readOnly: {
      control: {
        type: 'boolean',
      }
    },
    yearRange: {
      control: {
        type: 'array',
      }
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    darkMode: false,
    readOnly: false,
  },
  render: ({darkMode , readOnly}) => {
    const [dateValue, setDateValue] = useState(new Date());
    
    return (
      <Calendar 
        dateValue={dateValue} 
        setDateValue={setDateValue}
        darkMode={darkMode}
        readOnly={readOnly}
        yearRange={[2000,2003]}
    />
    );
  },
};

export const ReadOnly: Story = {
  args: {
    darkMode: false,
    readOnly: true,
  },
  render: ({darkMode , readOnly}) =>{
    const [dateValue, setDateValue] = useState(new Date());
    
    return (
      <Calendar 
        dateValue={dateValue} 
        setDateValue={setDateValue}
        darkMode={darkMode}
        readOnly={readOnly}
    />
    );
  }
};
