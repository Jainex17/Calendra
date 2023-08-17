import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    dateValue: {
      control: {
        type: 'date',
      },
    },
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
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    darkMode: false,
    readOnly: false,
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState(new Date());
    
    return (
      <Calendar 
        dateValue={dateValue} 
        setDateValue={setDateValue}
        yearRange={[1900, 2000]}
    />
    );
  },
};
